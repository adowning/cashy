import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { Transaction } from '../../server/src/prisma/client';
import { TransactionStatus, TransactionType } from '../../server/src/prisma/client';
import db from '../../server/src/db/prisma';

const TEST_CASHTAG = 'test123';
const TEST_AMOUNT = 100;
const TEST_TRANSACTION_ID = 'D-TEST12345';
const WEBHOOK_SECRET = 'asdfasdfasdfasdf1234xxx';

describe('CashApp Deposit System', () => {
	let testTransaction: Transaction;

	beforeAll(async () => {
		// Create a test profile and user if needed
		// For simplicity, we'll assume a test profile exists with ID 'test-profile'

		// Create a pending deposit transaction
		testTransaction = await db.transaction.create({
			data: {
				type: TransactionType.DEPOSIT,
				amount: TEST_AMOUNT,
				status: TransactionStatus.PENDING,
				cashtag: TEST_CASHTAG,
				profileId: 'test-profile', // Replace with actual test profile ID
				metadata: {
					test: true,
				},
			},
		});
	});

	afterAll(async () => {
		// Clean up test data
		await db.transaction.deleteMany({
			where: {
				metadata: {
					path: ['test'],
					equals: true,
				},
			},
		});
	});

	it('should process deposit email and update transaction', async () => {
		// 1. Create mock email payload
		const emailPayload = {
			from: 'cash@square.com',
			subject: `$${TEST_AMOUNT} from ${TEST_CASHTAG}`,
			raw: `From: cash@square.com
Subject: $${TEST_AMOUNT} from ${TEST_CASHTAG}

Payment from ${TEST_CASHTAG}
Amount: $${TEST_AMOUNT}
Transaction ID: ${TEST_TRANSACTION_ID}
`,
		};

		// 2. Send to email endpoint
		const response = await fetch('http://localhost:8787/cdn-cgi/handler/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(emailPayload),
		});

		expect(response.status).toBe(200);

		// 3. Verify webhook was sent (mock this in a real test environment)
		// In a real test, we'd mock the webhook endpoint to verify it received the expected data

		// 4. Check transaction was updated
		const updatedTransaction = await db.transaction.findUnique({
			where: { id: testTransaction.id },
		});

		expect(updatedTransaction?.status).toBe(TransactionStatus.COMPLETED);
		expect(updatedTransaction?.processedAt).not.toBeNull();
	});
});
