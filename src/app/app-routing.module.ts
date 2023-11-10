import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/pages/login/login.component";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";

const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "",
        loadChildren: () => import("./youtube/youtube.module").then((m) => m.YoutubeModule),
    },
    { path: "**", component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
