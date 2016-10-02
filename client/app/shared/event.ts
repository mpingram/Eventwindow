import { Moment } from 'moment';

export class Event {

	id: 				number;
	name: 			string;
	organizer: 	string;
	start: 			Moment;
	end: 				Moment;
	repeating: 	boolean;

	primaryResource: string;
}
