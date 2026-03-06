import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../../../stores/auth.store"
import AccountProfile from "../../../components/AccountProfile";
import { useUserAccountStore } from "../../../stores/useraccount.store";
import { useEffect } from "react";

const MyAccount = () => {

  const logout = useLoginStore(state => state.logout);

  const navigate = useNavigate();

  const getAccountInfo = useUserAccountStore(state => state.getAccountInfo);
  const accountInfo = useUserAccountStore(state => state.accountInfo);

  useEffect(() => {
    getAccountInfo(); // Call the function to fetch account information when the component mounts
  }, [getAccountInfo]); // Empty useEffect to trigger re-render when the component mounts

  const handleLogout = async () => {
    await logout(); // Call the logout function from the store
    navigate("/login"); // Navigate to the login page after logging out
  }


  return <>
    <main
      className="w-full min-h-screen bg-zinc-800 pt-20 px-6 md:px-8 flex flex-col items-center justify-center"
    >
      <AccountProfile user={accountInfo} onLogout={handleLogout} />

    </main>
  </>
}

export default MyAccount