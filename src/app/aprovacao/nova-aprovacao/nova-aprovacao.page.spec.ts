import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NovaAprovacaoPage } from './nova-aprovacao.page';

describe('NovaAprovacaoPage', () => {
  let component: NovaAprovacaoPage;
  let fixture: ComponentFixture<NovaAprovacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaAprovacaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NovaAprovacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
