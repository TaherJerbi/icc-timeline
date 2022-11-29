import { gql, useQuery } from "@apollo/client";
import TimelineGrid from "@components/timeline-grid";
import { TimelinesTableQuery } from "@gql-types/graphql";

function TimelinesTables() {
  const { data, loading, error } = useQuery<TimelinesTableQuery>(
    TimelinesTables.queries.timelines
  );
  return (
    <div>
      <h1>Timeline Tables</h1>
      {data?.timelines.map((timeline) => (
        <div>
          <TimelineGrid timeline={timeline} />
        </div>
      ))}
    </div>
  );
}

TimelinesTables.queries = {
  timelines: gql`
    query TimelinesTable {
      timelines {
        id
        createdAt
        salle {
          name
        }
        sessions {
          title
          startTime
          endTime
          events {
            confirmed
            type
            time
            delayLog {
              id
              delayStart
              delayEnd
            }
          }
          movie {
            movieSlug
            title
          }
        }
      }
    }
  `,
};

export default TimelinesTables;
