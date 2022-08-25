import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAutorComponent } from './lista-autor/lista-autor.component';
import { FormularioAutorComponent } from './formulario-autor/formulario-autor.component';
import { RouterLink, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListaAutorComponent,
    FormularioAutorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AutorModule { }
