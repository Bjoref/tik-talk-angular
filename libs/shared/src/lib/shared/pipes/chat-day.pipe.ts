import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);

@Pipe({
	name: 'chatDay',
})
export class ChatDayPipe implements PipeTransform {
	transform(
		value: string | null,
		format: string = 'dd.MM'
	): string | null {
		if (!value) return null;

		const utcDate = new Date(value.endsWith('Z') ? value : value + 'Z');
		if (isNaN(utcDate.getTime())) return value;

		const locale = 'ru-RU';

		const currentDate = new Date();

		if (this.isSameDay(currentDate, utcDate)) {
            return 'Сегодня'
		}
		return formatDate(value, format, locale);
	}

	private isSameDay(date1: Date, date2: Date): boolean {
		return (
			date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate()
		);
	}
}
