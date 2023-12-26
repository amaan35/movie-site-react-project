import React from "react";
import ReactStars from "react-stars";

const Detail = () => {
  return (
    <div className="p-4 w-full mt-4 flex flex-col md:flex-row items-center md:items-start justify-center">
      <img
        className="h-96 block md:sticky top-28"
        src="https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg"
      />
      <div className="ml-0 md:ml-4 md:w-1/2 w-full">
        <h1 className="text-3xl font-bold text-gray-400">
          Avengers: Endgame <span className="text-xl">(2019)</span>
        </h1>
        <ReactStars className="-z-10" size={20} half={true} value={5} edit={false} />
        <p className="text-white mt-2">
          After Thanos, an intergalactic warlord, disintegrates half of the
          universe, the Avengers must reunite and assemble again to reinvigorate
          their trounced allies and restore balance. After Thanos, an
          intergalactic warlord, disintegrates half of the universe, the
          Avengers must reunite and assemble again to reinvigorate their
          trounced allies and restore balance.
        </p>
      </div>
    </div>
  );
};

export default Detail;
