import React from 'react'
import { Link } from 'react-router';
import useCategories from '../hooks/useCategories';



export default function CategoriesComponent() {

 const { data, isLoading, error } = useCategories();


  if (isLoading) return <div className="loader"></div>;
  if (error) return <p>Error</p>;

  return (
  <>

  
    <div className="rounded-4xl bg-amber-50 px-15 py-10 m-10">
      <h2 className="font-bold py-5">POPULAR CATEGORIES</h2>

      <div className="flex flex-wrap justify-center items-center gap-4">
     
        {data?.map((cat) => {
          return (
            <Link to={`/mealsCategoryPage/${cat.strCategory}/${cat.strCategoryDescription}`} key={cat.strCategory}>
            <div  className="bg-white hover:bg-amber-500 hover:shadow-2xl hover:scale-105 transition p-4 rounded-xl shadow-md w-40">
              <img
                src={cat.strCategoryThumb}
                alt={cat.strCategory}
                className="w-full h-24 object-contain rounded-lg"
              />
              <h2 className="text-center mt-2 font-bold">
                {cat.strCategory}
              </h2>
            </div>
            </Link>
          );
        })}
      </div>
    </div>
  </>
);
  
}
