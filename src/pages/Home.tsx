import {  useNavigate } from "react-router-dom";
import FeaturedTournament from "../components/FeaturedTournament";
import LeaderboardPreview from "../components/LeaderboardPreview";
import Concept from "../components/Concept";
import Partner from "../components/Partner";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Hero Section */}
      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
      >
        {/* Background glow */}
        <div className="absolute left-1/2 top-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E50914]/10 blur-[120px]" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">

          {/* Small Label */}
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#E50914] sm:text-base">
            Nepal's Esports Platform
          </p>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            Compete.
            <br />
            <span className="text-[#E50914]">Represent.</span>
            <br />
            Conquer.
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Join competitive esports tournaments, represent your team,
            and climb the national leaderboard.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <button onClick={() => navigate("/Tournaments")}
            className="w-full rounded-lg bg-[#E50914] px-7 py-3.5 font-semibold text-white transition duration-300 hover:bg-[#ff1e2d] sm:w-auto">
              Explore Tournaments
            </button>

            <button className="w-full rounded-lg border border-white/20 px-7 py-3.5 font-semibold text-white transition duration-300 hover:border-[#E50914] hover:text-[#E50914] sm:w-auto">
              Create Your Team
            </button>

          </div>
        </div>
      </section>

      <FeaturedTournament/>
      <LeaderboardPreview/>
      <Concept/>
      <Partner/>
      <Footer/>
    </main>
  );
};

export default Home;