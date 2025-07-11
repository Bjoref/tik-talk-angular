import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	HostListener,
	input,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSvgComponent } from '../ui-svg/ui-svg.component';
import {
	ControlValueAccessor,
	FormsModule,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'ui-stack-input',
	imports: [CommonModule, UiSvgComponent, ReactiveFormsModule, FormsModule],
	templateUrl: './ui-stack-input.component.html',
	styleUrl: './ui-stack-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => UiStackInputComponent),
		},
	],
})
export class UiStackInputComponent implements ControlValueAccessor {
	tags = input<string[]>();

	value$ = new BehaviorSubject<string[]>([]);
	innerInput = '';

	@HostListener('keydown.enter', ['$event'])
	onEnter(event: KeyboardEvent) {
		event.stopPropagation();
		event.preventDefault();
		if (!this.innerInput) {
			return;
		}

		this.value$.next([...this.value$.value, this.innerInput]);
		this.onChange(this.value$.value);

		this.innerInput = '';
	}

	writeValue(val: string[] | null): void {
		if (!val) {
			this.value$.next([]);

			return;
		}
		this.value$.next(val);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	onChange(val: string[] | null) {}

	onTouched() {}

	onTagDelete(index: number) {
		const tags = this.value$.value;
		tags.splice(index, 1);
		this.value$.next(tags);

		this.onChange(this.value$.value);
	}
}
