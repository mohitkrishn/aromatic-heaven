import { MoveRight } from "lucide-react"
import mainBg from "../../../assets/images/PC-15.jpg"
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (
    <main
      className="w-full h-screen flex flex-col items-center justify-center bg-center bg-cover z-40"
      style={{ backgroundImage: `url(${mainBg})`, filter: "grayscale(100%)" }}
    >
      <section className="hero w-full px-6 pt-20 flex flex-col items-center justify-center">
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
      </section>

    </main>

  )
}

export default Home