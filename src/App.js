import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Index from "./Admin/Index";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Index />} />
      </Routes>
    </div>
  );
}

export default App;
