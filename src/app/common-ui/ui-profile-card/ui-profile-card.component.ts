import { Component, Input, } from '@angular/core';
import { UiTagComponent } from '../ui-tag/ui-tag.component';
import { CommonModule } from '@angular/common';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'ui-profile-card',
  imports: [UiTagComponent, CommonModule, UiButtonComponent, ImgUrlPipe],
  templateUrl: './ui-profile-card.component.html',
  styleUrl: './ui-profile-card.component.scss',
})
export class UiProfileCardComponent {
  @Input() profile: Profile | null = null;
}
