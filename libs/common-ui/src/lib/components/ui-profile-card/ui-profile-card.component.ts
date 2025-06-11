import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile, ImgUrlPipe } from '@tt/shared';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { UiTagComponent } from '../ui-tag/ui-tag.component';

@Component({
	selector: 'ui-profile-card',
	imports: [UiTagComponent, CommonModule, UiButtonComponent, ImgUrlPipe],
	templateUrl: './ui-profile-card.component.html',
	styleUrl: './ui-profile-card.component.scss',
})
export class UiProfileCardComponent {
	@Input() profile: Profile | null = null;
}
