import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { query, where, getDocs } from 'firebase/firestore'
import { usersRef } from "../firebase/firebase";
import bcrypt from 'bcryptjs';
import {AppState} from '../App';
import { useContext } from "react";

const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(AppState);
    const [form, setForm] = useState({
        mobile: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const login = async () => {
      setLoading(true);
      try {
        if (form.mobile.trim() === '' || form.password.trim() === '') {
          swal({
            title: 'Please fill in all fields',
            icon: 'warning',
            buttons: false,
            timer: 2000,
          });
          setLoading(false);
          return;
        }
        const quer = query(usersRef, where('mobile', '==', form.mobile))
        const querySnapshot = await getDocs(quer);
        if (querySnapshot.empty) {
          swal({
            title: 'User not found',
            icon: 'error',
            buttons: false,
            timer: 1000,
          });
          setLoading(false);
          return;
        }
        querySnapshot.forEach((doc) => {
          const _data = doc.data();
          const isUser = bcrypt.compareSync(form.password, _data.password);
          if(isUser){
            useAppstate.setLogin(true);
            useAppstate.setUserName(_data.name);
            swal({
              title: "Successfully logged in",
              icon: "success",
              buttons: false,
              timer: 1000
            })
            navigate('/');
          }else{
            swal({
              title: "Invalid credentials",
              icon: "error",
              buttons: false,
              timer: 2000
            })
          }
        });
      } catch (error) {
        swal({
          title: error.message,
          icon: "error",
          buttons: false,
          timer: 2000
        })
      }
      setLoading(false);
    }
  return (
    <div className="w-full flex flex-col items-center mt-8">
      <h1 className="text-xl font-bold">Login</h1>
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
            type="password"
            id="message"
            name="message"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            class="w-full bg-gray-300 rounded border border-gray-300 focus:border-indigo-500 focus:bg-gray-200 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></input>
        </div>
      </div>
      <div class="p-2 w-full">
        <button
          onClick={login}
          class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
        >
          {loading ? <TailSpin height={25} color="white" /> : "Login"}
        </button>
      </div>
      <div>
        <p>Do not have an account? <Link to={'/signup'}><span className="text-blue-500">Sign up</span></Link></p>
      </div>
    </div>
  );
};

export default Login;
