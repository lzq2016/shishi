import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import { ServiceConfig } from '../../providers/service.config';
@Component({
  selector: 'ss-v-out-image-news-card',
  templateUrl: 'ss-v-out-image-news-card.html'
})
export class SsVOutImageNewsCardComponent implements OnInit, AfterViewInit {

  @Input() cardData;
  url: string = '';
  constructor() {
    this.url = ServiceConfig.getUrl();
  }

  ngOnInit(){
  }

  ngAfterViewInit() {
    // setTimeout(()=>{
    //   console.log("afterView",this.el.nativeElement.querySelector('.desc').offsetHeight);
    // },10)
  }

}
