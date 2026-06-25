import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router";
import useRandomMeals from "../hooks/useRandomMeals";

export default function HomeSlider() {


    const { data, isLoading, error } = useRandomMeals(5);

    if (isLoading) return <div className="loader"></div>;
    if (error) return <p>Error</p>;

    return (
        <div className="px-10">

            <Swiper 
                modules={[Autoplay]}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                loop={data?.length > 4}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
            >

                {data?.map((meal) => (
                    <SwiperSlide key={meal.idMeal}>
                        <Link className="p-2" to={`/mealDetails/${meal.idMeal}`}>

                            <div className="bg-white rounded-xl shadow-md hover:scale-105 transition min-h-80">

                                <img
                                    src={meal.strMealThumb}
                                    className="w-full  object-cover rounded-t-xl"
                                />

                                <div className="p-4 text-center">
                                    <h2 className="font-bold text-amber-500 line-clamp-1">
                                        {meal.strMeal}
                                    </h2>
                                </div>

                            </div>

                        </Link>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
}