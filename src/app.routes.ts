import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './app/home/home.component';
import { CadastroComponent } from './app/curso/cadastro/cadastro.component';
import { ConsultaComponent } from './app/curso/consulta/consulta.component';
import { AlunoCadastroComponent } from './app/aluno/cadastro/aluno.cadastro.component';
import { AlunoConsultaComponent } from './app/aluno/consulta/aluno.consulta.component';

const appRoutes: Routes = [
  {path: 'home',                component: HomeComponent},
  {path: '',                    component: HomeComponent},
  {path: 'consulta-curso',      component: ConsultaComponent},
  {path: 'cadastro-curso',      component: CadastroComponent},
  {path: 'cadastro-curso/:id',  component: CadastroComponent},
  {path: 'consulta-aluno',      component: AlunoConsultaComponent },
  {path: 'cadastro-aluno',      component: AlunoCadastroComponent},
  {path: 'cadastro-aluno/:id',  component: AlunoCadastroComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
