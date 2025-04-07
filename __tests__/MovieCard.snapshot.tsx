import { create, act } from "react-test-renderer";
import MovieCard from "@/components/MovieCard";

const imageUrl =
    "https://image.tmdb.org/t/p/w300/1EAxNqdkVnp48a7NUuNBHGflowM.jpg",
  title = "Evangelion: 3.0+1.0 Thrice Upon a Time",
  rating = 8.7,
  date = "2021-03-08",
  id = 283566,
  onSwitch = () => console.log("Switch"),
  favorite = false;

it("it renders a movie card", () => {
  let component = create(
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

  expect(component.toJSON()).toMatchSnapshot();

  // update with some different props
  act(() => {
    component.update(
      <MovieCard
        imageUrl={imageUrl}
        title={title}
        rating={rating}
        date={date}
        id={id}
        onSwitch={onSwitch}
        favorite={true}
      />
    );
  });

  expect(component.toJSON()).toMatchSnapshot();
});
