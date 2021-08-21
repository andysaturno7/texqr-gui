import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], condition: any): any {
    if (!value) return null;
    if (!condition || condition == '') return value;
    condition = condition.toLowerCase();

    return value.filter((val: any, index, ob) =>
      JSON.stringify(val).toLowerCase().includes(condition)
    );

    return [];
  }
}
