import { Ng2RewardPage } from './app.po';

describe('ng2-reward App', function() {
  let page: Ng2RewardPage;

  beforeEach(() => {
    page = new Ng2RewardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ng2-reward works!');
  });
});
