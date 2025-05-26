import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UiSvgComponent } from '../ui-svg/ui-svg.component';

@Component({
  selector: 'ui-button',
  imports: [CommonModule, UiSvgComponent],
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.scss'
})
export class UiButtonComponent {
  @Input() text: string = '';
  @Input() buttonType: string = 'button';
  @Input() shadow: boolean = false; 
  @Input() icon:string = '';

}
