import {
	Component,
	ElementRef,
	inject,
	signal,
	ViewChild,
} from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { FormInput } from '../../data/types/formInput';
import { UiButtonComponent } from '../../common-ui/ui-button/ui-button.component';
import { AuthHttpService } from '@tt/auth';
import { Router } from '@angular/router';
import { LoginMouseOverDirective } from '../../helpers/directives/login-mouse-over.directive';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'page-login',
	imports: [
		ReactiveFormsModule,
		UiButtonComponent,
		LoginMouseOverDirective,
		CommonModule,
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	authService = inject(AuthHttpService);
	router: Router = inject(Router);

	isPasswordVisible = signal<boolean>(false);

	@ViewChild('usernameInput', { read: ElementRef, static: true })
	usernameInput?: ElementRef<unknown>;

	ngAfterViewInit(): void {
		setTimeout(() => {
			(this.usernameInput?.nativeElement as any).focus();
		}, 100);
	}

	public inputs: FormInput[] = [
		{
			type: 'text',
			formControlName: 'username',
			iconUrl: null,
			placeholder: 'Введите логин',
			label: 'Telegram username',
			autocomplete: 'on',
		},
		{
			type: 'password',
			formControlName: 'password',
			iconUrl: null,
			placeholder: 'Введите пароль',
			label: 'Пароль',
			autocomplete: 'off',
		},
	];

	public form: FormGroup = new FormGroup({
		username: new FormControl<string | null>(null, Validators.required),
		password: new FormControl<string | null>(null, Validators.required),
	});

	onSubmit(event: Event) {
		if (this.form.valid) {
			this.authService.login(this.form.value).subscribe((val) => {
				this.router.navigate(['']);
			});
		}
	}

	changeVisibility(): void {
		this.isPasswordVisible.set(!this.isPasswordVisible);
	}
}
