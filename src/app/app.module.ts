import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import {AppMaterialModule} from './app.material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthComponent } from './components/auth/auth.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { CurrentWeatherWidgetComponent } from './components/weather-forecast/current-weather-widget/current-weather-widget.component';
import { ForecastLineChartComponent } from './components/weather-forecast/forecast-line-chart/forecast-line-chart.component';
import { CityDialogComponent } from './components/weather-forecast/city-dialog/city-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    WeatherForecastComponent,
    CurrentWeatherWidgetComponent,
    ForecastLineChartComponent,
    CityDialogComponent
  ],
  entryComponents: [CityDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    AppMaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
