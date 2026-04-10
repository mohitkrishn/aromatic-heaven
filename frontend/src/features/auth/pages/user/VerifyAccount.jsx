import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyAccount } from "../../services/auth.api";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";

const VerifyAccount = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verify = async () => {
            setLoading(true);
            try {
                const response = await verifyAccount(token);
                if (response.success) {
                    navigate("/login");
                }
                // Optionally handle error or show message
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        verify();
    }, [token, navigate]);

    return (
        <main className="w-full h-screen flex items-center justify-center">
            {loading && <LoadingSpinner size={32} color="#222" ariaLabel="Verifying account..." />}
        </main>
    );
}

export default VerifyAccount