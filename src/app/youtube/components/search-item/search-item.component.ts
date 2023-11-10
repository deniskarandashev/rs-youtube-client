import { Component, Input } from "@angular/core";
import { Utils } from "src/app/youtube/services/utils";
import { ThumbnailType } from "src/app/youtube/services/enums";
import { Router } from "@angular/router";
import {
    SearchItem,
    Statistics,
    Thumbnail,
} from "../../models/search-item.model";

@Component({
    selector: "app-search-item",
    templateUrl: "./search-item.component.html",
    styleUrls: ["./search-item.component.scss"],
})
export class SearchItemComponent {
    @Input() item!: SearchItem;

    constructor(private router: Router) {}

    thumbnailType = ThumbnailType.MEDIUM;

    showMore(): void {
        this.router.navigate(["details"], { queryParams: { id: this.item.id.videoId } });
    }

    get thumbnail(): Thumbnail {
        return this.item.snippet.thumbnails[this.thumbnailType];
    }

    get statistics(): Statistics {
        return this.item.statistics;
    }

    get status(): string {
        return Utils.getStatus(this.item.snippet.publishedAt);
    }

    get publishedAt(): string {
        return this.item.snippet.publishedAt;
    }
}
