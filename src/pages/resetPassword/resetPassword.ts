import {Component} from '@angular/core';

import { NavController, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {ServiceConfig} from "../../providers/service.config";
import { HttpClient } from '../../providers/httpClient';
@Component({
  selector: 'page-resetPassword',
  templateUrl: 'resetPassword.html'
})
export class ResetPasswordPage {
  password: string = '';
  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public toast: ToastController) {
  }
  ionViewDidLoad() {
  }
  reset() {
    let self = this;
    this.http.post(ServiceConfig.CHANGEPASSWORD, {
      password: self.password,
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
}
