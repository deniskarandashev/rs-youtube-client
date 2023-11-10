import { SearchService } from "src/app/youtube/services/search.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SearchResponse } from "src/app/youtube/models/search-response.model";

@Injectable({
    providedIn: "root",
})
export class LoginService {
    readonly NO_LOGIN = "";
    readonly PROP_NAME = "userName";
    currentUserName: string;

    constructor(
        private router: Router,
        private searchService: SearchService,
    ) {
        this.currentUserName = localStorage.getItem(this.PROP_NAME) ?? this.NO_LOGIN;
    }

    doLogin(userName: string): void {
        localStorage.setItem(this.PROP_NAME, userName);
        this.router.navigate([""]);
        this.currentUserName = userName;
    }

    doLogout(): void {
        localStorage.removeItem(this.PROP_NAME);
        this.router.navigate(["login"]);
        this.currentUserName = this.NO_LOGIN;
        this.searchService.data = {} as SearchResponse;
    }
}
