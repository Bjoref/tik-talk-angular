import { createSelector } from "@ngrx/store";
import { profileFeature } from "./reducer";

export const selectFilteredProfiles = createSelector(
    profileFeature.selectProfiles,
    (profile) => profile
)

export const selectFilters = createSelector(
    profileFeature.selectProfileFilters,
    (filters) => {
        return filters
    }
)

export const selectProfilePageable = createSelector(
    profileFeature.selectProfileFeatureState,
    (state) => {
        return {
            page: state.page,
            size: state.size
        }
    }
)