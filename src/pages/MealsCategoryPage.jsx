import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router';
import { Heart, MapPin, Tag } from 'lucide-react';
import useDebounce from "../hooks/useDebounce";
import SearchBar from "../components/SearchBar";
import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import useMealsByCategory from '../hooks/useMealsByCategories';


export default function MealsCategoryPage() {

    const { strCategory, strCategoryDescription } = useParams()
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search, 300);
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);


    const { data: meals , isLoading, error} = useMealsByCategory(strCategory);

    const filteredMeals = meals?.filter((meal) =>
        meal.strMeal.toLowerCase().includes(debouncedSearch.toLowerCase())
    )


useEffect(() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }, [])

    if (isLoading) return <div className="loader"></div>;
    if (error) return <p>Error</p>;




    return (
        <>


            <div className="flex flex-wrap gap-6 justify-center p-10 pt-20 m-10">

                <div className="w-full flex justify-center mb-5">
                    <div className="max-w-3xl bg-amber-50 rounded-3xl shadow-md px-6 py-6 text-center">
                        <h3 className="text-3xl font-bold text-amber-500 mb-3">
                            {strCategory}
                        </h3>

                        <p className="text-gray-600 text-sm leading-6">
                            {strCategoryDescription}
                        </p>

                        <SearchBar search={search} setSearch={setSearch} />


                    </div>
                </div>

                {
                    filteredMeals?.length > 0 ? (
                        filteredMeals.map((meal) => {
                            const isFavorite = favorites.some(
                                (item) => item.idMeal === meal.idMeal
                            );

                            return (
                                <Link key={meal.idMeal} to={`/mealDetails/${meal.idMeal}`}>
                                    <div className="relative bg-white w-64 rounded-xl shadow-md overflow-hidden hover:scale-105 transition flex flex-col">

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
                                            alt={meal.strMeal}
                                            className="w-full h-40 object-cover"
                                        />

                                        <div className="p-4 text-center text-amber-500">
                                            <h2 className="font-bold text-lg line-clamp-1 min-h-14">
                                                {meal.strMeal.length > 25 ? meal.strMeal.slice(0, 20) + "..." : meal.strMeal}
                                            </h2>
                                        </div>

                                        <div className="mt-auto flex gap-2 justify-center items-center pb-4">

                                            <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-amber-50 text-amber-500 rounded-full text-base font-medium">
                                                <Tag className="w-4 h-4 rotate-90" />
                                                {strCategory}
                                            </span>

                                            {meal.strArea && (
                                                <span className="inline-flex whitespace-nowrap overflow-hidden text-ellipsis items-center gap-1.5 px-4 py-1 bg-emerald-50 text-emerald-800 rounded-full text-base font-medium">
                                                    <MapPin className="w-4 h-4 shrink-0" />
                                                    {meal.strArea}
                                                </span>
                                            )}

                                        </div>

                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="w-full text-center mt-10">
                            <h2 className="text-2xl font-bold text-amber-500">
                                No meals found
                            </h2>
                        </div>
                    )
                }
            </div>
        </>
    )



}
