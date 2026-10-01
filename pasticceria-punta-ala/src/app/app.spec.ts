import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('Landing page', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });
  it('shows the supplied contact details and opening hours', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('address')?.textContent).toContain(
      'Condominio Il Delfino, Via Lattea',
    );
    expect(page.querySelector('a[href="tel:+393291544558"]')).toBeTruthy();
    expect(page.textContent).toContain('RQ49+4Q Punta Ala, Provincia di Grosseto');
    const directions = page.querySelector('#contatti a.button') as HTMLAnchorElement;
    expect(new URL(directions.href).searchParams.get('destination')).toBe('42.8053453,10.7694705');
    expect(page.querySelectorAll('dl > div').length).toBe(7);
    expect(page.querySelectorAll('dl > div.closed').length).toBe(3);
  });
  it('opens the mobile navigation and closes it after selecting a section', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const button = page.querySelector('.menu-toggle') as HTMLButtonElement;
    expect(button.getAttribute('aria-expanded')).toBe('false');
    button.click();
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    (page.querySelector('nav a') as HTMLAnchorElement).click();
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });
  it('links cake enquiries to the confirmed WhatsApp number with a prefilled message', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const link = page.querySelector('#ordinazioni a') as HTMLAnchorElement;
    const url = new URL(link.href);
    expect(url.hostname).toBe('wa.me');
    expect(url.pathname).toBe('/393291544558');
    expect(url.searchParams.get('text')).toContain('occasione, data e numero di persone');
    expect(page.querySelector('.mobile-contact a')?.textContent).toContain('WhatsApp');
    expect(page.querySelectorAll('.reviews-grid > figure').length).toBe(3);
    expect(page.querySelector('#perche-sceglierci')?.textContent).toContain('50° anno di gestione');
    expect(page.querySelector('#recensioni')?.textContent).toContain('Sam');
  });
  it('loads the map only when requested', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('iframe')).toBeNull();
    (page.querySelector('.map-button') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(page.querySelector('iframe')?.getAttribute('src')).toContain(
      'https://maps.google.com/maps?q=',
    );
  });
});
