import { SafeUrl} from '@angular/platform-browser';

export class RestUser {
	user: User;
}
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
	openDys: boolean;
	extraLineSpace: number;
	extraWordSpace: number;
	syllabeRule: SyllabeRule;
}

export class Rule {
    id: number;
	name: string;
	color: string;
	backgroundColor: string;
	bold: boolean;
	italic:boolean;
	underlined: boolean;
	upperCase: boolean;
}

export class LetterRule extends Rule {
    name: string;
	letters: string[];	
	lettersString: string;
}

export class SyllabeRule extends Rule {
    enabled:boolean;
	separator: string;
}
