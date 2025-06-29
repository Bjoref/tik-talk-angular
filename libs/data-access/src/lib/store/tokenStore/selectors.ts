import { createSelector } from "@ngrx/store";
import { tokenFeature } from "./reducer";

export const selectTokenInfo = createSelector(
    tokenFeature.selectToken,
    (token) => token
)