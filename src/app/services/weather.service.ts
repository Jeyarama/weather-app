import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {

    constructor(private http: HttpClient) { }

    getApiKey() {
        return '19b67c2ab18da41c34772ce47fce3419';
    }

    getWeather(location: string, apiKey: string) {
        return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=' + apiKey);
    }
}