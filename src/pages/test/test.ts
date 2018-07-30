import {Component,ViewChild} from '@angular/core'
import {NavController, NavParams,Slides} from 'ionic-angular'


@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class testPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  page: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.page = 1;
    this.centerScroll();
  }

  // On segment click
  selectedTab(index) {
    this.slider.slideTo(index);
  }


  // On slide changed
  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    this.page = currentIndex;
    this.centerScroll();
  }

  // Center current scroll
  centerScroll(){
    if(!this.segments || !this.segments.nativeElement)
      return;

    let sizeLeft = this.sizeLeft();
    let sizeCurrent = this.segments.nativeElement.children[this.page].clientWidth;
    let result = sizeLeft - (window.innerWidth / 2) + (sizeCurrent/2) ;

    result = (result > 0) ? result : 0;
    this.smoothScrollTo(result);
  }

  // Get size start to current
  sizeLeft(){
    let size = 0;
    for(let i = 0; i < this.page; i++){
      size+= this.segments.nativeElement.children[i].clientWidth;
    }
    return size;
  }

  // Easing function
  easeInOutQuart(time, from, distance, duration) {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  }

  // Animate scroll
  smoothScrollTo(endX){
    let startTime = new Date().getTime();
    let startX = this.segments.nativeElement.scrollLeft;
    let distanceX = endX - startX;
    let duration = 400;

    let timer = setInterval(() => {
      var time = new Date().getTime() - startTime;
      var newX = this.easeInOutQuart(time, startX, distanceX, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      this.segments.nativeElement.scrollLeft = newX;
    }, 1000 / 60); // 60 fps
  }
  
}
