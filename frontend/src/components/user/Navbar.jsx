/* eslint-disable no-unused-vars */
import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { NavLink, useNavigate } from "react-router-dom"
import brandLogo from "../../assets/images/LOGO_BRAND@PNG_.png"

// MenuBtn Component for menu reference
// const MenuBtn = ({ children, delay, ...props }) => {
//     return <motion.div
//         className={props.className}
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ delay: delay, duration: 0.3 }}
//     >
//         {children}
//     </motion.div>
// }

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleMobileMenu = () => {
        setIsOpen(!isOpen);
    }

    const navVariants = {
        open: {
            width: '300px',
            height: 'auto',
            borderRadius: '25px',
            backgroundColor: 'rgb(24 24 27)',

            transition: {
                duration: 0.8,
                ease: 'easeInOut',
            }
        },

        closed: {
            height: '45px',
            width: '235px',
            borderRadius: '50px',

            transition: {
                duration: 0.6,
                ease: 'easeInOut',
            }
        }
    }

    // close the menu on outside click

    const menuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleClickOutside, true);
        }
        else {
            document.removeEventListener('click', handleClickOutside, true);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };

    }, [isOpen]);

    const navigate = useNavigate();

    return (
        <nav
            className="w-full fixed top-0 left-0 z-40 flex items-center justify-center py-6 px-8"
        >
            {/* animated navbar for smaller screens */}
            <motion.div
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                variants={navVariants}
                style={{ willChange: "transform, width, height, border-radius, background-color" }}
                className="w-full px-4 border border-white bg-zinc-900/50 backdrop-blur-md rounded-full flex flex-col items-center justify-between lg:hidden"
            >
                <div
                    className="logo-icon w-full h-full flex items-center justify-between"
                >
                    {/* brand logo */}
                    <div
                        className="max-w-[75%] h-full py-2 -ml-4 flex items-center justify-center"
                    >
                        <NavLink to="/" className="h-full">
                            <img
                                src={brandLogo}
                                alt="logo"
                                className="w-full h-full object-cover"
                            />
                        </NavLink>
                    </div>

                    {/* mobile menu icon */}
                    <div
                        ref={menuRef}
                        onClick={handleMobileMenu}
                        className="w-fit h-fit mt-1"
                    >
                        {
                            !isOpen ? (
                                <Menu
                                    size={22}
                                    color="white"
                                />
                            ) : (
                                <X
                                    size={25}
                                    color="white"
                                />
                            )
                        }
                    </div>
                </div>

                {/* mobile menu references (only open when menu is open) */}
                <AnimatePresence>
                    {
                        isOpen && <motion.div
                            className='w-full pt-4 pb-4 flex flex-col gap-2.5 items-center justify-center'
                            style={{ fontFamily: "Outfit" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ xHeight: 0, opacity: 0 }}
                            transition={{ delay: 0.1, duration: 0.2 }}
                        >

                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                                className="w-full text-center px-4 py-2 rounded-full text-white text-[1.25rem] leading-5"
                            >
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => isActive ? "border-b border-white" : ""}
                                >
                                    Home
                                </NavLink>

                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="w-full text-center px-4 py-2 rounded-full text-white text-[1.25rem] leading-5"
                            >
                                <NavLink
                                    to="/signup"
                                    className={({ isActive }) => isActive ? "border-b border-white" : ""}
                                >
                                    Signup
                                </NavLink>

                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                className="w-full text-center px-4 py-2 rounded-full text-white text-[1.25rem] leading-5"
                            >
                                <NavLink
                                    to="/services"
                                    className={({ isActive }) => isActive ? "border-b border-white" : ""}
                                >
                                    Our Services
                                </NavLink>

                            </motion.div>


                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="w-full text-center px-4 py-2 rounded-full text-white text-[1.25rem] leading-5"
                            >
                                <NavLink
                                    to="/my-account"
                                    className={({ isActive }) => isActive ? "border-b border-white" : ""}
                                >
                                    My Account
                                </NavLink>

                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="w-full text-center px-4 py-2 rounded-full text-white text-[1.25rem] leading-5"
                            >
                                <NavLink
                                    to="/my-bookings"
                                    className={({ isActive }) => isActive ? "border-b border-white" : ""}
                                >
                                    My Bookings
                                </NavLink>

                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="w-full rounded-full py-5.5 bg-white text-black text-xl leading-0"
                                onClick={() => navigate("/services")}
                            >
                                Book Service
                            </motion.button>

                        </motion.div>
                    }
                </AnimatePresence>

            </motion.div>

            {/* animated navbar for larger screens min. 900px */}
            <motion.div
                className="hidden min-w-lg h-13 px-4 bg-zinc-600/20 border border-white backdrop-blur-md rounded-full lg:flex items-center-safe gap-10"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
                <div
                    className="logo max-w-1/2 h-full p-1 -ml-4 flex items-center justify-center"
                >
                    <NavLink to="/" className="h-full">
                        <img
                            src={brandLogo}
                            alt="logo"
                            className="w-full h-full object-cover"
                        />
                    </NavLink>
                </div>

                {/* Pages Links */}
                <div
                    className="flex items-center gap-12"
                >
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "text-white text-[1rem] leading-5 font-['Outfit'] border-b-2 border-white" : "text-white text-[1rem] leading-5 font-['Outfit']"}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/signup"
                        className={({ isActive }) => isActive ? "text-white text-[1rem] leading-5 font-['Outfit'] border-b-2 border-white" : "text-white text-[1rem] leading-5 font-['Outfit']"}
                    >
                        Signup
                    </NavLink>

                    <NavLink
                        to="/services"
                        className={({ isActive }) => isActive ? "text-white text-[1rem] leading-5 font-['Outfit'] border-b-2 border-white" : "text-white text-[1rem] leading-5 font-['Outfit']"}
                    >
                        Our Services
                    </NavLink>

                    <NavLink
                        to="/my-account"
                        className={({ isActive }) => isActive ? "text-white text-[1rem] leading-5 font-['Outfit'] border-b-2 border-white" : "text-white text-[1rem] leading-5 font-['Outfit']"}
                    >
                        My Account
                    </NavLink>

                    <NavLink
                        to="/my-bookings"
                        className={({ isActive }) => isActive ? "text-white text-[1rem] leading-5 font-['Outfit'] border-b-2 border-white" : "text-white text-[1rem] leading-5 font-['Outfit']"}
                    >
                        Bookings
                    </NavLink>

                    <button
                        className="px-6 py-2 bg-white text-black text-[1rem] leading-5 rounded-full font-['Outfit'] cursor-pointer"
                        onClick={() => navigate("/services")}
                    >
                        Book Service
                    </button>
                </div>

            </motion.div>
        </nav>
    )
}

export default Navbar