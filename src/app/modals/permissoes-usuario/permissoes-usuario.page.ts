import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-permissoes-usuario',
  templateUrl: './permissoes-usuario.page.html',
  styleUrls: ['./permissoes-usuario.page.scss'],
})
export class PermissoesUsuarioPage implements OnInit {

  form: FormGroup;

  @Input() permissoes: [false, false, false, false, false, false, false, false];
  public criarGrupo;

  constructor(private modalController: ModalController) { }

  ngOnInit() {

    console.log("this.permissoes");
    console.log(this.permissoes);

    this.form = new FormGroup({
      criarGrupo: new FormControl(this.permissoes[0], { updateOn: 'blur' }),
      verGrupo: new FormControl(this.permissoes[1], { updateOn: 'blur' }),
      verUsu: new FormControl(this.permissoes[2], { updateOn: 'blur' }),
      editUsu: new FormControl(this.permissoes[3], { updateOn: 'blur' }),
      criarUsu: new FormControl(this.permissoes[4], { updateOn: 'blur' }),
      resetSenha: new FormControl(this.permissoes[5], { updateOn: 'blur' }),
      verAprov: new FormControl(this.permissoes[6], { updateOn: 'blur' }),
      criarAprov: new FormControl(this.permissoes[7], { updateOn: 'blur' })
    });
  }

  async closeModal() {
    console.log(this.form.value.verGrupo);
    console.log(this.form.value.criarGrupo);
    const perms = [
      this.form.value.verGrupo,
      this.form.value.criarGrupo,
      this.form.value.verUsu,
      this.form.value.criarUsu,
      this.form.value.editUsu,
      this.form.value.resetSenha,
      this.form.value.verAprov,
      this.form.value.criarAprov,
    ];
    console.log("CLOSE MODAAL");
    await this.modalController.dismiss({
      'permissoes': perms
    });
  }
}
