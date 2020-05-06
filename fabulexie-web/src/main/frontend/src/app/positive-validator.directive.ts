import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[positiveValidator][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => PositiveValidator), multi: true}]
})
export class PositiveValidator implements Validator {

	 validate(control: AbstractControl) {
		let num = control.value;
		if (num) {
			if (num<1) {
				return { mauvaisFormat: true };
			}		
		}
		return null;
	}
  
}
