import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario-livro',
  templateUrl: './formulario-livro.component.html',
  styleUrls: ['./formulario-livro.component.css']
})
export class FormularioLivroComponent implements OnInit {

  id: number | null;

  constructor(private activateRoute: ActivatedRoute) { 
    this.id = this.activateRoute.snapshot.paramMap.get("id") as number | null;
    console.log(this.id);
  }

  ngOnInit(): void {
  }

}
