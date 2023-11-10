import { Injectable, Pipe, PipeTransform } from "@angular/core";
import { SearchItem } from "src/app/youtube/models/search-item.model";

@Pipe({
    name: "filter",
})
@Injectable()
export class FilterPipe implements PipeTransform {
    // disabled because should be static according eslint,
    // but this method is overrided PipeTransform method
    /* eslint-disable */
  transform(items: SearchItem[], value: string): SearchItem[] {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }

    return items.filter((singleItem) => {
      const tags = singleItem.snippet.tags.map((t) => t.toLowerCase());
      return tags.includes(value.toLowerCase());
    });
  }
}
