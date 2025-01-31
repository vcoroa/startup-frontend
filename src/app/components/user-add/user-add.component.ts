import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { catchError, finalize, of } from 'rxjs';
import { IConfig, NgxMaskDirective, provideNgxMask } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    NgxMaskDirective
  ],
  providers: [provideNgxMask(maskConfig)],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent implements OnInit {
  addUserForm!: FormGroup;
  errorMessage: string = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      avatar: ['https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Christian'],
      createdAt: [new Date().toISOString()]
    });
  }

  onSubmit(): void {
    if (this.addUserForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formValue = this.addUserForm.value;
      
      this.userService.addUser(formValue)
        .pipe(
          catchError(error => {
            this.errorMessage = error;
            return of(null);
          }),
          finalize(() => this.isSubmitting = false)
        )
        .subscribe({
          next: () => this.router.navigate(['/']),
          error: (error) => this.errorMessage = error
        });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.addUserForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) return `${controlName} é obrigatório`;
      if (control.errors['email']) return 'Email inválido';
      if (control.errors['pattern']) return 'Telefone inválido';
      if (control.errors['minlength']) return `${controlName} deve ter no mínimo 3 caracteres`;
    }
    return '';
  }
}