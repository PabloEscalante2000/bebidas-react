import {BrowserRouter, Routes, Route} from "react-router-dom"
import IndexPage from "./views/IndexPage"
import Layout from "./layouts/Layout"
import { lazy, Suspense } from "react"

const FavoritesPage = lazy(()=> import("./views/FavoritesPage"))

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<IndexPage/>} index />
                <Route path="/favorites" element={
                  <Suspense fallback="...Cargando">
                    <FavoritesPage/>
                  </Suspense>
                } />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
