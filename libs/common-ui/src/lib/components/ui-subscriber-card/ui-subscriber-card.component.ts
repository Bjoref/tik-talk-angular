import { Component, Input } from '@angular/core';
import { Profile, ImgUrlPipe } from '@tt/shared';

@Component({
	selector: 'ui-subscriber-card',
	imports: [ImgUrlPipe],
	templateUrl: './ui-subscriber-card.component.html',
	styleUrl: './ui-subscriber-card.component.scss',
})
export class UiSubscriberCardComponent {
	@Input() profile!: Profile;
}
