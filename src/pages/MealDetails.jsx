import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Dot, SquareX } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { Heart } from "lucide-react";

export default function MealDetails() {

  const { idMeal } = useParams()
  const [showVideo, setShowVideo] = useState(false);

  async function mealAPI(idMeal) {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    return res.data.meals[0];
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["meal_details", idMeal],
    queryFn: () => mealAPI(idMeal),
  });

  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const isFavorite = favorites.some((item) => item.idMeal === data?.idMeal);

  useEffect(() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }, [])

  if (isLoading) return <div className="loader"></div>;
  if (error) return <p>Error</p>;

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (data[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: data[`strIngredient${i}`],
        measure: data[`strMeasure${i}`],
      });
    }
  }

  const instructions = data?.strInstructions
    ?.split(".")
    .filter((step) => step.trim() !== "") ?? [];

    

  return (
   <>
    <div className="px-4 py-10 md:p-10 m-20 flex justify-center items-center">

      <div
        className="bg-white rounded-3xl md:rounded-[40px] p-5 md:p-10 max-w-5xl w-full shadow-2xl bg-cover bg-no-repeat bg-fixed bg-center"
        style={{
          backgroundImage: `url(${data?.strMealThumb})`,
        }}
      >


        <div className="mb-10">

          <div className='flex justify-between'>
            <h1 className="text-2xl md:text-5xl font-bold mb-5 text-white">
              {data?.strMeal}
            </h1>

            <button
              onClick={() => {
                if (isFavorite) {
                  removeFromFavorites(data.idMeal);
                } else {
                  addToFavorites(data);
                }
              }}
              className="bg-white p-3 rounded-full shadow"
            >
              <Heart
                className={`w-6 h-6 ${isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400"
                  }`}
              />
            </button>
          </div>

          <div className="flex gap-4 flex-wrap">

            <div className="bg-orange-100 px-4 py-2 rounded-full">
              {data?.strCategory}
            </div>

            <div className="bg-green-100 px-4 py-2 rounded-full">
              {data?.strArea}
            </div>

          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">


          <div>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              Ingredients
            </h2>

            <div className="space-y-3">

              {ingredients.map((item, index) => (
                <div
                  key={index}
                  className="bg-amber-50 p-4 rounded-xl flex items-center gap-2"
                >
                  <Dot className="text-amber-500" />
                  <p>{item.measure} {item.ingredient}</p>
                </div>
              ))}

            </div>

          </div>


          <div>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              Instructions
            </h2>

            <div className="space-y-5">

              {instructions.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 bg-amber-50 p-4 rounded-xl"
                >

                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white text-sm font-bold shrink-0 leading-none">
                    {index + 1}
                  </div>

                  <p>{step}</p>

                </div>
              ))}

            </div>

          </div>

        </div>


        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowVideo(true)}
            className="text-white bg-amber-500 hover:bg-amber-700 rounded-full px-6 py-3 w-full md:w-auto"
          >
            Watch Recipe
          </button>
        </div>

        {/* Modal */}
        {showVideo && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">

            <div className="bg-white p-4 rounded-2xl relative w-full max-w-3xl">

              <button
                className="absolute top-2 right-4 text-2xl"
                onClick={() => setShowVideo(false)}
              >
                <SquareX className="text-amber-500" />
              </button>

              <iframe
                className="w-full h-62.5 md:h-112.5 rounded-xl"
                src={`https://www.youtube.com/embed/${data?.strYoutube?.split("v=")[1]}`}
                title="Recipe Video"
                allowFullScreen
              ></iframe>

            </div>

          </div>
        )}

      </div>

    </div>
   </>
  )
}