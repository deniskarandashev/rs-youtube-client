import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { YoutubeComponent } from "./pages/youtube/youtube.component";
import { DetailsComponent } from "./components/details/details.component";
import { AuthGuard } from "../core/guards/auth-guard";
import { NewCardComponent } from "./components/new-card/new-card.component";
import { LoginComponent } from "../auth/pages/login/login.component";
import { NotFoundComponent } from "../shared/components/not-found/not-found.component";

const routes: Routes = [
    {
        path: "",
        component: YoutubeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "details",
        component: DetailsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "create",
        component: NewCardComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    { 
        path: "**", 
        component: NotFoundComponent 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class YoutubeRoutingModule {}
