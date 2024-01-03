import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Home } from './pages/Home'
import { Navbar } from './components/NavBar';
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useAuthContext } from './hooks/useAuthContext'

function App() {

  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className='pages'>
          <Routes>
            <Route 
                path="/" 
                // element={user ? <Home /> : <Navigate to="/login" />} 
                element={<Home />}
              />
              <Route 
                path="/login" 
                // element={!user ? <Login /> : <Navigate to="/" />} 
                element={<Login />}
              />
              <Route 
                path="/signup" 
                // element={!user ? <Signup /> : <Navigate to="/" />} 
                element={<Signup />}
              />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
