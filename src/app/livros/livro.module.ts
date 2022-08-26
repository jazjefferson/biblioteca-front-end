import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaLivroComponent } from './lista-livro/lista-livro.component';
import { FormularioLivroComponent } from './formulario-livro/formulario-livro.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListaLivroComponent,
    FormularioLivroComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class LivroModule { }
