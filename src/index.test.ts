describe('Application Initialization', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
  });

  afterEach(() => document.body.innerHTML = '');

  it('should initialize DiamondGrid when DOM is loaded', () => {
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    expect(container.children.length).toBeGreaterThan(0);
  });

  it('should throw error when container is not found', () => {
    document.body.innerHTML = '';

    expect(() =>
      document.dispatchEvent(new Event('DOMContentLoaded')))
    .toThrow('Container element not found');
  });
});
