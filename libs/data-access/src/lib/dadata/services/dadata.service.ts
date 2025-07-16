import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DadataInnerRes, DadataResponse } from '../interfaces/dadata.interface';
import { HttpService } from '../../common/services';
import { DADATA_TOKEN } from '../../common/services/token';

@Injectable({
	providedIn: 'root',
})
export class DadataService extends HttpService {
	private dadataUrl =
		'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

	getSuggestion(query: string) {
		return this.http
			.post<{ suggestions: DadataInnerRes[] }>(
				this.dadataUrl,
				{ query },
				{
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						Authorization: 'Token ' + DADATA_TOKEN,
					},
				}
			)
			.pipe(
				map((res) => {
					return Array.from(
						new Set(
							res.suggestions.map((sug) => {
								return sug.data.city;
							})
						)
					);
				})
			);
	}
}
