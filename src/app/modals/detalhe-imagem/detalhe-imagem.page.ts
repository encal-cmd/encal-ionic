import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalhe-imagem',
  templateUrl: './detalhe-imagem.page.html',
  styleUrls: ['./detalhe-imagem.page.scss'],
})
export class DetalheImagemPage implements OnInit {

  @Input() url: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async closeModal() {
    console.log("CLOSE MODAAL");
    await this.modalController.dismiss({
      'permissoes': '55555555'
    });
  }

}
