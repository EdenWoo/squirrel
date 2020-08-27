import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

/**
 * Contains global mocks for Jest
 */

const mockStorage = () => {
  let storage: Record<string, string> = {};
  return {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) => (storage[key] = value || ''),
    removeItem: (key: string) => delete storage[key],
    clear: () => (storage = {}),
  };
};

Object.defineProperty(window, 'localStorage', { value: mockStorage() });
Object.defineProperty(window, 'sessionStorage', { value: mockStorage() });
Object.defineProperty(window, 'scrollTo', { value: () => 0 });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});

Object.defineProperty(window, '__env', { value: { env: { backendUrl: 'mocked URl' } } });
// 'Implement' innerText in JSDOM: https://github.com/jsdom/jsdom/issues/1245
Object.defineProperty(Element.prototype, 'innerText', {
  get() {
    return this.textContent;
  },
});
