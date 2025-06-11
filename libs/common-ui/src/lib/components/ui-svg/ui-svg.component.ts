import { Component, Input } from '@angular/core';

@Component({
	standalone: true,
	selector: 'svg[icon]',
	template: '<svg:use [attr.xlink:href]="href"></svg:use>',
})
export class UiSvgComponent {
	@Input() icon: string = '';

	get href(): string {
		return `/assets/img/icons/${this.icon}.svg#${this.icon}`;
	}
}
