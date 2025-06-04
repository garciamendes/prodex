import { RouterProvider } from "react-router"
import { routes } from "./routes"
import { Toaster } from "./components/ui/sonner"
import { ProductProvider } from "./contexts/product"

function App() {
  return (
    <>
      <Toaster
        richColors
      />
      <ProductProvider>
        <RouterProvider router={routes} />
      </ProductProvider>
    </>
  )
}

export default App
