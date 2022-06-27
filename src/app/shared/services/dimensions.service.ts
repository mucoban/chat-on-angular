import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

declare global {
  interface Window {
    setCOAIframeStyle: any; 
  }
}

@Injectable({
  providedIn: 'root'
}) 
export class DimensionsService {
  
  private renderer2: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
      this.renderer2 = rendererFactory.createRenderer(null, null);
  } 

  customerMode() {
    this.renderer2.setStyle(document.body, 'width', '300px');
  }

  chatStarted() { if (window.parent.setCOAIframeStyle) window.parent.setCOAIframeStyle({ prop: 'height', value: '626px' }); }

   
} 
 