export class Ng2RewardPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ng2-reward-app h1')).getText();
  }
}
