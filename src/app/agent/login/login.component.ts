import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
    this.authService.signIn(this.form.value.username, this.form.value.password)
      .then(
        () => { this.router.navigate(['/agent']); }
      )
      .catch((errorMessage) => { this.error = errorMessage; })
      .finally(() => { this.form.reset(); });
  }

}
