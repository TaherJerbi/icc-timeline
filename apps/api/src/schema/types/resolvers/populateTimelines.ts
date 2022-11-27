import { EventType, Session } from "@prisma/client";
import { FieldResolver } from "nexus";
import { NexusGenInputs } from "../../../nexus-typegen";

const populateTimelinesResolver: FieldResolver<
  "Mutation",
  "populateTimelines"
> = async (_, { sessionsInput, moviesInput }, { prisma }, _info) => {
  const timelinesInput: Record<string, typeof sessionsInput> = {};

  sessionsInput.forEach((session: typeof sessionsInput[number]) => {
    if (timelinesInput?.[session.salle] === undefined) {
      timelinesInput[session.salle] = [session];
    } else {
      timelinesInput[session.salle].push(session);
    }
  });

  const movies = await prisma.$transaction(
    moviesInput.map(
      (movieInput: NexusGenInputs["PopulateTimelinesMoviesInput"]) =>
        prisma.movie.upsert({
          where: {
            movieSlug: movieInput.movieSlug,
          },
          create: movieInput,
          update: movieInput,
        })
    )
  );
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
};
export default populateTimelinesResolver;
