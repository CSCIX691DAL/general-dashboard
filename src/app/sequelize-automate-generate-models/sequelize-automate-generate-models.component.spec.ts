import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequelizeAutomateGenerateModelsComponent } from './sequelize-automate-generate-models.component';

describe('SequelizeAutomateGenerateModelsComponent', () => {
  let component: SequelizeAutomateGenerateModelsComponent;
  let fixture: ComponentFixture<SequelizeAutomateGenerateModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequelizeAutomateGenerateModelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequelizeAutomateGenerateModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
