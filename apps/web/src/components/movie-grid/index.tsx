import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { PopulateTimelinesMoviesInput } from "../../gql/graphql";

type Props = {
  movies: PopulateTimelinesMoviesInput[];
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
    field: "realisateur",
    headerName: "realisateur",
    width: 150,
  },
  {
    field: "runningTime",
    headerName: "runningTime",
    width: 150,
  },
  {
    field: "posterPath",
    headerName: "posterPath",
    width: 150,
  },
];
function MovieGrid({ movies }: Props) {
  return (
    <DataGrid
      columns={cols}
      getRowId={(movie) => movie.movieSlug}
      rows={movies}
      pageSize={10}
    />
  );
}

export default MovieGrid;
