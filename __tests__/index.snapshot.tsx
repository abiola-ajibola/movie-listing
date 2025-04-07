import React from "react";
import renderer from "react-test-renderer";
import Index from "../pages/index";

const imageBaseUrl = "https://image.tmdb.org/t/p/w300";
const apiData = [
  {
    adult: false,
    backdrop_path: "/1EAxNqdkVnp48a7NUuNBHGflowM.jpg",
    genre_ids: [16, 28, 18, 878],
    id: 283566,
    original_language: "ja",
    original_title: "シン・エヴァンゲリオン劇場版:||",
    overview:
      "In the aftermath of the Fourth Impact, stranded without their Evangelions, Shinji, Asuka, and Rei find refuge in one of the rare pockets of humanity that still exist on the ruined planet Earth. There, each of them live a life far different from their days as an Evangelion pilot. However, the danger to the world is far from over. A new impact is looming on the horizon—one that will prove to be the true end of Evangelion.",
    popularity: 286.466,
    poster_path: "/jDwZavHo99JtGsCyRzp4epeeBHx.jpg",
    release_date: "2021-03-08",
    title: "Evangelion: 3.0+1.0 Thrice Upon a Time",
    video: false,
    vote_average: 8.7,
    vote_count: 256,
  },
  {
    adult: false,
    backdrop_path: "/9Xw0I5RV2ZqNLpul6lXKoviYg55.jpg",
    genre_ids: [18, 80],
    id: 278,
    original_language: "en",
    original_title: "The Shawshank Redemption",
    overview:
      "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
    popularity: 63.552,
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    release_date: "1994-09-23",
    title: "The Shawshank Redemption",
    video: false,
    vote_average: 8.7,
    vote_count: 19561,
  },
  {
    adult: false,
    backdrop_path: "/jtAI6OJIWLWiRItNSZoWjrsUtmi.jpg",
    genre_ids: [10749],
    id: 724089,
    original_language: "en",
    original_title: "Gabriel's Inferno Part II",
    overview:
      "Professor Gabriel Emerson finally learns the truth about Julia Mitchell's identity, but his realization comes a moment too late. Julia is done waiting for the well-respected Dante specialist to remember her and wants nothing more to do with him. Can Gabriel win back her heart before she finds love in another's arms?",
    popularity: 8.003,
    poster_path: "/x5o8cLZfEXMoZczTYWLrUo1P7UJ.jpg",
    release_date: "2020-07-31",
    title: "Gabriel's Inferno Part II",
    video: false,
    vote_average: 8.7,
    vote_count: 1297,
  },
];

it("renders homepage unchanged", () => {
  const tree = renderer
    .create(
      <Index
        imageBaseUrl={imageBaseUrl}
        apiData={apiData}
        meta={{ page: 1, total_pages: 1, total_results: apiData.length }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
