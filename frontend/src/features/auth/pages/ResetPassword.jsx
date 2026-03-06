import { useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import { resetPassword } from "../services/auth.api";

const ResetPassword = () => {


  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

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
  }

  return <main
    className="w-full h-screen bg-zinc-900 bg-cover bg-center flex items-center justify-center"
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
        <input
          required
          type="password"
          placeholder="Password *"
          className="w-full border-b pt-2 border-b-zinc-800 focus:outline-none"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* submit button */}
        <button
          type="submit"
          className="w-full h-10 bg-zinc-900 text-white rounded-lg mt-2 cursor-pointer active:scale-95 transition-transform duration-200"
          style={{ fontFamily: "Funnel Sans" }}
        >
          Reset Password
        </button>
      </form>
    </div>
    {/* message */}
    {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
  </main>
}

export default ResetPassword