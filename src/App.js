import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./landing/landing.js";
import Home from "./home/home";
import UserProvider from "./provider/userprovider";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
