import { Component, inject } from '@angular/core';
import { ProfileHttpService } from '../../data/services/profile-http.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { UiProfileCardComponent } from "../../common-ui/ui-profile-card/ui-profile-card.component";

@Component({
  selector: 'page-search',
  imports: [UiProfileCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  profileService = inject(ProfileHttpService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestsAccounts()
      .subscribe(val => {
        this.profiles = val;
      })    
  }
}
