import { Component, input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { UiAvatarComponent } from '../ui-avatar/ui-avatar.component';

@Component({
	selector: 'ui-profile-header',
	imports: [UiAvatarComponent],
	templateUrl: './ui-profile-header.component.html',
	styleUrl: './ui-profile-header.component.scss',
})
export class UiProfileHeaderComponent {
	profile = input<Profile>();
}
