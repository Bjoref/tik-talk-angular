import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	protected http = inject(HttpClient);
	protected baseApiUrl: string = '/yt-course/';

	constructor() {}
}
