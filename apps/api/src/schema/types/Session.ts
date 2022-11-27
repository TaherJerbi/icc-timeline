import { enumType, list, nonNull, objectType } from "nexus";

import { Session, SessionType } from "nexus-prisma";

export const NexusSessionType = enumType(SessionType);
export const NexusSession = objectType({
  name: Session.$name,
  description: Session.$description,
  definition(t) {
    t.field(Session.id);
    t.field(Session.type);
    t.field(Session.originalStartTime);
    t.field(Session.originalEndTime);
    t.field(Session.startTime);
    t.field(Session.endTime);
    t.field(Session.events);
    t.field(Session.delayed);
    t.field(Session.delay);
    t.field(Session.movie);
    t.field(Session.movieSlug);
    t.field(Session.title);
    t.field(Session.description);
    t.field(Session.timeline);
    t.field(Session.timelineId);
  },
});
