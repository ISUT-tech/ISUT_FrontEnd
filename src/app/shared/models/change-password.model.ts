export class Password {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;

    constructor(password?) {
        password = password || {};
        this.oldPassword = password.oldPassword || '';
        this.newPassword = password.newPassword || '';
        this.confirmPassword = password.confirmPassword || '';
    }
}