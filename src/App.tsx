import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./Page/RootPage";
import HomePage from "./Page/HomePage";
import MoviePage from "./Page/moviePage";

const routers = createBrowserRouter([
  { path: "/", element: <RootPage />,
    children: [
      { path: "/", element: <HomePage /> },
  ]},
  { path: "/movie/:id", element: <MoviePage />},
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
