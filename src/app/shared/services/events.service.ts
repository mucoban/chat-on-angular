import { Injectable } from '@angular/core';
import { EventModel } from '../models/events.model';
//import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  EventsRef: AngularFireList<EventModel>;
  private dbPath = 'events';

  constructor(
    private db: AngularFireDatabase
  ) {
    this.EventsRef = db.list(this.dbPath);
   }

  getAll(): AngularFireList<EventModel> {
    return this.EventsRef;
  }

  create(event: EventModel):any {
    return this.EventsRef.push(event);
  }

  update(key: string, value: any): Promise<void> {
    return this.EventsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.EventsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.EventsRef.remove();
  }

}
 