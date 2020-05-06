export class Invitation {
    id: number;
    email: string;
    code: string;
    emission: string;
    confirmed: boolean;
	tutor: boolean;
	admin: boolean;
}
