import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[editZindex]'
})
export class EditZindexDirective implements OnChanges{

  @Input('editZindex') zIndex:any;

  constructor(private el:ElementRef) {
  }

  ngOnChanges(){
    this.el.nativeElement.style.zIndex = this.zIndex;
  }

}
