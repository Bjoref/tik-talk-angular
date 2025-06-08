import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);

@Pipe({
	name: 'dateConverter',
})
export class DateConverterPipe implements PipeTransform {
	transform(
		value: string | null,
		format: string = 'dd.MM.yyyy'
	): string | null {
		if (!value) return null;

		const utcDate = new Date(value.endsWith('Z') ? value : value + 'Z');
		if (isNaN(utcDate.getTime())) return value;

		const locale = 'ru-RU';

		const currentDate = new Date();

		if (this.isSameDay(currentDate, utcDate)) {
			const diffMinutes = Number(
				Number(
					(currentDate.getTime() - utcDate.getTime()) / (1000 * 60)
				).toFixed(0)
			);

			if (diffMinutes < 5) {
				return 'Сейчас';
			} else if (diffMinutes < 60) {
				return `${diffMinutes} минут назад`;
			} else if (diffMinutes >= 60) {
				return this.formatHours(Number((diffMinutes / 60).toFixed()));
			}
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

	formatHours(hours: number): string {
		const lastDigit = hours % 10;
		const lastTwoDigits = hours % 100;

		if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
			return `${hours} часов назад`;
		}
		if (lastDigit === 1) {
			return `${hours} час назад`;
		}
		if (lastDigit >= 2 && lastDigit <= 4) {
			return `${hours} часа назад`;
		}
		return `${hours} часов назад`;
	}
}
