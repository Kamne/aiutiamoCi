import { Injectable } from '@angular/core';

@Injectable()
export class ShareService {

    user : any;
    pages : any = [];
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

    getPages() {

        return this.pages;
    }

    setPages(user) {
        console.log(user)
        this.pages = user;
    }

    getMyCompetenze(){
      return this.myCompetenze;
    }

    setMyCompetenze(competenze){
       this.myCompetenze = competenze;
    }

    getOtherCompetenze(){
      return this.allCompetenze;
    }

    setOtherCompetenze(competenze){
       this.allCompetenze = competenze;
    }


}
