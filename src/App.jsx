import { createBrowserRouter, RouterProvider } from "react-router"
import LayOut from "./LayOut"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import MealsCategoryPage from "./pages/MealsCategoryPage"
import MealDetails from "./pages/MealDetails"
import FavoritesProvider from "./context/FavoritesContext"
import DiscoverPage from "./pages/DiscoverPage"


const query = new QueryClient()
function App() {

  
  let Routes = createBrowserRouter([
    {
      
      path:"",
      element:<LayOut/>,
      children:[
        {path:"",element:<Home />},
        {path:"favorites",element:<Favorites/>},
        {path:"discover",element:<DiscoverPage/>},
        {path:"mealsCategoryPage/:strCategory/:strCategoryDescription",element:<MealsCategoryPage/>},
        {path:"mealDetails/:idMeal",element:<MealDetails/>},
      ]
    }
  ])


  return (
    <>
    <QueryClientProvider client={query}>
      <FavoritesProvider>
      <RouterProvider router={Routes}/>
      </FavoritesProvider>
    </QueryClientProvider>

    </>
  )
}

export default App
