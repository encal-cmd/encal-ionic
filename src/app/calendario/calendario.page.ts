import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CalendariosService } from './calendarios.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  tipo = 'dia';

  dataDia = new Date();
  buscaLabel = this.strfDate(new Date());

  dataIniSem = this.begWeekDay(new Date());
  dataFimSem = this.endWeekDay(new Date());

  ano = new Date().getFullYear();

  date = new Date();
  firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  dataMes = new Date();
  mes = this.dataMes.getMonth();
  anomesLabel = this.dataMes.getFullYear();

  eventos;
  eventosShow;

  constructor(private alertCtrl: AlertController, private calendarioServices: CalendariosService) {

  }

  ngOnInit() {
    // this.resetEvent();
  }

  ionViewWillEnter() {
    console.log("efffffffffff");
    console.log("efffffffffff");
    console.log("efffffffffff");
    console.log("efffffffffff");
    console.log("efffffffffff");
    console.log("efffffffffff");
    this.calendarioServices.getLista().subscribe(data => {
      console.log("ENTEOOO")
      this.eventos = data;
      this.eventosShow = data;
      this.filtroEventos(this.tipo);
      // this.eventos = data.filter(p => p.status === 'PENDENTE');
    });
    console.log(this.eventos);
  }

  segmentChanged(evt) {
    console.log(evt);
    if (evt.detail.value === 'dia') {
      this.tipo = 'dia';
      this.buscaLabel = this.strfDate(this.dataDia);
    } else if (evt.detail.value === 'semana') {
      this.tipo = 'semana';
      this.buscaLabel = this.strfWeek(this.dataIniSem) + ' - ' + this.strfWeek(this.dataFimSem);
    } else {
      this.tipo = 'mes';
      this.buscaLabel = this.getMes(this.dataMes.getMonth());
      this.anomesLabel = this.dataMes.getFullYear();
    }
    this.filtroEventos(this.tipo);
  }

  strfDate(data) {

    let dia = data.getDate();
    if (dia < 10) {
      dia = '0' + dia;
    }

    let mes = data.getMonth() + 1;
    if (mes < 10) {
      mes = '0' + mes;
    }

    return dia + '/' + mes + '/' + data.getFullYear();
  }

  strfWeek(data) {
    let dia = data.getDate();
    if (dia < 10) {
      dia = '0' + dia;
    }
    let mes = data.getMonth() + 1;
    if (mes < 10) {
      mes = '0' + mes;
    }
    return dia + '/' + mes;
  }

  avancar() {
    if (this.tipo === 'dia') {
      this.avancarDia();
    } else if (this.tipo === 'semana') {
      this.avancarSemana();
    } else {
      this.avancarMes();
    }
    this.filtroEventos(this.tipo);
  }

  voltar() {
    if (this.tipo === 'dia') {
      this.voltarDia();
    } else if (this.tipo === 'semana') {
      this.voltarSemana();
    } else {
      this.voltarMes();
    }
    this.filtroEventos(this.tipo);
  }

  voltarDia() {
    const novaData = this.dataDia.setDate(this.dataDia.getDate() - 1);
    this.dataDia = new Date(novaData);
    this.buscaLabel = this.strfDate(this.dataDia);
  }

  avancarDia() {
    const novaData = this.dataDia.setDate(this.dataDia.getDate() + 1);
    this.dataDia = new Date(novaData);
    this.buscaLabel = this.strfDate(this.dataDia);
  }

  voltarMes() {
    const novaData = this.dataMes.setMonth(this.dataMes.getMonth() - 1);
    this.dataMes = new Date(novaData);
    this.buscaLabel = this.getMes(this.dataMes.getMonth());
    this.anomesLabel = this.dataMes.getFullYear();
  }

  avancarMes() {
    const novaData = this.dataMes.setMonth(this.dataMes.getMonth() + 1);
    this.dataMes = new Date(novaData);
    this.buscaLabel = this.getMes(this.dataMes.getMonth());
    this.anomesLabel = this.dataMes.getFullYear();
  }

  voltarSemana() {
    const novaData = this.dataIniSem.setDate(this.dataIniSem.getDate() - 7);
    this.dataIniSem = new Date(novaData);
    const novaDatafim = this.dataFimSem.setDate(this.dataFimSem.getDate() - 7);
    this.dataFimSem = new Date(novaDatafim);
    this.buscaLabel = this.strfWeek(this.dataIniSem) + ' - ' + this.strfWeek(this.dataFimSem);
  }

  avancarSemana() {
    const novaData = this.dataIniSem.setDate(this.dataIniSem.getDate() + 7);
    this.dataIniSem = new Date(novaData);
    const novaDatafim = this.dataFimSem.setDate(this.dataFimSem.getDate() + 7);
    this.dataFimSem = new Date(novaDatafim);
    this.buscaLabel = this.strfWeek(this.dataIniSem) + ' - ' + this.strfWeek(this.dataFimSem);
  }

  begWeekDay(data) {
    const week = data.getDay();
    const novaData = data.setDate(data.getDate() - week);
    return new Date(novaData);
  }

  endWeekDay(data) {
    const week = data.getDay();
    const addday = 6 - week;
    console.log(week);
    console.log(addday);
    const novaData = data.setDate(data.getDate() + addday);
    return new Date(novaData);
  }

  getMes(mes) {
    switch (mes) {
      case 0:
        // code block
        return 'Janeiro';
      case 1:
        // code block
        return 'Fevereiro';
        break;
      case 2:
        // code block
        return 'Março';
        break;
      case 3:
        return 'Abril';
        // code block
        break;
      case 4:
        return 'Maio';
        // code block
        break;
      case 5:
        return 'Junho';
        // code block
        break;
      case 6:
        return 'Julho';
        // code block
        break;
      case 7:
        return 'Agosto';
        // code block
        break;
      case 8:
        return 'Setembro';
        // code block
        break;
      case 9:
        return 'Outubro';
        // code block
        break;
      case 10:
        return 'Novembro';
        // code block
        break;
      case 11:
        return 'Dezembro';
        // code block
        break;
      default:
        return '-';
        // code block
    }
  }

  filtroEventos(tipo) {
    let dataInicio;
    let dataFim;
    if (tipo === 'dia') {
      dataInicio = new Date(new Date(this.dataDia.setHours(0)).setMinutes(0));
      dataFim = new Date(new Date(this.dataDia.setHours(23)).setMinutes(59));
      this.eventosShow = this.eventos.filter(p => p.data >= dataInicio && p.data <= dataFim);
    } else if (tipo === 'semana') {
      dataInicio = new Date(new Date(this.dataIniSem.setHours(0)).setMinutes(0));
      dataFim = new Date(new Date(this.dataFimSem.setHours(23)).setMinutes(59));
      this.eventosShow = this.eventos.filter(p => p.data >= dataInicio && p.data <= dataFim);
    } else {
      this.eventosShow = this.eventos.filter(p => p.data.getMonth() === this.dataMes.getMonth());
    }

  }

}
