import React, { useEffect } from 'react'
import ServiceEach from '../../../components/ServiceEach'
import { useServicesStore } from '../../../stores/services.store'

const Services = () => {

    const getServices = useServicesStore(state => state.getServices);
    const services = useServicesStore(state => state.services);

    useEffect(() => {
        getServices();
    }, [getServices]);

    return (
        <main
            className='w-full min-h-screen px-6 bg-zinc-900 py-25 md:px-10'
        >
            {services ? (
                <div
                    className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
                >
                    {services.map((service, index) => (
                        <ServiceEach service={service} key={index} />
                    ))}
                </div>
            ) : (
                <div
                    className='w-full flex items-center justify-center'
                >
                    <h1
                        className='text-2xl font-bold text-white'
                        style={{ fontFamily: "Lexend Deca" }}
                    >
                        Loading...
                    </h1>
                </div>
            )}
        </main>
    )
}

export default Services