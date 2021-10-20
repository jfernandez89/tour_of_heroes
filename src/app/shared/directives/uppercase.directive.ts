import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[UpperCase]'
})
export class UpperCaseDirective {
  constructor() {}

  @HostListener('input', ['$event']) onKeyUp(event: any) {
    event.target['value'] = event.target['value'].toUpperCase();
  }
}
