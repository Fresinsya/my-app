import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, firestore } from "../config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import Modal from "./Modal";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // state untuk email dan password
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  // when login success
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    // hide notif after 3 sec
    const time = setTimeout(() => {
      setOpenAlert(false);
    }, 3000);

    return () => clearTimeout(time);
  }, [openAlert]);

  const handleAlert = (e) => {
    e.currentTarget.classList.remove("hidden");
    setOpenAlert(true);
  };

  // handle input email, pw
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const { email, password } = state;
  const [{ user }, dispatch] = useStateValue();

  const handleSubmit = async (e) => {
    const auth = getAuth(app);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // mencari user (dokumen)
      const docRef = await doc(firestore, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        dispatch({
          type: actionType.SET_USER,
          user: docSnap.data(),
        });
        setOpenAlert(true);
        // navigate("/");
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      setState({ email: "", password: "" });
    } catch (error) {
      console.log("error : ", error.message);
    }
  };

  return (
    <div>
      <div class="mx-auto bg-white shadow-md rounded px-8 pb-8 mb-4 mt-10 flex flex-col w-2/4 rounded-xl">
        <h1 className="my font-medium text-4xl py-5">Login</h1>
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="email"
            name="email"
          >
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="email"
            type="text"
            placeholder="email"
            name="email"
            onChange={handleChange}
            value={email}
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="password"
            id="password"
            name="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
            name="password"
            onChange={handleChange}
            value={password}
          />
          <p class="text-red text-xs italic">Silakan Masukkan password.</p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-slate-700 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleSubmit}
          >
            Sign In
          </button>
          <a
            class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </div>
      <Modal show={openAlert} />
    </div>
  );
};

export default Login;
