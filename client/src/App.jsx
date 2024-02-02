import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PromptInput from "./pages/PromptInput";
import "./App.css";

const router=createBrowserRouter([
  {
    path:"/",
    element:<PromptInput/>,
    errorElement: <Error/>
  }
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
