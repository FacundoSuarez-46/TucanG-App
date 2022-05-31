export class User{
	constructor(
		public _id: string,
		public name: string,
		public surname: string,
		public nick: string,
		public desc: string,
		public dep: string,
		public email: string,
		public password: string,
		public role: string,
		public image: string
	){}
}
