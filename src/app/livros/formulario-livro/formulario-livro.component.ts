import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AutorService } from 'src/app/autores/autor.service';
import { LivroInput } from 'src/app/dtos/inputs/LivroInput';
import { AutorOutput } from 'src/app/dtos/outputs/AutorOutput';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-formulario-livro',
  templateUrl: './formulario-livro.component.html',
  styleUrls: ['./formulario-livro.component.css']
})
export class FormularioLivroComponent implements OnInit {

  id: number | null;

  livroFormGroup: FormGroup;  
  
  erroNaRequisicao: string = '';
  mensagemSemAutorCadastrado: string ='';
  autores: AutorOutput[] = [];

  constructor(
    private activateRoute: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private autorService: AutorService,
    private livroService: LivroService,
    private router: Router
    ) { 
    this.id = this.activateRoute.snapshot.paramMap.get("id") as number | null;
    
    this.livroFormGroup = this.formBuilder.group({
      titulo: ['', Validators.required],
      anoLancamento: ['', Validators.required],
      autoresIds: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.id){
      this.livroService.buscaPorId(this.id).subscribe(
        data=>{
          this.livroFormGroup = this.formBuilder.group({
            titulo: [data.titulo, Validators.required],
            anoLancamento: [data.anoLancamento, Validators.required],
            autoresIds: [null, Validators.required]
          });
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
    this.autorService.buscaTodos().subscribe(
      data => {
        if (data.length > 0) {
          this.autores = data;
        } else {
          this.mensagemSemAutorCadastrado = 'Cadastre autores primeiramente!';
        }
      },
      error => {
        if(error?.error?.message){
          this.erroNaRequisicao = error.error.message;
        }else{
          this.erroNaRequisicao = "Ocorreu um erro inesperado. Tem mais tarde, por favor!"
        }
      }
    );
  }

  cadastrar(){
    const livro = this.livroFormGroup.getRawValue() as LivroInput;
    this.livroService.cadastra(livro).subscribe(
      data=>{
        const navigationExtras: NavigationExtras =  { state: { successData: `Livro ${data.titulo} alterado com sucesso!` } };
        this.router.navigate(["livros", navigationExtras])
      },
      error=>{
        if (error?.error?.message) {
          this.erroNaRequisicao = error.error.message;
        } else {
          this.erroNaRequisicao = "Ocorreu um erro inesperado. Tem mais tarde, por favor!"
        }
      }
    );

  }

  alterar(){
    if(!this.id){
      return;
    }
    const livro = this.livroFormGroup.getRawValue() as LivroInput;
    this.livroService.altera(this.id, livro).subscribe(
      data=>{
        const navigationExtras: NavigationExtras =  { state: { successData: `Livro ${data.titulo} cadastrado com sucesso!` } };
        this.router.navigate(["livros", navigationExtras])
      },
      error=>{
        if (error?.error?.message) {
          this.erroNaRequisicao = error.error.message;
        } else {
          this.erroNaRequisicao = "Ocorreu um erro inesperado. Tem mais tarde, por favor!"
        }
      }
    );

  }

}
