import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { StatRowComponent } from './stat-row.component';

@Component({
  standalone: true,
  imports: [StatRowComponent],
  template: `<app-stat-row testId="sr-1" label="Suscripción mensual" value="S/ 99" />`,
})
class TestHostDefault {}

@Component({
  standalone: true,
  imports: [StatRowComponent],
  template: `<app-stat-row testId="sr-2" label="Ingresos" value="+12%" variant="highlighted" />`,
})
class TestHostHighlighted {}

describe('StatRowComponent', () => {
  describe('default variant', () => {
    let fixture: ComponentFixture<TestHostDefault>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({ imports: [TestHostDefault] }).compileComponents();
      fixture = TestBed.createComponent(TestHostDefault);
      fixture.detectChanges();
    });

    it('sets data-testid on host', () => {
      const host = fixture.debugElement.query(By.css('[data-testid="sr-1"]'));
      expect(host).toBeTruthy();
    });

    it('renders label and value spans', () => {
      const spans = fixture.debugElement.queryAll(By.css('span'));
      expect(spans[0].nativeElement.textContent.trim()).toBe('Suscripción mensual');
      expect(spans[1].nativeElement.textContent.trim()).toBe('S/ 99');
    });

    it('applies default value color class', () => {
      const value = fixture.debugElement.queryAll(By.css('span'))[1].nativeElement as HTMLElement;
      expect(value.className).toContain('text-ink');
    });
  });

  describe('highlighted variant', () => {
    let fixture: ComponentFixture<TestHostHighlighted>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({ imports: [TestHostHighlighted] }).compileComponents();
      fixture = TestBed.createComponent(TestHostHighlighted);
      fixture.detectChanges();
    });

    it('applies green color for highlighted value', () => {
      const value = fixture.debugElement.queryAll(By.css('span'))[1].nativeElement as HTMLElement;
      expect(value.className).toContain('text-success-fg');
    });
  });
});
