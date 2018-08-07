import {Component, Input} from '@angular/core';

@Component({
  selector: 'diary',
  templateUrl: 'diary.html'
})
export class DiaryComponent {

  @Input() attachments: any = [];
  
  constructor() {
  }

  

}
