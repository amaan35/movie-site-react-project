import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const Detail = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
  });
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    async function getData() {
      try {
        const docRef = doc(db, "movies", id);
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data())
        setData(docSnap.data());
        // Reference to the movie document
        // const docRef = doc(db, "movies", id);
        // const docSnapshot = await getDoc(docRef);

        // if (docSnapshot.exists()) {
        //   // Document exists, retrieve its data
        //   const movieData = docSnapshot.data();
        //   setData({
        //     title: movieData.title || "",
        //     year: movieData.year || "",
        //     image: movieData.image || "",
        //     description: movieData.description || "",
        //   });
        // } else {
        //   // Document doesn't exist
        //   console.log("No such document!");
        // }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    }
    getData();
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center min-h-screen">
          <TailSpin height={40} color="white" />
        </div>
      ) : (
        <div className="p-4 w-full mt-4 flex flex-col md:flex-row items-center md:items-start justify-center">
          <img className="h-96 block md:sticky top-28" src={data.image} />
          <div className="ml-0 md:ml-4 md:w-1/2 w-full">
            <h1 className="text-3xl font-bold text-gray-400">
              {data.title} <span className="text-xl">({data.year})</span>
            </h1>
            <ReactStars
              className="-z-10"
              size={20}
              half={true}
              value={5}
              edit={false}
            />
            <p className="text-white mt-2">{data.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
