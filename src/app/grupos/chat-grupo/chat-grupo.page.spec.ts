import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatGrupoPage } from './chat-grupo.page';

describe('ChatGrupoPage', () => {
  let component: ChatGrupoPage;
  let fixture: ComponentFixture<ChatGrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGrupoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
