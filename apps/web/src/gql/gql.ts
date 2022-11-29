/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n    mutation PopulateTimelines(\n      $moviesInput: [PopulateTimelinesMoviesInput!]!\n      $sessionsInput: [PopulateTimelinesSessionsInput!]!\n    ) {\n      populateTimelines(\n        moviesInput: $moviesInput\n        sessionsInput: $sessionsInput\n      ) {\n        id\n        salle {\n          name\n          id\n        }\n        sessions {\n          id\n          movie {\n            movieSlug\n            title\n            description\n            runningTime\n          }\n          movieSlug\n          startTime\n          endTime\n          title\n          description\n        }\n      }\n    }\n  ": types.PopulateTimelinesDocument,
    "\n    query TimelinesTable {\n      timelines {\n        id\n        createdAt\n        salle {\n          name\n        }\n        sessions {\n          title\n          startTime\n          endTime\n          events {\n            confirmed\n            type\n            time\n            delayLog {\n              id\n              delayStart\n              delayEnd\n            }\n          }\n          movie {\n            movieSlug\n            title\n          }\n        }\n      }\n    }\n  ": types.TimelinesTableDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation PopulateTimelines(\n      $moviesInput: [PopulateTimelinesMoviesInput!]!\n      $sessionsInput: [PopulateTimelinesSessionsInput!]!\n    ) {\n      populateTimelines(\n        moviesInput: $moviesInput\n        sessionsInput: $sessionsInput\n      ) {\n        id\n        salle {\n          name\n          id\n        }\n        sessions {\n          id\n          movie {\n            movieSlug\n            title\n            description\n            runningTime\n          }\n          movieSlug\n          startTime\n          endTime\n          title\n          description\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation PopulateTimelines(\n      $moviesInput: [PopulateTimelinesMoviesInput!]!\n      $sessionsInput: [PopulateTimelinesSessionsInput!]!\n    ) {\n      populateTimelines(\n        moviesInput: $moviesInput\n        sessionsInput: $sessionsInput\n      ) {\n        id\n        salle {\n          name\n          id\n        }\n        sessions {\n          id\n          movie {\n            movieSlug\n            title\n            description\n            runningTime\n          }\n          movieSlug\n          startTime\n          endTime\n          title\n          description\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query TimelinesTable {\n      timelines {\n        id\n        createdAt\n        salle {\n          name\n        }\n        sessions {\n          title\n          startTime\n          endTime\n          events {\n            confirmed\n            type\n            time\n            delayLog {\n              id\n              delayStart\n              delayEnd\n            }\n          }\n          movie {\n            movieSlug\n            title\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query TimelinesTable {\n      timelines {\n        id\n        createdAt\n        salle {\n          name\n        }\n        sessions {\n          title\n          startTime\n          endTime\n          events {\n            confirmed\n            type\n            time\n            delayLog {\n              id\n              delayStart\n              delayEnd\n            }\n          }\n          movie {\n            movieSlug\n            title\n          }\n        }\n      }\n    }\n  "];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;