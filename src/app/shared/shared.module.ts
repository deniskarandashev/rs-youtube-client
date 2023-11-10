import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "./components/button/button.component";
import { InputComponent } from "./components/input/input.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";

@NgModule({
    declarations: [
        ButtonComponent,
        InputComponent,
        NotFoundComponent,
        StatisticsComponent,
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [
        ButtonComponent,
        InputComponent,
        NotFoundComponent,
        StatisticsComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class SharedModule {}
