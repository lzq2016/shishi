import {Component, Input} from '@angular/core';

@Component({
  selector: 'flippage-two',
  templateUrl: 'flippage-two.html'
})
export class FlippageTwoComponent {

  @Input() dataSource:any;

  constructor() {
  }

}
