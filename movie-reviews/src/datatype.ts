type movieData = {
  title: string;
  release_date: string;
  poster_path?: string;
  id?: string;
  overview?: string;
};

type movies = {
  results: Array<movieData>;
}

export {movieData, movies};