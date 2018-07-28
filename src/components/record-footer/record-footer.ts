import { Component } from '@angular/core';

/**
 * Generated class for the RecordFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'record-footer',
  templateUrl: 'record-footer.html'
})
export class RecordFooterComponent {

  text: string;

  constructor() {
    console.log('Hello RecordFooterComponent Component');
    this.text = 'Hello World';
  }

}
