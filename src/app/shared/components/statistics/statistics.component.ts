import { Component, Input } from "@angular/core";
import { Statistics } from "src/app/youtube/models/search-item.model";

@Component({
    selector: "app-statistics",
    templateUrl: "./statistics.component.html",
    styleUrls: ["./statistics.component.scss"],
})
export class StatisticsComponent {
    @Input() width = "";
    @Input() statistics: Statistics = {
        viewCount: "",
        likeCount: "",
        dislikeCount: "",
        favoriteCount: "",
        commentCount: "",
    };
}
