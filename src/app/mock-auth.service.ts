
export class MockAuthService {

	public token: string = null;

	getToken(): string | null {
		return this.token;
	}

	removeToken(): void {
		this.token = null;
	}

	hasToken(): boolean {
		return this.getToken() !== null;
	}

	async validateToken(): Promise<any> {
		return new Promise<any>((resolve,reject) => resolve(this.token));
	}

	async authenticate(username: string, password: string): Promise<void> {
		this.token = username;
		return new Promise<void>((resolve, reject) => resolve());
	}

	async register(username: string, password: string): Promise<void> {
		this.token = username;
		return new Promise<void>((resolve, reject) => resolve());
	}
}


