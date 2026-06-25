import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });


    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    function addToFavorites(meal) {
        setFavorites((prev) => {
            if (prev.some(item => item.idMeal === meal.idMeal)) {
                return prev;
            }
            return [...prev, meal];
        });
    }

    function removeFromFavorites(idMeal) {
        setFavorites((prev) =>
            prev.filter(item => item.idMeal !== idMeal)
        );
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}