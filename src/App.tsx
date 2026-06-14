import { lazy, Suspense } from "react";
import type { ReactNode } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const Process = lazy(() => import("./pages/Process"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16" aria-live="polite">
      <div
        className="h-2 w-24 animate-pulse rounded-full"
        style={{ background: "var(--accent)" }}
      />
    </div>
  );
}

function routeElement(element: ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}

const routes = [
  {
    element: <Layout />,
    children: [
      { index: true, element: routeElement(<Home />) },
      { path: "projects", element: routeElement(<Projects />) },
      { path: "process", element: routeElement(<Process />) },
      { path: "gallery", element: routeElement(<Gallery />) },
      { path: "contact", element: routeElement(<Contact />) },
      { path: "*", element: routeElement(<NotFound />) },
    ],
  },
];

const router =
  import.meta.env.BASE_URL === "/"
    ? createBrowserRouter(routes)
    : createHashRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
