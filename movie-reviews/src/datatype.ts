type movieData = {
  poster_path: string;
  title: string;
  release_date: string;
  id?: string;
  overview?: string;
};

type movies = {
  results: Array<movieData>;
}

export {movieData, movies};