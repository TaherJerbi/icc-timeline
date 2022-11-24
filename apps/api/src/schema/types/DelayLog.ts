import { enumType, objectType } from "nexus";
import { DelayActionType as PrismaDelayActionType } from "@prisma/client";
import { DelayActionType, DelayLog } from "nexus-prisma";

export const NexusDelayActionType = enumType(DelayActionType);
export const NexusDelayLog = objectType({
  name: DelayLog.$name,
  description: DelayLog.$description,
  definition(t) {
    t.field(DelayLog.id);
    t.field(DelayLog.delayStart);
    t.field(DelayLog.delayEnd);
    t.field(DelayLog.event);
    t.field(DelayLog.eventId);
    t.field(DelayLog.action);
  },
});
