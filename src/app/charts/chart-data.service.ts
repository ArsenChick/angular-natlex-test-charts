import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, retry, throwError, map, tap } from 'rxjs';

import { JSONWeatherResponse } from '../interfaces/json-weather-data.interface';
import {
  REQUEST_BASE_URL,
  WeatherRequestConstParams,
  WeatherRequestParamsLiterals
} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  startDate: string = '';
  endDate: string = '';

  // Constructing HttpParams entity for our request
  private constRequestParams: HttpParams = new HttpParams()
    .set(WeatherRequestParamsLiterals.Latitude, WeatherRequestConstParams.Latitude)
    .set(WeatherRequestParamsLiterals.Longitude, WeatherRequestConstParams.Longitude)
    .set(WeatherRequestParamsLiterals.Daily, WeatherRequestConstParams.Daily)
    .set(WeatherRequestParamsLiterals.Timezone, WeatherRequestConstParams.Timezone);

  constructor(private http: HttpClient) { }

  getWeatherData(startDate: string, endDate: string) {
    // As HttpParams is immutable class, constRequestParams stays the same
    const requestParams = this.constRequestParams
      .set(WeatherRequestParamsLiterals.StartDate, startDate)
      .set(WeatherRequestParamsLiterals.EndDate, endDate);
    const url = `${REQUEST_BASE_URL}?${requestParams.toString()}`;

    // Retry request up to three times and handle errors
    return this.http.get<JSONWeatherResponse>(url).pipe(
      tap(_ => console.log('fetched data')),
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
