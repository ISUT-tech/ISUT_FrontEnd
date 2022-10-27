export class User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userName: string;
    firstName: string;
    lastName: string;
    mobile: string;
    emergencyNumber: string;
    email: string;
    address: string;
    country: string;
    state: string;
    city: string;
    pincode: number;
    profilePhoto: any;
    userType: number;
    password: string;
    status: Boolean;
    confirmPassword: string;

    constructor(user?) {
        user = user || {};
        this.id = user.id || null;
        this.createdAt = user.createdAt || null;
        this.updatedAt = user.updatedAt || null;
        this.profilePhoto = user.profilePhoto || null;
        this.userName = user.userName || null;
        this.firstName = user.firstName || null;
        this.lastName = user.lastName || null;
        this.mobile = user.mobile || null;
        this.emergencyNumber = user.emergencyNumber || null;
        this.email = user.email || null;
        this.address = user.address || null;
        this.country = user.country || null;
        this.state = user.state || null;
        this.city = user.city || null;
        this.pincode = user.pincode || null;
        this.userType = user.userType || 1;
        this.password = user.password || null;
        this.confirmPassword = user.confirmPassword || null;
        this.status = user.status || true;
    }
}
