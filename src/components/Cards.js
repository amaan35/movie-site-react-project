import React, { useState } from "react";
import ReactStars from "react-stars";

const Cards = () => {
  const [data, setData] = useState([
    {
      name: "Joker",
      year: "2022",
      rating: 4,
      img: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    },
    {
      name: "Joker",
      year: "2022",
      rating: 4.5,
      img: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    },
    {
      name: "Joker",
      year: "2022",
      rating: 5,
      img: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    },
    {
      name: "Joker",
      year: "2022",
      rating: 5,
      img: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    },
    {
      name: "Joker",
      year: "2022",
      rating: 5,
      img: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    },
    {
      name: "Joker",
      year: "2022",
      rating: 5,
      img: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    },
  ]);
  return (
    <div className="flex flex-wrap p-5 mt-2 ml-2">
      {data.map((e, i) => {
        return (
          <div
            key={i}
            className="p-2 bg-black rounded-lg shadow-xl hover:-translate-y-3 cursor-pointer mb-5 mr-4 transition-all duration-400"
          >
            <img className="h-96" src={e.img} />
            <h1 className="text-xl font-bold mt-1 mb-2 break-words w-36 flex-1">
              {e.name}
            </h1>
            <h1 className="flex items-center">
              <span className="text-gray-400 mr-1">Rating : </span>
              <ReactStars size={20} half={true} value={e.rating} edit={false} />
            </h1>
            <h1>
              <span className="text-gray-400">Year : </span> {e.year}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
