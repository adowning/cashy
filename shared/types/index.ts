import { Prisma, PrismaClient } from "../../prisma/client";

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
