import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutorOutput } from 'src/app/dtos/outputs/AutorOutput';
import { AutorService } from '../autor.service';

@Component({
  selector: 'app-lista-autor',
  templateUrl: './lista-autor.component.html',
  styleUrls: ['./lista-autor.component.css']
})
export class ListaAutorComponent implements OnInit {

  erroNaRequisicao: string = '';
  mensagemSemAutorCadastrado: string = '';
  autorCadastradoComSucesso: string = '';
  autores: AutorOutput[] = [];
  constructor(private autorService: AutorService, private router: Router) {
    const currentNavigation = router.getCurrentNavigation();
    if (currentNavigation?.extras?.state?.['successData']) {
      this.autorCadastradoComSucesso = currentNavigation?.extras?.state?.['successData'];
    }
  }

  ngOnInit(): void {
    this.buscaTodos();
  }

  buscaTodos() {
    this.autorService.buscaTodos().subscribe(
      data => {
        if (data.length > 0) {
          this.autores = data;
        } else {
          this.mensagemSemAutorCadastrado = 'Não foram encontrados autores';
        }
      },
      error => {
        if(error?.error?.message){
          this.erroNaRequisicao = error.error.message;
        }else{
          this.erroNaRequisicao = "Ocorreu um erro inesperado. Tem mais tarde, por favor!"
        }
        console.log(this.erroNaRequisicao)
      }
    );
  }

}
