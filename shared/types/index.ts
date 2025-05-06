import { Prisma, PrismaClient } from "../../prisma/client";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken"; // <-- Import the library

const userWithProfileAndOperatorInclude = {
  include: {
    activeProfile: {
      include: {
        operator: true, // Include the operator related to the profile
        bank: true, // Include the bank related to the profile
      },
    },
    operator: true, // Include the direct operator relation on User if it exists
  },
};

// Use Prisma.UserGetPayload with the include structure to get the type
export type User = Prisma.UserGetPayload<typeof userWithProfileAndOperatorInclude>;

export interface CashflowJWTProfile extends JwtPayload {
  userId: string;
  activeProfileId: string;
  operatorId: string;
  phpId: string;
  role: string;
  iss?: string;
  sub?: string;
}
