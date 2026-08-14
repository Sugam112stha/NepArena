import { useNavigate } from "react-router-dom"

const Partner = () => {
    const navigate = useNavigate();
  return (
    <section className="bg-[#050505] px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
            <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E50914]">
                    Our Partners
                </p>

                <h2 className="mt-3 font-bold text-3xl sm:text-4xl">
                    Grow Esport With NepArena
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
                    Partner with NepArena to support competitive esports and help
                    create more opportunities for teams and players across Nepal.
                </p>

                <button onClick={() => navigate("/Contact")}
                    className="mt-8 rounded-lg bg-[#E50914] px-6 py-3 text-sm font-semibold transition hover:bg-[#ff1e2d]">
                    Become a Partner
                </button>
            </div>
        </div>
    </section>
  )
}

export default Partner