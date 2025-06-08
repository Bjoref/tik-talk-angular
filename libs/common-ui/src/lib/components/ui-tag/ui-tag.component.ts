import { Component, Input } from '@angular/core';

@Component({
	selector: 'ui-tag',
	imports: [],
	templateUrl: './ui-tag.component.html',
	styleUrl: './ui-tag.component.scss',
})
export class UiTagComponent {
	@Input() tagText: string = '';
}
