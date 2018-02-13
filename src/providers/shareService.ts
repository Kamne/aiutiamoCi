import { Injectable } from '@angular/core';

@Injectable()
export class ShareService {

    user : any;
    firstName: string;
    lastName: string;
    myCompetenze:Array<string>
    allCompetenze:Array<string>

    constructor() {

    }

    getUser() {

        return this.user;
    }

    setUser(user) {
        console.log(user)
        this.user = user;
    }

    getMyCompetenze(){
      return this.myCompetenze;
    }

    setMyCompetenze(competenze){
       this.myCompetenze = competenze;
    }

    getAllCompetenze(){
      return this.allCompetenze;
    }

    setAllCompetenze(competenze){
       this.allCompetenze = competenze;
    }


}
