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
  id: Scalars['ID'];
  posterPath?: Maybe<Scalars['String']>;
  realisateur: Scalars['String'];
  runningTime: Scalars['Int'];
  sessions: Array<Session>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  events: Array<Event>;
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
  expectedLength: Scalars['Int'];
  id: Scalars['ID'];
  movie?: Maybe<Movie>;
  movieId?: Maybe<Scalars['String']>;
  originalStartTime: Scalars['DateTime'];
  startTime: Scalars['DateTime'];
  timeline: Timeline;
  timelineId: Scalars['String'];
  title: Scalars['String'];
};

export enum SessionType {
  Debat = 'DEBAT',
  Other = 'OTHER',
  Pause = 'PAUSE',
  Projection = 'PROJECTION'
}

export type Timeline = {
  __typename?: 'Timeline';
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

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: string, session: { __typename?: 'Session', id: string, events: Array<{ __typename?: 'Event', id: string, time: any }> } }> };


export const EventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EventsQuery, EventsQueryVariables>;