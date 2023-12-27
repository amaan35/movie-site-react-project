import React, { useState } from "react";
import ReactStars from "react-stars";
import { reviewsRef } from "../firebase/firebase";
import { addDoc } from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";
import swal from "sweetalert";

const Reviews = ({id}) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState("");
  const sendReview = async () =>{
    try {
        setLoading(true);
        await addDoc(reviewsRef, {
            movieid: id,
            name: "amaan ali",
            rating: rating,
            thought: form,
            timestamp: new Date().getTime()
        })
        setRating(0);
        setForm("");
        swal({
            title: "Review sent",
            icon: "success",
            buttons: false,
            timer: 2000,
          });
    } catch (error) {
        swal({
            title: error.message,
            icon: "error",
            buttons: false,
            timer: 2000,
          });
    }
    setLoading(false);
  }
  return (
    <div className="mt-4 border-t-2 border-gray-500 w-full">
      <ReactStars 
        size={25} 
        half={true} 
        value={rating}
        onChange={(rate) => setRating(rate)} />
      <input
      value={form}
      onChange={(e)=>setForm(e.target.value)}
        placeholder="Share your thoughts..."
        className="w-full p-2 outline-none bg-black"
      />
      <button onClick={sendReview} className="bg-green-600 flex justify-center w-full p-2">{loading?<TailSpin height={20} color="white"/>:"Share"}</button>
    </div>
  );
};

export default Reviews;
