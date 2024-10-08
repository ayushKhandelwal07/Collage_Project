import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Appbar from './pages/Appbar';
import Language from './pages/Language';
import SearchBar from './pages/SearchBar';
// import Auth from './pages/Auth';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Potential_disease from './pages/Potential_disease';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/appbar" element={<Appbar />} /> */}
        <Route path="/language" element={<Language />} />
        <Route path="/search" element={<SearchBar />} />  
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/disease" element={<Potential_disease />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;