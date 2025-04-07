import { useEffect, useState } from "react";
import Head from "next/head";
import MovieCard from "@/components/MovieCard";
import SortSwitcher from "@/components/SortSwitcher";
import styles from "./index.module.css";

type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export async function getServerSideProps() {
  const dummy = new Array(25).fill(1);
  const configResponse = await fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`
  );
  const configData = await configResponse.json();
  const {
    images: { secure_base_url, logo_sizes },
  } = configData;
  const responses = await Promise.all(
    dummy.map((empty, index) => {
      return fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${
          process.env.API_KEY
        }&language=en-US&page=${index + 1}`
      );
    })
  );

  const data = await Promise.all(responses.map((response) => response.json()));
  const apiData = data.map(({ results }) => results).flat();
  console.dir(
    {
      apiData: apiData[0],
      data: data[0].results[0],
      meta: { ...data[0], results: data[0].results[0] },
      meta1: { ...data[1], results: data[1].results[0] },
      meta2: { ...data[2], results: data[2].results[0] },
    },
    { depth: 5 }
  );
  return {
    props: { apiData, imageBaseUrl: secure_base_url + logo_sizes[4] },
  };
}

const Home = ({
  apiData,
  imageBaseUrl,
}: {
  apiData: Movie[];
  imageBaseUrl: string;
}) => {
  const [favoriteIds, setFavoriteIds] = useState<{ [key: string]: number }>({});
  const [order, setOrder] = useState<"ascending" | "descending">("ascending");

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");
    favorites && setFavoriteIds(favorites);
  }, []);

  const handleSwitch = (id: number) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");
    if (favorites && id.toString() in favorites) {
      delete favorites[id.toString()];
      setFavoriteIds(favorites);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      localStorage.setItem(
        "favorites",
        JSON.stringify({ ...favorites, [id.toString()]: id })
      );
      const favorites_new = JSON.parse(
        localStorage.getItem("favorites") || "{}"
      );
      setFavoriteIds(favorites_new);
    }
  };

  const handleToggle = (v: "ascending" | "descending") => {
    setOrder(v);
  };

  const moviesData = (order: "ascending" | "descending") => {
    if (order === "ascending") {
      return apiData.sort((a, b) => {
        return a.vote_average - b.vote_average;
      });
    }
    return apiData.sort((a, b) => {
      return b.vote_average - a.vote_average;
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title data-testid="title">My Movies Listing</title>
      </Head>

      <main>
        <h1 className={styles.title}>Welcome to My Movies List</h1>

        <p className={styles.description} data-testid="subtitle">
          Scroll down to see the top 500 movies
        </p>
        <div className={styles.switcherWrapper}>
          <SortSwitcher onToggle={handleToggle} />
        </div>
        {moviesData(order).map(
          ({ backdrop_path, release_date, title, vote_average, id }, index) => (
            <MovieCard
              key={index}
              imageUrl={imageBaseUrl + backdrop_path}
              title={title}
              rating={vote_average}
              date={release_date}
              id={id}
              onSwitch={() => handleSwitch(id)}
              favorite={favoriteIds && id.toString() in favoriteIds}
            />
          )
        )}
      </main>
    </div>
  );
};

export default Home;
