import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ss-news-footer',
  templateUrl: 'ss-news-footer.html'
})
export class SsNewsFooterComponent implements OnInit {

  name: string;
  location: string;
  time: string;
  source: string;

  constructor() {
  }

  ngOnInit() {
    this.name = "shishi";
    this.location = 'BUPT';
    this.time = '03:45pm 17/08/09';
    this.source = 'cctv-ad'
  }

}
