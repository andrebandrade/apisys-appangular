import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { CursoService } from '../../services/curso.service';
import { Curso } from '../../services/curso';
import { Response } from '../../services/response' ;

@Component({
  selector: 'app-consulta-curso',
  templateUrl: './consulta.component.html',
  styleUrls: ["./consulta.component.css"]
})
export class ConsultaComponent implements OnInit {

  private cursos: Curso[] = new Array();
  private titulo: string;

  constructor(private cursoSerive: CursoService,
    private router: Router) {}

  ngOnInit() {

    /* Configura o Título */
    this.titulo = 'Cadastros de Cursos';

    /* Chama o serviço e retorna todos os cursos */
    this.cursoSerive.getCursos().subscribe(res => this.cursos = res);

  }

  /** Remover registro do curso quando clicamos na opção remover de uma linha da tabela */
  remover(id:number, index:number): void {

      if (confirm("Deseja realmente excluir esse registro?")) {

        this.cursoSerive.deleteCurso(id).subscribe(response => {

          let res:Response = <Response> response;

          if (res.codigo == 1) {
            alert(res.mensagem);
            this.cursos.splice(index, 1);
          } else {
            alert(res.mensagem);
          }
        },
        (erro) => {
          alert(erro);
        });
      }
  }

  /** Editar Curso */
  editar(id:number):void {
    this.router.navigate(['/cadastro-curso', id]);
  }

}
