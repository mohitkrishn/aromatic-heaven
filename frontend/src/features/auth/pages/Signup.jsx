import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../services/auth.api";
import LoadingSpinner from "../../../components/LoadingSpinner";
import signupBg from "../../../assets/images/pc-13.jpg";
import texture from "../../../assets/images/textture-bg.avif";

const Signup = () => {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response = await signup(userData);
            if (response?.success) {
                setUserData({
                    name: "",
                    email: "",
                    password: ""
                });
                window.location.href = "/login";
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            className="w-full h-screen bg-center bg-cover flex items-center justify-center"
            style={
                {
                    backgroundImage: `url('${signupBg}')`,
                    filter: "grayscale(100%)"
                }
            }
        >
            <div
                className="w-full h-full absolute inset-0 z-30 opacity-40 pointer-events-none"
                style={{ backgroundImage: `url(${texture})` }}
            >

            </div>

            <div
                className="min-w-2xs rounded-3xl bg-white p-4 flex flex-col items-center gap-6"
            >
                <h1
                    className="font-bold text-zinc-900 leading-none mt-3"
                    style={
                        {
                            fontFamily: "Funnel Sans",
                            fontSize: "clamp(2rem, 5vw, 2rem)"
                        }
                    }
                >
                    Signup
                </h1>

                {/* form */}
                <form
                    onSubmit={handleSignup}
                    className="w-full h-fit flex flex-col gap-4 mt-6"
                >
                    <input
                        type="text"
                        placeholder="Name *"
                        className="w-full pt-2 border-b border-b-zinc-800 focus:outline-none"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <input
                        type="email"
                        placeholder="Email *"
                        className="w-full pt-2 border-b border-b-zinc-800 focus:outline-none"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Password *"
                        className="w-full pt-2 border-b border-b-zinc-800 focus:outline-none"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        className="w-full h-10 bg-zinc-900 text-white rounded-lg mt-2 cursor-pointer active:scale-95 transition-transform duration-200 flex items-center justify-center"
                        style={{ fontFamily: "Funnel Sans" }}
                        disabled={loading}
                    >
                        {loading ? <LoadingSpinner size={24} color="#fff" ariaLabel="Signing up..." /> : "Signup"}
                    </button>

                    {/* login link */}
                    <Link to="/login">
                        <p className="text-xs text-center italic">Already have an account? <span className="text-blue-600">Login</span></p>
                    </Link>
                </form>
            </div>

        </main>
    )
}

export default Signup