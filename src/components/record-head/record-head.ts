import { Input } from '@angular/core';
import { Component } from '@angular/core';

/**
 * Generated class for the RecordHeadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'record-head',
  templateUrl: 'record-head.html'
})
export class RecordHeadComponent {

  @Input() color;
  @Input() title;

  @Input() show ="true";

  @Input () showhead = "true";
  text: string;

  constructor() {
    console.log('Hello RecordHeadComponent Component');
    this.text = 'Hello World';
  }

  more() {
    console.log('tag', '555');
  }
}
