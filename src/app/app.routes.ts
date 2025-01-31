import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'add', component: UserAddComponent },
    { path: 'edit/:id', component: UserEditComponent },
    { path: '**', redirectTo: '' } // Redireciona para a lista de usuários em rotas não encontradas
];