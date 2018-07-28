import { Component,Input } from '@angular/core';
import {HttpClient} from '../../providers/httpClient';
import {ToastController} from 'ionic-angular';
@Component({
  selector: 'record-follow',
  templateUrl: 'record-follow.html'
})
export class RecordFollowComponent {

  text: string;
  @Input() user:any;
  // attentioned:boolean = false;
  constructor(
  	public http:HttpClient,
    public toastCtrl:ToastController) {
    console.log('Hello RecordFollowComponent Component');
    this.text = 'Hello World';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentInfoPage');

    // let that = this;
    // this.http.get("api/v1/follow/is_follower/?user_id="+that.user.id,function(data){
    //   if(data.success){
    //     console.log(data)
    //     that.attentioned = true
    //   }else{
    //     that.attentioned = false
    //   }
    // });
  }

  attention(){
  	let that = this
    this.http.post("api/v1/follow/follow_user/",{user_id :that.user.id},function(data){
      if(data.is_follower){
        console.log(data)
        that.user.attentioned = true
        let toast = that.toastCtrl.create({
                  message: '关注成功',
                  duration: 2000,
                  position: 'middle'
        });
        toast.present();
      }else{
        that.user.attentioned = false
        let toast = that.toastCtrl.create({
                  message: data.detail,
                  duration: 2000,
                  position: 'middle'
        });
        toast.present();
      }
    });
  }

}
