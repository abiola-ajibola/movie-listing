/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, act } from "@testing-library/react";
import MovieCard from "@/components/MovieCard";

const imageUrl =
    "https://image.tmdb.org/t/p/w300/1EAxNqdkVnp48a7NUuNBHGflowM.jpg",
  title = "Evangelion: 3.0+1.0 Thrice Upon a Time",
  rating = 8.7,
  date = "2021-03-08",
  id = 283566,
  onSwitch = () => console.log("Switch"),
  favorite = false;

describe("MovieCard component", () => {
  it("renders a the movie title heading", () => {
    render(
      <MovieCard
        imageUrl={imageUrl}
        title={title}
        rating={rating}
        date={date}
        id={id}
        onSwitch={onSwitch}
        favorite={favorite}
      />
    );

    const heading = screen.getByRole("heading", {
      name: /Title/i,
      level: 3
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders a movie title", () => {
    render(
      <MovieCard
        imageUrl={imageUrl}
        title={title}
        rating={rating}
        date={date}
        id={id}
        onSwitch={onSwitch}
        favorite={favorite}
      />
    );
    const movieTitle = screen.getByTestId("title-text", {
      name: title,
    });
    expect(movieTitle).toBeInTheDocument();
  });

  it("renders the movie image", () => {
      render(
        <MovieCard
        imageUrl={imageUrl}
        title={title}
        rating={rating}
        date={date}
        id={id}
        onSwitch={onSwitch}
        favorite={favorite}
      />
      )

      const image = screen.getByAltText(title);
      expect(image).toBeInTheDocument();
  })
});
