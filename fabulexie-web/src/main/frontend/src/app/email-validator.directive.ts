import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[emailValidator][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true}]
})
export class EmailValidator implements Validator {

	 validate(control: AbstractControl) {
		let email = control.value;
		if (email) {
			if (email.indexOf("@") < 0) {
				return { mauvaisFormat: true };
			}		
			let [user, domain] = email.split("@");
			if (user.length<2 || domain.length<4 || domain.indexOf(".")<0) {
				return { mauvaisFormat: true };
			}
			let [nom, ext] = domain.split(".");
			if (nom.length<2 || ext.length<2) {
				return { mauvaisFormat: true };
			}
		}
		return null;
	}
  
}
