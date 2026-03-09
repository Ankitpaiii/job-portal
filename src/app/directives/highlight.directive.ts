import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appHighlight]',
    standalone: true
})
export class HighlightDirective implements OnInit {
    @Input('appHighlight') isFeatured: boolean = false;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        if (this.isFeatured) {
            this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid #3f51b5');
            this.renderer.setStyle(this.el.nativeElement, 'background-color', '#f0f2ff');
            this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

            const badge = this.renderer.createElement('span');
            this.renderer.setProperty(badge, 'innerText', 'FEATURED');
            this.renderer.setStyle(badge, 'position', 'absolute');
            this.renderer.setStyle(badge, 'top', '0');
            this.renderer.setStyle(badge, 'right', '0');
            this.renderer.setStyle(badge, 'background', '#3f51b5');
            this.renderer.setStyle(badge, 'color', 'white');
            this.renderer.setStyle(badge, 'padding', '2px 8px');
            this.renderer.setStyle(badge, 'font-size', '10px');
            this.renderer.setStyle(badge, 'font-weight', 'bold');

            this.renderer.appendChild(this.el.nativeElement, badge);
        }
    }
}
