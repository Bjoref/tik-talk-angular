import { Route } from '@angular/router';
import { ChatsComponent, UiChatsWorkspaceComponent } from '../../feature-chats-page';

export const chatsRoutes: Route[] = [
	{
		path: '',
		component: ChatsComponent,
		children: [
			{
				path: ':id',
				component: UiChatsWorkspaceComponent,
			},
		],
	},
];
