import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ServiceConfig} from './service.config';
import { Storage } from '@ionic/storage';

@Injectable()
export class HttpClient {
  constructor(public http: Http,public storage: Storage) {
  }
  
  // post 和 get请求

  public post(url: string, paramObj: any, cb?: Function) {
    if (url.indexOf('http') === -1) {
      url = ServiceConfig.getUrl() + url;
    }
    console.info('请求地址:' + url);
    console.info('参数:' + JSON.stringify(paramObj));
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    this.storage.get('token').then(data =>{
      if(url.indexOf('token') < 0) {
        if(data != '' && data != null && data != undefined) {
          headers.append('Authorization',  'Bearer ' + data);
        }
      }
      return this.http.post(url, JSON.stringify(paramObj), new RequestOptions({headers: headers}))
        .map(res => res.json()).catch(this.handleError).subscribe(data => {
              cb(data);
          }, err => {
            cb(err);
            this.handleSubscribeError(err);
          },
      );
    });
     // headers.append('Authorization',  'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxIiwidXNlcl9pZCI6MywiZW1haWwiOiIiLCJleHAiOjE1MjY1NjAwNjV9.fjGa-U2sVClsyIRR6QsAAhqjuw39cb-s7UGMaj1mqV8");
     // return this.http.post(url, JSON.stringify(paramObj), new RequestOptions({headers: headers}))
     //    .map(res => res.json()).catch(this.handleError).subscribe(data => {
     //        cb(data);
     //      }, err => {
     //        cb(err);
     //        this.handleSubscribeError(err);
     //      },
     // );

  }

  public postForm(url: string, paramObj: any, cb?: Function) {
    if (url.indexOf('http') === -1) {
      url = ServiceConfig.getUrl() + url;
    }
    console.info('请求地址:' + url);
    console.info('参数:' + JSON.stringify(paramObj));
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.storage.get('token').then(data =>{
      if(url.indexOf('token') < 0) {
        if(data != '' && data != null && data != undefined) {
          headers.append('Authorization',  'Bearer ' + data);
        }
      }
      return this.http.post(url, this.toBodyString(paramObj), new RequestOptions({headers: headers}))
        .map(res => res.json()).catch(this.handleError).subscribe(data => {
            cb(data);
          }, err => {
            cb(err);
            this.handleSubscribeError(err);
          },
        );
    });
  }

  public get(url, cb?: Function) {
    if (url.indexOf('http') === -1) {
      url = ServiceConfig.getUrl() + url;
    }
    console.info('请求地址:' + url);
    // const httpOptions = {
    // headers: new Headers({
    //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxIiwidXNlcl9pZCI6MywiZW1haWwiOiIiLCJleHAiOjE1MjY1NjMwMTF9._UJ102xzgf4DnPgmZUZXQDjt5mVI0GSfwmUi9SeuYLE'
    //   })
    // };
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.storage.get('token').then(data =>{
      if(url.indexOf('token') < 0) {
        if(data != '' && data != null && data != undefined) {
          headers.append('Authorization', 'Bearer ' + data);
        }
      }
      return this.http.get(url, {headers}).map(res => res.json()).catch(this.handleError).subscribe(data => {
          cb(data);
      }, err => {
        this.handleSubscribeError(err);
      });
    });

     // return this.http.get(url, httpOptions).map(res => res.json()).catch(this.handleError).subscribe(data => {
     //    cb(data);
     //  }, err => {
     //    this.handleSubscribeError(err);
     // });

  }

  public getFromJsonFile(url, cb?: Function) {
    return this.http.get(url).map(res => res.json()).catch(this.handleError).subscribe(data => {
      cb(data);
    }, err => {
      this.handleSubscribeError(err);
    });
  }

  private handleError(error: Response | any) {
    console.info('origin error: ' + error);
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = error.toString();
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.info('error: ' + errMsg);
    return Observable.throw(errMsg);
  }

  private toBodyString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return ret.join('&');
  }
  private toQueryPair(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }
  
  private handleSubscribeError(error: any) {
    console.info('origin error: ' + error);
  }
}
