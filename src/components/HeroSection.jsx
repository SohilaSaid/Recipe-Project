import React, { useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react';
import SearchBar from './SearchBar';
import { Link } from 'react-router';
import useSearchMeals from "../hooks/useSearchMeals";
import useDebounce from '../hooks/useDebounce';

export default function HeroSection() {

  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 500);
  const dropdownRef = useRef(null);


  const { data, isLoading, error } = useSearchMeals(debouncedSearch);
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSearch("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <>

      <div className='hero relative flex justify-center text-center'>
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm "></div>
        <div className='flex flex-col items-center justify-center text-white relative z-10'>

          <div className='bg-amber-50 rounded-full py-1 px-3 text-black flex gap-x-0.5'>
            <span>< Sparkles className='text-amber-500' /></span>
            <span>Discover Your Next Favorite Dish</span>
          </div>
          <h1 className='font-bold text-5xl py-5'>Find the Perfect Recipe for <span className='text-amber-500'>Every Occasion</span></h1>
          <p className="mb-10">Explore thousands of delicious recipes from around the world. Filter by cuisine, ingredients, or dietary preferences.</p>
          <div className="max-w-xl mx-auto w-full">
            <SearchBar search={search} setSearch={setSearch} />
          </div>


          {debouncedSearch && (
            <div ref={dropdownRef} className="mt-3 bg-white text-black rounded-xl shadow-lg overflow-hidden max-h-72 overflow-y-auto">


              {isLoading && (
                <div className="p-3 text-sm text-gray-500">Loading...</div>
              )}

              {error && (
                <div className="p-3 text-red-500 text-sm">Something went wrong</div>
              )}

              {!isLoading && data === null && (
                <div className="p-3 text-red-500 text-sm">
                  No meals found
                </div>
              )}


              {!isLoading && data?.map((meal) => (
                <Link
                  key={meal.idMeal}
                  to={`/mealDetails/${meal.idMeal}`}
                  className="flex items-center gap-3 p-2 hover:bg-amber-50 transition"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-10 h-10 rounded-md object-cover"
                  />

                  <span className="text-sm font-medium line-clamp-1">
                    {meal.strMeal}
                  </span>
                </Link>
              ))}

            </div>
          )}


        </div>
      </div>
    </>
  )
}
