import { createSelector } from "@ngrx/store";
import { lastMessagesFeature } from "./reducer";

export const selectLastMessages = createSelector(
    lastMessagesFeature.selectChats,
    (chats) => chats
)