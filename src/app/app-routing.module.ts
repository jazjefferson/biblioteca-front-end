import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioAutorComponent } from './autores/formulario-autor/formulario-autor.component';
import { ListaAutorComponent } from './autores/lista-autor/lista-autor.component';
import { FormularioLivroComponent } from './livros/formulario-livro/formulario-livro.component';
import { ListaLivroComponent } from './livros/lista-livro/lista-livro.component';

const routes: Routes = [
  {path: "autores", component: ListaAutorComponent},
  {path: "autores/formulario", component: FormularioAutorComponent},
  {path: "autores/formulario/:id", component: FormularioAutorComponent},
  {path: "livros", component: ListaLivroComponent},
  {path: "livros/formulario", component: FormularioLivroComponent},
  {path: "livros/formulario/:id", component: FormularioLivroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
