import { Injectable } from '@angular/core';
import { Label } from '../models/labelDTO';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class LabelService {

  constructor(private http: HttpClient) {
  }
  getLabels(): Observable<Label[]> {
    return this.http.get<Label[]>(environment.baseUrl + 'labels.json');
  }
}
