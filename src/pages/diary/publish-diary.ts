import { Component } from '@angular/core'

import { ModalController, NavController } from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient } from '../../providers/httpClient';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage'
import { PublishCommentPage } from '../comment/publish-comment'
import { ServiceConfig } from '../../providers/service.config';
import { DiaryMarkPage } from '../diarymark/diarymark'
import { DiaryArticlePage } from '../diaryarticle/diaryarticle'

@Component({
  selector: 'page-publish-diary',
  templateUrl: 'publish-diary.html'
})
export class PublishDiaryPage {
  diary: any = {
    title: '', content: '', attachments: []
  };
  submitted = false
  imageList: any = []
  token: string = ""
  diaryId: number = 0
  host: string = ""
  diaryArticle: any = ""
  diaryMark: any = []

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    private camera: Camera,
    private alertCtrl: AlertController,
    private httpClient: HttpClient,
    private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public storage: Storage) {
    let that = this
    this.host = ServiceConfig.getUrl();
    this.storage.get('token')
      .then((data) => {
        console.log("token data:" + data);
        that.token = data
      });
  }

  onPublishDiary() {
    if (this.diary.title == "") {
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: "请输入标题",
        buttons: ['确定']
      });
      alert.present();
      return;
    }
    if (this.diary.content == "") {
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: "请输入内容",
        buttons: ['确定']
      });
      alert.present();
      return;
    }

    if (this.diaryMark.length == 0) {
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: "请选择标签",
        buttons: ['确定']
      });
      alert.present();
      return;
    }

    if (this.diaryArticle == "") {
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: "请选择话题",
        buttons: ['确定']
      });
      alert.present();
      return;
    }

    let that = this;

    let paramObj = {
      title: this.diary.title,
      content: this.diary.content,
      status: "publish"
    }
    this.httpClient.post("api/v1/diary/", paramObj, function (data) {
      console.log(data);
      that.diaryId = data.id
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

          fileTransfer.upload(that.imageList[i], encodeURI(that.host + "api/v1/diary/" + that.diaryId + "/add_diary_images/"), options)
            .then((data) => {
              console.log(data);
              if (i == (that.imageList.length - 1)) {
                loading.dismiss();
                that.navCtrl.pop();
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
      }

      that.httpClient.post("api/v1/diary/" + that.diaryId + "/change_topic/", { topic_title: that.diaryArticle }, function (data) {
        console.log("日记话题上传:");
        console.log(data);
      });

      that.diaryMark.forEach(function (item) {
        let diaryMarkParam = {
          content_type: "diary",
          object_id: that.diaryId,
          name: item.name,
          level: item.level,
          type: "content"
        };
        that.httpClient.post("api/v1/tag/", diaryMarkParam, function (data) {
          console.log("日记标签上传:");
          console.log(data);
        });
      });
    });
  }

  // 存草稿, 暂时跳转到追加评论界面
  saveDraft() {
    let modal = this.modalCtrl.create(PublishCommentPage);
    modal.present();
    modal.onWillDismiss((data: any[]) => {
      if (data) {
        console.log('data', data)
      }
    });
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
      quality: 20,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    let that = this;
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/png;base64,' + imageData;
      that.imageList.push(base64Image);
      let obj = { url: "" };
      obj.url = base64Image;
      that.diary.attachments.push(obj);
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

  goDiaryMark() {
    let profileModal = this.modalCtrl.create(DiaryMarkPage, { userId: 8675309 });
    profileModal.onDidDismiss(data => {
      console.log(data);
      this.diaryMark = data;
    });
    profileModal.present();
  }

  goDiaryArticle() {
    let profileModal = this.modalCtrl.create(DiaryArticlePage, { userId: 8675309 });
    profileModal.onDidDismiss(data => {
      console.log(data);
      this.diaryArticle = "#" + data.title;
    });
    profileModal.present();
  }
}
