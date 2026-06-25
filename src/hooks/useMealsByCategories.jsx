import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MealsByCategoryApi = async (category) => {
  if (!category) return [];

  const res = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );

  return res.data.meals;
};

export default function useMealsByCategory(category) {
  return useQuery({
    queryKey: ["category_meals", category],
    queryFn: () => MealsByCategoryApi(category),
    enabled: !!category,
  });
}