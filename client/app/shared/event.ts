import { Moment } from 'moment';

export interface EmEvent {

	id: 				number;
	name: 			string;
	organizer: 	string;
	start: 			Moment;
	end: 				Moment;
	repeating: 	boolean;

	primaryResource: string;
}
