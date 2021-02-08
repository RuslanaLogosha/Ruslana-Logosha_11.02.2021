async function fetchMovies() {
  const url = 'http://my-json-server.typicode.com/moviedb-tech/movies/list';

  try {
    const data = await fetch(url);
    const results = await data.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export default fetchMovies;
