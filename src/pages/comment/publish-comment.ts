/**
 * 发布评论
 * */
import { Component } from '@angular/core'

import { App, NavController, ViewController, NavParams } from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient } from '../../providers/httpClient';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { ServiceConfig } from '../../providers/service.config';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-publish-comment',
  templateUrl: 'publish-comment.html'
})
export class PublishCommentPage {
  comment: any = {
    content: '', attachments: []
  }
  imageList: any = [];
  id: number = 0;
  type: string = ""
  type_en: string = ""
  token: string = ""

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public app: App,
    private camera: Camera,
    private alertCtrl: AlertController,
    private httpClient: HttpClient,
    private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public storage: Storage) {
    let that = this
    this.storage.get('token')
      .then((data) => {
        console.log("token data:" + data);
        that.token = data
      });
  }
  ionViewDidLoad() {
    console.log(this.navParams.get('type_en'));
    this.id = this.navParams.get('id')
    this.type = this.navParams.get('type')
    this.type_en = this.navParams.get('content_type')
  }
  onSave() {

    if (this.comment.content == "") {
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: "请输入内容",
        buttons: ['确定']
      });
      alert.present();
      return;
    }
    let paramObj = {
      content_type: this.type_en,
      content: this.comment.content,
      object_id: this.id
    }
    let that = this;
    let api = "";
    let publish_id = 0
    if (this.type == "comment_reply") {
      api = "api/v1/comment/" + this.id + "/reply/"
    } else if (this.type == "comment") {
      api = "api/v1/comment/"
    }
    this.httpClient.post(api, paramObj, function (data) {
      console.log(data);
      publish_id = data.id;
      if (that.imageList.length >= 1) {
        let loading = that.loadingCtrl.create({
          spinner: 'circles',
          content: '正在上传图片...'
        });
        loading.present();

        const fileTransfer: FileTransferObject = that.transfer.create();
        for (let i = 0; i < that.imageList.length; i++) {
          let options: FileUploadOptions = {
            fileKey: 'images',
            // fileName: that.imageList[i].substr(25,20)+".png",
            fileName: that.randomString(20) + ".png",
            params: {
              headers: {
                Authorization: "Bearer " + that.token
              }
            }
          }

          fileTransfer.upload(that.imageList[i], encodeURI(ServiceConfig.getUrl() + "api/v1/comment/" + publish_id + "/add_comment_images/"), options)
            .then((data) => {
              console.log(data);
              if (i == (that.imageList.length - 1)) {
                loading.dismiss();
                that.viewCtrl.dismiss("finish");
              }
            }, (err) => {
              console.log(err);
              let alert = that.alertCtrl.create({
                title: '提示',
                subTitle: err,
                buttons: ['确定']
              });
              alert.present();
            })
        }
      } else {
        that.viewCtrl.dismiss("finish");
      }
    });
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }

  getPics() {
    if (this.imageList.length >= 9) {
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: "最多上传9张图片",
        buttons: ['确定']
      });
      alert.present();
      return;
    }
    const options: CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    let that = this;
    this.camera.getPicture(options).then((imageData) => {
      // 获取成功
      let base64Image = 'data:image/png;base64,' + imageData;
      that.imageList.push(base64Image);
      let obj = { url: "" };
      obj.url = base64Image;
      that.comment.attachments.push(obj);
    }, (err) => {
      console.log(err);
      let alert = that.alertCtrl.create({
        title: '提示',
        subTitle: err,
        buttons: ['确定']
      });
      alert.present();
    });
  }

  randomString(len) {
    　　len = len || 32;
    　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for (let i = 0; i < len; i++) {
      　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
  }
}
