import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html'
})
export class DataComponent {

  forma: FormGroup;

  usuario: any = {
    nombrecompleto: {
      nombre: 'Rebeca',
      apellido: 'Aunon'
    },
    correo: 'rebeca@gmail.com'
  };

  constructor() {
    console.log(this.usuario);

    /*
    this.forma = new FormGroup({
      'nombrecompleto': new FormGroup({
        'nombre': new FormControl(this.usuario.nombrecompleto.nombre, [Validators.required, Validators.minLength(3)]), // los parámetros que hay que pasar a FromControl son: valor por defecto, reglas de validación (puede ser un array), reglas de validación asíncronas 
        'apellido': new FormControl(this.usuario.nombrecompleto.apellido, Validators.required)
      }),
      'correo': new FormControl(this.usuario.correo, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")])
    });
 
     this.forma.setValue(this.usuario);
  }
  */

 this.forma = new FormGroup({
  'nombrecompleto': new FormGroup({
    'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]), // los parámetros que hay que pasar a FromControl son: valor por defecto, reglas de validación (puede ser un array), reglas de validación asíncronas 
    'apellido': new FormControl('', Validators.required)
  }),
  'correo': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")])
});

// con la línea de abajo pongo todos los valores por defecto de una y no uno a uno como se ha hecho arriba en la parte comentada
 this.forma.setValue(this.usuario);
}

  guardarCambios() {
    console.log(this.forma.value);
   // console.log(this.forma.value);
   //con la línea de abajo aunque cambie el formulario al submit vuelve a poner los valores iniciales por defecto
   //this.forma.setValue(this.usuario);
   //con la línea de abajo cuando se envia los valores vuelven a ponerse los iniciales por defecto
   //this.forma.reset(this.usuario); 
   //con la línea de abajo se ponen los valores en blanco por lo que no se puede enviar nada
   /* this.forma.reset({
     nombrecompleto:{
       nombre: "",
       apellido: ""
     }, 
     correo:  ""
   }); */
   //con la línea de abajo se pone el valor del correo aquí indicado al modificar los campos del formulario y darle a enviar, siempre enviará este correo da igual como se rellene
  // this.forma.controls['correo'].setValue('nuevocorreo@gmail.com');
  }

}
