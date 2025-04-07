import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import MovieCard from "@/components/MovieCard";
import SortSwitcher from "@/components/SortSwitcher";
import { Pagination } from "@/components/Pagination";
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

type Meta = {
  status_code?: number;
  status_message?: string;
  success?: boolean;
  page?: number;
  results?: null;
  total_pages?: number;
  total_results?: number;
};

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const configResponse = await fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`
  );
  const configData = await configResponse.json();
  const {
    images: { secure_base_url, logo_sizes },
  } = configData;

  try {
    const reponse = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${
        process.env.API_KEY
      }&language=en-US&page=${query.page || 1}`
    );
    const _data = await reponse.json();

    return {
      props: {
        apiData: _data.results || [],
        meta: {
          ..._data,
          results: null,
          message: _data.status_message || null,
        },
        imageBaseUrl: secure_base_url + logo_sizes[4],
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        apiData: [],
        meta: {},
        imageBaseUrl: secure_base_url + logo_sizes[4],
      },
    };
  }
}

const sortMoviesData = (order: "ascending" | "descending", data: Movie[]) => {
  if (order === "ascending") {
    return data.sort((a, b) => {
      return a.vote_average - b.vote_average;
    });
  }
  return data.sort((a, b) => {
    return b.vote_average - a.vote_average;
  });
};

const Home = ({
  apiData,
  imageBaseUrl,
  meta,
}: {
  apiData: Movie[];
  imageBaseUrl: string;
  meta: Meta;
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

  return (
    <div className={styles.container}>
      <Head>
        <title data-testid="title">My Movies Listing</title>
      </Head>

      <main>
        {meta.status_message ? (
          <h1 className={styles.title + " error"}>{meta.status_message}</h1>
        ) : (
          <div>
            <h1 className={styles.title}>Welcome to My Movies List</h1>

            <p className={styles.description} data-testid="subtitle">
              Scroll down to see the movies
            </p>
          </div>
        )}
        {!!apiData.length && (
          <div className={styles.switcherWrapper}>
            <SortSwitcher onToggle={handleToggle} />
          </div>
        )}
        <div className={styles.pageNumber}>Page: {meta.page || null}</div>
        {sortMoviesData(order, apiData).map(
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
        <Pagination
          page={meta.page || 1}
          perPage={20}
          total={meta.total_results || 0}
        />
      </main>
    </div>
  );
};

export default Home;
