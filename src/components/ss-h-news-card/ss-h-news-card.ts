import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ss-h-news-card',
  templateUrl: 'ss-h-news-card.html',
})
export class SsHNewsCardComponent implements OnInit {

  describe: string;
  title: string;
  newsUrl: string;
  noBoxshadow: boolean;
  @Input() heightPercent: number;

  constructor() {
  }

  ngOnInit() {
    this.newsUrl = 'url(assets/img/test/lion.jpg)';
    this.title = 'this is a truththis is a truththis is a truth';
    this.describe = 'hello world is the start of every coding language';
    this.noBoxshadow = false;
  }

}
