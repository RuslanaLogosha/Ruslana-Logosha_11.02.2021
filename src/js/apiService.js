const url = 'http://localhost:4040/movies';

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
    return results;
  } catch (error) {
    console.log(error);
  }
}
