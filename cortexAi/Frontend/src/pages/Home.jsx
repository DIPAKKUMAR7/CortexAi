import { useEffect, useState } from "react";

import {
  onAuthStateChanged,
  signInWithPopup,
  getRedirectResult,
} from "firebase/auth";

import {
  auth,
  googleProvider,
} from "../../utils/firebase.js";

import { api } from "../../utils/axios.js";
import { FcGoogle } from "react-icons/fc";

import { useSelector, useDispatch } from "react-redux";
import { setUserdata } from "../redux/userSlice.js";

import ChatArea from "../components/ChatArea.jsx";
import Artifsct from "../components/Artifsct.jsx";
import SideBar from "../components/SideBar.jsx";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // Handle residual redirect results (if any exist from prior attempts)
  useEffect(() => {
    getRedirectResult(auth).catch((error) => {
      console.warn("Cleared leftover redirect state:", error.message);
    });
  }, []);

  // Firebase authentication listener
  useEffect(() => {
    console.log("Setting up Firebase auth listener...");

    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        console.log("Firebase auth state:", firebaseUser);

        // User is not logged in
        if (!firebaseUser) {
          console.log("No Firebase user");
          dispatch(setUserdata(null));
          setLoading(false);
          return;
        }

        try {
          console.log(
            "Firebase user found:",
            firebaseUser.email
          );

          // Get Firebase ID token
          const token = await firebaseUser.getIdToken();

          console.log("Firebase ID token received");

          // Send token to backend
          const response = await api.post(
            "/api/auth/login",
            {
              token,
            }
          );

          console.log(
            "Backend login successful:",
            response.data
          );

          // Save user in Redux
          dispatch(setUserdata(response.data));

        } catch (error) {
          console.error("Backend login failed");

          console.error(
            "Status:",
            error?.response?.status
          );

          console.error(
            "Data:",
            error?.response?.data
          );

          console.error(
            "Message:",
            error?.message
          );
        } finally {
          setLoading(false);
        }
      }
    );

    // Cleanup listener
    return () => {
      console.log("Removing Firebase auth listener");
      unsubscribe();
    };

  }, [dispatch]);


  // Google login via Popup
  const googleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      console.log("Starting Google popup login...");

      // Switched from signInWithRedirect to signInWithPopup
      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      console.log("Google popup sign-in successful:", result.user.email);

    } catch (error) {
      console.error("Google login failed");

      console.error(
        "Code:",
        error?.code
      );

      console.error(
        "Message:",
        error?.message
      );

      console.error(error);

      setLoading(false);
    }
  };


  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">

      <SideBar />

      <ChatArea />

      <Artifsct />


      {!userData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">

          <div className="w-[360px] bg-[#14161f] border border-white/5 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl">

            <div className="flex flex-col gap-1.5">

              <h2 className="text-xl font-bold text-white tracking-wide">
                Welcome to CortexAI
              </h2>

              <p className="text-sm text-slate-400/80 font-normal">
                Please login to continue using the app.
              </p>

            </div>


            <button
              type="button"
              onClick={googleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 active:scale-[0.98] transition-all duration-150 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >

              <FcGoogle size={18} />

              <span>
                {loading
                  ? "Signing in..."
                  : "Continue With Google"}
              </span>

            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Home;