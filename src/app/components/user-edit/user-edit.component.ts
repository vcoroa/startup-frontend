import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  editUserForm!: FormGroup;
  userId!: string;  // Changed from number to string
  errorMessage: string = '';
  isLoading = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadUser();
  }

  private initForm(): void {
    this.editUserForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{5}-\d{4}$/)]],
      avatar: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  private loadUser(): void {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = id;  // Store ID for later use
      this.userService.getUserById(id).pipe(
        catchError(error => {
          this.errorMessage = error;
          return of(null);
        }),
        finalize(() => this.isLoading = false)
      ).subscribe(user => {
        if (user) this.editUserForm.patchValue(user);
      });
    }
  }

  onSubmit(): void {
    if (this.editUserForm.valid && !this.isSubmitting && this.userId) {
      this.isSubmitting = true;
      const updatedUser: User = {
        ...this.editUserForm.value,
        id: this.userId
      };

      this.userService.updateUser(this.userId, updatedUser).pipe(
        catchError(error => {
          this.errorMessage = error;
          return of(null);
        }),
        finalize(() => this.isSubmitting = false)
      ).subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => this.errorMessage = error
      });
    }
  }
}