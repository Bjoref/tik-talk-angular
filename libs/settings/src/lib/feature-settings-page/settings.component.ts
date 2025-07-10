import {
	ChangeDetectionStrategy,
	Component,
	inject,
	ViewChild,
} from '@angular/core';
import {
	UiProfileHeaderComponent,
	UiAvatarUploadComponent,
} from '@tt/common-ui';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileHttpService, AuthHttpService } from '@tt/data-access';
import { firstValueFrom } from 'rxjs';
import { UiStackInputComponent } from "../../../../common-ui/src/lib/components/ui-stack-input/ui-stack-input.component";

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'settings',
	imports: [
    UiProfileHeaderComponent,
    ReactiveFormsModule,
    UiAvatarUploadComponent,
    UiStackInputComponent
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
	});

	onSave(): void {
		this.form.markAllAsTouched();
		this.form.updateValueAndValidity();

		console.log(this.form.value.stack)

		if (this.form.invalid) return;

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
			this.form.patchValue({
				firstName: this.me()?.firstName,
				lastName: this.me()?.lastName,
				username: this.me()?.username,
				description: this.me()?.description,
				stack: this.me()?.stack,
			});
		}
	}

	logout() {
		this.authHttpService.logout();
	}
}
