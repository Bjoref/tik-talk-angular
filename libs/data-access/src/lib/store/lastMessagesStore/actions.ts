import { createActionGroup, props } from "@ngrx/store";
import { ChatWSNewMessage } from "../../chat/interfaces/chat-ws-message.interface";
import { LastMessageRes } from "../../chat";

export const lastMessageActions = createActionGroup({
    source: 'last chats',
    events: {
        'chats loaded': props<{chats: LastMessageRes[]}>(),
        'message send': props<{ lastMessage: ChatWSNewMessage}>(),
        'message read': props<{ lastMessage: LastMessageRes }>(),
    }
})