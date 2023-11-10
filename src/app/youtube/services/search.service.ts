import { Injectable } from "@angular/core";
import { SearchResponse } from "src/app/youtube/models/search-response.model";
import { HttpClient } from "@angular/common/http";
import { Observable, map, mergeMap } from "rxjs";
import { SortingOrder, SortingBy } from "./enums";
import { Statistics } from "../models/search-item.model";

@Injectable({
    providedIn: "root",
})
export class SearchService {
    sortingOrder!: SortingOrder;
    sortingByType!: SortingBy;
    sortingText!: string;
    searchText!: string;

    dataStore!: SearchResponse;
    originalDataStore!: SearchResponse;

    constructor(private http: HttpClient) { }

    /**
     * Gets full SearchResponse object contains results from two other calls
     * @returns SearchResponse
     */
    getFullRequest(searchText = ""): Observable<SearchResponse> {
        return this.getRequest(searchText).pipe(
            mergeMap((result) => this.getStatistics(result))
        );
    }

    /**
     * Gets one item's info for detailed view by its id
     * @param id of the item
     * @returns SearchResponse object with item info
     */
    getCardById(id: string): Observable<SearchResponse> {
        const urlPart = `videos?&id=${id}&part=snippet,statistics`;
        return this.http.get<SearchResponse>(urlPart);
    }

    /**
     * Gets a response without 'statistics'
     * @returns SearchResponse object
     */
    private getRequest(searchText: string): Observable<SearchResponse> {
        const url = `search?type=video&part=snippet&maxResults=15&q=${searchText}`;
        return this.http.get<SearchResponse>(url);
    }

    /**
     * Gets an additional response
     * 1) with 'statistics'
     * 2) accordind items ids from previous request (result1)
     * @returns SearchResponse object with 'snippets' and 'statistics'
     */
    private getStatistics(result1: SearchResponse): Observable<SearchResponse> {
        const ids = (result1.items.map((item) => item.id.videoId)).join(",");
        const urlPart = `videos?part=statistics&id=${ids}`;
        return this.http.get<SearchResponse>(urlPart).pipe(
            map((result2) => SearchService.modifyData(result1, result2))
        );
    }

    /**
     * Adds 'statistics' from result2 to result1
     * @param result1 without 'statistics', base object
     * @param result2 with 'statistics', to be added to base object
     * @returns SearchResponse, result1 that has got 'statistics' from result2
     */
    static modifyData(result1: SearchResponse, result2: SearchResponse): SearchResponse {
        const stats: { [key: string]: Statistics } = {};
        const result = {} as SearchResponse;
        Object.assign(result, result1);
        result2.items.forEach((i) => {
            stats[(i.id).toString()] = i.statistics;
        });
        result.items.forEach((item) => {
            item.statistics = stats[item.id.videoId]; // eslint-disable-line no-param-reassign
        });
        return result;
    }

    set data(value: SearchResponse) {
        this.dataStore = value;
        this.originalDataStore = { ...value };
    }

    get data() {
        return this.dataStore;
    }

    get originalData() {
        return this.originalDataStore;
    }
}
