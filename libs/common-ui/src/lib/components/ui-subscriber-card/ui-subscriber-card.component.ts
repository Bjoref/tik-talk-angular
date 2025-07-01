import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Profile } from '@tt/data-access';
import { UiAvatarComponent } from "../ui-avatar/ui-avatar.component";

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'ui-subscriber-card',
	imports: [UiAvatarComponent],
	templateUrl: './ui-subscriber-card.component.html',
	styleUrl: './ui-subscriber-card.component.scss',
})
export class UiSubscriberCardComponent {
	@Input() profile!: Profile;
}
