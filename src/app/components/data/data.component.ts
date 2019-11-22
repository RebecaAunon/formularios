import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


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
    //pasatiempos: ['Correr', 'Dormir', 'Comer']
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
    'apellido': new FormControl('', [Validators.required, this.noHerrera])
  }),
  'correo': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
  'pasatiempos': new FormArray([ new FormControl('Correr', Validators.required) ]),
  'username': new FormControl('', Validators.required, this.existeUsuario),
  'password1': new FormControl('', Validators.required),
  'password2': new FormControl()
})

 // con la línea de abajo pongo todos los valores por defecto de una y no uno a uno como se ha hecho arriba en la parte comentada
 // this.forma.setValue(this.usuario);

 this.forma.controls['password2'].setValidators([
  Validators.required,
  this.noIgual.bind(this.forma) //con bind le digo que es lo que yo quiero usar como this cuando lo llame
 ]);

 //creamos un observador para que escuche los cambios en el formulario cualquier cambio en cualquier sitio, para seleccionar un campo concreto ver la versión de debajo
/* this.forma.valueChanges.subscribe( data => {
   console.log(data);
 });
*/

this.forma.controls['username'].valueChanges.subscribe(data => {
  console.log(data);
});

//con este observador lo que vemos son los cambios
this.forma.controls['username'].statusChanges.subscribe(data => {
  console.log(data);
});

}

agregarPasatiempo() {
  (<FormArray>this.forma.controls['pasatiempos']).push(new FormControl('', Validators.required));
}

noHerrera( control: FormControl ): {[s:string]:boolean} {
  if (control.value === 'herrera') {
    return {
      noherrera: true
    };
  }
  return null;
}

  noIgual( control: FormControl ): {[s:string]:boolean} {
     console.log(this);
    let forma:any = this;

    if (control.value !== this.controls['password1'].value) {
      return {
        noiguales: true
      };
    }
      return null;
    }

  existeUsuario( control: FormControl ): Promise<any>|Observable<any> {
    let promesa = new Promise (
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === "strider"){
            resolve({ existe: true });
          } else {
            resolve ( null );
          }
        }, 3000);
      }
    );
    return promesa;
  }

  guardarCambios() {
    console.log(this.forma.value);
   //con la línea de abajo aunque cambie el formulario al submit vuelve a poner los valores iniciales por defecto
   //this.forma.setValue(this.usuario);
   //con la línea de abajo cuando se envia los valores vuelven a ponerse los iniciales por defecto
   //this.forma.reset(this.usuario); 
   //con la línea de abajo se ponen los valores en blanco por lo que no se puede enviar nada
   /*
    this.forma.reset({
     nombrecompleto: {
       nombre: "",
       apellido: ""
     },
     correo:  ""
   });
   */
   //con la línea de abajo se pone el valor del correo aquí indicado al modificar los campos del formulario y darle a enviar, siempre enviará este correo da igual como se rellene
  // this.forma.controls['correo'].setValue('nuevocorreo@gmail.com');
  }


}
