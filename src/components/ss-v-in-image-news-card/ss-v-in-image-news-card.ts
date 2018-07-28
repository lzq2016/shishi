import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ss-v-in-image-news-card',
  templateUrl: 'ss-v-in-image-news-card.html'
})
export class SsVInImageNewsCardComponent implements OnInit{

  title:string;
  bgImg:string;

  constructor() {
  }

  ngOnInit() {
    this.title = '越来越多的电脑使用。美光也制造内存——即手机和个人电脑上用来短期存储数据的元件。该公司';
    this.bgImg = 'url(assets/img/test/lion.jpg)'
  }

}
