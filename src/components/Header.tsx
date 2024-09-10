import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import { SearchFilter } from "../types";

export default function Header() {
  const [searchFilters, setSearchFilters] = useState<SearchFilter>({
    ingredient: "",
    category: "",
  });

  const { pathname } = useLocation();

  const isHome = useMemo(() => pathname === "/", [pathname]);

  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);
  const searchRecipes = useAppStore((state) => state.searchRecipes)
  const setError = useAppStore((state)=>state.setError)

  useEffect(() => {
    const fetchCategoriesF = async () => {
      fetchCategories();
    };
    fetchCategoriesF();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    //Validar
    if(Object.values(searchFilters).includes("")){
      setError()
      return
    }

    //Consultar las recetas
    const searchRecipesF = async () => {
      await searchRecipes(searchFilters)
    }

    searchRecipesF()
  }

  return (
    <header
      className={isHome ? "bg-header bg-center bg-cover" : "bg-slate-800"}
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="logotipo" />
          </div>
          <nav className="flex gap-4">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `transition-all uppercase font-bold ${
                  isActive ? "text-orange-500" : "text-white"
                }`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to={"/favorites"}
              className={({ isActive }) =>
                `transition-all uppercase font-bold ${
                  isActive ? "text-orange-500" : "text-white"
                }`
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
          onSubmit={handleSumbit}>
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Nombre o Ingredientes
              </label>
              <input
                id="ingredient"
                type="text"
                name="ingredient"
                className="p-3 w-full rounded-lg focus:outline-none"
                placeholder="Nombre o Ingredient. Ej. Vodka, Tequila, Café"
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Categoria
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none"
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value={""}>-- Seleccione --</option>
                {categories.drinks.map((cat) => (
                  <option key={cat.strCategory} value={cat.strCategory}>
                    {cat.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value={"Buscar Recetas"}
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
            />
          </form>
        )}
      </div>
    </header>
  );
}