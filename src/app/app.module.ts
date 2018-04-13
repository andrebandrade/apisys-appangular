import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ConsultaComponent } from './curso/consulta/consulta.component';
import { CadastroComponent } from './curso/cadastro/cadastro.component';
import { AlunoConsultaComponent } from './aluno/consulta/aluno.consulta.component';
import { AlunoCadastroComponent } from './aluno/cadastro/aluno.cadastro.component';

import { routing } from './../app.routes';

import { ConfigService } from './services/config.service';
import { CursoService } from './services/curso.service';
import { AlunoService} from './services/aluno.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ConsultaComponent,
    CadastroComponent,
    AlunoConsultaComponent,
    AlunoCadastroComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  providers: [ConfigService, CursoService, AlunoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
