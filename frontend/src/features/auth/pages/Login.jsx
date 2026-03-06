import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import loginBg from "../../../assets/images/PC-14.jpg";
import { useLoginStore } from '../../../stores/auth.store';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const [seePassword, setSeePassword] = useState("password");

    const navigate = useNavigate();
    const location = useLocation();

    const loginStore = useLoginStore(state => state.login);
    const user = useLoginStore(state => state.user);
    const loading = useLoginStore(state => state.loading);

    // After login, redirect to original page or fallback
    useEffect(() => {
        if (user) {
            const redirectPath = location.state?.from?.pathname || "/my-account";

            navigate(redirectPath, { replace: true });
        }
    }, [user, navigate, location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await loginStore(userData);

        // Reset form
        setUserData({
            email: "",
            password: ""
        });
    };

    const passwordVisiblity = () => {
        if (seePassword === "password") {
            setSeePassword("text");
        } else {
            setSeePassword("password");
        }
    }

    return (
        <main
            className="w-full h-screen bg-zinc-900 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${loginBg})`, filter: "grayscale(100%)" }}
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
                    Login
                </h1>

                {/* form */}
                <form
                    onSubmit={handleLogin}
                    className="w-full h-fit flex flex-col gap-4 mt-6"
                >
                    <input
                        type="email"
                        placeholder="Email *"
                        className="w-full border-b pt-2 border-b-zinc-800 focus:outline-none"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                    {/* password */}
                    <div className='w-full flex justify-between items-center pt-2 border-b border-b-zinc-800'>
                        <input
                            type={`${seePassword}`}
                            placeholder="Password *"
                            className="focus:outline-none"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                        />
                        {/* toggle icon for password */}
                        {
                            seePassword === "password" ? (
                                <Eye
                                    size={19}
                                    className="cursor-pointer"
                                    onClick={passwordVisiblity}
                                />
                            ) : (
                                <EyeOff
                                    size={19}
                                    className="cursor-pointer"
                                    onClick={passwordVisiblity}
                                />
                            )
                        }
                    </div>
                    <Link to="/forgot-password" className="text-xs text-center italic leading-none">Forgot Password?</Link>

                    <button
                        type="submit"
                        className="w-full h-10 bg-zinc-900 text-white rounded-lg mt-2 cursor-pointer active:scale-95 transition-transform duration-200"
                        style={{ fontFamily: "Funnel Sans" }}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {/* login link */}
                    <Link to="/signup">
                        <p className="text-xs text-center italic">Don't have an account? <span className="text-blue-600">Signup</span></p>
                    </Link>
                </form>
            </div>
        </main>
    );
};

export default Login;