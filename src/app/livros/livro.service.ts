import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LivroInput } from '../dtos/inputs/LivroInput';
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

  buscaPorId(id: number): Observable<LivroOutput> {
    return this.httpClient.get<LivroOutput>(URL_API + "/" + id);
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(URL_API + "/" + id);
  }

  cadastra(livro: LivroInput): Observable<LivroOutput> {
    return this.httpClient.post<LivroOutput>(URL_API, livro);
  }

  altera(id: number, livro: LivroInput): Observable<LivroOutput> {
    return this.httpClient.put<LivroOutput>(URL_API + "/" + id, livro);
  }
}
