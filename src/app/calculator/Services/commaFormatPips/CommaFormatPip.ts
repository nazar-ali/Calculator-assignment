import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'commaFormat'})

export class CommaFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    const [integerPart, decimalPart] = value.split('.'); 
    const regexAddCommas = /\B(?=(\d{3})+(?!\d))/g;
    const formattedInteger = integerPart.replace(regexAddCommas, ','); 
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger; 
  }
}
