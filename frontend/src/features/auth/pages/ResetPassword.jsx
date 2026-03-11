import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/auth.api";
import { Eye, EyeClosed } from "lucide-react";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ResetPassword = () => {

  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const [seePassword, setSeePassword] = useState("password");

  const passwordVisiblity = () => {
    if (seePassword === "password") {
      setSeePassword("text");
    } else {
      setSeePassword("password");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await resetPassword(token, password);
      setMessage(response.message);
      if (response.success) {
        setTimeout(() => {
          setRedirect(true);
        }, 1500);
      }
    } catch (error) {
      setMessage(error.message || error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  }

  return <main
    className="w-full h-screen bg-zinc-900 bg-cover bg-center flex flex-col gap-6 items-center justify-center"
  >
    {redirect && <Navigate to="/login" replace />}
    <div
      className="min-w-2xs rounded-3xl bg-white p-4 flex flex-col items-center gap-6"
    >
      <h1
        className="font-bold text-zinc-900 leading-none mt-3"
        style={{
          fontFamily: "Funnel Sans",
          fontSize: "clamp(1.5rem, 4.5vw, 1.5rem)"
        }}
      >
        Reset Password
      </h1>
      {/* form */}
      <form
        className="w-full h-fit flex flex-col gap-4 mt-6"
        onSubmit={handleSubmit}
      >
        {/* password */}
        <div className="w-full flex justify-between items-center pt-2 border-b border-b-zinc-800">
          <input
            required
            type={`${seePassword}`}
            placeholder="Password *"
            className="focus:outline-none"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* toggle icon for password visibility */}
          {
            seePassword === "password"
              ? <Eye
                className="cursor-pointer"
                onClick={passwordVisiblity}
              />
              : <EyeClosed
                className="cursor-pointer"
                onClick={passwordVisiblity}
              />
          }

        </div>
        {/* submit button */}
        <button
          type="submit"
          className="w-full h-10 bg-zinc-900 text-white rounded-lg mt-2 cursor-pointer active:scale-95 transition-transform duration-200 flex items-center justify-center gap-2"
          style={{ fontFamily: "Funnel Sans" }}
          disabled={loading}
        >
          {loading && <LoadingSpinner size={20} color="#fff" ariaLabel="Loading" />}
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
    {/* message */}
    {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
  </main>
}

export default ResetPassword