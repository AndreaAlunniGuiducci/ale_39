import {
  Link,
  Outlet,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import "./App.css";
import Level_1 from "./pages/level_1";
import Level_2 from "./pages/level_2/index";
import Level_3 from "./pages/level_3";
import Level_4 from "./pages/level_4";
import { routes } from "./utils/routes";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <>
        <div>
          HEADER <Link to={routes.home}>HOME</Link>{" "}
          <Link to={routes.level_1}>LEVEL 1</Link>{" "}
          <Link to={routes.level_2}>LEVEL 2</Link>{" "}
          <Link to={routes.level_3}>LEVEL 3</Link>{" "}
          <Link to={routes.level_4}>LEVEL 4</Link>
        </div>
        <Outlet />
      </>
    ),
    children: [
      { path: routes.level_1, element: <Level_1 /> },
      { path: routes.level_2, element: <Level_2 /> },
      { path: routes.level_3, element: <Level_3 /> },
      { path: routes.level_4, element: <Level_4 /> },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
