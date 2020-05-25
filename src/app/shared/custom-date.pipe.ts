import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "customDate" })
export class CustomDatePipe implements PipeTransform {
  transform(value: string): string {
    let result = value === "NA" ? "Present" : value;
    return result;
  }
}
