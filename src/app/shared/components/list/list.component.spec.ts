import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item.component';

// ── Integration host ──────────────────────────────────────────────────────────
@Component({
  standalone: true,
  imports: [ListComponent, ListItemComponent],
  template: `
    <app-list testId="test-list">
      <app-list-item>Item one</app-list-item>
      <app-list-item>Item two</app-list-item>
      <app-list-item>Item three</app-list-item>
    </app-list>
  `,
})
class HostComponent {}

// ─────────────────────────────────────────────────────────────────────────────

describe('ListComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  it('host element has data-testid', () => {
    expect(el.querySelector('[data-testid="test-list"]')).toBeTruthy();
  });

  it('renders a <ul> inside the host', () => {
    expect(el.querySelector('[data-testid="test-list"] ul')).toBeTruthy();
  });

  it('<ul> has list-none class', () => {
    expect(el.querySelector('ul')!.className).toContain('list-none');
  });

  it('renders projected items as <li> elements', () => {
    expect(el.querySelectorAll('li').length).toBe(3);
  });

  it('items project text content', () => {
    const items = el.querySelectorAll('li');
    expect(items[0].textContent?.trim()).toBe('Item one');
    expect(items[1].textContent?.trim()).toBe('Item two');
    expect(items[2].textContent?.trim()).toBe('Item three');
  });

  it('renders without testId when not provided', () => {
    const noIdFixture = TestBed.createComponent(ListComponent);
    noIdFixture.detectChanges();
    expect((noIdFixture.nativeElement as HTMLElement).getAttribute('data-testid')).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe('ListItemComponent', () => {
  let fixture: ComponentFixture<ListItemComponent>;
  let li: HTMLLIElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ListItemComponent] }).compileComponents();
    fixture = TestBed.createComponent(ListItemComponent);
    fixture.detectChanges();
    li = (fixture.nativeElement as HTMLElement).querySelector('li')!;
  });

  it('renders a <li> element', () => expect(li).toBeTruthy());

  // ── Size & spacing ─────────────────────────────────────────────────────────
  it('has text-xs class',            () => expect(li.className).toContain('text-xs'));
  it('has leading-[1.45] class',     () => expect(li.className).toContain('leading-[1.45]'));
  it('has py-sm class',              () => expect(li.className).toContain('py-sm'));
  it('has pl-xl class',              () => expect(li.className).toContain('pl-xl'));

  // ── Color ──────────────────────────────────────────────────────────────────
  it('has text-ink-muted class',      () => expect(li.className).toContain('text-ink-muted'));

  // ── Pseudo-element bullet ──────────────────────────────────────────────────
  it('has relative class for bullet positioning', () => expect(li.className).toContain('relative'));
  it("has before:content-['▸'] class",            () => expect(li.className).toContain("before:content-['▸']"));
  it('has before:absolute class',                 () => expect(li.className).toContain('before:absolute'));
  it('has before:left-0 class',                   () => expect(li.className).toContain('before:left-0'));
  it('has before:text-2xs class',                 () => expect(li.className).toContain('before:text-2xs'));
  it('has before:text-ink-subtle class',          () => expect(li.className).toContain('before:text-ink-subtle'));

  // ── Print ──────────────────────────────────────────────────────────────────
  it('has print:text-print-xs class',  () => expect(li.className).toContain('print:text-print-xs'));
  it('has print:leading-[1.35] class', () => expect(li.className).toContain('print:leading-[1.35]'));
  it('has print:pl-xl class',          () => expect(li.className).toContain('print:pl-xl'));
  it('has print:before:text-print-2xs', () => expect(li.className).toContain('print:before:text-print-2xs'));
});
