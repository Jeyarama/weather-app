import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit() {
    this.new_item_form = this.formBuilder.group({
      location: new FormControl('', Validators.required),
    });
  }

  goToWeather(value) {
    this.location = value.location;
    if (this.location) {
      this.getWeatherCondition();
    }
  }

  getWeatherCondition() {
    this.error = null;
    this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.location + '&APPID=' + '19b67c2ab18da41c34772ce47fce3419').subscribe(s => {
      this.weatherData = s;
      this.isShow = true;
      this.degreeCelcious = this.weatherData.main.temp - 273.15;
    }, err => {
      if (err && err.error && err.error.message) {
        this.error = err.error.message.replace('city', 'City');
      }
    })
  }

  clearError() {
    if(this.new_item_form.invalid) {
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
