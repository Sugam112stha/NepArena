import logo from "../assets/logo/logo1.png"
const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050505] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div>

                    <img src={logo}
                    alt="NepArena" 
                    className="h-10 w-auto"/>

                    <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
                        Nepal's esports tournament platform built to connect
                        teams, players, and competitive opportunities.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold">
                        Quiks Link
                    </h3>
                </div>

                <div className="font-semibold">
                    Follow Us
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer