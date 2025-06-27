import { createActionGroup, props } from "@ngrx/store";

export const tokenActions = createActionGroup({
    source: 'token',
    events: {
        'refresh token': props<{token: string | null}>(),
    }
})