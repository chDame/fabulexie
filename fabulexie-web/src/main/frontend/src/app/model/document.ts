export class SpaceAccess {
    id: number;
    space: Space;
	right: string;
}
export class Space {
    id: number;
    name: string;
}
export class Directory {
    id: number;
    name: string;
	shared: boolean;
	parent: Directory;
}
export class Document {
    id: number;
    title: string;
    name: string;
    description: string;
    author: string;
	accessToken: string;
	parent: Directory;
}
