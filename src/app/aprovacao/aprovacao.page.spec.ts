import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AprovacaoPage } from './aprovacao.page';

describe('AprovacaoPage', () => {
  let component: AprovacaoPage;
  let fixture: ComponentFixture<AprovacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprovacaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AprovacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
