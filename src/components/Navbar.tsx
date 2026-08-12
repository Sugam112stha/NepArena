import {Link} from "react-router-dom";
import logo from "../assets/logo/logo1.png";
const Navbar = () => {
    const navItems = [
        {name: "Home", path: "/"},
        {name: "About", path: "/about"},
        {name: "Tournaments", path:"/tournaments"},
        {name: "Leaderboard", path: "/leaderboard"},
        {name: "Contact", path: "/contact"},
    ]
  return (
    <nav>
        <Link to="/">
        <img src={logo} alt="NepArena" className="h-12 w-auto"/>
        </Link>

        {navItems.map((items) => (
            <Link key={items.name} to={items.path}>
                {items.name}
            </Link>
        ))}
    </nav>
  )
}

export default Navbar;