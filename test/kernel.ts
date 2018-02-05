import * as assert from 'assert';

describe('Kernel', () => {
  it('load modules and children', function() {
    assert.equal(this.modulesManager.getModules().length, 2);
  });

  it('load controllers', function() {
    assert.equal(this.modulesManager.getControllers().length, 5);
  });

  it('load providers', function() {
    assert.equal(this.modulesManager.getProviders().length, 1);
  });
});
