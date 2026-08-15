const Contact = () => {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/neparena61"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/neparena/"
    },
    {
      name: "Tiktok",
      url: "https://www.tiktok.com/@neparena"
    },
  ];
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E50914]">
            Contact Us
          </p>

          <h1 className="mt-3 font-bold text-3xl sm:text-4xl lg:text-5xl">
            Get In Touch With NepArena
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
            Have a question, suggestion, or want to work with us?
            Send us a message and we will get back to you.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid mx-auto max-w-6xl gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#0D0D0D] p-6 sm:p-8">
          
            <h2 className="text-2xl font-bold">
              Connect With Us
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Follow NepArena on social media to stay updated with
              tournaments, announcements, and esports news.
            </p>

            <div className="mt-8 space-y-4">
              {socialLinks.map((app) =>(
                <a key={app.name}
                href={app.url}
                target="blank"
                className="block rounded-lg border border-white/10 px-4 py-3 text-sm text-gray-300 transition hover:border-[#E50914] hover:text-white">
                  {app.name}
                </a>
              ))}
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm text-gray-400">
                Email
              </p>
              <a href="mailto:sugamstha619@gmail.com"
              className="mt-2 block text-sm font-semibold text-white hover:text-[#E50914]">
                sugamstha619@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact;