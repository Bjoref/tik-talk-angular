import { ChangeDetectionStrategy, Component, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'ui-scroll-trigger',
	imports: [CommonModule],
	templateUrl: './ui-scroll-trigger.component.html',
	styleUrl: './ui-scroll-trigger.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiScrollTriggerComponent implements OnInit {
	loaded = output<void>();
	
	ngOnInit(): void {
		this.loaded.emit()
		
	}
}
