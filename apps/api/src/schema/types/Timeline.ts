import {
  extendType,
  list,
  mutationType,
  nonNull,
  objectType,
  queryType,
  stringArg,
} from "nexus";
import { Timeline } from "nexus-prisma";

export const NexusTimeline = objectType({
  name: Timeline.$name,
  description: Timeline.$description,
  definition(t) {
    t.field(Timeline.id);
    t.field(Timeline.salle);
    t.field(Timeline.salleId);
    t.field(Timeline.sessions);
    t.field(Timeline.createdAt);
  },
});

export const TimelineQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("timelines", {
      type: nonNull(list(nonNull("Timeline"))),
      async resolve(_, __, { prisma }, ___) {
        return prisma.timeline.findMany();
      },
    });
  },
});

export const TimelineMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteTimeline", {
      type: "Timeline",
      args: {
        timelineId: nonNull(stringArg()),
      },
      resolve(_, { timelineId }, { prisma }, __) {
        return prisma.timeline.delete({
          where: {
            id: timelineId,
          },
        });
      },
    });
  },
});
