import { gql, useQuery } from "@apollo/client";
import { Button } from "ui";
import { EventsQuery } from "../src/gql/graphql";
export default function Web() {
  const { data, loading, error } = useQuery<EventsQuery>(events);

  return (
    <div>
      <h1>{data?.events.map((e) => e.session.id)}</h1>
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
