import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { PopulateTimelinesSessionsInput } from "../../gql/graphql";

type Props = {
  sessions: PopulateTimelinesSessionsInput[];
};
const cols: GridColDef[] = [
  {
    field: "movieSlug",
    headerName: "movieSlug",
    width: 90,
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "salle",
    headerName: "salle",
    width: 150,
  },
];
function SessionsGrid({ sessions }: Props) {
  return (
    <DataGrid
      columns={cols}
      getRowId={(session: PopulateTimelinesSessionsInput) =>
        session.title + session.type + session.startTime
      }
      rows={sessions}
      pageSize={10}
    />
  );
}

export default SessionsGrid;
