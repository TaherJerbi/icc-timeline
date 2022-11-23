// api/server.ts
import { ApolloServer } from "@apollo/server";
import { schema } from "./schema";
import { Context } from "./Context";

export const server = new ApolloServer<Context>({ schema });
