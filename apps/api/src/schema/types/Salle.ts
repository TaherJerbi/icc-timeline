import { objectType } from "nexus";
import { Salle } from "nexus-prisma";

export const NexusSalle = objectType({
  name: Salle.$name,
  description: Salle.$description,
  definition(t) {
    t.field(Salle.id);
    t.field(Salle.name);
    t.field(Salle.timeline);
  },
});
