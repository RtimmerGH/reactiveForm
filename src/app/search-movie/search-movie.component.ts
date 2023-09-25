import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent implements OnInit{
  year = new Date;
  movieForm = this.fb.group ({
    movieRef: this.fb.group({
      id: [''],
      title: [''],              
    }, {validator: isRequiredValidator('id','title')}),    
    type: ['series'],
    releaseYear: ['',[Validators.required, rangeDateValidator(1900, this.year.getFullYear())]],
    fiche: ['']    
  });

  constructor(private fb: FormBuilder ) {}

  ngOnInit(): void {
    this.movieForm.valueChanges
    .subscribe(value => {
      console.log('movieForm value changes : ', value);
    });

    this.movieForm.patchValue({
      fiche: 'courte'
    })    
  }

  onSubmit() {
    console.log('données du form: ',this.movieForm.value);    
  }
}

export function isRequiredValidator(controlTitle: string, controlId: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value1: string  = control.get(controlTitle)!.value;
    const value2: string  = control.get(controlId)!.value;

    if ((!(value1 || value2))) {
      return { "isRequired": { errorMsg: "L'un des deux champs 'Identifiant' ou 'Titre' doit être renseigné" } };
    } else {
      return null;
    }
  };
}

export function rangeDateValidator( yearMin : number , yearMax: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = (control.value as number) >= yearMin && (control.value as number) <= yearMax;

    if ((!isValid)) {
      return { "min": { minValue: yearMin , maxValue: yearMax } };
    } else {
      return null;
    }
  };
}

