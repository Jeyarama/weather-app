import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  new_item_form: FormGroup
  location: string;
  degreeCelcious: number;
  weatherData: any = <any>{};
  error: string;
  isShow: boolean = false;
  apiKey: string;

  constructor(private formBuilder: FormBuilder,
    private weatherSvc: WeatherService) { }

  ngOnInit() {
    this.new_item_form = this.formBuilder.group({
      location: new FormControl('', Validators.required),
    });

    this.apiKey = this.weatherSvc.getApiKey();
  }

  goToWeather(value) {
    this.location = value.location;
    if (this.location) {
      this.getWeatherCondition();
    }
  }

  getWeatherCondition() {
    this.error = null;
    this.weatherSvc.getWeather(this.location, this.apiKey).subscribe(s => {
      this.weatherData = s;
      this.isShow = true;
      if (this.weatherData && this.weatherData.main && this.weatherData.main.temp) {
        this.convertKelvinToDegree();
      }
    }, err => {
      if (err && err.error && err.error.message) {
        let firstCharacter = err.error.message.charAt(0);
        if (firstCharacter) {
          this.error = firstCharacter.toUpperCase() + err.error.message.substr(1);
        }
      }
    })
  }

  convertKelvinToDegree() {
    this.degreeCelcious = this.weatherData.main.temp - 273.15;
  }

  clearError() {
    if (this.new_item_form.invalid) {
      this.error = null;
    }
  }

  back() {
    this.weatherData = <any>{}
    this.isShow = false;
    this.new_item_form.reset();
    this.error = null;
    this.degreeCelcious = null;
  }
}
