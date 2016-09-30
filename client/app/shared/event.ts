export class Event {

	// FIXME: useless if constructor accepts obj
	// ts doesn't check types
	id: 				number;
	name: 			string;
	organizer: 	string;
	start: 			Date;
	end: 				Date;
	repeating: 	boolean;

	primaryResource: string;


	constructor(properties: Object) {
		for (let x in properties){
			if (properties.hasOwnProperty(x)){
				this[x] = properties[x];
			}
		}
	}
}
