import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiSideBarComponent } from '../../common-ui/ui-side-bar/ui-side-bar.component';

@Component({
  selector: 'page-layout',
  imports: [RouterOutlet, UiSideBarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
