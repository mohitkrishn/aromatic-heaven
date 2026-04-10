import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../../stores/admin/auth.admin";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminLogin = () => {

    const [seePassword, setSeePassword] = useState("password");

    const [userData, setUserData] = useState({
        adminId: "",
        password: ""
    });

    const handlePasswordVisiblity = () => {
        if (seePassword === "password") {
            setSeePassword("text");
        } else {
            setSeePassword("password");
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value
        });
    }

    const user = useAuthStore(state => state.user);
    const login = useAuthStore(state => state.login);
    const loading = useAuthStore(state => state.loading);
    const message = useAuthStore(state => state.message);
    const error = useAuthStore(state => state.error);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            toast.success(message);

            const redirectedPath = location.state?.from?.pathname || "/admin/dashboard";

            navigate(redirectedPath, { replace: true });
        }

        if (error) {
            toast.error(error);
        }

    }, [user, navigate, location.state, message, error]);

    const handleLogin = async (e) => {
        e.preventDefault();

        await login(userData);

        if (user) {
            // Reset form
            setUserData({
                adminId: "",
                password: ""
            });
        }
    }

    return (
        <main className="w-full h-screen bg-zinc-800 flex items-center justify-center">
            {/* Login Form */}
            <form className="w-full max-w-sm px-4 py-6 bg-zinc-900 border border-yellow-600 rounded-2xl">
                <h1 className="text-2xl font-bold text-white text-center mb-4">Admin Login</h1>
                <div className="mb-4">
                    <label
                        htmlFor="adminId"
                        className="block text-white font-semibold mb-2"
                    >
                        Admin Id
                    </label>
                    <input
                        type="text"
                        id="adminId"
                        name="adminId"
                        className="w-full p-2 rounded-md border border-white text-white"
                        value={userData.adminId}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-white font-semibold mb-2"
                    >
                        Password
                    </label>
                    <div className="w-full p-2 rounded-md border border-white flex items-center justify-between">
                        <input
                            type={seePassword}
                            id="password"
                            name="password"
                            className="w-full outline-none"
                            value={userData.password}
                            onChange={handleInputChange}
                        />
                        {/* Password visibility toggle */}
                        {
                            seePassword === "password" ? (
                                <Eye
                                    className="text-white cursor-pointer"
                                    onClick={handlePasswordVisiblity}
                                    size={18}
                                />
                            ) : (
                                <EyeClosed
                                    className="text-white cursor-pointer"
                                    onClick={handlePasswordVisiblity}
                                    size={16}
                                />
                            )
                        }
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-white text-black font-bold py-2 rounded-md mt-4 active:scale-95 transition-transform duration-200"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? <LoadingSpinner /> : "Login"}
                </button>
            </form>
        </main>
    )
}

export default AdminLogin;