import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { WeatherData } from "@shared/interfaces/weather.interface";
import { WeatherService } from "./pages/weather/services/weather.service";
import { GeoLocationService } from "./shared/services/geo-location.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "ClimateAngularApp";

  constructor(
    private readonly service: WeatherService,
    private readonly geoLocationService: GeoLocationService,
  ) { this.getLocation() }

  public weather$!: Observable<WeatherData>;

  public onSearch(search: string): void {
    this.weather$ = this.service.getWeatherByName(search);
    // console.log(this.weather$)
  }

  private async getLocation(): Promise<void> {
    try {
      const { coords} = await this.geoLocationService.getCurrentPosition();
      this.weather$ = this.service.getWeatherByCoords(coords);
    } catch (error) {
      console.log(error);
    }
  }
}
