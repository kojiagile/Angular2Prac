import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[highlightPreview]'
  // selector: 'myHighlight'
})

// This class must be added to the module to be used.
export class PostDirectiveDirective {
  
  @Input() highlightPreview = '#85BADE';

  constructor(private el: ElementRef) {
    // this.highlight(null);
  }

  private highlight(color: string) {
    // this.el.nativeElement.style.backgroundColor 
    //   = color != null ? color : this.defaultBackgroundColor;
    
    /*
     * this.el is not instantiated until the component/directive is initialise.
     * el is defined at the constructor(). If highlight() method is called inside it, el is still null(undefined).
     * Properties of this.el need to be called AFTER constructor() is called.
     */
    this.el.nativeElement.style.backgroundColor = color;
  }

  @HostListener('mouseenter') onMouseEnter() {
    // this.highlight(this.backgroundColorMouseEnter);
    this.highlight(this.highlightPreview);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
}
