import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { app, firestore } from "../config/firebase.config";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const Register = () => {
  const auth = getAuth(app);

  const [state, setState] = useState({
    email: "",
    password: "",
    namaLengkap: "",
    noTelpon: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const [{ user }, dispatch] = useStateValue();

  // menyimpan data user ke firestore
  const createUserDocument = async (user, additionalData) => {
    if (!user) return;
  
    const userRef = await doc(firestore, "users", user.uid);
    const snapshot = await getDoc(userRef);
  
    const dataUser = {
      email: user.email,
      namaLengkap: additionalData.namaLengkap,
      noTelpon: additionalData.noTelpon,
      createdAt: new Date(),
    };
  
    if (!snapshot.exists()) {
      try {
        await setDoc(userRef, dataUser);
      } catch (error) {
        console.log("error in creating user", error);
      }
    }

    dispatch({
      type: actionType.SET_USER,
      user : dataUser
    });
    localStorage.setItem("user", JSON.stringify(dataUser));
  };

  

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const { email, password, namaLengkap, noTelpon } = state;
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createUserDocument(user, { namaLengkap, noTelpon });
      
      navigate('/');
    } catch (error) {
      console.log("error di handleSubmit", error);
    }
    setState({ email: "", password: "", namaLengkap: "", noTelpon: "" });
  };

  const { email, password, namaLengkap, noTelpon } = state;

  return (
    <div className="w-auto">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="namaLengkap"
                    id="name"
                    value={namaLengkap}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="noTelpon"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    name="noTelpon"
                    value={noTelpon}
                    onChange={handleChange}
                    id="noTelpon"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="08123456.."
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="????????????????????????"
                    value={password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-slate-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
