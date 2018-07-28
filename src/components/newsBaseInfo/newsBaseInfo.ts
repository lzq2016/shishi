import { Component } from '@angular/core';

@Component({
  selector: 'news-base',
  templateUrl: 'newsBaseInfo.html'
})
export class NewsBaseInfo {

  sourse: string;
  pastTime:string;
  howManyRead:number;

  constructor() {
  }

}
