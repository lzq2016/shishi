import {Component, Input} from '@angular/core';

@Component({
  selector: 'outside-content-card',
  templateUrl: 'outside-content-card.html'
})
export class OutsideContentCardComponent {

  @Input() session:object;

  constructor() {
  }

}
