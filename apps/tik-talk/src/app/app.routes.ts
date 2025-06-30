import { Routes } from '@angular/router';
import { SearchComponent } from '@tt/search';
import { ProfileComponent } from '@tt/profile';
import { LayoutComponent } from '@tt/layout';
import { accessGuard, LoginComponent } from '@tt/auth';
import { SettingsComponent } from '@tt/settings';
import { chatsRoutes } from '@tt/chats';
import { provideState } from '@ngrx/store';
import {
	profileFeature,
	ProfileEffects,
	postsFeature,
	messageFeature,
	tokenFeature,
	lastMessagesFeature,
} from '@tt/data-access';
import { provideEffects } from '@ngrx/effects';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				redirectTo: 'profile/me',
				pathMatch: 'full',
			},
			{
				path: 'profile/:id',
				component: ProfileComponent,
				providers: [provideState(postsFeature)],
			},
			{ path: 'settings', component: SettingsComponent },
			{
				path: 'search',
				component: SearchComponent,
				providers: [
					provideState(profileFeature),
					provideEffects(ProfileEffects),
				],
			},
			{
				path: 'chats',
				loadChildren: () => chatsRoutes,
				providers: [
					provideState(lastMessagesFeature),
				],
			},
		],
		canActivate: [accessGuard],
		providers: [provideState(messageFeature), provideState(tokenFeature)],
	},
	{ path: 'login', component: LoginComponent },
];
