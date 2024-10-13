import axios from "axios"
import { Button } from "@/components/ui/button"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./pages/Home"
import { Removidos } from "./pages/Removidos"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/removidos",
    element: <Removidos />
  }
])

export function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
