import { createActionGroup, props } from "@ngrx/store";
import { LastMessageRes } from "../../interfaces/chat.interface";

export const lastMessageActions = createActionGroup({
    source: 'last chats',
    events: {
        'chats loaded': props<{chats: LastMessageRes[]}>(),
    }
})