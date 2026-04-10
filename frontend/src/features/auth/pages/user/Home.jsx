import { MoveRight } from "lucide-react"
import mainBg from "../../../../assets/images/PC-15.jpg"
import { useNavigate } from "react-router-dom";
import { useServicesStore } from "../../../../stores/services.store";
import { useEffect } from "react";
import LoadingSkelton from "../../../../components/common/LoadingSkelton";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";

const Home = () => {

  const navigate = useNavigate();

  // service data from store
  const services = useServicesStore(state => state.services);
  const getServices = useServicesStore(state => state.getServices);
  const loading = useServicesStore(state => state.loading);

  useEffect(() => {
    if (!services) {
      getServices();
    }
  }, [services, getServices]);

  return (
    <main
      className="w-full flex flex-col items-center justify-center z-40"

    >
      <section
        className="hero w-full h-screen px-6 pt-20 flex flex-col items-center justify-center bg-center bg-cover relative z-10"
        style={{ backgroundImage: `url(${mainBg})`, filter: "grayscale(100%)" }}
      >
        <div className="w-full max-w-7xl">
          <h1
            className="text-[clamp(2.25rem,7vw,6.5rem)] text-center text-white font-black leading-[clamp(2.5rem,7vw,6.5rem)]"
            style={{ fontFamily: "Lexend Deca" }}
          >   Because You Deserve a Moment of Heaven.
          </h1>

          <p className="text-center text-white mt-4 text-[clamp(1rem,1.5vw,1.5rem)] leading-[clamp(1.25rem,1.5vw,1.5rem)]" style={{ fontFamily: "Funnel Sans" }}>Step away from the world and rediscover yourself through the healing power of pure aromatherapy.</p>
        </div>

        <div className="cta w-full flex items-center justify-center mt-10">
          <button
            className="bg-white text-black font-bold py-3.5 px-8 rounded-full mt-2 cursor-pointer active:scale-95 transition-transform duration-200 flex items-center justify-center-safe gap-2"
            style={{ fontFamily: "Funnel Sans" }}
            onClick={() => {
              navigate("/services");
            }}
          >
            Start Your Journey <MoveRight />
          </button>
        </div>

        <div className="cta-login w-full flex items-center justify-center mt-4">
          <button
            className="bg-white text-black font-bold py-3.5 px-10 rounded-full mt-2 cursor-pointer active:scale-95 transition-transform duration-200 flex items-center justify-center-safe gap-2"
            style={{ fontFamily: "Funnel Sans" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>

      </section>

      {/* service section */}
      <section
        className="w-full bg-black flex flex-col items-center justify-center px-6 py-10"
      >
        {
          loading ? <LoadingSkelton width="100%" height={30} shape="rect" count={3} className="mb-4" /> : (
            services && services.length > 0 && (
              services.map((service, idx) => (
                <div
                  className={`w-full flex flex-col ${idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-center mb-10 rounded-sm border border-gray-700`}
                  key={service._id}
                >

                  {/* image section */}
                  <div className="w-full md:w-1/2">
                    {loading ? <LoadingSpinner /> : <img
                      src={service.image}
                      alt="Main Background"
                      className="w-full object-cover object-center"
                      loading="lazy"
                    />}
                  </div>

                  {/* text section */}
                  < div className="w-full md:w-1/2 py-6 px-2 md:px-6 flex flex-col items-start justify-center" >
                    <h2
                      className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold leading-none text-gray-300 mb-2.5"
                      style={{ fontFamily: "Lexend Deca" }}
                    >
                      {service.name}
                    </h2>
                    <p
                      className="text-gray-400 text-[clamp(0.875rem,1.3vw,1.3rem)]"
                      style={{ fontFamily: "Funnel Sans" }}
                    >
                      {service.description}
                    </p>
                  </div>

                </div>
              ))
            )
          )
        }
      </section >

    </main >

  )
}

export default Home