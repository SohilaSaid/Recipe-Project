import React from 'react'
import { Link } from 'react-router'
import { Dices } from 'lucide-react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function SurpriseComponent() {

  async function surpriseMealAPI() {
    const res = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
    return res.data.meals[0];

  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["surprise-meal"],
    queryFn: surpriseMealAPI,
    
  });

  if (isLoading) return <div className="loader"></div>;
  if (error) return <p>Error</p>;


  return (
    <>

      <div className='random text-white flex justify-start rounded-4xl p-10 m-10'>
        <div className='flex flex-col font-medium'>
          <h2 className='font-bold'>Cant't decide?</h2>
          <p>Get a random delicious meal!</p>
          <Link
            to={`/mealDetails/${data?.idMeal}`}
            className="inline-flex items-center w-fit gap-1 text-amber-500 bg-amber-50 hover:bg-orange-200 shadow-xs rounded-full text-sm px-4 py-2 my-2 font-medium"
          >
            Surprise Me
            <Dices size={18} />
          </Link>
        </div>
      </div>

    </>
  )
}
