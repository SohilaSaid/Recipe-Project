import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const randomMealsAPI = async (count) => {
  const requests = Array.from({ length: count }, () =>
    axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
  );

  const responses = await Promise.all(requests);

  return responses.map((res) => res.data.meals[0]);
};

export default function useRandomMeals(count = 6) {
  return useQuery({
    queryKey: ["random_meals_slider", count],
    queryFn: () => randomMealsAPI(count),
  });
}