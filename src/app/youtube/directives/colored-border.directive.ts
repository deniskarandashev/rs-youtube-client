import {
    Directive, ElementRef, Input, Renderer2
} from "@angular/core";
import { StatusColor } from "src/app/youtube/services/enums";

@Directive({
    selector: "[appColoredBorder]",
})
export class ColoredBorderDirective {
    @Input() publishedAt = "";

    constructor(
        private element: ElementRef,
        private r: Renderer2,
    ) {
        this.setStyle();
    }

    private setStyle(): void {
        const el = this.element.nativeElement;
        const coloredBorderElement = this.r.createElement("div");
        this.r.setStyle(
            coloredBorderElement,
            "background-color",
            ColoredBorderDirective.calcColor(),
        );
        this.r.addClass(coloredBorderElement, "indicator");
        this.r.appendChild(el, coloredBorderElement);
    }

    static calcColor(): string {
        return ColoredBorderDirective.getStatus() ?? "none";
    }

    static getStatus(): StatusColor {
        const diff = ColoredBorderDirective.calcDiff();
        if (diff.diffMonth < 1) {
            if (diff.diffDays < 7) {
                return StatusColor.BLUE;
            }
            return StatusColor.GREEN;
        }
        if (diff.diffMonth < 6) {
            return StatusColor.YELLOW;
        }
        return StatusColor.RED;
    }

    static calcDiff(): {
        diffDays: number;
        diffMonth: number;
    } {
        return { diffDays: 0, diffMonth: 0 };
    }
}
