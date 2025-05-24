import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
    { path: '', component: LayoutComponent, children: [
        { path: '', component: SearchComponent},
        { path: 'profile', component: ProfileComponent},
    ]},
    { path: 'login', component: LoginComponent},
];
