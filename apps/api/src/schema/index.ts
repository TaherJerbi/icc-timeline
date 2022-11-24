// api/schema.ts
import { makeSchema } from "nexus";
import { join } from "path";
import NexusPrismaScalars from "nexus-prisma/scalars";
import * as Types from "./types";

export const schema = makeSchema({
  types: [Types, NexusPrismaScalars],
  contextType: {
    module: require.resolve("../Context.ts"),
    export: "Context",
  },
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"), // 3
  },
});
