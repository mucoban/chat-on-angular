import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  protected readonly environment = environment;

  error: string;
  form =  new UntypedFormGroup({
    username: new UntypedFormControl(null, [ Validators.required ]),
    password: new UntypedFormControl(null, [ Validators.required ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.authService._isAgentSignedIn) this.router.navigate(['/agent']);
  }

  onSubmit() {
    if (this.form.invalid) { this.error = 'The form is invalid'; return; }
    this.error = '';
    this.authService.signIn(this.form.value.username, this.form.value.password, true)
      .then(
        () => { this.router.navigate(['/agent']); }
      )
      .catch((errorMessage) => { this.error = errorMessage; })
      .finally(() => { this.form.reset(); });
  }

}
