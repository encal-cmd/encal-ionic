import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TarefasPage } from './tarefas.page';

describe('TarefasPage', () => {
  let component: TarefasPage;
  let fixture: ComponentFixture<TarefasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarefasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TarefasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
