import { Component, OnInit } from '@angular/core';
import { LivroOutput } from 'src/app/dtos/outputs/LivroOutput';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-lista-livro',
  templateUrl: './lista-livro.component.html',
  styleUrls: ['./lista-livro.component.css']
})
export class ListaLivroComponent implements OnInit {

  nomeLivroParaExclusao: string = '';
  livroParaExclusao?: LivroOutput;
  erroNaRequisicao: string = '';
  mensagemSemLivroCadastrado: string ='';
  livroCadastradoComSucesso: string = '';

  livros: LivroOutput[] = []

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.buscaTodos();
  }

  buscaTodos(){
    this.livroService.buscaTodos().subscribe(
      data=>{
        if (data.length > 0) {
          this.livros = data;
          console.log("retorno", this.livros)
        } else {
          this.mensagemSemLivroCadastrado = 'Não foram encontrados livros';
        }
      },
      error=>{
        if(error?.error?.message){
          this.erroNaRequisicao = error.error.message;
        }else{
          this.erroNaRequisicao = "Ocorreu um erro inesperado. Tem mais tarde, por favor!"
        }
      }
    );
  }

  abreModalParaExclusao(livro: LivroOutput){
    this.nomeLivroParaExclusao = livro.titulo
    this.livroParaExclusao = livro;
  }

  removeLivro(){
    console.log(`vou remover o livro ${this.livroParaExclusao?.titulo} com id: ${this.livroParaExclusao?.id}`)
    //fazer o processamento e der erro ou sucesso vamos fechar o modal.
    document.getElementById("modal-remover-livro-botao-fechar")?.click();
  }

}
