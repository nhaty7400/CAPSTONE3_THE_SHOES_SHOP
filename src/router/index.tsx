import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import BaseTemplate from "../templates/base/base.template.tsx";
import HomeSkeleton from "src/pages/home/home.skeleton.tsx";
const Home = lazy(() => import("../pages/home"));
const Carts = lazy(() => import("../pages/carts"));
const Login = lazy(() => import("../pages/login"));
const Profile = lazy(() => import("../pages/profile"));
const Register = lazy(() => import("../pages/register"));
const Search = lazy(() => import("../pages/search"));
const Detail = lazy(() => import("../pages/detail"));

export const router = createBrowserRouter([
  {
    element: <BaseTemplate />,
    children: [
      {
        index: true,
        path: "/",
        element: (
          <Suspense fallback={<HomeSkeleton/>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "carts",
        element: <Suspense fallback={<>Skeletion Home</>}>
        <Carts />
      </Suspense>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "detail/:productId",
        element: <Detail />,
      },
    ],
  },
]);
