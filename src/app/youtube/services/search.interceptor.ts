import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SearchResponse } from "../models/search-response.model";

@Injectable()
export class SearchInterceptor implements HttpInterceptor {
    // readonly API_TOKEN = 'AIzaSyCdGTU3XIVCghl9Qe0sR8hGRtc4lT4_V28';
    readonly API_TOKEN = "AIzaSyB2Bo_vYc8zh1lyvCXa7w3npoBbz29NT1Y";
    readonly URL_CORE = "https://www.googleapis.com/youtube/v3/";

    intercept(
        req: HttpRequest<never>,
        next: HttpHandler
    ): Observable<HttpEvent<SearchResponse>> {
        const searchReq = req.clone({
            url: this.URL_CORE + req.url,
            setParams: {
                key: this.API_TOKEN
            },
        });
        return next.handle(searchReq);
    }
}
