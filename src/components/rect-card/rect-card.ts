import { Component } from '@angular/core';
import {Input} from "@angular/core";

/**
 * Generated class for the RectCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'rect-card',
  templateUrl: 'rect-card.html'
})
export class RectCardComponent {
  @Input() cardInfo:object;

  constructor() {
  }

}
