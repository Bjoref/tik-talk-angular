import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
  @Input() tagText: string = '';

}
