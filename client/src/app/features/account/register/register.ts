import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  members = input<User[]>([]);
  registerSuccess = output<User>();
  cancel = output<void>();
  protected registerCreds: RegisterCreds;
  constructor(protected accountService: AccountService) {
    this.registerCreds = {
      userName: '',
      email: '',
      password: '',
      dateOfBirth: new Date(Date.now()),
    };
  }
  register() {
    // Registration logic here
    console.log(this.registerCreds);
    this.accountService.register(this.registerCreds).subscribe({
      next: (user) => {
        this.registerSuccess.emit(user)
      },
      error: (error) => {
        alert(`Registration failed ${JSON.stringify(error.error)}`);
      },
    });
  }
  cancelRegister() {
    this.cancel.emit();
  }
}
