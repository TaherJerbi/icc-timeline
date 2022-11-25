import { EventType, Movie, Session, SessionType } from "@prisma/client";
import { inputObjectType, list, nonNull, queryType } from "nexus";

export const populateTimelinesInput = inputObjectType({
  name: "populateTimelinesInput",
  definition(t) {
    t.field("title", { type: nonNull("String") });
    t.field("type", { type: nonNull("SessionType") });
    t.field("runningTime", { type: "Int" });
    t.field("startTime", { type: nonNull("DateTime") });
    t.field("endTime", { type: nonNull("DateTime") });
    t.field("salle", { type: nonNull("String") });
    t.field("description", { type: nonNull("String") });
    t.field("realisateur", { type: "String" });
    t.field("posterPath", { type: "String" });
    t.field("movieSlug", { type: "String" });
  },
});

type MovieInfo = Pick<
  Movie,
  | "movieSlug"
  | "title"
  | "realisateur"
  | "runningTime"
  | "posterPath"
  | "description"
>;

export const Query = queryType({
  definition(t) {
    t.nonNull.field("populateTimelines", {
      type: list(nonNull("Timeline")),
      args: {
        sessionsInput: nonNull(list(nonNull(populateTimelinesInput))),
      },
      async resolve(_, { sessionsInput }, { prisma }, _info) {
        const timelinesInput: Record<string, typeof sessionsInput> = {};
        const movieMap = new Map<string, MovieInfo>();

        sessionsInput.forEach((session: typeof sessionsInput[number]) => {
          if (timelinesInput?.[session.salle] === undefined) {
            timelinesInput[session.salle] = [session];
          } else {
            timelinesInput[session.salle].push(session);
          }
          if (
            session.type === SessionType.DEBAT ||
            session.type === SessionType.PROJECTION
          ) {
            if (
              !session.movieSlug ||
              !session.realisateur ||
              !session.runningTime
            )
              throw new Error(
                `missing properties on movie ${JSON.stringify(
                  session,
                  null,
                  2
                )}`
              );
            movieMap.set(session.movieSlug, {
              movieSlug: session.movieSlug,
              posterPath: session.posterPath ?? null,
              realisateur: session.realisateur,
              runningTime: session.runningTime,
              title: session.title,
              description: session.description,
            });
          }
        });

        const movies = await prisma.movie.createMany({
          data: Array.from(movieMap.values()),
        });
        // create timelines
        const timelines = await prisma.$transaction(
          Object.keys(timelinesInput).map((salle) => {
            return prisma.timeline.create({
              data: {
                sessions: {
                  createMany: {
                    data: timelinesInput[salle].map(
                      (session: typeof sessionsInput[number]) => {
                        return {
                          startTime: session.startTime,
                          endTime: session.endTime,
                          originalEndTime: session.endTime,
                          originalStartTime: session.startTime,
                          title: session.title,
                          description: session.description,
                          type: session.type,
                          movieSlug: session.movieSlug ?? undefined,
                        };
                      }
                    ),
                  },
                },
                salle: {
                  create: {
                    name: timelinesInput[salle][0].salle,
                  },
                },
              },
              include: {
                sessions: true,
              },
            });
          })
        );
        // create events and movies
        const sessions = await prisma.$transaction(
          timelines
            .map((timeline: typeof timelines[number]) =>
              timeline.sessions.map((session: Session) => {
                const movieInfo =
                  session.movieSlug && movieMap.get(session.movieSlug);

                return prisma.session.update({
                  where: {
                    id: session.id,
                  },
                  data: {
                    events: {
                      createMany: {
                        data: [
                          {
                            time: session.startTime,
                            type: EventType.START,
                          },
                          {
                            time: session.endTime,
                            type: EventType.END,
                          },
                        ],
                      },
                    },
                  },
                });
              })
            )
            .flat()
        );
        return timelines;
      },
    });
  },
});
