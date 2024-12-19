import { Step } from '../src/step';

describe('Step Class', () => {
  it('should be able to create an instance of Step: all parametrized', () => {
    const step = new Step('B', 'A');
    expect(step).toBeInstanceOf(Step);
    expect(step.source).toBe('A');
    expect(step.destination).toBe('B');
  });

  it('should be able to create an instance of Step: only destination parametrized', () => {
    const step = new Step('B');
    expect(step.destination).toBe('B');
    expect(step.source).toBeUndefined();
  });
})