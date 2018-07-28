/**
 * 笔记详情
 * */
import {Component} from '@angular/core'
import {NgForm} from '@angular/forms'

import {NavController, ViewController} from 'ionic-angular'


@Component({
  selector: 'page-diary-detail',
  templateUrl: 'diary-detail.html'
})
export class DiaryDetailPage {
  slideH = screen.width * 0.7 + 'px'
  // slideH = '300px'
  slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/img/speakers/card-saopaolo.png",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/img/speakers/bear.jpg",
    }
  ];
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

  constructor(public navCtrl: NavController,  public viewCtrl: ViewController) {
    console.log('constructor ', this.slideH)
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
