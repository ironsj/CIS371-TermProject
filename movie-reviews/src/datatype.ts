type movieData = {
  poster_path: string;
  title: string;
  release_date: string;
};

type movies = {
  results: Array<movieData>;
}

export {movieData, movies};