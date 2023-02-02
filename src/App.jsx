// This is a React Router v6 app
import { useParams, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  const { id } = useParams();
  console.log("id :>> ", id);
  return (
    <Routes>
      <Route path="/">
        <Route path=":id" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
