import {StateCreator} from "zustand"
import { Recipe } from "../types"
import { createNotificationlice, NotificationSliceType } from "./notificationSlice"

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe:Recipe) => void
    loadFromStorage: () => void
}

export const createFavoriteSlice:StateCreator<FavoritesSliceType & NotificationSliceType,[],[],FavoritesSliceType> = (set,get,api) =>({
    favorites:[],
    handleClickFavorite:(recipe) => {
        if(get().favorites.some(favorite=>favorite.idDrink === recipe.idDrink)){
            set(()=>({
                favorites:get().favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationlice(set,get,api).showNotification({text:"Se eliminó de favoritos", error:false})
        } else {
            set({
                favorites:[...get().favorites,recipe]
            })
            createNotificationlice(set,get,api).showNotification({text:"Se agregó de favoritos", error:false})
        }
        localStorage.setItem("favorites",JSON.stringify(get().favorites))
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem("favorites")
        if(storedFavorites){
            set({
                favorites:JSON.parse(storedFavorites)
            })
        }
    }
})