import { Pipe, PipeTransform } from '@angular/core';
// @ts-ignore
import moment from 'moment';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: Date): string {
    const today = moment();
    const birthdate = moment(value, 'DD/MM/YYYY');
    return today.diff(birthdate, 'years').toString();
  }
}
