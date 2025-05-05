import { NETWORK_CONFIG } from "shared/types/NetworkCfg";
import { User } from "shared/";
import db from "../db/prisma";
import { decodeToken, generateAccessToken } from "../libs/jwt";
import type { BunRequest } from "bun";

// Auth utility stubs - TODO: Implement properly
const validateUser = async (username: string, password: string) => {
  // const u = await db.user.findMany({});
  const user = await db.user.findFirst({
    where: { username: username },
    include: { activeProfile: { include: { operator: true } } },
  });

  if (user === null) {
    return null;
  }
  const isPasswordValid = await Bun.password.verify(password, user.passwordHash!);
  // const isPasswordValid = await Bun.password.verify("asdfasdf", user.passwordHash!);
  if (isPasswordValid === false) {
    return null;
  }
  return user;
  return null;
};
export async function createUserWithProfileAndAccount(userData: {
  username: string;
  // email: string
  password: string;
  // name?: string
  // avatar?: string
}) {
  return db.$transaction(async (prisma) => {
    let defaultOperator: any = await db.operator.findFirst();
    let defaultOwnerUser: any = null;
    let defaultBank: any = null;
    let hashedPassword = await Bun.password.hash(userData.password);
    // Check if any operators exist
    if (!defaultOperator) {
      console.log("No operators found. Creating a default owner, operator, and bank.");

      // Create a default owner user
      defaultOwnerUser = await db.user.create({
        data: {
          username: "default_operator_owner",
          email: "owner@example.com", // Use a placeholder or generate dynamically
          passwordHash: "hashed_password_for_owner", // Generate and hash a secure password
          name: "Default Operator Owner",
          status: "ACTIVE", // Set a default status
          // Add any other required fields for User
        },
      });

      // Create a default operator
      defaultOperator = await db.operator.create({
        data: {
          name: "Default Operator",
          slug: "default-operator", // Generate a unique slug
          owner: {
            connect: {
              id: defaultOwnerUser.id,
            },
          },
          isActive: true, // Set default status
          // Add any other required fields for Operator
        },
      });

      // Create a default bank for the new operator
      // defaultBank = await db.bank.create({
      //   data: {
      //     name: "Default Bank",
      //     currency: "USD", // Set a default currency
      //     operatorId: defaultOperator.id,
      //     isActive: true,
      //   },
      // });

      console.log(
        `Created default operator: ${defaultOperator.name} and owner: ${defaultOwnerUser.username} and bank: ${defaultBank.name}`
      );
    } else {
      // If operators exist, find a default bank linked to one of them
      // Assuming the first found operator has at least one bank, or find a bank directly
      // defaultBank = await db.bank.findFirst({
      //   where: {
      //     operatorId: defaultOperator.id, // Find a bank linked to the found operator
      //   },
      // });
      // if (!defaultBank) {
      //   // If no bank is found for the existing operator, create one
      //   defaultBank = await db.bank.create({
      //     data: {
      //       name: "Default Bank",
      //       currency: "USD", // Set a default currency
      //       operatorId: defaultOperator.id,
      //       isActive: true,
      //     },
      //   });
      //   console.log(`Created a default bank for existing operator: ${defaultOperator.name}`);
      // }
    }

    // Create the main user
    const newUser = await db.user.create({
      data: {
        username: userData.username,
        email: `${userData.username}@asdf.com`,
        passwordHash: hashedPassword,
        name: userData.username,
        avatar: `blahblah.username.webp`,
        status: "ACTIVE", // Set a default status
        balance: 0, // Initialize balance as Decimal
        // Set activeProfileId later after creating the profile if needed, or handle separately
        // Add any other required fields for User
      },
    });

    // Create the profile linked to the new user and the default operator/bank
    const newProfile = await db.profile.create({
      data: {
        // profileNumber: profileData.profileNumber,
        userId: newUser.id,
        shopId: defaultOperator.id, // Link to the default operator
        // bankId: defaultBank.id, // Link to the default bank
        // balance: profileData.balance ?? 0, // Use provided balance or default to 0 (Int)
        // xpEarned: profileData.xpEarned ?? 0,
        // isActive: profileData.isActive ?? true,
        // lastPlayed: profileData.lastPlayed,
        // phpId: profileData.phpId,
        // Add any other required fields for Profile
      },
    });

    // Optionally update the user's activeProfileId to the newly created profile's ID
    await db.user.update({
      where: { id: newUser.id },
      data: {
        activeProfileId: newProfile.id,
      },
    });

    // Create the account linked to the new user
    const newAccount = await db.account.create({
      data: {
        accountId: newUser.id,
        providerId: "credential",
        userId: newUser.id,
        // accessToken: accountData.accessToken,
        // refreshToken: accountData.refreshToken,
        // idToken: accountData.idToken,
        // accessTokenExpiresAt: accountData.accessTokenExpiresAt,
        // refreshTokenExpiresAt: accountData.refreshTokenExpiresAt,
        // scope: accountData.scope,
        password: hashedPassword, // Again, consider security implications
        createdAt: new Date(),
        updatedAt: new Date(),
        // Add any other required fields for Account
      },
    });

    console.log(
      `Created user: ${newUser.username}, profile: ${newProfile.id}, and account for provider: ${newAccount.id}`
    );

    return {
      user: newUser,
      profile: newProfile,
      account: newAccount,
      operator: defaultOperator, // Return the operator used
      ownerUser: defaultOwnerUser, // Return the owner user if created
    };
  });
}

