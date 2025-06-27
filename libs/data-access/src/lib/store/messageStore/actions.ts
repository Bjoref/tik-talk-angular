import { createActionGroup, props } from "@ngrx/store";

export const messageActions = createActionGroup({
    source: 'messages',
    events: {
        'message unread': props<{count: number}>(),
    }
})