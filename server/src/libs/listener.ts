import { Client } from 'pg';
import * as dotenv from 'dotenv'; // For loading environment variables
import * as sqlite3 from 'sqlite3'; // Import sqlite3
import { open } from 'sqlite'; // Import open for async operations
import * as path from 'path'; // For resolving file paths
import { Subject } from 'rxjs'; // Import Subject from RxJS
import { debounceTime } from 'rxjs/operators'; // Import debounceTime operator
import { NETWORK_CONFIG } from '@alicarti/shared'; // Import network configuration

dotenv.config(); // Load environment variables from .env file

// Database connection configuration for PostgreSQL
const pgConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME,
};

// SQLite database configuration
const sqliteDbPath = path.resolve(__dirname, 'updates.sqlite'); // Path to your SQLite database file
let db: any; // Variable to hold the SQLite database instance

const channelName = 'your_channel'; // Must match the channel name(s) in the trigger(s)
// If you use different channels for 'user' and 'profile', you'll need to listen on multiple channels
// const channelsToListen = ['user_channel', 'profile_channel']; // Example for multiple channels

// --- Reactive Changes Source ---
// Use a Subject to push updates whenever changes occur
const changesSubject = new Subject<any>(); // Subject that emits the updated 'changes' object

// --- Debounced Observable ---
// Create an observable from the Subject and apply the debounceTime operator
// This observable will emit the latest 'changes' object only after 500ms of inactivity
// const debouncedChanges$ = changesSubject.pipe(
//     debounceTime(500) // Debounce for 500 milliseconds
// );

// // --- Subscribe to the Debounced Observable ---
// // This subscription will react to the debounced emissions
//  debouncedChanges$.subscribe({
//     next: (value) => {
//         console.log('Debounced changes observed:', value);
//         // --- Implement your logic here to react to debounced changes ---
//         // This is where you would perform actions based on the collected changes,
//         // e.g., update a cache, send a batched update to a client, etc.
//         console.log('User changes:', value.user);
//         console.log('Profile changes:', value.profile);
//         // Clear the collected changes after processing if needed
//         // changes.user = [];
//         // changes.profile = [];
//     },
//     error: (err) => console.error('Error in debounced changes observable:', err),
//     // complete: () => console.log('Debounced changes observable completed'), // Subjects typically don't complete
// });
// --- End Debounced Observable Setup ---


// --- Object to accumulate changes ---
// This object will temporarily hold changes before they are emitted by the debounced observable
// You might want to structure this based on how you want to process batched updates
export const changes: { user: any[], profile: any[] } = {
    user: [],
    profile: []
};


// Function to initialize the SQLite database and table
async function initializeSqliteDb() {
    console.log(`Initializing SQLite database at ${sqliteDbPath}`);
    db = await open({
        filename: sqliteDbPath,
        driver: sqlite3.Database,
    });

    // Create a table to store the last processed event ID if it doesn't exist
    await db.exec(`
    CREATE TABLE IF NOT EXISTS listener_state (
      key TEXT PRIMARY KEY,
      last_event_id INTEGER
    );
  `);
    console.log('SQLite database initialized.');
}

// Function to get the last processed event ID from SQLite
async function getLastProcessedEventId(): Promise<number> {
    try {
        const row = await db.get('SELECT last_event_id FROM listener_state WHERE key = ?', ['lastProcessedEventId']);
        return row ? row.last_event_id : 0; // Return the stored ID or 0 if not found
    } catch (error) {
        console.error('Error fetching last processed event ID from SQLite:', error);
        return 0; // Return 0 in case of error to attempt catch-up from the beginning
    }
}

// Function to save the last processed event ID to SQLite
async function saveLastProcessedEventId(eventId: number): Promise<void> {
    try {
        // Use INSERT OR REPLACE to handle both initial insertion and updates
        await db.run(
            'INSERT OR REPLACE INTO listener_state (key, last_event_id) VALUES (?, ?)',
            ['lastProcessedEventId', eventId]
        );
        // console.log(`Saved last processed event ID: ${eventId} to SQLite.`); // Optional: log success
    } catch (error) {
        console.error('Error saving last processed event ID to SQLite:', error);
        // Implement retry logic or alert mechanism if saving fails
    }
}


