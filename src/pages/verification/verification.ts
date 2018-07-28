import {Component} from '@angular/core';

import {NavController, ToastController, NavParams, Events} from 'ionic-angular';
import {UserData} from '../../providers/user-data'
import {LoginPage} from "../login/login";
import {ResetPasswordPage} from "../resetPassword/resetPassword";
import {Storage} from '@ionic/storage';
import {HttpClient} from '../../providers/httpClient';
import {ServiceConfig} from '../../providers/service.config';

@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html'
})
export class VerificationPage {
  timer: any;
  num: number = 60;
  phone: string = '';
  verificationCode: string = '';
  password: string = '';
  type: string = '';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public storage: Storage,
              public events: Events,
              public userData: UserData,
              public toast: ToastController) {

  }
  ionViewDidLoad() {
    this.phone = this.navParams.get('phone');
    this.type = this.navParams.get('type');
    if(this.type == 'signup'){
      this.getVerificationCode();
    }else {
      this.num = -1;
    }
  }
  verifyUserSignup() {
    let self = this;
    this.http.post(ServiceConfig.VERIFYUSERSIGNUP, {
      phone_number: self.phone,
      verification_code: self.verificationCode,
    }, function (data) {
      if (data.success == true || data.success == 'true') {
        let toast = self.toast.create({
          message: '注册成功',
          position: 'top',
          duration: 2000
        });
        toast.present();
        if(self.type == 'signup') {
          self.storage.set(self.userData.HAS_LOGGED_IN, true);
          self.userData.setUsername(data.username);
          self.events.publish('user:signup');
          self.navCtrl.push(LoginPage)
        } else {
          self.navCtrl.push(ResetPasswordPage)
        }
      } else {
        let toast = self.toast.create({
          message: '验证码错误',
          position: 'top',
          duration: 2000
        });
        toast.present();
      }
    });
  }
  getVerificationCode() {
    let self = this;
    this.http.post(ServiceConfig.SENDCODE, {
      phone_number: self.phone,
    }, function (data) {
      if (data.success == true || data.success == 'true') {
        let toast = self.toast.create({
          message: '发送成功',
          position: 'top',
          duration: 2000
        });
        self.num = 60;
        self.startInterval();
        toast.present();
      } else {
        let toast = self.toast.create({
          message: '发送失败',
          position: 'top',
          duration: 2000
        });
        toast.present();
      }
    });
  }
  reset() {
    let self = this;
    this.http.post(ServiceConfig.CHANGEPASSWORD, {
      password: self.password,
      phone_number: self.phone,
      verification_code: self.verificationCode,
    }, function (data) {
      if (data.success == true || data.success == 'true') {
        let toast = self.toast.create({
          message: '重置成功',
          position: 'top',
          duration: 2000
        });
        toast.present();
        self.navCtrl.push(LoginPage);
      } else {
        let toast = self.toast.create({
          message: '重置错误',
          position: 'top',
          duration: 2000
        });
        toast.present();
      }
    });
  }
  startInterval() {
    this.timer = setInterval(() => {
      if (this.num == 0) {
        clearInterval(this.timer);
      } else {
        this.num = this.num - 1;
      }
    }, 1000);
  }
  ionViewWillUnload() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
