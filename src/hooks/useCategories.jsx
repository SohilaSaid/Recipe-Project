
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const categoriesApi = async () => {
  const res = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  return res.data?.categories ?? [];
};

export default function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoriesApi,
  });
}