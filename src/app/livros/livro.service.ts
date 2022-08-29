import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LivroOutput } from '../dtos/outputs/LivroOutput';

const URL_API = environment.URL_API + "livros";

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(private httpClient: HttpClient) { }

  buscaTodos(): Observable<LivroOutput[]> {
    return this.httpClient.get<LivroOutput[]>(URL_API);
  }
}
