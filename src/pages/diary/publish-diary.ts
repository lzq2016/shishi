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
    title: '', content: '', attachments: [
      // {url: 'https://tse2-mm.cn.bing.net/th?id=OIP.HOPk3iifOhlWjUuLrr8imwHaEK&p=0&o=5&pid=1.1'},
      // {url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEMElEQVR4nO2bsWvyQBTA70/onyC5Fuq5mMmtdOnmUBxd7OgidHFxKjh0LIXuQueCeyl0FZduiiYhoEEQKaJ8iCDyvsFeuMQ7zRn1mtiDtzQxee/37r1399JDiDPsRPrMOL+8NjGpGRr5MjAZG5hA1MTExDYxqXdx6o5nJ3d0L1LpH6OVG7BX0chX9yKVFhq+8nrqKareDiodjTxwARha8l61csogdC9S6bh73i9uONiJ9JmBk5+qFTq2mJjYCCGEOjh5q1oZZbMAp+6QiUldtSIKZ0EdmZjYqhVRKONTBwBItQKq5Q+Aqhdbega+n1/g+/nl9AA4+QIs+g7QMao+ngYAS8/AuPYKy8kU2DFrNOMPoJfNwb/3D+CNIABG1UcAAJi32tDL5qIFwMkX1rwuC2DyVvf8Zl9hc1AAdMrzDGb/HgSApWdg3mp7njNvtcG+uvmdAJx8YU3h5WQKo+ojWHrGndKyOeD7+cXzzEXfAUvPHB+ApWeEwkt081YbBsWS+/tdARh4lU/YKhImiUoBoIlsUzzzxrj2uualMAAMTMC+uvG849/7x2EB2Fc30obPGk1w8gXu87YBsPQMDMuVjTHu5Aue9w3LlcMB8Jew5WQqlFmj6ca66HnbAMwaTff6ptXisFzx6HQwAPteuW0D4E+gm8KEvVd2FgQC4I+3sKUnCABe2RPF+aBYcu9Z9J3DAwhTdoICoOIve2wlEc1Q0T2RBGBg7ypQFOdsLpDZYUYCgN/DvDjvZXPu9clbPX4AWA/zcoGlZzZejzwA1kBRGNB1ikwijAwA1kAA4F6nVSO2AGgeEM0Ael1maR0ZAKwO81Z77TobIrFMguxih5fk2Cowrr3GDwC7N+AtdNgqEbuFEHuvKMFRQMvJVGqp/usBDMsVT/bnLYLYbbFsXyAQADbBABxvM+Tfgotim71P1H8IBcDA3ho8azShl80JZ0Ivm9uqyDYA/i4wr6vk9/4unaXAAHjdXTrYpDMollxYs0ZTOFuCNkSWk6lwj9/L5jyOkfW+FAADrzcp6GDrLpuN6eA1UILkgEGxJATo7xfIlL6dAVDFZ40mLPoOLPoOt+83qj56dm88I8N2hdm4l1n4hAYgC4sdy8nU/ay1KwB/VZi32mq+C8h4y99NdvKFnXaD/sS4Kcf8GgBUeV6TUwYA2xpjvzCF1e2on8f9HpQBQKuQ/wtTpAAYeD0vyOQAJ1/Yi9eVAqCG7ALgEKLsf4ToB85NC51YA2BBqHy/cgCq5Q+AagVUyx8A48ROiqwDiOMJsYBiYmIjE5OaakUUAqijLk7dqVZEmWjJ+58jc6cXBiYmtp1InyGEEGonLhOqFTq6nF9eew9Ork6NqlfsKMannrinRzsaeVCu3BGMd6e+6PB0LA9SaeSrg5O3QsN5Z4lNTOoRhjFe6Z78NLTkvcjr/wGx8AgFSB+2ywAAAABJRU5ErkJggg=='},
    ]
  };
  // imageList:any = ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEMElEQVR4nO2bsWvyQBTA70/onyC5Fuq5mMmtdOnmUBxd7OgidHFxKjh0LIXuQueCeyl0FZduiiYhoEEQKaJ8iCDyvsFeuMQ7zRn1mtiDtzQxee/37r1399JDiDPsRPrMOL+8NjGpGRr5MjAZG5hA1MTExDYxqXdx6o5nJ3d0L1LpH6OVG7BX0chX9yKVFhq+8nrqKareDiodjTxwARha8l61csogdC9S6bh73i9uONiJ9JmBk5+qFTq2mJjYCCGEOjh5q1oZZbMAp+6QiUldtSIKZ0EdmZjYqhVRKONTBwBItQKq5Q+Aqhdbega+n1/g+/nl9AA4+QIs+g7QMao+ngYAS8/AuPYKy8kU2DFrNOMPoJfNwb/3D+CNIABG1UcAAJi32tDL5qIFwMkX1rwuC2DyVvf8Zl9hc1AAdMrzDGb/HgSApWdg3mp7njNvtcG+uvmdAJx8YU3h5WQKo+ojWHrGndKyOeD7+cXzzEXfAUvPHB+ApWeEwkt081YbBsWS+/tdARh4lU/YKhImiUoBoIlsUzzzxrj2uualMAAMTMC+uvG849/7x2EB2Fc30obPGk1w8gXu87YBsPQMDMuVjTHu5Aue9w3LlcMB8Jew5WQqlFmj6ca66HnbAMwaTff6ptXisFzx6HQwAPteuW0D4E+gm8KEvVd2FgQC4I+3sKUnCABe2RPF+aBYcu9Z9J3DAwhTdoICoOIve2wlEc1Q0T2RBGBg7ypQFOdsLpDZYUYCgN/DvDjvZXPu9clbPX4AWA/zcoGlZzZejzwA1kBRGNB1ikwijAwA1kAA4F6nVSO2AGgeEM0Ael1maR0ZAKwO81Z77TobIrFMguxih5fk2Cowrr3GDwC7N+AtdNgqEbuFEHuvKMFRQMvJVGqp/usBDMsVT/bnLYLYbbFsXyAQADbBABxvM+Tfgotim71P1H8IBcDA3ho8azShl80JZ0Ivm9uqyDYA/i4wr6vk9/4unaXAAHjdXTrYpDMollxYs0ZTOFuCNkSWk6lwj9/L5jyOkfW+FAADrzcp6GDrLpuN6eA1UILkgEGxJATo7xfIlL6dAVDFZ40mLPoOLPoOt+83qj56dm88I8N2hdm4l1n4hAYgC4sdy8nU/ay1KwB/VZi32mq+C8h4y99NdvKFnXaD/sS4Kcf8GgBUeV6TUwYA2xpjvzCF1e2on8f9HpQBQKuQ/wtTpAAYeD0vyOQAJ1/Yi9eVAqCG7ALgEKLsf4ToB85NC51YA2BBqHy/cgCq5Q+AagVUyx8A48ROiqwDiOMJsYBiYmIjE5OaakUUAqijLk7dqVZEmWjJ+58jc6cXBiYmtp1InyGEEGonLhOqFTq6nF9eew9Ork6NqlfsKMannrinRzsaeVCu3BGMd6e+6PB0LA9SaeSrg5O3QsN5Z4lNTOoRhjFe6Z78NLTkvcjr/wGx8AgFSB+2ywAAAABJRU5ErkJggg=='];
  submitted = false
  imageList: any = []
  token: string = ""
  diaryId: number = 0
  host: string = ""
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
    });
    profileModal.present();
  }

  goDiaryArticle() {
    let profileModal = this.modalCtrl.create(DiaryArticlePage, { userId: 8675309 });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }
}
