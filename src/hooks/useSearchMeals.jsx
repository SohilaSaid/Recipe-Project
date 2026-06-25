import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const searchMealsAPI = async (search) => {
  if (!search) return [];

  const res = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
  );

  return res.data.meals;
};

export default function useSearchMeals(search) {
  return useQuery({
    queryKey: ["search_meals", search],
    queryFn: () => searchMealsAPI(search),
    enabled: !!search,
  });
}