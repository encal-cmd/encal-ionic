import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProjetosPage } from './projetos.page';

describe('ProjetosPage', () => {
  let component: ProjetosPage;
  let fixture: ComponentFixture<ProjetosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjetosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
