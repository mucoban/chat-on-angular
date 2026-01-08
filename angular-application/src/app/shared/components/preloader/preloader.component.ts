import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-preloader',
    templateUrl: './preloader.component.html',
    styleUrls: ['./preloader.component.scss'],
    standalone: false
})
export class PreloaderComponent {

  @Input() borderColor: string = 'black'
  @Input() minHeight: string | null = null

}
