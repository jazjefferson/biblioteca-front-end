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
  }

  cadastrar(){
    this.erroAoCadastrar = '';
    let autorInput = this.autorFormGroup.getRawValue() as AutorInput;

    this.autorService.cadastra(autorInput).subscribe(
      data =>{
        const navigationExtras: NavigationExtras = {state: {successData: `Autor ${data.nome} cadastrado com sucesso!`}}
        this.router.navigate(["autores"], navigationExtras)
      },
      error =>{
        this.erroAoCadastrar = error.error.message
      }
    );
  }

}
