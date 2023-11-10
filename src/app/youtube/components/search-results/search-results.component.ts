import { Component } from "@angular/core";
import { SearchService } from "src/app/youtube/services/search.service";
import { SortingBy, SortingOrder } from "src/app/youtube/services/enums";
import { SearchItem } from "../../models/search-item.model";
import { SearchResponse } from "../../models/search-response.model";

@Component({
    selector: "app-search-results",
    templateUrl: "./search-results.component.html",
    styleUrls: ["./search-results.component.scss"],
})
export class SearchResultsComponent {
    constructor(private searchService: SearchService) {}

    get data(): SearchResponse {
        return this.searchService.data;
    }

    get originalData(): SearchResponse {
        return this.searchService.originalData;
    }

    get sortingByType(): SortingBy {
        return this.searchService.sortingByType;
    }

    get sortingOrder(): SortingOrder {
        return this.searchService.sortingOrder;
    }

    get sortingText(): string {
        return this.searchService.sortingText;
    }

    get dataItems(): SearchItem[] {
        if (this.sortingOrder === 0) {
            // returns items provided in response (no sorting)
            return this.originalData.items;
        }
        // multiplicator
        const s = this.sortingOrder === 1 ? -1 : 1;

        // data
        if (this.sortingByType === 1) {
            return this.data.items
                .sort((a, b) => SearchResultsComponent.getSortStr(
                    s,
                    a.snippet.publishedAt,
                    b.snippet.publishedAt,
                    true
                ));
        }

        // views
        if (this.sortingByType === 2) {
            return this.data.items
                .sort((a, b) => SearchResultsComponent.getSortStr(
                    s,
                    a.statistics.viewCount,
                    b.statistics.viewCount
                ));
        }

        // normally it should be unreachable
        return this.originalData.items;
    }

    static getSortStr(s: number, paramA: string, paramB: string, isData = false): number {
        if (isData) {
            return s * ((new Date(paramA)).getTime() - (new Date(paramB)).getTime());
        }
        return s * (+paramA - +paramB);
    }

    get searchText(): string {
        return this.searchService.searchText;
    }
}
