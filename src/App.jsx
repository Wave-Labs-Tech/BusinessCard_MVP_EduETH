import './App.css';
// import Navbar from './components/Navbar.js';
import Dashboard from './components/Dashboard';
import LastCard from './components/LastCard';
// import MintCard from './components/MintCard';
import CardPage from './components/CardPage';
// import Minter from './components/Minter';
import Viewer from './components/Viewer';
import CardDetails from './components/CardDetails';
// import ReactDOM from "react-dom/client";

import {
  // BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          {/* <Route path="/CardPage/:tokenId" element={<CardPage />}/>         */}
          <Route path="/LastCard" element={<LastCard />}/>
          {/* <Route path="/MintCard" element={<MintCard />}/>   */}
          {/* <Route path="/CardPage" element={<CardPage />} />            */}
          <Route path="/CardPage/:cardId" element={<CardPage />} />           
          <Route path="/CardDetails" element={<CardDetails />}/>                       
          <Route path="/viewer" element={<Viewer />}/>             
        </Routes>
    </div>
  );
}

export default App;
