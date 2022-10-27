export class ForgotPassword {
    email: string;
    otp: number;
    newPassword: string;
    confirmPassword: string;

    constructor(password?) {
        password = password || {};
        this.email = password.email || '';
        this.otp = password.otp || '';
        this.newPassword = password.newPassword || '';
        this.confirmPassword = password.confirmPassword || '';
    }
}