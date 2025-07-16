import { ChatWSError, ChatWSMessage, ChatWSNewMessage, ChatWSUreadMessage } from "../../chat/interfaces/chat-ws-message.interface";

export function isUnreadMessage(message: ChatWSMessage): message is ChatWSUreadMessage {
    return 'action' in message && message.action === 'unread'
}

export function isNewMessage(message: ChatWSMessage): message is ChatWSNewMessage {
    return 'action' in message && message.action === 'message'
}

export function isErrorMessage(message: ChatWSMessage): message is ChatWSError {
    return 'message' in message && message.message === 'message'
}