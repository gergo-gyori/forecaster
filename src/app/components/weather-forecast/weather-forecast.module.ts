
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppMaterialModule } from 'src/app/app.material.module';
import { WeatherForecastComponent } from './weather-forecast.component';
import { CurrentWeatherWidgetComponent } from './current-weather-widget/current-weather-widget.component';
import { ForecastLineChartComponent } from './forecast-line-chart/forecast-line-chart.component';
import { CityDialogComponent } from '../../components/weather-forecast/city-dialog/city-dialog.component';

@NgModule({
    declarations: [
        WeatherForecastComponent,
        CurrentWeatherWidgetComponent,
        ForecastLineChartComponent,
        CityDialogComponent
    ],
    entryComponents: [CityDialogComponent],
    imports: [
        NgxChartsModule,
        FormsModule,
        AppMaterialModule
    ],
    providers: [],
    bootstrap: []
})
export class WeatherForecastModule { }
