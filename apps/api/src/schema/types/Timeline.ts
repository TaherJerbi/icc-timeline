import { objectType } from "nexus";
import { Timeline } from "nexus-prisma";

export const NexusTimeline = objectType({
  name: Timeline.$name,
  description: Timeline.$description,
  definition(t) {
    t.field(Timeline.id);
    t.field(Timeline.salle);
    t.field(Timeline.salleId);
    t.field(Timeline.sessions);
  },
});
