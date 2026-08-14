import logo from "../assets/logo/logo1.png"
const Footer = () => {
  return (
    <footer>
        <div>
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