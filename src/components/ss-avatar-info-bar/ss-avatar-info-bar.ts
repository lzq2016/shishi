import { Component } from '@angular/core';
import { OnInit} from "@angular/core";

/**
 * Generated class for the SsAvatarInfoBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ss-avatar-info-bar',
  templateUrl: 'ss-avatar-info-bar.html'
})
export class SsAvatarInfoBarComponent implements OnInit{

  linkPages: string[];
  isNoMargin:boolean;
  limitedLines:number;
  avatarImg:string;
  signature:string;

  constructor() {
  }

  ngOnInit() {
    this.linkPages = [
      "assets/img/ica-slidebox-img-3.png",
      "assets/img/ica-slidebox-img-2.png",
      "assets/img/ica-slidebox-img-1.png"
    ];
    this.isNoMargin = false;//是否有边框
    this.limitedLines = 2;//个性签名行数限制
    this.avatarImg = "url(assets/img/test/lion.jpg)";
    this.signature = '我存故我在,to be or not to be ,that is a question,so I come 这里 to search for 答案';
  }

}
