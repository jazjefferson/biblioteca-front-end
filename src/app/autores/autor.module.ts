import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAutorComponent } from './lista-autor/lista-autor.component';
import { FormularioAutorComponent } from './formulario-autor/formulario-autor.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListaAutorComponent,
    FormularioAutorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AutorModule { }
