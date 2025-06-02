import { Route } from "@angular/router";
import { ChatsComponent } from "./chats.component";
import { UiChatsWorkspaceComponent } from "../../common-ui/ui-chats-workspace/ui-chats-workspace.component";

export const chatsRoutes: Route[] = [
    {
        path: '',
        component: ChatsComponent,
        children: [
            {
                path: ':id', component: UiChatsWorkspaceComponent 
            }
        ]
    }
]