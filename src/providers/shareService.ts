import { Injectable } from '@angular/core';

@Injectable()
export class ShareService {

    user : any;
    firstName: string;
    lastName: string;

    constructor() {

    }

    getUser() {
      
        return this.user;
    }

    setUser(user) {
        console.log(user)
        this.user = user;
    }
}
