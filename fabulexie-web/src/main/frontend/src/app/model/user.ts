import { SafeUrl} from '@angular/platform-browser';

export class User {
    id: number;
    email: string;
    password: string;
    remember: boolean;
    firstname: string;
    lastname: string;
	token: string;
	tutor: boolean;
	admin: boolean;
	valid: boolean;
	locked: boolean;
	loginSource: string;
	photo: string;
	safePhoto: SafeUrl;
	activeConfig: UserConfig;
}

export class UserConfig {
    id: number;
    name: string;
	letterRules: LetterRule[];
}

export class Rule {
	
	name: string;
	color: string;
	backgroundColor: string;
	bold: boolean;
	italic:boolean;
	underlined: boolean;
	upperCase: boolean;
}

export class LetterRule extends Rule {
    id: number;
    name: string;
	letters: string[];	
	lettersString: string;
}