export const getUserFromHeader = async (req: any): Promise<User | null> => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return null;
  }
  const payload = decodeToken(token);
  if (payload.id === null || payload.id === undefined) return null;
  const user: any = await db.user.findUnique({
    where: { id: payload.id },
    include: { vipInfo: true, activeProfile: { include: { transactions: true } } },
  });

  if (user === null) {
    throw new Error("no user found");
    // return null;
  }
  if (user.activeProfile === null) {
    return null;
  } else {
    user.activeProfile = user.activeProfile[0];
  }
  return user;
};

export const getUserFromToken = async (token: string): Promise<User | null> => {
  if (!token) {
    return null;
  }
  const payload = decodeToken(token);
  if (payload.id === null || payload.id === undefined) return null;
  const user: any = await db.user.findUnique({
    where: { id: payload.id },
    include: { activeProfile: { include: { operator: true } } },
  });

  if (user === null) {
    return null;
  }
  if (user.activeProfile === null) {
    return null;
  }

  return user;
};

export async function me(req: BunRequest) {
  let user;
  user = await getUserFromHeader(req);
  // if (!user) user = await getUserFromToken(req.cookies.token);
  if (user === null) {
    return new Response(JSON.stringify({ message: "Unauthorized", code: 401 }));
  }
  return new Response(JSON.stringify({ user, code: 200 }));
}

// app.post('/auth/register', async (c: Context) => {
export async function register(req: BunRequest) {
  const { username, password } = await req.json();
  const cookies = req.cookies;
  if (username === undefined || password === undefined) {
    return new Response(JSON.stringify({ message: "Missing username or password", code: 402 }));
  }
  const user = await createUserWithProfileAndAccount({
    username,
    password,
  });
  const token = await generateAccessToken(user.user.id);
  cookies.set("cookie", token);
  //@ts-ignore
  delete user.user.passwordHash;
  return new Response(JSON.stringify({ authenticated: true, token, user: user, code: 200 }));
  // }
}

// app.post('/auth/login', async (c: Context) => {
export async function login(req: BunRequest) {
  const { username, password } = await req.json();
  if (username === undefined || password === undefined) {
    return new Response(JSON.stringify({ message: "Missing username or password", code: 401 }), { status: 401 });
  }

  const user = await validateUser(username, password);

  if (user == null) {
    return new Response(JSON.stringify({ message: "Invalid credentials", code: 401 }), { status: 401 });
  }

  const token = generateAccessToken(user.id);

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  };

  return new Response(JSON.stringify({ authenticated: true, token, user, code: 200 }), {
    status: 200,
    headers: {
      "Set-Cookie": `token=${token}; ${Object.entries(cookieOptions)
        .map(([k, v]) => `${k}=${v}`)
        .join("; ")}`,
    },
  });
}
export async function authRoutes(req: BunRequest, route: string) {
  try {
    switch (route) {
      case NETWORK_CONFIG.LOGIN.LOGIN:
        return await login(req);
      case NETWORK_CONFIG.LOGIN.REGISTER:
        return await register(req);
      case NETWORK_CONFIG.LOGIN.ME:
        return await me(req);
      default:
        return false; ///new Response(JSON.stringify({ message: "Route not found", code: 404 }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: `Internal server error: ${error}`, code: 500 }), {
      status: 500,
    });
  }
}

// export default app
