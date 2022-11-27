import { inputObjectType, list, mutationType, nonNull, queryType } from "nexus";
import populateTimelinesResolver from "./resolvers/populateTimelines";

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
      resolve: populateTimelinesResolver,
    });
  },
});
