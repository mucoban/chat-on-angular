import { Component, OnInit } from '@angular/core';
import { EventModel } from './shared/models/events.model';
import { EventsService } from './shared/services/events.service';
import { map } from 'rxjs/operators';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chat-on-angular';
  events: any[] = [];

  constructor(
    private eventsService: EventsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
   /* this.authService.SignIn('webdeveloper.mucahitcoban@gmail.com', '123123aA.');

      this.eventsService.getAll().snapshotChanges()
        .pipe(
          map(changes =>
            changes.map(c =>
              ({ key: c.payload.key, ...c.payload.val() })
            )
        ))
        .subscribe(res => {
          this.events = res;
          console.log(res); 
        });*/
/* 
        setTimeout(() => {
          this.eventsService.create({ title: 'a2', category: 'b' })
            .then(() => {
              console.log('created');    
            });
        }, 2000); */

      

/*       this.eventsService.update('5QXAUrWivp4TCTjUpQNo', { title: 'tc', category: 'somec' })
      .then(() => {

      })
      .catch(console.error);
 */
      /* this.eventsService.delete('sdf')
      .then(() => {

      })
      .catch(console.error); */
  }
}
