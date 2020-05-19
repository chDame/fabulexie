import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocReaderComponent } from './doc-reader.component';

describe('DocReaderComponent', () => {
  let component: DocReaderComponent;
  let fixture: ComponentFixture<DocReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
