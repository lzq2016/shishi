import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[noLineCut]' // Attribute selector
})
export class NoLineCutDirective {

  constructor(private el:ElementRef) {
    setTimeout(()=>{
      this.setStyle(this.el.nativeElement.offsetHeight);
    },100)
  }

  setStyle(maxH){
    this.el.nativeElement.style.maxHeight=maxH+'px';
    this.el.nativeElement.style.columnWidth='2000px';
  }

}
