import {Component,OnInit} from '@angular/core'
import {NavController, NavParams, ViewController} from 'ionic-angular'
import {HttpClient} from '../../providers/httpClient';
import {MsgcollectionallPage} from '../msgcollectionall/msgcollectionall';

@Component({
  selector: 'page-msgcollection',
  templateUrl: 'msgcollection.html',
})
export class MsgcollectionPage implements OnInit{
  items:any = [{
    name:"Madison",
    type:"blog",
    title:"《达芬奇和他的时代》"
  },
  {
    name:"Madison",
    type:"blog",
    title:"《达芬奇和他的时代》"
  },
  {
    name:"Madison",
    type:"blog",
    title:"《达芬奇和他的时代》"
  },{
    name:"Madison",
    type:"blog",
    title:"《达芬奇和他的时代》"
  },
  {
    name:"Madison",
    type:"blog",
    title:"《达芬奇和他的时代》"
  },
  {
    name:"Madison",
    type:"blog",
    title:"《达芬奇和他的时代》"
  },
  {
    name:"Madison",
    type:"blog",
    title:"《达芬奇和他的时代》"
  },
  {
    name:"Madison",
    type:"blog",
    title:"《达芬奇和他的时代》"
  },
  {
    name:"Madison",
    type:"blog",
    title:"《达芬奇和他的时代》"
  },{
    name:"Madison",
    type:"blog",
    title:"《达芬奇和他的时代》"
  },{
    name:"Madison",
    type:"blog",
    title:"《达芬奇和他的时代》"
  }]
  nextPage:string = ""
  tab1: any;
  tab2: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    private httpClient:HttpClient) {
    this.tab1 = MsgcollectionallPage;
    this.tab2 = MsgcollectionallPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmarkPage')
    const data = this.navParams.get('data')
    console.log(data)
  }

  closeModal() {
    const data = {name: 'John'}
    this.view.dismiss(data)
  }

  doInfinite(infiniteScroll) {
    let that = this;
    if(that.nextPage){
      this.httpClient.get(that.nextPage,function(data){
        console.log(data);
        if(data.results.length){
          for(let item of data.results){
            let type = "";
            switch(item.action_object_content_type){
              case "blog":
                type = "文章";
              break;
              case "diary":
                type = "日记";
              break;
              case "comment":
                type = "评论";
              break;
              case "topic":
                type = "话题";
              break;
            }
            let obj = {
              name:item.actor.username,
              type:type,
              title:item.action_object.title
            }
            that.items.push(obj);
          }
        }
        if(data.next){
          that.nextPage = data.next;
        }else{
          that.nextPage = "";
        }
        infiniteScroll.complete();
      });
    }else{
      infiniteScroll.enable(false);
    }
  }

  ngOnInit(){
   console.log("init")
   let that = this;
   this.httpClient.get("api/v1/notification?verb=liked",function(data){
      console.log(data);
      if(data.results.length){
        for(let item of data.results){
          let type = "";
          switch(item.action_object_content_type){
            case "blog":
              type = "文章";
            break;
            case "diary":
              type = "日记";
            break;
            case "comment":
              type = "评论";
            break;
            case "topic":
              type = "话题";
            break;
          }
          let obj = {
            name:item.actor.username,
            type:type,
            title:item.action_object.title
          }
          that.items.push(obj);
        }
      }
      if(data.next){
        that.nextPage = data.next;
      }else{
        that.nextPage = "";
      }
    });
  }
}
