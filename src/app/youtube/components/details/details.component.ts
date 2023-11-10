import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SearchItem, Thumbnail } from "../../models/search-item.model";
import { Utils } from "../../services/utils";
import { SearchService } from "../../services/search.service";

@Component({
    selector: "app-details",
    templateUrl: "./details.component.html",
    styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
    item!: SearchItem;
    id = "";
    isLoading = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private searchService: SearchService,
    ) {}

    ngOnInit(): void {
        if (!this.searchService?.data?.items) {
            this.goBack();
            return;
        }
        this.getDetailData();
    }

    private getDetailData(): void {
        this.route.queryParams.subscribe((params) => {
            this.searchService.getCardById(params["id"]).subscribe((result) => {
                const [item] = result.items;
                this.item = item;
            });
        });
    }

    goBack(): void {
        this.router.navigate([""]);
    }

    get thumbnail(): Thumbnail {
        return this.item?.snippet?.thumbnails?.standard;
    }

    get status(): string {
        return Utils.getStatus(this.item.snippet.publishedAt);
    }

    get height(): string {
        return `${this.thumbnail.height}px`;
    }
}
