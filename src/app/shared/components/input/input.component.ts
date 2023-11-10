import {
    Component, EventEmitter, Input, Output
} from "@angular/core";

@Component({
    selector: "app-input",
    templateUrl: "./input.component.html",
    styleUrls: ["./input.component.scss"],
})
export class InputComponent {
    @Input() type = "text";
    @Input() label = "";
    @Input() placeholder = "";
    @Input() value = "";
    @Input() column = true;
    @Input() width = "auto";
    @Input() disabled = false;
    @Output() dataChanged = new EventEmitter<string>();

    setValue(): void {
        this.dataChanged.emit(this.value);
    }
}
