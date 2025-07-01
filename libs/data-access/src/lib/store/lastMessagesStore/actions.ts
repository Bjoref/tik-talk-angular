import { createActionGroup, props } from "@ngrx/store";
import { LastMessageRes } from "../../interfaces/chat.interface";
import { ChatWSNewMessage } from "../../interfaces/chat-ws-message.interface";

export const lastMessageActions = createActionGroup({
    source: 'last chats',
    events: {
        'chats loaded': props<{chats: LastMessageRes[]}>(),
        'message send': props<{ lastMessage: ChatWSNewMessage}>(),
        'message read': props<{ lastMessage: LastMessageRes }>(),
    }
})