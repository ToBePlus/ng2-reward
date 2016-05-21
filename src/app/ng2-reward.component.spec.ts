import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Ng2RewardAppComponent } from '../app/ng2-reward.component';

beforeEachProviders(() => [Ng2RewardAppComponent]);

describe('App: Ng2Reward', () => {
  it('should create the app',
      inject([Ng2RewardAppComponent], (app: Ng2RewardAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ng2-reward works!\'',
      inject([Ng2RewardAppComponent], (app: Ng2RewardAppComponent) => {
    expect(app.title).toEqual('ng2-reward works!');
  }));
});
