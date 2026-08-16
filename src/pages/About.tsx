const About = () => {
  const steps = [
  {
    number: "01",
    title: "Create Team",
    description: "Create your team and add your players.",
  },
  {
    number: "02",
    title: "Join Tournament",
    description: "Find a tournament and register your team.",
  },
  {
    number: "03",
    title: "Compete",
    description: "Compete against other teams.",
  },
  {
    number: "04",
    title: "Get Ranked",
    description: "Earn points and climb the leaderboard.",
  },
];

  const features = [
        {
          title: "Competitive Tournaments",
          description: "Discover organized tournaments and compete against teams across Nepal.",
        },
        {
          title: "Team Rankings",
          description: "Track your team's performance and climb the NepArena leaderboard.",
        },
        {
          title: "Verified Teams",
          description: "Build trust through verified teams and registered players.",
        },
        {
          title: "Growing Community",
          description: "Connect with players and teams and become part of Nepal's esports community.",
        },
      ];

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

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>
              <p className="text-sm font-semibold uppercase text-[#E50914] tracking-[0.25em]">
                Who we are
              </p>

              <h2 className="mt-3 font-bold text-3xl sm:text-4xl lg:text-5xl">
                What is NepArena?
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
                NepArena is a competitive esports platform created for
                players and teams in Nepal. We provide a place where teams
                can discover tournaments, compete against other teams, and
                build their reputation through competitive performance.
              </p>

              <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
                Starting with Free Fire, our goal is to create an organized
                and accessible competitive environment for Nepal's growing
                esports community.
              </p>
            </div>

            <div className="border border-white/10 rounded-xl bg-[#0D0D0D] p-8">
              <h3 className="text-xl font-bold">
                Built for Competition
              </h3>

              <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
                From team creation and tournament registration to rankings
                and competitive results, NepArena brings the essential
                parts of competitive esports into one platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 bg-[#0A0A0A]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase teacking-[0.25em] text-[#E50914]">
            Our Mission
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Empowering Nepal's Next Generation of Esports Talent
          </h2>

          <p className="mt-6 text-sm leading-7 text-gray-400 sm:text-base">
            Our mission is to provide a fair, transparent, and competitive
            platform where every team in Nepal has the opportunity to grow,
            compete, and earn recognition through skill and performance.
          </p>

          <div className="grid mt-10 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-[#050505] p-5">
              <h3 className="text-2xl font-bold text-[#E50914]">
                Fair
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Equal opportunity for every team.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#050505] p-5">
            <h3 className="text-2xl font-bold text-[#E50914]">
              Competitive
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Rankings based on real tournament performance.
            </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#050505] p-5">
              <h3 className="text-2xl font-bold text-[#E50914]">
                Community
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Connecting players, teams, and organizers across Nepal.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E50914]">
            How it works
          </p>
          <h3 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            How NepArena Works
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
            From creating your team to earning
            your place on the leaderboard...
          </p>
        </div>

        <div className="grid mt-10 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) =>(
            <div key={step.number}
            className="rounded-xl border border-white/10 bg-[#0D0D0D] p-6">
              <span className="font-bold text-3xl text-[#E50914]">
                {step.number}
              </span>
              <h3 className="mt-5 text-xl font-bold">
                {step.title}
              </h3>
              <p className="text-sm text-gray-400 mt-3 leading-6">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-16 lg:py-20">

        <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#E50914]">
              Why NepArena
            </p>
            <h3 className="text-3xl font-bold mt-3 sm:text-4xl">
              Why Choose NepArena?
            </h3>
            <p className="text-sm text-gray-400 mx-auto max-w-2xl mt-4 sm:text-base">
               Everything you need to compete, connect, and grow in
               Nepal's esports community.
            </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) =>(
            <div key={feature.title}
            className="rounded-xl border border-white/10 bg-[#050505] p-6 transition hover:border-[#E50914]/50">
              <h3 className="text-xl font-bold">
                {feature.title}
              </h3>
              <p className="text-sm leading-6 text-gray-400 mt-3">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </section>
    </main>
  )
}

export default About;