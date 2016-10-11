import { Injectable,
	ElementRef
} from '@angular/core';

@Injectable()
export class SchedulerService {

	constructor ( private schedulerElement: ElementRef ) { }

	public initialize(): void {
		console.log( this.schedulerElement );
	}

	public update(): void {
		console.log( 'updatin' );
	}
}