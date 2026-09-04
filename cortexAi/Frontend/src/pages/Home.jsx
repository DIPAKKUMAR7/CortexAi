import { useEffect, useState } from "react";
import { getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import { api } from "../../utils/axios";
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

  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });

      console.log("Backend response:", data);

      dispatch(setUserdata(data));
    } catch (error) {
      console.error(
        "API login failed:",
        error?.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const completeRedirectLogin = async () => {
      try {
        const res = await getRedirectResult(auth);
        if (res) {
          const token = await res.user.getIdToken();
          await handleLogin(token);
        }
      } catch (error) {
        console.error("Firebase redirect login failed:", error);
      }
    };

    completeRedirectLogin();
  }, []);

  const googleLogin = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await signInWithPopup(auth, googleProvider);

      const token = await res.user.getIdToken();

      await handleLogin(token);
    } catch (error) {
      if (
        error.code !== "auth/cancelled-popup-request" &&
        error.code !== "auth/popup-closed-by-user" &&
        error.code !== "auth/popup-blocked"
      ) {
        console.error("Firebase auth error:", error);
      }

      if (error.code === "auth/popup-blocked") {
        await signInWithRedirect(auth, googleProvider);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">
      <SideBar/>
      <ChatArea/>
      <Artifsct/>
      
      
      
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
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 active:scale-[0.98] transition-all duration-150 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={googleLogin}
              disabled={loading}
            >
              <FcGoogle size={18} />

              <span>
                {loading ? "Signing in..." : "Continue With Google"}
              </span>
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Home;