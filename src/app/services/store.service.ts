import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';
import { Beer, Filter } from '../models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  getBeers(perPage = '25', filter?: Filter): Observable<Beer[]> {
    return this.http.get<Beer[]>(
      `${env.BASE_URL}/beers?${
        filter ? filter.name + '=' + filter.value + '&' : ''
      }per_page=${perPage}`
    );
  }
}
