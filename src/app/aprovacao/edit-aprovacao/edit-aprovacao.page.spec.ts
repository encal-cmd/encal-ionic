import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAprovacaoPage } from './edit-aprovacao.page';

describe('EditAprovacaoPage', () => {
  let component: EditAprovacaoPage;
  let fixture: ComponentFixture<EditAprovacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAprovacaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAprovacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
