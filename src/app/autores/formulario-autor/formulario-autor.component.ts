import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AutorInput } from 'src/app/dtos/inputs/AutorInput';
import { AutorService } from '../autor.service';

@Component({
  selector: 'app-formulario-autor',
  templateUrl: './formulario-autor.component.html',
  styleUrls: ['./formulario-autor.component.css']
})
export class FormularioAutorComponent implements OnInit {

  id: number | null;

  autorFormGroup: FormGroup;

  erroAoCadastrar: string = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private autorService: AutorService,
    private router: Router
  ) {
    this.id = this.activateRoute.snapshot.paramMap.get("id") as number | null;

    this.autorFormGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      biografia: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    if (this.id) {
      this.autorService.buscaPeloId(this.id).subscribe(
        data => {
          this.autorFormGroup = this.formBuilder.group({
            nome: [data.nome, Validators.required],
            biografia: [data.biografia, Validators.required]
          });
        },
        error => {
          if (error?.error?.message) {
            this.erroAoCadastrar = error.error.message;
          } else {
            this.erroAoCadastrar = "Ocorreu um erro inesperado. Tem mais tarde, por favor!"
          }
        }
      );
    }
  }

  cadastrar() {
    this.erroAoCadastrar = '';
    let autorInput = this.autorFormGroup.getRawValue() as AutorInput;

    this.autorService.cadastra(autorInput).subscribe(
      data => {
        const navigationExtras: NavigationExtras = { state: { successData: `Autor ${data.nome} cadastrado com sucesso!` } }
        this.router.navigate(["autores"], navigationExtras)
      },
      error => {
        if (error?.error?.message) {
          this.erroAoCadastrar = error.error.message;
        } else {
          this.erroAoCadastrar = "Ocorreu um erro inesperado. Tem mais tarde, por favor!"
        }
      }
    );
  }

  alterar() {
    this.erroAoCadastrar = '';
    let autorInput = this.autorFormGroup.getRawValue() as AutorInput;
    
    if (!this.id) {
      return;
    }

    this.autorService.altera(this.id, autorInput).subscribe(
      data => {
        const navigationExtras: NavigationExtras = { state: { successData: `Autor ${data.nome} alterado com sucesso!` } }
        this.router.navigate(["autores"], navigationExtras)
      },
      error => {
        if (error?.error?.message) {
          this.erroAoCadastrar = error.error.message;
        } else {
          this.erroAoCadastrar = "Ocorreu um erro inesperado. Tem mais tarde, por favor!"
        }
      }
    );
  }
}
