import { Userdata } from "./userdata.model";

export class User extends Userdata {
    public token: string;

    constructor(user: Userdata & {token: string}) {
        super(user.username, user.avatar);
        this.token = user.token;
    }
}