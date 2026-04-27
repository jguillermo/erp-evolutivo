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
  it('has text-[0.74rem] class',     () => expect(li.className).toContain('text-[0.74rem]'));
  it('has leading-[1.45] class',     () => expect(li.className).toContain('leading-[1.45]'));
  it('has py-[3px] class',           () => expect(li.className).toContain('py-[3px]'));
  it('has pl-[12px] class',          () => expect(li.className).toContain('pl-[12px]'));

  // ── Color ──────────────────────────────────────────────────────────────────
  it('has text-[#b0b3c0] class',     () => expect(li.className).toContain('text-[#b0b3c0]'));

  // ── Pseudo-element bullet ──────────────────────────────────────────────────
  it('has relative class for bullet positioning', () => expect(li.className).toContain('relative'));
  it("has before:content-['▸'] class",            () => expect(li.className).toContain("before:content-['▸']"));
  it('has before:absolute class',                 () => expect(li.className).toContain('before:absolute'));
  it('has before:left-0 class',                   () => expect(li.className).toContain('before:left-0'));
  it('has before:text-[0.65rem] class',           () => expect(li.className).toContain('before:text-[0.65rem]'));
  it('has before:text-[#666] class',              () => expect(li.className).toContain('before:text-[#666]'));

  // ── Print ──────────────────────────────────────────────────────────────────
  it('has print:text-[7.5px] class',   () => expect(li.className).toContain('print:text-[7.5px]'));
  it('has print:leading-[1.35] class', () => expect(li.className).toContain('print:leading-[1.35]'));
  it('has print:pl-[10px] class',      () => expect(li.className).toContain('print:pl-[10px]'));
  it('has print:before:text-[6px]',   () => expect(li.className).toContain('print:before:text-[6px]'));
});
