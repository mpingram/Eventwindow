import { EmEvent } 					from './event';
import { Observable } 			from 'rxjs/Observable';
import { BehaviorSubject } 	from 'rxjs/BehaviorSubject';

/*
export interface EventBuffer {

	[ ISO8601date: string ] : EmEvent[];

}
*/

export type EventList = Observable<EmEvent>
