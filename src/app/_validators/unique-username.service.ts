import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {catchError, filter, map, Observable, of} from "rxjs";
import {AuthService} from "../_services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UniqueUsernameService implements AsyncValidator {

  constructor(private authService: AuthService) {
  }



  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {


    return this.authService.usernameAvailable(control.value).pipe(
      // map((response)=>{
      //   return null;
      // }),
      filter((response) => response.available),
      catchError((error):Observable<any> => {
          if (error.error.username) {
            return of({nonUniqueUsername: true});
          }else{
            return of({unKnownError: true});
          }
          // @ts-ignore
        return null;

        }
      )
    );
  };


}
