import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { YoutubeComponent } from "./pages/youtube/youtube.component";
import { SearchItemComponent } from "./components/search-item/search-item.component";
import { SearchResultsComponent } from "./components/search-results/search-results.component";
import { ColoredBorderDirective } from "./directives/colored-border.directive";
import { FilterPipe } from "./pipes/filter.pipe";
import { SharedModule } from "../shared/shared.module";
import { DetailsComponent } from "./components/details/details.component";
import { YoutubeRoutingModule } from "./youtube-routing.module";
import { NewCardComponent } from "./components/new-card/new-card.component";

@NgModule({
    declarations: [
        YoutubeComponent,
        SearchResultsComponent,
        SearchItemComponent,
        FilterPipe,
        ColoredBorderDirective,
        DetailsComponent,
        NewCardComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        YoutubeRoutingModule,
    ],
})
export class YoutubeModule {}
