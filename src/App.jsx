import Layout from "./components/Layout";
import Home from "./pages/Home";
import Autorization from "./pages/Autorization";
import Search from "./pages/Search";
import ResultSearch from "./pages/ResultSearch";

import { Route, Routes } from "react-router";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="autorization" element={<Autorization />} />
          <Route path="search" element={<Search />} />
          <Route path="resultSearch" element={<ResultSearch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
