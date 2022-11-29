/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `BigInt` scalar type represents non-fractional signed whole numeric values.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
   */
  BigInt: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Bytes: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** An arbitrary-precision Decimal type */
  Decimal: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: any;
};

export enum DelayActionType {
  Contain = 'CONTAIN',
  Propagate = 'PROPAGATE'
}

export type DelayLog = {
  __typename?: 'DelayLog';
  action: DelayActionType;
  delayEnd: Scalars['DateTime'];
  delayStart: Scalars['DateTime'];
  event: Event;
  eventId: Scalars['String'];
  id: Scalars['ID'];
};

export type Event = {
  __typename?: 'Event';
  confirmed: Scalars['Boolean'];
  delayLog?: Maybe<DelayLog>;
  id: Scalars['ID'];
  session: Session;
  sessionId: Scalars['String'];
  time: Scalars['DateTime'];
  type: EventType;
};

export enum EventType {
  End = 'END',
  Start = 'START'
}

export type Movie = {
  __typename?: 'Movie';
  description: Scalars['String'];
  id: Scalars['ID'];
  movieSlug: Scalars['String'];
  posterPath?: Maybe<Scalars['String']>;
  realisateur: Scalars['String'];
  runningTime: Scalars['Int'];
  sessions: Array<Session>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteTimeline?: Maybe<Timeline>;
  populateTimelines: Array<Timeline>;
};


export type MutationDeleteTimelineArgs = {
  timelineId: Scalars['String'];
};


export type MutationPopulateTimelinesArgs = {
  moviesInput: Array<PopulateTimelinesMoviesInput>;
  sessionsInput: Array<PopulateTimelinesSessionsInput>;
};

export type PopulateTimelinesMoviesInput = {
  description: Scalars['String'];
  movieSlug: Scalars['String'];
  posterPath?: InputMaybe<Scalars['String']>;
  realisateur: Scalars['String'];
  runningTime: Scalars['Int'];
  title: Scalars['String'];
};

export type PopulateTimelinesSessionsInput = {
  description: Scalars['String'];
  endTime: Scalars['DateTime'];
  movieSlug?: InputMaybe<Scalars['String']>;
  salle: Scalars['String'];
  startTime: Scalars['DateTime'];
  title: Scalars['String'];
  type: SessionType;
};

export type Query = {
  __typename?: 'Query';
  events: Array<Event>;
  timelines: Array<Timeline>;
  users: Array<User>;
};

export type Salle = {
  __typename?: 'Salle';
  id: Scalars['ID'];
  name: Scalars['String'];
  timeline?: Maybe<Timeline>;
};

export type Session = {
  __typename?: 'Session';
  delay: Scalars['Int'];
  delayed: Scalars['Boolean'];
  description: Scalars['String'];
  endTime: Scalars['DateTime'];
  events: Array<Event>;
  id: Scalars['ID'];
  movie?: Maybe<Movie>;
  movieSlug?: Maybe<Scalars['String']>;
  originalEndTime: Scalars['DateTime'];
  originalStartTime: Scalars['DateTime'];
  startTime: Scalars['DateTime'];
  timeline: Timeline;
  timelineId: Scalars['String'];
  title: Scalars['String'];
  type: SessionType;
};

export enum SessionType {
  Debat = 'DEBAT',
  Other = 'OTHER',
  Pause = 'PAUSE',
  Projection = 'PROJECTION'
}

export type Timeline = {
  __typename?: 'Timeline';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  salle: Salle;
  salleId: Scalars['String'];
  sessions: Array<Session>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  role: UserRole;
  username: Scalars['String'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Public = 'PUBLIC',
  Technician = 'TECHNICIAN'
}

export type PopulateTimelinesMutationVariables = Exact<{
  moviesInput: Array<PopulateTimelinesMoviesInput> | PopulateTimelinesMoviesInput;
  sessionsInput: Array<PopulateTimelinesSessionsInput> | PopulateTimelinesSessionsInput;
}>;


export type PopulateTimelinesMutation = { __typename?: 'Mutation', populateTimelines: Array<{ __typename?: 'Timeline', id: string, salle: { __typename?: 'Salle', name: string, id: string }, sessions: Array<{ __typename?: 'Session', id: string, movieSlug?: string | null, startTime: any, endTime: any, title: string, description: string, movie?: { __typename?: 'Movie', movieSlug: string, title: string, description: string, runningTime: number } | null }> }> };

export type TimelinesTableQueryVariables = Exact<{ [key: string]: never; }>;


export type TimelinesTableQuery = { __typename?: 'Query', timelines: Array<{ __typename?: 'Timeline', id: string, createdAt: any, salle: { __typename?: 'Salle', name: string }, sessions: Array<{ __typename?: 'Session', title: string, startTime: any, endTime: any, events: Array<{ __typename?: 'Event', confirmed: boolean, type: EventType, time: any, delayLog?: { __typename?: 'DelayLog', id: string, delayStart: any, delayEnd: any } | null }>, movie?: { __typename?: 'Movie', movieSlug: string, title: string } | null }> }> };


export const PopulateTimelinesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PopulateTimelines"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moviesInput"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PopulateTimelinesMoviesInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionsInput"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PopulateTimelinesSessionsInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"populateTimelines"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"moviesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moviesInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"sessionsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"salle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"movie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movieSlug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"runningTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"movieSlug"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<PopulateTimelinesMutation, PopulateTimelinesMutationVariables>;
export const TimelinesTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TimelinesTable"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timelines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"salle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"delayLog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"delayStart"}},{"kind":"Field","name":{"kind":"Name","value":"delayEnd"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"movie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movieSlug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TimelinesTableQuery, TimelinesTableQueryVariables>;