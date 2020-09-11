import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { AuthGuard } from './services/auth-guard.service';


const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    { path: 'weatherforecast', component: WeatherForecastComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/auth', pathMatch: 'full',  }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
