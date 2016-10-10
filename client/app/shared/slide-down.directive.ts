import { Directive, ElementRef, Input, Renderer, OnChanges } from '@angular/core';

@Directive({
	selector: '[emSlideDown]'
})

export class SlideDownDirective implements OnChanges {

	constructor ( private el: ElementRef, private renderer: Renderer ) { }

	@Input('emSlideDown') toggleOpen: boolean;

	ngOnChanges(){
		this.slide();
	}

	private slide(){

		if ( this.toggleOpen === true ){
			this.slideDown();
		} else if ( this.toggleOpen === false ){
			this.slideUp();
		}

	}

	private slideDown(){
		this.renderer.setElementStyle( this.el.nativeElement, 'display', null );
	}

	private slideUp(){
		this.renderer.setElementStyle( this.el.nativeElement, 'display', 'none' );
	}

}