import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewsRef, db } from "../firebase/firebase";
import { addDoc, doc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { TailSpin, ThreeCircles, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { AppState } from "../App";

const Reviews = ({id, prevRating, userRated}) => {
  const useAppstate = useContext(AppState);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const sendReview = async () =>{
    try {
        setLoading(true);
        await addDoc(reviewsRef, {
            movieid: id,
            name: useAppstate.userName,
            rating: rating,
            thought: form,
            timestamp: new Date().getTime()
        })
        const ref = doc(db, "movies", id);
        await updateDoc(ref, {
            rating: prevRating + rating,
            rated: userRated+1
        });
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
  useEffect(()=>{
    async function getData(){
        setReviewsLoading(true);
        let quer = query(reviewsRef, where('movieid', '==', id))
        const querySnapshot = await getDocs(quer);
        querySnapshot.forEach((doc)=>{
            setData((prev)=>[...prev, doc.data()])
        })

        setReviewsLoading(false);
    }
    getData();
  },[])
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
      {
        reviewsLoading?
        <div className="mt-6 flex justify-center">
            <ThreeDots height={10} color="white"/>
        </div>
        :
        <div className="mt-4">
            {
                data.map((e,i)=>{
                    return(
                        <div className="p-2 w-full border-b border-gray-500 mt-2" key={i}>
                            <div className="flex items-center justify-between">
                                <p className="text-blue-600 text-lg">{e.name}</p>
                                <p className="text-xs">{new Date(e.timestamp).toLocaleString()}</p>
                            </div>
                            <ReactStars 
                                className="-z-10"
                                size={15} 
                                half={true} 
                                value={e.rating}
                                edit={false}/>
                            <p>{e.thought}</p>
                        </div>
                    )
                })
            }
        </div>
      }
    </div>
  );
};

export default Reviews;
