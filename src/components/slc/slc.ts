import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
// import {SLCInterface} from "../../interfaces/SLCInterface";

@Component({
  selector: 'slc',
  templateUrl: 'slc.html'
})
export class SlcComponent implements OnInit,OnChanges {

  items: slcItem[];
  @Input() loved:string;
  @Output() slcClick = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
    this.items = [
      {
        key:'pointer',
        styles:{
          'pointer':{
            'background-image':'url(assets/img/p2p/share.svg)'
          }
        },
        datas:{
          'data':'SLC'
        },
        clickEvent: () => {
          this.slcClick.emit('callShare')
        },
      },
      {
        key:this.loved,
        styles:{
          'loved': {
            'background-image': 'url(assets/img/p2p/love.svg)'
          },
          'notLove':{
            'background-image':'url(assets/img/p2p/love_no.svg)'
          }
        },
        datas:{
          'data':'SLC'
        },
        clickEvent: () => {
          this.slcClick.emit('callLove')
        },
      },
      {
        key:'pointer',
        styles:{
          'pointer': {
            'background-image':'url(assets/img/p2p/comment.svg)'
          }
        },
        datas:{
          'data':'SLC'
        },
        clickEvent: () => {
          this.slcClick.emit('callComment')
        }
      },
    ]
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if(propName==='loved'){
        let curLove = changes[propName].currentValue;
        if(this.items&&this.items.length>2&&this.items[1].key){
          this.items[1].key = curLove;
          console.log(this.items)
        }
      }
    }
  }
}

interface slcItem{
  key:string;
  styles:object;
  datas:object;
  clickEvent:object;
}
