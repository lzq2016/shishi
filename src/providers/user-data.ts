import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from './httpClient';
import { ServiceConfig } from './service.config';
import {ToastController} from 'ionic-angular'

@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public http: HttpClient,
    public toast: ToastController,
    public storage: Storage
  ) {}

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(data:any) {
    let self = this;
    this.http.post(ServiceConfig.TOKENAUTH, {
      username: data.username,
      password: data.password,
    }, function(data){
      console.log(data)
      if(data.token != '' && data.token != null){
        let toast = self.toast.create({
          message: '登录成功',
          position: 'top',
          duration: 2000
        });
        toast.present();
        self.storage.set(self.HAS_LOGGED_IN, true);
        self.storage.set('token', data.token);
        self.setUsername(data.username);
        self.events.publish('user:login');
        return 'success';
      }else {
        let toast = self.toast.create({
          message: '登录失败',
          position: 'top',
          duration: 2000
        });
        toast.present();
      }
      return 'fail';
    });
  };

  signup(data: any) {
    let self = this;
    this.http.post(ServiceConfig.SIGNUP, {
      phone_number: data.phone,
      gender: data.gender,
      username: data.username,
      password: data.password,
    }, function(data){
      if(data.success == true || data.success == 'true'){
        let toast = self.toast.create({
          message: '注册成功',
          position: 'top',
          duration: 2000
        });
        toast.present();
        self.storage.set(self.HAS_LOGGED_IN, true);
        self.setUsername(data.username);
        self.events.publish('user:signup');
        return 'success';
      }else {
        let toast = self.toast.create({
          message: '注册失败',
          position: 'top',
          duration: 2000
        });
        toast.present();
      }
      return 'fail';
    });
  };

  logout() {
    let self = this;
    this.http.get(ServiceConfig.LOGOUT,function(data){
      if(data.success == true || data.success == 'true'){
        let toast = self.toast.create({
          message: '注销成功',
          position: 'top',
          duration: 2000
        });
        toast.present();
        self.storage.remove(self.HAS_LOGGED_IN);
        self.storage.remove('username');
        self.events.publish('user:logout');
        return 'success';
      }else {
        let toast = self.toast.create({
          message: '注销失败',
          position: 'top',
          duration: 2000
        });
        toast.present();
      }
      return 'fail';
    });
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
