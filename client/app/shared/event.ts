import { Moment } from 'moment';

export class Event {

	// FIXME: useless if constructor accepts obj
	// ts doesn't check types of obj's props
	id: 				number;
	name: 			string;
	organizer: 	string;
	start: 			Moment;
	end: 				Moment;
	repeating: 	boolean;

	primaryResource: string;


	/*constructor(properties: Object) {
		for (let x in properties){
			if (properties.hasOwnProperty(x)){
				this[x] = properties[x];
			}
		}
	}*/
}
