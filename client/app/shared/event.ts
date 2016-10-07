import { Moment } from 'moment';

export interface Event {

	id: 				number;
	name: 			string;
	organizer: 	string;
	start: 			Moment;
	end: 				Moment;
	repeating: 	boolean;

	primaryResource: string;
}
