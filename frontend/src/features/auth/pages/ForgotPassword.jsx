import { useState } from "react";
import { Link } from "react-router-dom"
import { forgotPassword } from "../services/auth.api";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await forgotPassword(email);

            setMessage(response.message);

        } catch (error) {
            setMessage(error.response.data.message);
        }

    }

    return <main
        className="w-full h-screen bg-zinc-900 bg-cover bg-center flex items-center justify-center"
    >
        <div
            className="min-w-2xs rounded-3xl bg-white p-4 flex flex-col items-center gap-6"
        >
            <h1
                className="font-bold text-zinc-900 leading-none mt-3"
                style={{
                    fontFamily: "Funnel Sans",
                    fontSize: "clamp(2rem, 5vw, 2rem)"
                }}
            >
                Send Email
            </h1>

            {/* form */}
            <form
                className="w-full h-fit flex flex-col gap-4 mt-6"
                onSubmit={handleSubmit}
            >
                {/* email */}
                <input
                    required
                    type="email"
                    placeholder="Email *"
                    className="w-full border-b pt-2 border-b-zinc-800 focus:outline-none"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full h-10 bg-zinc-900 text-white rounded-lg mt-2 cursor-pointer active:scale-95 transition-transform duration-200"
                    style={{ fontFamily: "Funnel Sans" }}
                >
                    Send Link
                </button>

                {/* login link */}
                <Link to="/signup">
                    <p className="text-xs text-center italic">Don't have an account? <span className="text-blue-600">Signup</span></p>
                </Link>
            </form>
        </div>

        {message && <p className="text-red-600">{message}</p>}
    </main>
}

export default ForgotPassword