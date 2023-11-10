import { LocalDate, ChronoUnit } from "@js-joda/core";
import { StatusColor } from "./enums";

export class Utils {
    /**
   * Calculates difference beetwin two dates.
   * The first date is the current date, the second one is from response
   * @returns an object contains difference in days and in months
   */
    static calcDiff(publishedAt: string): {
        diffDays: number;
        diffMonth: number;
    } {
    // getting a Date string for publishedAt
    // 'en-CA' allows us to get 'YYYY-MM-DD' date string for JSJoda's LocalDate
        const start = new Date(publishedAt).toLocaleDateString("en-CA");
        // getting a Date string for the current date
        const end = new Date().toLocaleDateString("en-CA");

        // parsing to JSJoda's LocalDate
        const startDate = LocalDate.parse(start);
        const endDate = LocalDate.parse(end);

        // getting data
        const diffDays = ChronoUnit.DAYS.between(startDate, endDate);
        const diffMonth = ChronoUnit.MONTHS.between(startDate, endDate);
        return { diffDays, diffMonth };
    }

    /**
   * Returns the status color according the age of published item
   * @param publishedAt
   * @returns RGB value for CSS rule
   */
    static getStatus(publishedAt: string) {
        const diff = this.calcDiff(publishedAt);
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
}
