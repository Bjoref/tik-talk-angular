import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { accessGuard } from './data/guards/access.guard';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
    { path: '', component: LayoutComponent, children: [
        { path: '', redirectTo: 'profile/me', pathMatch: 'full'},
        { path: 'profile/:id', component: ProfileComponent},
        { path: 'settings', component: SettingsComponent},
        { path: 'search', component: SearchComponent}
    ],
    canActivate: [accessGuard]
    },
    { path: 'login', component: LoginComponent},
];
