import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { Navbar } from './components/NavBar';
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={<Home/>}>
            </Route>
            <Route path="/signup"
              element={<Signup/>}
            />
            <Route path="/login"
              element={<Login/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
