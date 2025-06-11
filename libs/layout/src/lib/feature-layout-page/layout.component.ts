import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiSideBarComponent } from '@tt/common-ui';

@Component({
	selector: 'page-layout',
	imports: [RouterOutlet, UiSideBarComponent],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
