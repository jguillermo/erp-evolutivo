import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { QuotedTextComponent } from './quoted-text.component';

@Component({
  standalone: true,
  imports: [QuotedTextComponent],
  template: `<app-quoted-text testId="qt-1">Test text</app-quoted-text>`,
})
class TestHost {}

describe('QuotedTextComponent', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
  });

  it('sets data-testid on host', () => {
    const host = fixture.debugElement.query(By.css('[data-testid="qt-1"]'));
    expect(host).toBeTruthy();
  });

  it('renders paragraph with border and italic classes', () => {
    const p = fixture.debugElement.query(By.css('p')).nativeElement as HTMLElement;
    expect(p.className).toContain('border-l-2');
    expect(p.className).toContain('border-[#22d3ee]');
    expect(p.className).toContain('italic');
    expect(p.className).toContain('pl-2');
  });

  it('renders paragraph with print classes', () => {
    const p = fixture.debugElement.query(By.css('p')).nativeElement as HTMLElement;
    expect(p.className).toContain('print:text-[8px]');
    expect(p.className).toContain('print:leading-[1.35]');
  });

  it('projects content', () => {
    const p = fixture.debugElement.query(By.css('p')).nativeElement as HTMLElement;
    expect(p.textContent?.trim()).toBe('Test text');
  });
});
