import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import useCategories from "../hooks/useCategories";
import useRandomMeals from "../hooks/useRandomMeals";
import useSearchMeals from "../hooks/useSearchMeals";
import useMealsByCategory from "../hooks/useMealsByCategories";
import useDebounce from "../hooks/useDebounce";
import { FavoritesContext } from '../context/FavoritesContext';
import { Heart, MapPin, Tag } from "lucide-react";
import { Link } from "react-router";

export default function DiscoverPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");


    const debouncedSearch = useDebounce(search, 500);


    const { data: categories } = useCategories();
    const { data: randomMeals } = useRandomMeals(20);
    const { data: searchMeals } = useSearchMeals(debouncedSearch);
    const { data: categoryMeals } = useMealsByCategory(selectedCategory);

    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

    const isSearching = debouncedSearch.length > 0;
    const isCategorySelected = selectedCategory.length > 0;

    let mealsToShow = [];

    if (isSearching) {
        mealsToShow = searchMeals || [];
    } else if (isCategorySelected) {
        mealsToShow = categoryMeals || [];
    } else {
        mealsToShow = randomMeals || [];
    }

    useEffect(() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }, [])

    return (
        <>

            <div className="w-full flex justify-center mb-2 px-4 p-10 md:p-10 mt-20">
                <div className="max-w-3xl bg-amber-50 rounded-3xl shadow-md px-6 py-6 text-center">

                    <h2 className="text-3xl font-bold text-amber-500 mb-5">
                        Discover Delicious Recipes
                    </h2>

                    <SearchBar search={search} setSearch={setSearch} />

                </div>
            </div>


            <div className="min-h-screen p-8">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                    
                    <aside className="w-full lg:w-56 bg-white p-4 rounded-xl shadow h-fit">
                        <h2 className="font-bold mb-4">Categories</h2>

                        <div className="flex items-center flex-wrap gap-2 w-auto lg:w-full px-3 py-2 rounded-xl text-sm transition">
                            {categories?.map((cat) => (
                                <button
                                    key={cat.idCategory}
                                    onClick={() => {
                                        setSearch("");
                                        setSelectedCategory(cat.strCategory);
                                    }}
                                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm transition ${selectedCategory === cat.strCategory
                                        ? "bg-amber-500 text-white"
                                        : "bg-amber-50 hover:bg-amber-100"
                                        }`}
                                >
                                    <img
                                        src={cat.strCategoryThumb}
                                        alt={cat.strCategory}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />

                                    <span className="font-medium">
                                        {cat.strCategory}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <button
                            className="mt-4 text-sm text-red-500"
                            onClick={() => setSelectedCategory("")}
                        >
                            Clear filter
                        </button>
                    </aside>

                
                    <main className="flex-1">
                        <div className="flex flex-wrap gap-6 justify-center">

                            
                            {isSearching && (!searchMeals || searchMeals.length === 0) ? (
                                <div className="text-center text-red-500 font-bold w-full">
                                    No meals found
                                </div>
                            ) : (
                                mealsToShow?.map((meal) => {

                                    const isFavorite = favorites?.some(
                                        (item) => item.idMeal === meal.idMeal
                                    );

                                    return (
                                      <Link to={`/mealDetails/${meal.idMeal}`}>
                                          <div
                                            key={meal.idMeal}
                                            className="relative w-64 bg-white shadow rounded-xl overflow-hidden hover:scale-105 transition flex flex-col"
                                        >
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();

                                                    if (isFavorite) {
                                                        removeFromFavorites(meal.idMeal);
                                                    } else {
                                                        addToFavorites(meal);
                                                    }
                                                }}
                                                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow z-10"
                                            >
                                                <Heart
                                                    className={`w-5 h-5 transition-colors ${isFavorite
                                                            ? "fill-red-500 text-red-500"
                                                            : "text-gray-400"
                                                        }`}
                                                />
                                            </button>

                                            <img
                                                src={meal.strMealThumb}
                                                className="w-full h-40 object-cover"
                                                alt={meal.strMeal}
                                            />

                                            <div className="p-3 text-center">
                                                <h2 className="font-bold text-amber-500">{meal.strMeal.length > 25 ? meal.strMeal.slice(0, 20) + "..." : meal.strMeal}</h2>
                                            </div>

                                            <div className="mt-auto flex gap-2 justify-center items-center pb-4">

                                            <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-amber-50 text-amber-500 rounded-full text-base font-medium">
                                                <Tag className="w-4 h-4 rotate-90" />
                                                {meal.strCategory|| selectedCategory}
                                            </span>

                                            {meal.strArea && (
                                                <span className="inline-flex items-center whitespace-nowrap overflow-hidden text-ellipsis gap-1.5 px-4 py-1 bg-emerald-50 text-emerald-800 rounded-full text-base font-medium">
                                                    <MapPin className="w-4 h-4 shrink-0" />
                                                    {meal.strArea}
                                                </span>
                                            )}

                                        </div>
                                        </div>
                                      </Link>
                                    );
                                })
                            )}

                        </div>
                    </main>

                </div>
            </div>
        </>
    );
}
