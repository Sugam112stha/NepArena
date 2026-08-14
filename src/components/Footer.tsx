import logo from "../assets/logo/logo1.png"
const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050505] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div>
                <div>

                    <img src={logo}
                    alt="NepArena" 
                    className="h-10 w-auto"/>

                    <p>
                        Nepal's esports tournament platform built to connect
                        teams, players, and competitive opportunities.
                    </p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer