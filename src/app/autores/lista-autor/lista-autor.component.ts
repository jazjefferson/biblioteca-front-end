import { Component, OnInit } from '@angular/core';
import { AutorOutput } from 'src/app/dtos/outputs/AutorOutput';
import { AutorService } from '../autor.service';

@Component({
  selector: 'app-lista-autor',
  templateUrl: './lista-autor.component.html',
  styleUrls: ['./lista-autor.component.css']
})
export class ListaAutorComponent implements OnInit {

  erroNaRequisicao: string = '';
  mensagemSemUsuarioCadastro: string = '';
  autores: AutorOutput[] = [];
  constructor(private autorService: AutorService) { }

  ngOnInit(): void {
    this.buscaTodos();
  }

  buscaTodos(){
    this.autorService.buscaTodos().subscribe(
      data =>{
        if(data.length>0){
          this.autores = data;
        }else{
          this.mensagemSemUsuarioCadastro = 'Não foram encontrados usuários';
        }
      },
      error =>{
        this.erroNaRequisicao = "Ocorreu um erro na requisição";
        console.log(this.erroNaRequisicao)
      }
    );
  }

}
