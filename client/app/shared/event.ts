import { Moment } from 'moment';

export interface EmEvent {

	id: 				string;
	name: 			string;
	type:				string;
	organizer: 	string;
	start: 			Moment;
	end: 				Moment;
	repeating: 	boolean;

	primaryResource: string;
}
