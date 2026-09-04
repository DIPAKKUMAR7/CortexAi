import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase.js";
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

  const [loading, setLoading] = useState(true); // Default to true while checking initial auth status

  // 1. Listen for Firebase Auth State Changes
  useEffect(() => {
    console.log("Setting up Firebase auth listener...");

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log("Firebase session detected:", firebaseUser.email);
        try {
          const token = await firebaseUser.getIdToken();
          const response = await api.post("/api/auth/login", { token });
          
          console.log("Backend sync success:", response.data);
          dispatch(setUserdata(response.data));
        } catch (error) {
          console.error("Backend sync failed on auto-login:", error);
          // If backend rejects user, force Firebase sign out
          await signOut(auth);
          dispatch(setUserdata(null));
        }
      } else {
        console.log("No active Firebase session.");
        dispatch(setUserdata(null));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  // 2. Google Login Function
  const googleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);
      console.log("Starting Google Popup Sign-in...");

      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      const response = await api.post("/api/auth/login", { token });
      console.log("Login successful:", response.data);

      dispatch(setUserdata(response.data));
    } catch (error) {
      console.error("Google Login Error:", error);
      dispatch(setUserdata(null));
      alert(error?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0d0f14] text-white">
        <p className="text-slate-400">Loading user session...</p>
      </div>
    );
  }

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
              <span>Continue With Google</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;