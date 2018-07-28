import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[downHalf]' // Attribute selector
})
export class DownHalfDirective implements OnInit{

  constructor(private el:ElementRef) {
  }

  ngOnInit() {
    this.el.nativeElement.querySelector('.flip-container').style.top='-100%';
    this.el.nativeElement.querySelector('.flip-container').style.position='absolute';
  }
}
