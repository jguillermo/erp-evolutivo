import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { PageHeaderComponent } from './page-header.component';

@Component({
  standalone: true,
  imports: [PageHeaderComponent],
  template: `
    <app-page-header
      testId="ph-1"
      emoji="🌳"
      title="Árbol Evolutivo"
      subtitle="Visualiza el crecimiento de tu negocio"
    />
  `,
})
class TestHostWithSubtitle {}

@Component({
  standalone: true,
  imports: [PageHeaderComponent],
  template: `<app-page-header testId="ph-2" emoji="⚡" title="Triggers" />`,
})
class TestHostNoSubtitle {}

describe('PageHeaderComponent', () => {
  describe('with subtitle', () => {
    let fixture: ComponentFixture<TestHostWithSubtitle>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({ imports: [TestHostWithSubtitle] }).compileComponents();
      fixture = TestBed.createComponent(TestHostWithSubtitle);
      fixture.detectChanges();
    });

    it('sets data-testid on host', () => {
      const host = fixture.debugElement.query(By.css('[data-testid="ph-1"]'));
      expect(host).toBeTruthy();
    });

    it('renders emoji', () => {
      const emoji = fixture.debugElement.query(By.css('[data-testid="page-header-emoji"]'));
      expect(emoji.nativeElement.textContent.trim()).toBe('🌳');
    });

    it('renders title', () => {
      const title = fixture.debugElement.query(By.css('[data-testid="page-header-title"]'));
      expect(title.nativeElement.textContent.trim()).toBe('Árbol Evolutivo');
    });

    it('renders subtitle', () => {
      const subtitle = fixture.debugElement.query(By.css('[data-testid="page-header-subtitle"]'));
      expect(subtitle).toBeTruthy();
      expect(subtitle.nativeElement.textContent.trim()).toBe('Visualiza el crecimiento de tu negocio');
    });

    it('applies title styling', () => {
      const title = fixture.debugElement.query(By.css('[data-testid="page-header-title"]'))
        .nativeElement as HTMLElement;
      expect(title.className).toContain('text-xl');
      expect(title.className).toContain('font-bold');
    });
  });

  describe('without subtitle', () => {
    let fixture: ComponentFixture<TestHostNoSubtitle>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({ imports: [TestHostNoSubtitle] }).compileComponents();
      fixture = TestBed.createComponent(TestHostNoSubtitle);
      fixture.detectChanges();
    });

    it('does not render subtitle element', () => {
      const subtitle = fixture.debugElement.query(By.css('[data-testid="page-header-subtitle"]'));
      expect(subtitle).toBeNull();
    });
  });
});
