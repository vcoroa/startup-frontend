import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService, PAGE_SIZES } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  errorMessage: string = '';
  isLoading = false;
  page = 1;
  limit = PAGE_SIZES[0];
  total = 0;
  pageSizes = PAGE_SIZES;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers({ page: this.page, limit: this.limit })
      .pipe(
        catchError(error => {
          this.errorMessage = error;
          return of({ data: [], total: 0 });
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          this.users = response.data;
          this.total = response.total;
          console.log('Total Records:', this.total);
          console.log('Total Pages:', this.totalPages);
        }
      });
  }

  deleteUser(id: string | undefined) {
    if (id && confirm('Tem certeza que deseja deletar este usuário?')) {
      this.userService.deleteUser(id)
        .pipe(
          catchError(error => {
            this.errorMessage = error;
            return of(void 0);
          })
        )
        .subscribe(() => this.loadUsers());
    }
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.limit);
  }

  getPagesArray(): number[] {
    const totalPages = this.totalPages;
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  onPageSizeChange(newSize: number): void {
    this.limit = newSize;
    this.page = 1;
    this.loadUsers();
  }

  onPageChange(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
      this.loadUsers();
    }
  }
}