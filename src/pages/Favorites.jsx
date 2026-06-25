import React, { useContext, useEffect } from "react";
import { Link } from "react-router";
import { Heart } from "lucide-react";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites, removeFromFavorites } =
    useContext(FavoritesContext);

    useEffect(() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }, [])

  return (
    <div className="flex flex-wrap gap-6 justify-center p-10 pt-20 m-10">


      <div className="w-full text-center mb-5">
        <h1 className="text-3xl font-bold text-amber-500">
          My Favorite Meals
        </h1>
      </div>


      {favorites.length === 0 ? (
        <div className="w-full text-center mt-10">
          <h2 className="text-2xl font-bold text-gray-500">
            No favorites yet
          </h2>
        </div>
      ) : (
        favorites.map((meal) => {

          return (
            <Link
              key={meal.idMeal}
              to={`/mealDetails/${meal.idMeal}`}
            >
              <div className="relative bg-white w-64 rounded-xl shadow-md overflow-hidden hover:scale-105 transition flex flex-col">

                {/* زر الحذف من المفضلة */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromFavorites(meal.idMeal);
                  }}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow z-10"
                >
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>

                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4 text-center text-amber-500">
                  <h2 className="font-bold text-lg line-clamp-1 min-h-14">
                    {meal.strMeal}
                  </h2>
                </div>

                <div className="mt-auto flex gap-2 justify-center items-center pb-4">

                  <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-amber-50 text-amber-500 rounded-full text-base font-medium">
                    {meal.strCategory}
                  </span>

                  {meal.strArea && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-emerald-50 text-emerald-800 rounded-full text-base font-medium">
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
  );
}