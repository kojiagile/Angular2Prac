import { PracPage } from './app.po';

describe('prac App', () => {
  let page: PracPage;

  beforeEach(() => {
    page = new PracPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
