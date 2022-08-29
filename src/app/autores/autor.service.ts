import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutorInput } from '../dtos/inputs/AutorInput';
import { AutorOutput } from '../dtos/outputs/AutorOutput';

const URL_API = environment.URL_API + "autores";

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private httpClient: HttpClient) { }

  buscaTodos(): Observable<AutorOutput[]> {
    return this.httpClient.get<AutorOutput[]>(URL_API);
  }

  cadastra(autorInput: AutorInput): Observable<AutorOutput> {
    return this.httpClient.post<AutorOutput>(URL_API, autorInput);
  }
}
