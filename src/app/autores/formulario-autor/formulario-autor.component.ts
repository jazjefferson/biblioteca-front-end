import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario-autor',
  templateUrl: './formulario-autor.component.html',
  styleUrls: ['./formulario-autor.component.css']
})
export class FormularioAutorComponent implements OnInit {

  id: number | null;

  constructor(private activateRoute: ActivatedRoute) { 
    this.id = this.activateRoute.snapshot.paramMap.get("id") as number | null;
    console.log(this.id);
  }

  ngOnInit(): void {
  }

}
