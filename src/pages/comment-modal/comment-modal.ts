import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {animate, state, style, transition, trigger} from "@angular/animations";

@IonicPage()
@Component({
  selector: 'page-comment-modal',
  templateUrl: 'comment-modal.html',
  animations: [
    trigger('headerTop', [
      state('top', style({
        top: '0'
      })),
      state('notTop', style({
        top: '40%'
      })),
      transition('top => notTop', animate('500ms ease-out')),
      transition('notTop => top', animate('500ms ease-in')),
    ]),
    trigger('contentTop', [
      state('top', style({
        top: '0',
        height:'100%'
      })),
      state('notTop', style({
        top: '40%',
        height:'60%'
      })),
      transition('top => notTop', animate('500ms ease-out')),
      transition('notTop => top', animate('500ms ease-in')),
    ]),
  ]
})
export class CommentModalPage {

  showModalOccupy: boolean = true;
  data;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtl: ViewController,) {
    console.log(this.navParams.get('key'), typeof this.navParams.get('value'), this.navParams.get('value'));
    // this.data = this.navParams.get('value')
    this.data={
      list:[
        {
          name:'iop',
          icon:'assets/img/p2p/delete.svg',
          comment:'说的好',
          reply:[
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+1',
            },
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+2',
            },
          ]
        },
        {
          name:'iop',
          icon:'assets/img/p2p/delete.svg',
          comment:'说的好',
          reply:[
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+1',
            },
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+2',
            },
          ]
        },
        {
          name:'iop',
          icon:'assets/img/p2p/delete.svg',
          comment:'说的好',
          reply:[
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+1',
            },
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+2',
            },
          ]
        },
        {
          name:'iop',
          icon:'assets/img/p2p/delete.svg',
          comment:'说的好',
          reply:[
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+1',
            },
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+2',
            },
          ]
        },
        {
          name:'iop',
          icon:'assets/img/p2p/delete.svg',
          comment:'说的好',
          reply:[
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+1',
            },
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+2',
            },
          ]
        },
        {
          name:'iop',
          icon:'assets/img/p2p/delete.svg',
          comment:'说的好',
          reply:[
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+1',
            },
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+2',
            },
          ]
        },
        {
          name:'iop',
          icon:'assets/img/p2p/delete.svg',
          comment:'说的好',
          reply:[
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+1',
            },
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+2',
            },
          ]
        },
        {
          name:'iop',
          icon:'assets/img/p2p/delete.svg',
          comment:'说的好',
          reply:[
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+1',
            },
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+2',
            },
          ]
        },
        {
          name:'iop',
          icon:'assets/img/p2p/delete.svg',
          comment:'说的好',
          reply:[
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+1',
            },
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+2',
            },
          ]
        },
        {
          name:'iop',
          icon:'assets/img/p2p/delete.svg',
          comment:'说的好',
          reply:[
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+1',
            },
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+2',
            },
          ]
        },
        {
          name:'iop',
          icon:'assets/img/p2p/delete.svg',
          comment:'说的好',
          reply:[
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+1',
            },
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+2',
            },
          ]
        },
        {
          name:'iop',
          icon:'assets/img/p2p/delete.svg',
          comment:'说的好',
          reply:[
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+1',
            },
            {
              name:'iop',
              icon:'assets/img/p2p/delete.svg',
              comment:'说的好+2',
            },
          ]
        },
      ]
    }
  }

  goBack(event) {
    let data: string = this.navParams.get('key');
    this.viewCtl.dismiss(data);
    event && event.stopPropagation();
  }

  goTop() {
    this.showModalOccupy = !this.showModalOccupy;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentModalPage');
  }

}
