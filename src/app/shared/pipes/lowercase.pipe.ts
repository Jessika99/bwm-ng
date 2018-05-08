import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'lower'})
export class LowercasePipe implements PipeTransform {
	transform(value: string): string {
		return value.toLowerCase();
	}
}