const url = 'http://my-json-server.typicode.com/moviedb-tech/movies/list';

export async function fetchMovies() {
  try {
    const data = await fetch(url);
    const results = await data.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchMoviesById(id) {
  try {
    const data = await fetch(`${url}/${id}`);
    const results = await data.json();
    // console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
}
