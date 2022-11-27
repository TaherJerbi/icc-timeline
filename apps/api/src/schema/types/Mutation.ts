import { EventType, Movie, Session, SessionType } from "@prisma/client";
import { inputObjectType, list, mutationType, nonNull, queryType } from "nexus";

export const PopulateTimelinesSessionsInput = inputObjectType({
  name: "PopulateTimelinesSessionsInput",
  definition(t) {
    t.field("title", { type: nonNull("String") });
    t.field("type", { type: nonNull("SessionType") });
    t.field("startTime", { type: nonNull("DateTime") });
    t.field("endTime", { type: nonNull("DateTime") });
    t.field("salle", { type: nonNull("String") });
    t.field("description", { type: nonNull("String") });
    t.field("movieSlug", { type: "String" });
  },
});
export const PopulateTimelinesMoviesInput = inputObjectType({
  name: "PopulateTimelinesMoviesInput",
  definition(t) {
    t.field("title", { type: nonNull("String") });
    t.field("runningTime", { type: nonNull("Int") });
    t.field("description", { type: nonNull("String") });
    t.field("realisateur", { type: nonNull("String") });
    t.field("posterPath", { type: "String" });
    t.field("movieSlug", { type: nonNull("String") });
  },
});

export const Mutation = mutationType({
  definition(t) {
    t.nonNull.field("populateTimelines", {
      type: list(nonNull("Timeline")),
      args: {
        sessionsInput: nonNull(list(nonNull(PopulateTimelinesSessionsInput))),
        moviesInput: nonNull(list(nonNull(PopulateTimelinesMoviesInput))),
      },
      async resolve(_, { sessionsInput, moviesInput }, { prisma }, _info) {
        const timelinesInput: Record<string, typeof sessionsInput> = {};

        sessionsInput.forEach((session: typeof sessionsInput[number]) => {
          if (timelinesInput?.[session.salle] === undefined) {
            timelinesInput[session.salle] = [session];
          } else {
            timelinesInput[session.salle].push(session);
          }
        });

        // create movies
        const movies = await prisma.movie.createMany({
          data: moviesInput,
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
                          movieSlug: session.movieSlug?.length
                            ? session.movieSlug
                            : undefined,
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
