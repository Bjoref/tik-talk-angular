import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { accessGuard } from '@tt/auth';
import { SettingsComponent } from './pages/settings/settings.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { chatsRoutes } from './pages/chats/chatsRoutes';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{ path: '', redirectTo: 'profile/me', pathMatch: 'full' },
			{ path: 'profile/:id', component: ProfileComponent },
			{ path: 'settings', component: SettingsComponent },
			{ path: 'search', component: SearchComponent },
			{ path: 'chats', loadChildren: () => chatsRoutes },
		],
		canActivate: [accessGuard],
	},
	{ path: 'login', component: LoginComponent },
];
