import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Profile } from '@tt/data-access';
import { UiAvatarComponent } from '../ui-avatar/ui-avatar.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'ui-profile-header',
	imports: [UiAvatarComponent],
	templateUrl: './ui-profile-header.component.html',
	styleUrl: './ui-profile-header.component.scss',
})
export class UiProfileHeaderComponent {
	profile = input<Profile>();
}