import { Component } from '@angular/core';
import { TagComponent } from "../tag/tag.component";

@Component({
  selector: 'app-profile-card',
  imports: [TagComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {

}
