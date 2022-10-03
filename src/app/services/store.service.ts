import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';
import { Beer } from '../models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  getBeers(page = '1', perPage = '25'): Observable<Beer[]> {
    return this.http.get<Beer[]>(
      `${env.BASE_URL}/beers?page=${page}&per_page=${perPage}`
    );
  }
}
