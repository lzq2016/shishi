import {Component, Input} from '@angular/core';

@Component({
  selector: 'inside-content-card',
  templateUrl: 'inside-content-card.html'
})
export class InsideContentCardComponent {

  @Input() session:object;

  constructor() {
  }

}
