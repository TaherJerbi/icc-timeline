import StatusCircle, { Status } from "@components/status-circle";
import { Event, EventType, TimelinesTableQuery } from "@gql-types/graphql";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type Props = {
  timeline: TimelinesTableQuery["timelines"][number];
};

function LegendeStatus({ status, text }: { status: Status; text: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <StatusCircle status={status} />
      <Typography
        sx={{
          paddingLeft: 2,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

export function eventToStatus(
  event?: Pick<Event, "confirmed" | "time">
): Status | undefined {
  if (!event) return undefined;
  if (event.confirmed) return Status.CONFIRMED;
  if (new Date(event.time).getTime() > Date.now()) return Status.DELAYED;

  return Status.NOT_CONFIRMED;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("fr-FR", {
    hour: "numeric",
    minute: "2-digit",
  });
}
function TimelineGrid({ timeline }: Props) {
  return (
    <div>
      <h3>Salle : {timeline.salle.name}</h3>
      <p>Created At : {timeline.createdAt}</p>
      <LegendeStatus status={Status.CONFIRMED} text={"Confirmed"} />
      <LegendeStatus status={Status.DELAYED} text={"Delayed"} />
      <LegendeStatus status={Status.NOT_CONFIRMED} text={"Not Confirmed"} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>start</TableCell>
              <TableCell>end</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeline.sessions.map((session) => (
              <TableRow>
                <TableCell>
                  <StatusCircle
                    status={eventToStatus(
                      session.events.find(
                        (event) => event.type === EventType.Start
                      )
                    )}
                  />
                </TableCell>
                <TableCell>
                  <StatusCircle
                    status={eventToStatus(
                      session.events.find(
                        (event) => event.type === EventType.End
                      )
                    )}
                  />
                </TableCell>
                <TableCell>{formatTime(new Date(session.startTime))}</TableCell>
                <TableCell>{formatTime(new Date(session.endTime))}</TableCell>
                <TableCell>{session.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TimelineGrid;
