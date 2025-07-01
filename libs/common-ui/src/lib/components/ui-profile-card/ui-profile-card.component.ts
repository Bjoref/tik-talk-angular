import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '@tt/data-access';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { UiTagComponent } from '../ui-tag/ui-tag.component';
import { UiAvatarComponent } from "../ui-avatar/ui-avatar.component";

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'ui-profile-card',
	imports: [UiTagComponent, CommonModule, UiButtonComponent, UiAvatarComponent],
	templateUrl: './ui-profile-card.component.html',
	styleUrl: './ui-profile-card.component.scss',
})
export class UiProfileCardComponent {
	@Input() profile: Profile | null = null;
}
