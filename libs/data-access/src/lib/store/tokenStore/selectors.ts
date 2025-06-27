import { createSelector } from "@ngrx/store";
import { tokenFeature } from "./reducer";

export const selectToken = createSelector(
    tokenFeature.selectToken,
    (token) => token
)