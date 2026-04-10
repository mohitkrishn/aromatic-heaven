import Navbar from '../components/user/Navbar'
import Footer from '../components/user/Footer'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
    return <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
}

export default AppLayout