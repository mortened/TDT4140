// importing components from react-router-dom package
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Topplister from "./components/Topplister";
import Bokside from "./components/Bokside";
import ListeSide from "./components/ListeSide";
import AddBooks from "./components/AddBooks";
import ReviewBook from "./components/ReviewBook";
import Search from "./components/Search";
import Favoritter from "./components/Favoritter";
import ToppRated from "./components/ToppRated";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Favoritter" element={<Favoritter />} />
        <Route path="/AddBooks" element={<AddBooks />} />
        <Route path="/Topplister" element={<Topplister />} />
        <Route path="/ReviewBook/:bookID" element={<ReviewBook />} />
        <Route path="/ToppLister/:listID" element={<ListeSide />} />
        <Route path="/book/:bookID" element={<Bokside />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/ToppRated" element={<ToppRated />} />
      </Routes>
    </>
  );
}

export default App;
