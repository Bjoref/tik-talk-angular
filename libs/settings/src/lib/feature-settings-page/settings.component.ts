import {
	ChangeDetectionStrategy,
	Component,
	inject,
	ViewChild,
} from '@angular/core';
import {
	UiProfileHeaderComponent,
	UiAvatarUploadComponent,
	UiStackInputComponent,
	UiAddressInputComponent
} from '@tt/common-ui';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AuthHttpService, ProfileHttpService } from '@tt/data-access';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'settings',
	imports: [
    UiProfileHeaderComponent,
    ReactiveFormsModule,
    UiAvatarUploadComponent,
    UiStackInputComponent,
    UiAddressInputComponent
],
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.scss',
})
export class SettingsComponent {
	@ViewChild(UiAvatarUploadComponent) uiAvatar!: UiAvatarUploadComponent;

	profileService = inject(ProfileHttpService);
	authHttpService = inject(AuthHttpService);
	private me = this.profileService.me;

	fb = inject(FormBuilder);

	form = this.fb.group({
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		username: [{ value: '', disabled: true }, Validators.required],
		description: [''],
		stack: [['']],
		city: [''],
	});

	onSave(): void {
		this.form.markAllAsTouched();
		this.form.updateValueAndValidity();

		if (this.form.invalid) return;

		console.log(this.form.controls)

		firstValueFrom(
			//@ts-ignore
			this.profileService.patchProfile({
				...this.form.value,
				stack: this.splitStack(this.form.value.stack),
			})
		);

		if (this.uiAvatar.avatar) {
			firstValueFrom(
				this.profileService.uploadAvatar(this.uiAvatar.avatar)
			);
		}
	}

	splitStack(stack: string | null | string[] | undefined): string[] {
		if (Array.isArray(stack)) return stack;

		if (!stack) return [];

		return stack.split(',');
	}

	mergeStack(stack: string | null | string[]): string {
		if (Array.isArray(stack)) return stack.join(',');

		if (!stack) return '';

		return stack;
	}

	async ngOnInit() {
		if (!this.me()) {
			await firstValueFrom(this.profileService.getMe());
		}
		this.form.patchValue({
			firstName: this.me()?.firstName,
			lastName: this.me()?.lastName,
			username: this.me()?.username,
			description: this.me()?.description,
			stack: this.me()?.stack,
			city: this.me()?.city,
		});

		console.log(this.form.controls)
		console.log(this.me()?.city)
	}

	logout() {
		this.authHttpService.logout();
	}
}
