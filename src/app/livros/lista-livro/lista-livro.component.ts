import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  mensagemSucesso: string = '';

  livros: LivroOutput[] = []

  constructor(private livroService: LivroService, private router: Router) {
    const currentNavigation = router.getCurrentNavigation();
    if (currentNavigation?.extras?.state?.['successData']) {
      this.mensagemSucesso = currentNavigation?.extras?.state?.['successData'];
    }
   }

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
    this.mensagemSucesso = '';
    if(!this.livroParaExclusao?.id){
      return
    }
    this.livroService.remove(this.livroParaExclusao.id).subscribe(
      data => {
        document.getElementById("modal-remover-livro-botao-fechar")?.click();
        this.mensagemSucesso = `O livro ${this.livroParaExclusao?.titulo} foi excluído com sucesso`;
        this.buscaTodos();
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

}
