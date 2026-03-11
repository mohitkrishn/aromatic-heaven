import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useServicesStore } from "../stores/services.store";
import { useState } from "react";
import LoadingSkelton from "./LoadingSkelton";

const ServiceEach = ({ service }) => {
    const { name, subTitle, description, image, price } = service;

    const globalLoading = useServicesStore(state => state.loading);
    const [imgLoading, setImgLoading] = useState(true);

    const navigate = useNavigate();

    const handleBookService = (serviceId) => {
        // Implement the logic to book the service using the serviceId
        console.log(`Booking service with ID: ${serviceId}`);
        //navigate to the book service page with the serviceId as a parameter
        navigate(`/book-service/${serviceId}`);
    };

    return (
        <div
            className='w-full max-w-sm px-3 py-4 rounded-sm bg-zinc-800/50 border border-gray-700 mt-6'
        >
            {/* image section */}
            <div
                className='w-full h-64 rounded-sm mb-4 flex items-center justify-center relative'
            >
                {(globalLoading || imgLoading) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-800/30 z-10">
                        <LoadingSpinner size={32} color="#fff" ariaLabel="Loading image" />
                    </div>
                )}
                <img
                    src={image}
                    alt="service image"
                    className={`w-full h-full object-cover rounded-sm ${imgLoading ? "opacity-0" : "opacity-100"}`}
                    loading="lazy"
                    onLoad={() => setImgLoading(false)}
                    onError={() => setImgLoading(false)}
                />
            </div>

            {/* content section */}
            {
                globalLoading ? <LoadingSkelton count={2} height={50} /> : (<div
                    className='w-full space-y-2'
                >
                    <h2
                        className='text-2xl font-bold text-white leading-tight flex justify-between items-center'
                        style={{ fontFamily: "Lexend Deca" }}
                    >
                        {name}
                        <span className='text-sm font-bold'>&#8377; {price}</span>
                    </h2>
                    <p
                        className='text-white tracking-tight leading-tight flex justify-between items-center'
                        style={{ fontFamily: "Outfit" }}
                    >
                        {subTitle}
                    </p>

                    {/* hide and show long despcription */}
                    <section
                        className='w-full h-35 overflow-hidden text-sm text-gray-300 tracking-tight leading-tight'
                        style={{ fontFamily: "Funnel Sans" }}
                    >
                        {description}
                    </section>
                </div>)
            }


            {/* cta button */}
            <button
                className='cursor-pointer w-full mt-4 py-2 bg-white hover:bg-gray-300 text-black font-bold rounded-sm transition duration-300'
                style={{ fontFamily: "Lexend Deca" }}
                onClick={() => handleBookService(service._id)}
            >
                Book Now
            </button>
        </div>
    );
};

export default ServiceEach;