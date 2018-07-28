import {Component, Input} from '@angular/core';

@Component({
  selector: 'share-list',
  templateUrl: 'share-list.html'
})
export class ShareListComponent {

  @Input() shareID:string;
  shareTo:shareApp = new shareApp();

  constructor() {
    console.log(this.shareTo)
  }

}
class shareApp{
  base:string = 'assets/img/shareApps/';
  lists = [
    {
      name:'微信',
      icon:'url('+this.base+'wechat.svg'+')',
    },
    {
      name:'朋友圈',
      icon:'url('+this.base+'pyq.svg'+')',
    },
    {
      name:'微博',
      icon:'url('+this.base+'weibo.svg'+')',
    },
    {
      name:'qq',
      icon:'url('+this.base+'qq.svg'+')',
    },
    {
      name:'qq空间',
      icon:'url('+this.base+'qzone.svg'+')',
    },
  ]
}
