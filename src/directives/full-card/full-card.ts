import { Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[fullCard]' // Attribute selector
  //给组件内的第一个ion-card套上属性
})
export class FullCardDirective implements OnInit{

  constructor(private el: ElementRef){
  }

  ngOnInit(){
    this.el.nativeElement.querySelector('ion-card').classList.add('ss-full-card')
  }
}
