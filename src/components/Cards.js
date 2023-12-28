import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import ReactStars from "react-stars";
import { moviesRef } from "../firebase/firebase";
import { Link } from "react-router-dom";
import '../styles/Responsive.css';

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      // setData([]);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc)=>{
        setData((prv)=>[...prv, {...(doc.data()), id: doc.id}])
      })
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="movie-grid p-3 mt-2 w-full">
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen"><Grid height={40} color="white" /></div>
      ) : (
        data.map((e, i) => {
          return (
            <Link to={`/detail/${e.id}`}><div
              key={i}
              className="md:p-2 p-1 bg-black font-medium rounded-lg shadow-xl hover:-translate-y-3 cursor-pointer mb-5 transition-all duration-400 md:ml-2"
            >
              <img className="md:h-96 w-full object-cover object-top" src={e.image} />
              <h1>
                {e.title}
              </h1>
              <h1 className="flex items-center">
                <span className="text-gray-400 mr-1">Rating : </span>
                <ReactStars size={20} half={true} value={e.rating/e.rated} edit={false} />
              </h1>
              <h1>
                <span className="text-gray-400">Year : </span> {e.year}
              </h1>
            </div></Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;
