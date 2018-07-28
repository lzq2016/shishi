import {Component} from '@angular/core';
import {OnInit} from "@angular/core";

@Component({
  selector: 'ss-avatar-news-bar',
  templateUrl: 'ss-avatar-news-bar.html'
})
export class SsAvatarNewsBarComponent implements OnInit {

  text: string;
  avatarUrl: string;
  publishTime: string;
  signature: string;
  name: string;

  constructor() {
  }

  ngOnInit() {
    this.text = 'Hello World';
    this.avatarUrl = 'assets/img/ica-slidebox-img-4.png';
    this.name = 'big boss';
    this.publishTime = '3:45pm 21/05/09'
    this.signature = 'those hurt me but cannot kill me will make me stronger';
  }

}
