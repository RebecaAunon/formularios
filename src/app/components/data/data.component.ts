import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html'
})
export class DataComponent {

  forma: FormGroup;

  constructor() {

    this.forma = new FormGroup({
      'nombre': new FormControl('Rebeca'), // los parámetros que hay que pasar a FromControl son: valor por defecto, reglas de validación (puede ser un array), reglas de validación asíncronas 
      'apellido': new FormControl(),
      'correo': new FormControl()
    });

  }

  guardarCambios(){
    console.log(this.forma.value);
   // console.log(this.forma.value);
  }

}
