/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RxJSComponent } from './RxJS.component';

describe('RxJSComponent', () => {
  let component: RxJSComponent;
  let fixture: ComponentFixture<RxJSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxJSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxJSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
