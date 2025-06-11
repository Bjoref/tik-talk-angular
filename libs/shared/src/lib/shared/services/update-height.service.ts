import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class UpdateHeightService {
	public updateHeight(
		hostElement: ElementRef,
		renderer: Renderer2,
		numbers: number
	) {
		const { top } = hostElement.nativeElement.getBoundingClientRect();
		const height = window.innerHeight - top - numbers;

		renderer.setStyle(hostElement.nativeElement, 'height', height + 'px');
	}
}
