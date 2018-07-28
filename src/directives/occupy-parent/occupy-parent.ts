import {Directive, Input, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[occupyParent]' // Attribute selector
})
export class OccupyParentDirective implements OnInit{

  @Input('occupyParent') occupyOption: string;

  constructor(private el: ElementRef) {
  }

  ngOnInit(){
    this.occupyParent(this.occupyOption);
  }

  private occupyParent(option: string) {
    switch (option) {
      case 'fullHeight':
        this.el.nativeElement.style.height = '100%';
        break;
      case 'fullWidth':
        this.el.nativeElement.style.width = '100%';
        break;
      case 'fullAll':
        this.el.nativeElement.style.height = '100%';
        this.el.nativeElement.style.width = '100%';
        break;
    }
  }

}
