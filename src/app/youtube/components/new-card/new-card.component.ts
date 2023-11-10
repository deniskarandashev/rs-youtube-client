import { Component, OnInit } from "@angular/core";
import {
    AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators
} from "@angular/forms";

@Component({
    selector: "app-new-card",
    templateUrl: "./new-card.component.html",
    styleUrls: ["./new-card.component.scss"]
})
export class NewCardComponent implements OnInit {
    model = {
        title: "",
        description: "",
        imgLink: "",
        videoLink: "",
        createdAt: ""
    };

    formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            title: new FormControl(this.model.title, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(20)
            ]),
            description: new FormControl(this.model.description, [
                Validators.maxLength(255)
            ]),
            imgLink: new FormControl(this.model.imgLink, [
                Validators.required
            ]),
            videoLink: new FormControl(this.model.videoLink, [
                Validators.required
            ]),
            createdAt: new FormControl(this.model.createdAt, [
                Validators.required,
                NewCardComponent.maxDateValidator()
            ]),
            tags: new FormArray([
                new FormControl(null, [Validators.required])
            ])
        });
    }

    submit(): void {
    // nothig in this task
        if (this.formGroup.valid) {
            console.log("The form has submitted"); // eslint-disable-line
        } else {
            console.log("The form is invalid!"); // eslint-disable-line
        }
    }

    resetForm(): void {
        this.formGroup.reset();
    }

    get title(): AbstractControl | null {
        return this.formGroup?.get("title");
    }

    get description(): AbstractControl | null {
        return this.formGroup?.get("description");
    }

    get imgLink(): AbstractControl | null {
        return this.formGroup?.get("imgLink");
    }

    get videoLink(): AbstractControl | null {
        return this.formGroup?.get("videoLink");
    }

    get createdAt(): AbstractControl | null {
        return this.formGroup?.get("createdAt");
    }

    get tags(): FormArray {
        return <FormArray> this.formGroup?.get("tags");
    }

    addTag(i: number): void {
        const tagsFormArray = <FormArray> this.formGroup.get("tags");
        if (this.tagBtnSign(i) === "-") {
            // I don't know why, but removing works only with these two calls
            tagsFormArray.removeAt(i);
            (<FormArray> this.formGroup.controls["tags"]).removeAt(i);
        }
        if (tagsFormArray.length >= 5) {
            return;
        }
        const control = new FormControl(null, [Validators.required]);
        tagsFormArray.push(control);
    }

    tagBtnSign(i: number): string {
        const tagsFormArray = <FormArray> this.formGroup.get("tags");
        return (tagsFormArray.length === i + 1) && i !== 4 ? "+" : "-";
    }

    static maxDateValidator(): ValidatorFn {
        return (currentControl: AbstractControl): ValidationErrors | null => {
            const date = new Date(`${currentControl.value}`);
            const maxDate = new Date();

            if (date > maxDate) {
                return { maxDateValidator: true };
            }
            return null;
        };
    }
}
