import {Component,OnInit,OnDestroy} from '@angular/core'
import { HttpClient } from '../../../providers/httpClient';
import { ServiceConfig } from '../../../providers/service.config';
import {ModalController} from 'ionic-angular';
import { ArticleInfoPage } from '../../article-info/article-info'

@Component({
  selector: 'page-articlehotlist',
  templateUrl: 'articlehotlist.html',
})
export class ArticleHotListPage implements OnInit, OnDestroy {
  articleList = [];
  nextPage:string = ""

  constructor(
    public http: HttpClient,
    public modalCtrl: ModalController
    ) {
  }

  ngOnInit(){
   console.log("init")
   this.initArticleList();
  }   

  initArticleList(){
    let that = this;
    that.http.get(ServiceConfig.HOMEFEED + '?content_type=blog', function (data) {
        console.log(data);
        that.articleList = that.articleList.concat(data.results);
        that.nextPage = data.next;
    });
  }

  getArticleList(infiniteScroll){
    let that = this;
    that.http.get(that.nextPage, function (data) {
        console.log(data);
        that.nextPage = data.next;
        if(data.next){
          infiniteScroll.enable(true);
        }
        that.articleList = that.articleList.concat(data.results);
        infiniteScroll.complete();
    });
  }

  doInfinite(infiniteScroll) {
    infiniteScroll.enable(false);
    let that = this;
    if(that.nextPage){
      that.getArticleList(infiniteScroll);
    }else{
      infiniteScroll.complete();
    }
  }

  goArticleDetail(id){
    let profileModal = this.modalCtrl.create(ArticleInfoPage, { id:id },{showBackdrop:true,enableBackdropDismiss:true});
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }

  ngOnDestroy(){ 
    console.log("destroy")
  }
  
}
