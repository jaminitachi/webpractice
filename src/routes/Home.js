import { useState, useEffect } from "react";
import Movie from "../components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    /* 비동기 함수인 getMovies 선언. 이 함수는 api에서 영화 데이터 가져온다.*/
    const response = await fetch(
      /*fetch 함수를 이용해서 데이터를 가져온다. await 키워드는 promise가 resolve 될 때까지 기다린다.*/
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
    );
    const json =
      await response.json(); /*response.json()은 promise를 반환하게 되므로 await을 사용해서 json 변환이 완료될 때 까지 기다린다. */
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        /* 이렇게 삼중조건식으로 리턴 값을 다르게 해줄 수도 있다. */
        <div>
          {movies.map(
            (
              movie /* movies 밸류들을 맵을 이용해서 각각의 요소들을 movie 들로 받아 준다. */
            ) => (
              <Movie
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
