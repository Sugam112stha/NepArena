const About = () => {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto max-w-6xl">
        <div className="px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E50914]">
            About NepArena
          </p>

          <h1 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Building Nepal's Competitive Esports Community
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            NepArena is a platform built to connect players, teams,
            and tournaments while creating a stronger competitive
            esports community across Nepal.
          </p>
        </div>
      </section>
    </main>
  )
}

export default About;