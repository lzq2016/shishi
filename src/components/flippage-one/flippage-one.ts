import { Component, Input} from '@angular/core';

@Component({
  selector: 'flippage-one',
  templateUrl: 'flippage-one.html'
})
export class FlippageOneComponent {
  @Input() cardData:any;
  constructor() {
  }

}
