import { RouterProvider } from "react-router-dom"
import { router } from "./main"
import "./App.css"
import AppLayout from "./components/AppLayout/AppLayout"

const App =()=> {
  return (
    < AppLayout>
         <RouterProvider router={router} />
    </AppLayout>
  )
}

export default App
