import { gql } from "@apollo/client";
import { Button } from "ui";
import { EventsQuery } from "../src/gql/graphql";
export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <Button />
    </div>
  );
}

const events = gql`
  query Events {
    events {
      id
      session {
        id
        events {
          id
          time
        }
      }
    }
  }
`;
