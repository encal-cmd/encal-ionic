import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EtapaProjetoPage } from './etapa-projeto.page';

describe('EtapaProjetoPage', () => {
  let component: EtapaProjetoPage;
  let fixture: ComponentFixture<EtapaProjetoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtapaProjetoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EtapaProjetoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
