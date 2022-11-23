// api/schema.ts
import { makeSchema } from "nexus";
import { join } from "path";
import { NexusGenFieldTypeNames } from "shared-types";

import * as UserTypes from "./models/User";
export const schema = makeSchema({
  types: UserTypes, // 1
  contextType: {
    module: join(__dirname, "..", "Context.ts"),
    export: "Context",
    alias: "Context",
  },
  outputs: {
    typegen: join(
      __dirname,
      "../../../../packages/shared-types/",
      "nexus-typegen.ts"
    ), // 2
    schema: join(__dirname, "..", "schema.graphql"), // 3
  },
});
