/**
 * 发布评论
 * */
import {Component} from '@angular/core'
import {NgForm} from '@angular/forms'

import {NavController, ViewController} from 'ionic-angular'


@Component({
  selector: 'page-comment-detail',
  templateUrl: 'comment-detail.html'
})
export class CommentDetailPage {
  comment: any = {
    content: '小红书教你改变自己的APP，小红书一开始是胡歌代言的我并不知道是干嘛的，还以为是个电子书的软件。上半年知道了是个购物软件也是个海外代购软件也是个教你如何搭配穿衣服的软件，我按他教的试买过两次衣服，暑假回家同学都说我变得比以前帅了，主要我认为还是搭配的好看符合个人的气质了自然而然就好看了。女生真的很适合使用这个软件非常的棒，让你从丑小鸭变成白天鹅。',
    attachments: [
      {url: 'https://tse2-mm.cn.bing.net/th?id=OIP.HOPk3iifOhlWjUuLrr8imwHaEK&p=0&o=5&pid=1.1'},
      {url: 'https://tse2-mm.cn.bing.net/th?id=OIP.HOPk3iifOhlWjUuLrr8imwHaEK&p=0&o=5&pid=1.1'},
      {url: 'https://tse2-mm.cn.bing.net/th?id=OIP.HOPk3iifOhlWjUuLrr8imwHaEK&p=0&o=5&pid=1.1'},
      {url: 'http://pic4.bbzhi.com/fengjingbizhi/gaoqingziranfengjingzhuomianbizhi/gaoqingziranfengjingzhuomianbizhi_399436_5.jpg'},
    ]
  }
  submitted = false
  attachments1 = [
    {url: 'https://tse2-mm.cn.bing.net/th?id=OIP.HOPk3iifOhlWjUuLrr8imwHaEK&p=0&o=5&pid=1.1'},
    {url: 'https://tse2-mm.cn.bing.net/th?id=OIP.HOPk3iifOhlWjUuLrr8imwHaEK&p=0&o=5&pid=1.1'},
  ]
  attachments2 = [
    {url: 'https://tse2-mm.cn.bing.net/th?id=OIP.HOPk3iifOhlWjUuLrr8imwHaEK&p=0&o=5&pid=1.1'},
  ]

  constructor(public navCtrl: NavController,  public viewCtrl: ViewController) {
  }

  onSave(form: NgForm) {
    this.submitted = true

    if (form.valid) {
      // Pass back a new comment
      // this.dismiss(this.comment);
    }
  }

  onMore() {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    // this.viewCtrl.dismiss(data);
  }
}
