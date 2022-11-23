import { objectType } from "nexus";
import {
  enumType,
  extendType,
  list,
  nonNull,
  ObjectDefinitionBlock,
  SubscriptionBuilder,
} from "nexus/dist/core";
import { IsEqual } from "nexus/dist/typeHelpersInternal";
import { UserRole as PrimsaUserRole } from "@prisma/client";
export const UserRole = enumType({
  name: "UserRole",
  members: PrimsaUserRole,
});
export const User = objectType({
  name: "User",
  definition: function (t: ObjectDefinitionBlock<"User">): void {
    t.int("id");
    t.string("username");
    t.field("role", {
      type: nonNull(UserRole),
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition: function (
    t: IsEqual<"Query", "Subscription"> extends true
      ? SubscriptionBuilder
      : ObjectDefinitionBlock<"Query">
  ): void {
    t.field("users", {
      type: nonNull(list(User)),
      resolve: async (_parent, _args, { prisma }, _info) => {
        const users = await prisma.user.findMany();
        return users;
      },
    });
  },
});
