import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discounts',
})
export class DiscountsPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let discount = value - (value * args[0]) / 100;
    return discount;
  }
}
