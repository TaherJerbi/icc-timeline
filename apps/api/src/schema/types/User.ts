import { objectType } from "nexus";
import { enumType, extendType, list, nonNull } from "nexus/dist/core";
import { User, UserRole } from "nexus-prisma";

export const NexusUserRole = enumType({
  name: UserRole.name,
  description: UserRole.description,
  members: UserRole.members,
});
export const NexusUser = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.id);
    t.field(User.role);
    t.field(User.username);
  },
});

export const NexusUserQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("users", {
      type: nonNull(list(nonNull("User"))),
      resolve: async (_parent, _args, { prisma }, _info) => {
        const users = await prisma.user.findMany();
        return users;
      },
    });
  },
});
