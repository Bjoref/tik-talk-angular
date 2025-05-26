import { Component, input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'ui-profile-header',
  imports: [ImgUrlPipe],
  templateUrl: './ui-profile-header.component.html',
  styleUrl: './ui-profile-header.component.scss'
})
export class UiProfileHeaderComponent {
  profile = input<Profile>()
}
