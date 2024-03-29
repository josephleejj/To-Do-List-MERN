import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export const Navbar = () => {

    const {logout} = useLogout()
    const {user} = useAuthContext()


    return (
        <header>
            <div className="container">
                <Link to ='/'>
                    <h1>Home</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={logout}>Log Out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
                
            </div>
        </header>
    )
}