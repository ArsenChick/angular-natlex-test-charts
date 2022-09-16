import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, retry, throwError, map, tap } from 'rxjs';

import { JSONWeatherResponse } from '../json-response.interface';
import { ChartsModule } from './charts.module';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  startDate: string = '';
  endDate: string = '';

  private requestUrl: string = 'https://api.open-meteo.com/v1/forecast'
  private constRequestParams: HttpParams = new HttpParams()
    .set('latitude', '61.47')
    .set('longitude', '34.20')
    .set('daily', 'temperature_2m_max')
    .set('timezone', 'Europe/Moscow');

  constructor(private http: HttpClient) { }

  getWeatherData(startDate: string, endDate: string) {
    // As HttpParams is immutable class, constRequestParams stays the same
    const requestParams = this.constRequestParams
      .set("start_date", startDate)
      .set("end_date", endDate);
    const url = `${this.requestUrl}?${requestParams.toString()}`;

    return this.http.get<JSONWeatherResponse>(url).pipe(
      tap(_ => console.log('Fetched data from open meteo')),
      retry(3),
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
