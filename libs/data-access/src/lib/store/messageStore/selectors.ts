import { createSelector } from "@ngrx/store";
import { messageFeature } from "./reducer";

export const selectCount = createSelector(
    messageFeature.selectCount,
    (count) => count
)