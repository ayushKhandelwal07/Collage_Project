import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Appbar from './pages/Appbar';
import SearchBar from './pages/SearchBar';
// import Auth from './pages/Auth';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Potential_disease from './pages/Potential_disease';
import Skin_disease from './pages/Skin_disease';
import Medicine from './pages/Medicine';
import Skin_Page from './pages/Skin_Page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/appbar" element={<Appbar />} /> */}
        <Route path="/search" element={<SearchBar />} />  
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/disease" element={<Potential_disease />} />
        <Route path="/skin" element={<Skin_disease />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/medicine/page" element={<Medicine />} />
        <Route path="/skin/page" element={<Skin_Page />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;