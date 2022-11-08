import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter, map, tap } from "rxjs";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  inputSearch = new FormControl("");

  @Output()
  submitted = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.onChange();
  }

  private onChange(): void {
    this.inputSearch.valueChanges
      .pipe(
        map((x: string) => x.trim()),
        debounceTime(350),
        distinctUntilChanged(),
        filter((x: string) => x !== ""),
        tap((x: string) => this.submitted.emit(x)),
      )
      .subscribe();
  }
}
