import Footer from "../components/Footer";

const Tournament = () => {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      <section className="px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E50914]">
            Tournaments
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Compete. Conquer. Become a Champion
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
            Discover upcoming esports tournaments, register your team,
            and compete against the best teams in Nepal.
          </p>

        </div>
      </section>

      <Footer />

    </main>
  );
};

export default Tournament;