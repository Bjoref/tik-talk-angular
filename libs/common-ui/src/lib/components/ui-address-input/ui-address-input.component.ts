import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	forwardRef,
	inject,
	Input,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	ControlValueAccessor,
	FormControl,
	FormsModule,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
} from '@angular/forms';
import { DadataService } from '@tt/data-access';
import { debounceTime, switchMap, tap } from 'rxjs';

@Component({
	selector: 'ui-address-input',
	imports: [CommonModule, ReactiveFormsModule, FormsModule],
	templateUrl: './ui-address-input.component.html',
	styleUrl: './ui-address-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => UiAddressInputComponent),
		},
	],
})
export class UiAddressInputComponent implements ControlValueAccessor {
	innerSearchControl = new FormControl();
	value: string | null = null;

	dadataSerice = inject(DadataService);

	isDropdownOpened = signal<boolean>(true);

	constructor(private cdr: ChangeDetectorRef) {}

	suggestions$ = this.innerSearchControl.valueChanges.pipe(
		debounceTime(300),
		switchMap((val) => {
			return this.dadataSerice.getSuggestion(val).pipe(
				tap((res) => {
					if (res[0] !== null) {
						this.isDropdownOpened.set(true);
					} else {
						this.isDropdownOpened.set(false);
					}
				})
			);
		})
	);

	writeValue(city: string | null): void {
		this.innerSearchControl.patchValue(city, {
			emitEvent: false,
		});
		this.cdr.markForCheck();
	}
	registerOnChange(fn: any): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	onSuggestionPick(city: string | null) {
		this.isDropdownOpened.set(false);

		this.innerSearchControl.patchValue(city, {
			emitEvent: false,
		});
		this.onChange(city);
		this.onTouched();
		this.cdr.markForCheck();
	}

	onChange(val: string | null) {
		console.log(val);
	}

	onTouched() {}
}
