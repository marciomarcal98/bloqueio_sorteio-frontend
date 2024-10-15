import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./pages/Home"
import { Removidos } from "./pages/Removidos"
import { TotalBloqueados } from "./pages/TotalBloqueados"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/removidos",
    element: <Removidos />
  },
  {
    path: "/totalbloqueados",
    element: <TotalBloqueados />
  }
])

export function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
