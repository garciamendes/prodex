import { RouterProvider } from "react-router"
import { routes } from "./routes"
import { Toaster } from "./components/ui/sonner"

function App() {
  return (
    <>
      <Toaster
        richColors
        expand
      />
      <RouterProvider router={routes} />
    </>
  )
}

export default App
