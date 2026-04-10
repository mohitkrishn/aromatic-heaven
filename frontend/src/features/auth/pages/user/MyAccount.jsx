import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../../../../stores/auth.store";
import AccountProfile from "../../../../components/user/AccountProfile";
import { useUserAccountStore } from "../../../../stores/useraccount.store";
import { useEffect, useState } from "react";
import LoadingSkelton from "../../../../components/common/LoadingSkelton";
import toast from "react-hot-toast";

const MyAccount = () => {

  const logout = useLoginStore(state => state.logout);

  const navigate = useNavigate();

  const getAccountInfo = useUserAccountStore(state => state.getAccountInfo);
  const accountInfo = useUserAccountStore(state => state.accountInfo);

  // error state for logout (should come from auth store, not user account store)
  const logoutError = useLoginStore(state => state.error);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccount = async () => {
      setLoading(true);
      await getAccountInfo();
      setLoading(false);
    };
    fetchAccount();
  }, [getAccountInfo]);

  const handleLogout = async () => {
    await logout(); // Call the logout function from the store

    if (logoutError) {
      toast.error("Logout failed"); // Always show static error message
      return;
    }

    toast.success("Logged out successfully"); // Always show static success message

    navigate("/login");
  }


  return <>
    <main
      className="w-full min-h-screen bg-zinc-800 pt-20 px-6 md:px-8 flex flex-col items-center justify-center"
    >
      {loading ? (
        <div className="w-full max-w-md mx-auto">
          <LoadingSkelton height={120} width="100%" count={1} className="mb-6" />
          <LoadingSkelton height={20} width="60%" count={2} />
        </div>
      ) : (
        <AccountProfile user={accountInfo} onLogout={handleLogout} />
      )}
    </main>
  </>
}

export default MyAccount