// Function to connect to the PostgreSQL database and set up the listener
async function connectAndListen() {
    console.log('Attempting to connect to PostgreSQL database...');
    const pgClient = new Client(pgConfig);

    try {
        await pgClient.connect();
        console.log('Connected to PostgreSQL database.');

        // --- Durability: Catch up on missed events ---
        const lastId = await getLastProcessedEventId();
        console.log(`Last processed event ID: ${lastId}`);

        // Query the event_log table for events that occurred since the last processed ID
        // Ensure your event_log table includes table_name and operation
        const catchUpQuery = `SELECT id, table_name, row_id, operation, payload FROM event_log WHERE id > $1 ORDER BY id ASC`;
        const catchUpResult = await pgClient.query(catchUpQuery, [lastId]);

        console.log(`Found ${catchUpResult.rows.length} missed events.`);

        // Process missed events
        for (const event of catchUpResult.rows) {
            console.log(`Processing missed event (ID: ${event.id}):`, event);
            // --- Implement your event processing logic here ---
            // This should handle events from 'user' and 'profile' tables
            await processEvent(event); // Use a dedicated function for processing

            // Update last processed ID after successfully processing each event
            await saveLastProcessedEventId(event.id);
        }
        if (catchUpResult.rows.length > 0) {
            console.log('Finished processing missed events.');
        }
        // --- End Durability Catch-up ---


        // Start listening for new notifications
        // If listening on multiple channels:
        // for (const channel of channelsToListen) {
        //   await pgClient.query(`LISTEN ${channel}`);
        //   console.log(`Listening on channel "${channel}"`);
        // }
        // If listening on a single channel for all updates:
        await pgClient.query(`LISTEN ${channelName}`);
        console.log(`Listening on channel "${channelName}"`);


        // Handle incoming notifications
        pgClient.on('notification', async (msg) => {
            console.log('Received notification:', msg);

            try {
                const payload = JSON.parse(msg.payload || '{}');
                const eventId = payload.event_id; // Get the event ID from the payload

                if (eventId === undefined) {
                    console.warn('Received notification without event_id in payload, skipping:', payload);
                    return;
                }

                // Ensure we don't re-process an event we just caught up on (belt-and-suspenders)
                const currentLastId = await getLastProcessedEventId();
                if (eventId <= currentLastId) {
                    console.log(`Received old notification for event ID ${eventId}, skipping.`);
                    return;
                }


                // --- Implement your real-time event processing logic here ---
                // This should process the event data from the payload
                console.log(`Processing real-time event (ID: ${eventId}):`, payload);
                await processEvent(payload); // Use the same processing function


                // After successfully processing the notification, save the event ID
                await saveLastProcessedEventId(eventId);
                console.log(`Successfully processed event ID: ${eventId}`);

            } catch (error) {
                console.error('Error processing notification:', error);
                // Implement robust error handling and potentially retry logic for processing
            }
        });

        // Handle PostgreSQL connection errors
        pgClient.on('error', (err) => {
            console.error('PostgreSQL database connection error:', err);
            // Attempt to reconnect after a delay
            pgClient.end(); // Close the faulty connection
            // Close SQLite connection gracefully before attempting reconnect if needed
            // db.close(); // Consider how to handle SQLite connection on PG errors
            setTimeout(connectAndListen, 5000); // Retry after 5 seconds
        });

        // Handle PostgreSQL connection end (e.g., server restart, manual disconnect)
        pgClient.on('end', () => {
            console.warn('PostgreSQL database connection ended.');
            // Attempt to reconnect after a delay
            // db.close(); // Consider how to handle SQLite connection on PG end
            setTimeout(connectAndListen, 5000); // Retry after 5 seconds
        });


    } catch (err) {
        console.error('Failed to connect to PostgreSQL database:', err);
        // Attempt to reconnect after a delay if connection fails initially
        // db.close(); // Consider how to handle SQLite connection on initial PG connection failure
        setTimeout(connectAndListen, 5000); // Retry after 5 seconds
    }
}

// --- Event Processing Function ---
// This function contains the logic for handling events from different tables/operations.
// It's called for both missed events during catch-up and real-time notifications.
async function processEvent(event: {
    table: string; id?: number; table_name: string; row_id: string; operation: string; payload: any
}) {
    // Ensure table_name is set correctly from either 'table_name' or 'table' in the payload
    if (!event.table_name && event.payload && event.payload.table) {
        event.table_name = event.payload.table;
    } else if (!event.table_name && event.table) { // Handle if 'table' is a direct property of event
        event.table_name = event.table;
    }


    console.log(`Processing event from table: ${event.table_name}, operation: ${event.operation}, row ID: ${event.row_id}`);
    // console.log('Event Payload:', event.payload); // Log full payload if needed

    switch (event.table_name) {
        case 'user':
            console.log('Handling User table change.');
            // Accumulate user changes
            changes.user.push(event);
            break;
        case 'profile':
            console.log('Handling Profile table change.');
            // Accumulate profile changes
            changes.profile.push(event);
            break;
        // Add cases for other tables you are monitoring
        default:
            console.warn(`Received event for unhandled table: ${event.table_name}`);
            break;
    }

    // --- Push the accumulated changes to the Subject ---
    // This will trigger the debounced observable if no new changes are pushed within the debounceTime
    changesSubject.next(changes);

    // Simulate asynchronous processing if needed
    // await new Promise(resolve => setTimeout(resolve, 100)); // Example delay
}


// Start the SQLite database and then the PostgreSQL listener
async function startListener() {
    await initializeSqliteDb();
    connectAndListen();
}

startListener();
