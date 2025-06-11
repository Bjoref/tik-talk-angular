import { Directive, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
	selector: '[mouseEnterLeave]',
	standalone: true,
})
export class LoginMouseOverDirective {
	@Input() form: FormGroup | null = null;

	@HostListener('mouseenter') onMouseEnter() {
		this.form!.markAllAsTouched();
		this.form!.updateValueAndValidity();
	}
}
