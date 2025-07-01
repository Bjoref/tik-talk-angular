import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { UiSvgComponent } from '../ui-svg/ui-svg.component';
import { DndDirective } from '@tt/shared';
import { ProfileHttpService } from '@tt/data-access';
import { FormsModule } from '@angular/forms';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'ui-avatar-upload',
	imports: [UiSvgComponent, DndDirective, FormsModule],
	templateUrl: './ui-avatar-upload.component.html',
	styleUrl: './ui-avatar-upload.component.scss',
})
export class UiAvatarUploadComponent {
	preview = signal<string>('/assets/img/icons/avatar-placeholder.svg');
	avatar: File | null = null;

	profileService = inject(ProfileHttpService);

	constructor() {
		effect(() => {
			this.preview.set(
				this.profileService.me()?.avatarUrl
					? `https://icherniakov.ru/yt-course/${
							this.profileService.me()?.avatarUrl
					  }`
					: '/assets/img/icons/avatar-placeholder.svg'
			);
		});
	}

	fileBrowserHandler(event: Event) {
		const file = (event.target as HTMLInputElement)?.files?.[0];

		this.processFile(file);
	}

	onFileDroped(file: File) {
		this.processFile(file);
	}

	processFile(file: File | null | undefined) {
		if (!file || !file.type.match('image')) return;

		const reader = new FileReader();

		reader.onload = (event) => {
			this.preview.set(event.target?.result?.toString() ?? '');
		};

		reader.readAsDataURL(file);

		this.avatar = file;
	}
}
