import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiProfileCardComponent } from "./common-ui/ui-profile-card/ui-profile-card.component";
import { ProfileHttpService } from './data/services/profile-http.service';
import { Profile } from './data/interfaces/profile.interface';

@Component({
  selector: 'app-root',
  imports: [ UiProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  profileService = inject(ProfileHttpService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestsAccounts()
      .subscribe(val => {
        console.log(val)
        this.profiles = val;
        console.log(this.profiles)
      })    
  }
}
