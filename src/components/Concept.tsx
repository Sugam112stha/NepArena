const Concept = () => {
    const steps = [
        {
            number : "01",
            title : "Create Account",
            description : "Register on NepArena."
        },
        {
            number : "02",
            title : "Create Team",
            description : "Build your team with your player."
        },
        {
            number : "03",
            title : "Verify Team",
            description : "Verify your player with their IGN and UID."
        },
        {
            number : "04",
            title : "Join Tournament",
            description : "Register and compite with your rivals."
        },
        {
            number : "05",
            title : "Complete & Rank",
            description : "Rise your team in the Top of the Nation."
        },
    ]
  return (
    <section className="bg-[#050505] px-4 py-16 text-white sm:px-6 sm-py-20">
        <div className="mx-auto max-w-6xl">

            <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E50914]">
                    How it Works
                </p>

                <h2 className="mt-3 text-3xl font-bold  sm:text-4xl">
                    Start Your Journey With Us
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
                     Create your team, join tournaments, and compete for the top spot.
                </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {steps.map((step) =>(
                    <div key={step.number}
                    className="rounded-xl border border-white/10 bg-[#0D0D0D] p-6">

                        <span className="font-bold text-[#E50914] text-sm">
                            {step.number}
                        </span>

                        <h3 className="mt-4 text-lg font-bold">
                            {step.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-400">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Concept