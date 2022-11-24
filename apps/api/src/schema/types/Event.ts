import { enumType, extendType, objectType } from "nexus";
import { Event, EventType } from "nexus-prisma";
import { Context } from "../../Context";

export const NexusEventType = enumType(EventType);
export const NexusEvent = objectType({
  name: Event.$name,
  definition(t) {
    t.field(Event.id);
    t.field(Event.session);
    t.field(Event.sessionId);
    t.field(Event.confirmed);
    t.field(Event.delayLog);
    t.field(Event.time);
    t.field(Event.type);
  },
});

export const NexusEventQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("events", {
      type: "Event",
      resolve: async (_, __, ctx: Context) => {
        return ctx.prisma.event.findMany();
      },
    });
  },
});
