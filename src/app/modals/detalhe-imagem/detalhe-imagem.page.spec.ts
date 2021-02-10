import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalheImagemPage } from './detalhe-imagem.page';

describe('DetalheImagemPage', () => {
  let component: DetalheImagemPage;
  let fixture: ComponentFixture<DetalheImagemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheImagemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheImagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
