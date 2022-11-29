import { ChangeEvent, useState } from "react";
import Papa from "papaparse";
import { z } from "zod";
import { gql, useMutation } from "@apollo/client";
import {
  PopulateTimelinesMoviesInput,
  PopulateTimelinesMutation,
  PopulateTimelinesMutationVariables,
  PopulateTimelinesSessionsInput,
  SessionType,
} from "@gql-types/graphql";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import notion_time_to_dates from "@utils/notion_time_to_dates";
import MovieGrid from "@components/movie-grid";
import SessionsGrid from "@components/sessions-grid";

const movieSchema = z.array(
  z.object({
    description: z.string(),
    movieSlug: z.string(),
    posterPath: z.string().optional(),
    realisateur: z.string(),
    runningTime: z.number(),
    title: z.string(),
  })
);
const sessionSchema = z.array(
  z.object({
    description: z.string(),
    endTime: z.date(),
    movieSlug: z.string().optional(),
    salle: z.string(),
    startTime: z.date(),
    title: z.string(),
    type: z.nativeEnum(SessionType),
  })
);

type SessionsCSV = Omit<
  PopulateTimelinesSessionsInput,
  "startTime" | "endTime"
> & { time: string };

function PopulatePage() {
  const [populateTimelines, populateTimelinesResult] = useMutation<
    PopulateTimelinesMutation,
    PopulateTimelinesMutationVariables
  >(PopulatePage.mutations.populateTimelines);
  const [parsedMovies, setParsedMovies] =
    useState<PopulateTimelinesMoviesInput[]>();
  const [parsedSessions, setParsedSessions] =
    useState<PopulateTimelinesSessionsInput[]>();

  const moviesChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    if (!event.target.files) return;

    try {
      Papa.parse<PopulateTimelinesMoviesInput>(event.target.files[0], {
        header: true,
        transform(value, field) {
          switch (field) {
            case "runningTime":
              return +value;
            default:
              return value;
          }
        },
        skipEmptyLines: true,
        complete: function (results) {
          try {
            console.log(results);
            const data = movieSchema.parse(results.data);

            setParsedMovies(data);
          } catch (e) {
            console.error(e);
          }
        },
      });
    } catch (e) {
      console.error(e);
    }
  };
  const sessionsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    if (!event.target.files) return;

    try {
      Papa.parse<SessionsCSV>(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          try {
            console.log(results);
            const transormedData = results.data.map((csv_session) => {
              const { startTime, endTime } = notion_time_to_dates(
                csv_session.time
              );
              return {
                ...csv_session,
                time: undefined,
                startTime,
                endTime,
              };
            });
            const data = sessionSchema.parse(transormedData);

            setParsedSessions(data);
          } catch (e) {
            console.error(e);
          }
        },
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <h1>Populate Timelines</h1>
      <Box
        sx={{
          display: "flex",
          width: "100vw",
        }}
      >
        <Box
          sx={{
            flexGrow: "1",
            marginRight: 4,
          }}
        >
          <h2>Movies CSV</h2>
          <input
            type={"file"}
            onChange={moviesChangeHandler}
            accept={".csv"}
            size={1}
            name={"movies"}
          />

          <Box sx={{ height: 400, width: "100%" }}>
            {parsedMovies && <MovieGrid movies={parsedMovies} />}
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: "2",
          }}
        >
          <h2>Sessions CSV</h2>
          <input
            type={"file"}
            onChange={sessionsChangeHandler}
            accept={".csv"}
            size={1}
            name={"sessions"}
          />
          <Box sx={{ height: 400, width: "100%" }}>
            {parsedSessions && <SessionsGrid sessions={parsedSessions} />}
          </Box>
        </Box>
      </Box>
      <LoadingButton
        disabled={!parsedMovies || !parsedSessions}
        loading={populateTimelinesResult.loading}
        onClick={() => {
          if (!!parsedMovies && !!parsedSessions) {
            populateTimelines({
              variables: {
                moviesInput: parsedMovies,
                sessionsInput: parsedSessions,
              },
            });
          }
        }}
      >
        Send Data
      </LoadingButton>
    </div>
  );
}

PopulatePage.mutations = {
  populateTimelines: gql`
    mutation PopulateTimelines(
      $moviesInput: [PopulateTimelinesMoviesInput!]!
      $sessionsInput: [PopulateTimelinesSessionsInput!]!
    ) {
      populateTimelines(
        moviesInput: $moviesInput
        sessionsInput: $sessionsInput
      ) {
        id
        salle {
          name
          id
        }
        sessions {
          id
          movie {
            movieSlug
            title
            description
            runningTime
          }
          movieSlug
          startTime
          endTime
          title
          description
        }
      }
    }
  `,
};

export default PopulatePage;
