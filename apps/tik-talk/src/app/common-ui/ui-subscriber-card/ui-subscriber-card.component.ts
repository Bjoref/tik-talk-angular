import { Component, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
	selector: 'ui-subscriber-card',
	imports: [ImgUrlPipe],
	templateUrl: './ui-subscriber-card.component.html',
	styleUrl: './ui-subscriber-card.component.scss',
})
export class UiSubscriberCardComponent {
	@Input() profile!: Profile;
}
