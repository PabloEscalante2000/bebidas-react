import { create } from "zustand";
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { createFavoriteSlice, FavoritesSliceType } from "./favoritesSlice";
import { createNotificationlice, NotificationSliceType } from "./notificationSlice";

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...a)=>({
    ...createRecipesSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationlice(...a)
})))