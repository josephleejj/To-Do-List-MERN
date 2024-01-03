import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to ='/'>
                    <h1>Home</h1>
                </Link>
                <nav>
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                </nav>
                
            </div>
        </header>
    )
}