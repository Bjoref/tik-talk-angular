import { createSelector } from "@ngrx/store";
import { lastMessagesFeature } from "./reducer";

export const selectLastMessages = createSelector(
    lastMessagesFeature.selectChats,
    lastMessagesFeature.selectLastMessage,
    (chats) => {
        return chats
    }
)

export const selectLastMessage = createSelector(
    lastMessagesFeature.selectLastMessage,
    (test) => {
        return test
    }
)