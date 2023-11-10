import { Component, OnInit } from "@angular/core";
import {
    Subject, debounceTime, distinctUntilChanged, switchMap
} from "rxjs";
import { LoginService } from "src/app/auth/services/login.service";
import { SearchResponse } from "src/app/youtube/models/search-response.model";
import { SortingOrder, SortingBy } from "src/app/youtube/services/enums";
import { SearchService } from "src/app/youtube/services/search.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
    searchText = "";
    isDisabled = false;
    private searchData$ = new Subject<string>();

    isFilteringVisible = false;
    readonly NO_NAME_TPL = "Your name";

    constructor(
        private searchService: SearchService,
        private loginService: LoginService
    ) { }

    ngOnInit() {
        this.searchData$.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((searchText) => this.searchService.getFullRequest(searchText))
        ).subscribe((result: SearchResponse) => {
            this.searchService.data = result;
        });
    }

    doSearch(): void {
        if (this.searchText.length > 2) {
            this.searchData$.next(this.searchText);
        }
    }

    get disabled(): boolean {
        this.isDisabled = !localStorage.getItem("userName");
        return this.isDisabled;
    }

    get userName(): string {
        return this.loginService.currentUserName;
    }

    toggleFilter() {
        this.isFilteringVisible = !this.isFilteringVisible;
    }

    sorting(sortingBy: number, value?: string) {
        this.calcSortingOrder(sortingBy);
        this.calcSortingBy(sortingBy);
        this.searchService.sortingText = value ?? "";
    }

    private calcSortingOrder(sortingBy: number): void {
        // reset sorting order if sorting type has changed
        if (
            this.searchService.sortingByType !== sortingBy
            && sortingBy !== SortingBy.TEXT
        ) {
            this.searchService.sortingOrder = SortingOrder.NONE;
        }

        // toggle sorting order
        if (this.searchService.sortingOrder === SortingOrder.NONE) {
            this.searchService.sortingOrder = SortingOrder.ASC;
        } else if (this.searchService.sortingOrder === SortingOrder.ASC) {
            this.searchService.sortingOrder = SortingOrder.DESC;
        } else {
            this.searchService.sortingOrder = SortingOrder.NONE;
        }
    }

    private calcSortingBy(sortingBy: number): void {
        // we do not need to change sortingByType in this case
        if (this.searchService.sortingByType === sortingBy) {
            return;
        }

        switch (sortingBy) {
            case 1:
                this.searchService.sortingByType = SortingBy.DATE;
                break;
            case 2:
                this.searchService.sortingByType = SortingBy.VIEWS;
                break;
            case 3:
                this.searchService.sortingByType = SortingBy.TEXT;
                break;
            default:
                this.searchService.sortingByType = SortingBy.NONE;
        }
    }

    logout(): void {
        this.loginService.doLogout();
    }
}
