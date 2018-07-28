import {Component,OnInit} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular'
import {HttpClient} from '../../providers/httpClient';
import { Storage } from '@ionic/storage';
import { ServiceConfig } from '../../providers/service.config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Base64 } from 'js-base64';


@Component({
  selector: 'page-uploadavatar',
  templateUrl: 'uploadavatar.html',
})
export class UploadavatarPage implements OnInit{

  // hasData:boolean = true;
  user_id:number = 0
  avatar:string = ""
  host:string = ""
  selectedImg:boolean = false
  token:string = ""

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpClient:HttpClient,
    public storage: Storage,
    private camera: Camera,
    private transfer: FileTransfer,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    let that = this
    this.host = ServiceConfig.getUrl();
    this.storage.get('token')
      .then((data) => {
        console.log("token data:" + data);
        that.token = data
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmarkPage')
    const data = this.navParams.get('data')
    console.log(data)
  }

  ngOnInit(){
   console.log("init")
   let that = this;
   this.storage.get('token').then(data => {
      if (data != '' && data != null && data != undefined) {
        that.user_id = Base64.decode(data).split('"user_id":')[1].split(',')[0];
        this.httpClient.get("api/v1/entry/"+that.user_id+"/get_user_detail",function(data){
          console.log(data);
          that.avatar = data.avatar;
        });
      }
    });
  }
  getPics() {
    const options: CameraOptions = {
      quality: 20,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    let that = this;
    this.camera.getPicture(options).then((imageData) => {
      that.selectedImg = true;
      let base64Image = 'data:image/png;base64,' + imageData;
      that.avatar = base64Image;
    }, (err) => {
      console.log(err);
      that.selectedImg = false;
      let alert = that.alertCtrl.create({
        title: '提示',
        subTitle: err,
        buttons: ['确定']
      });
      alert.present();
    });
  }

  uploadAvatar(){
    let that = this
    if(this.selectedImg){
      let loading = that.loadingCtrl.create({
          spinner: 'circles',
          content: '正在上传头像...'
      });
      loading.present();
      const fileTransfer: FileTransferObject = that.transfer.create();
      let options: FileUploadOptions = {
            fileKey: 'image',
            fileName: that.avatar.substr(25,20)+".png",
            params: {
              headers:{
                Authorization:"Bearer " +that.token
              }
            }
      };
      fileTransfer.upload(that.avatar, encodeURI(that.host+"api/v1/entry/"+that.user_id+"/avatar/"), options)
          .then((data) => {
            console.log(data);
              loading.dismiss();
              that.navCtrl.pop();
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
}
