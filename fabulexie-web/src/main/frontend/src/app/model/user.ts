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
}
