import { objectType } from "nexus";
import { Movie } from "nexus-prisma";

export const NexusMovie = objectType({
  name: Movie.$name,
  description: Movie.$description,
  definition(t) {
    t.field(Movie.id);
    t.field(Movie.title);
    t.field(Movie.runningTime);
    t.field(Movie.realisateur);
    t.field(Movie.posterPath);
    t.field(Movie.sessions);
    t.field(Movie.movieSlug);
  },
});
