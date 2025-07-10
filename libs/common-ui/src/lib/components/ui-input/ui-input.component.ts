import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'ui-input',
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './ui-input.component.html',
	styleUrl: './ui-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR, 
			multi: true,
			useExisting: forwardRef(() => UiInputComponent) 
		}
	]
})
export class UiInputComponent implements ControlValueAccessor {
	type = input<'text' | 'password'>('text');
	placeholder = input<string>();
	labelText = input<string>();

	onChange: any;
	onTouched: any;
	value: string | null = null

	writeValue(val: any):void {
		this.value = val;
	}

	registerOnChange(fn: any):void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any):void {
		this.onTouched = fn;
	}

	onModelChange(val: string | null):void  {
		this.onChange(val)
	}
	


}
