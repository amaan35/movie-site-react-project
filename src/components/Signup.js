import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber, getAuth } from 'firebase/auth';
import app from "../firebase/firebase";
import swal from "sweetalert";
import { addDoc } from "firebase/firestore";
import { usersRef } from "../firebase/firebase";

const auth = getAuth(app);
const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState("");

  const generateRecaptcha = () =>{
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          
        }
      });
  }

  const requestOtp = () =>{
    setLoading(true);
    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      swal({
        text: "OTP Sent",
        icon: "success",
        buttons: false,
        timer: 2000
      });
      setOtpSent(true);
      setLoading(false);
    }).catch((error) => {
        console.log(error);
    });
  }

  const verifyOTP = () =>{
    try {
        setLoading(true);
        window.confirmationResult.confirm(OTP).then((result) => {
            uploadData();
            swal({
                text: "Successfully registered",
                icon: "success",
                buttons: false,
                timer: 2000
              });
            setLoading(false);
          })
    } catch (error) {
        console.log(error);
    }
  }

  const uploadData = async () =>{
    await addDoc(usersRef, {
        form
    })
  }

  return (
    <div className="w-full flex flex-col items-center mt-8">
      <h1 className="text-xl font-bold">Sign up</h1>
      {otpSent ? (
        <>
          <div class="p-2 md:w-1/3 w-full">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">
                One Time Password (OTP)
              </label>
              <input
                id="message"
                name="message"
                value={form.OTP}
                onChange={(e) => setOTP(e.target.value)}
                class="w-full bg-gray-300 rounded border border-gray-300 focus:border-indigo-500 focus:bg-gray-200 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></input>
            </div>
          </div>
          <div class="p-2 w-full">
            <button onClick={verifyOTP} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
              {loading ? <TailSpin height={25} color="white" /> : "Confirm OTP"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div class="p-2 md:w-1/3 w-full">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">
                Name
              </label>
              <input
                id="message"
                name="message"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                class="w-full bg-gray-300 rounded border border-gray-300 focus:border-indigo-500 focus:bg-gray-200 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></input>
            </div>
          </div>
          <div class="p-2 md:w-1/3 w-full">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">
                Mobile Number
              </label>
              <input
                type={"number"}
                id="message"
                name="message"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                class="w-full bg-gray-300 rounded border border-gray-300 focus:border-indigo-500 focus:bg-gray-200 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></input>
            </div>
          </div>
          <div class="p-2 md:w-1/3 w-full">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">
                Password
              </label>
              <input
                id="message"
                name="message"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                class="w-full bg-gray-300 rounded border border-gray-300 focus:border-indigo-500 focus:bg-gray-200 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></input>
            </div>
          </div>
          <div class="p-2 w-full">
            <button onClick={requestOtp} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
              {loading ? <TailSpin height={25} color="white" /> : "Request OTP"}
            </button>
          </div>
        </>
      )}

      <div>
        <p>
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="text-blue-500">Login</span>
          </Link>
        </p>
      </div>
      <div id="sign-in-button"></div>
    </div>
  );
};

export default Signup;
