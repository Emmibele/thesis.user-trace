import {MFF} from '../src/mff';
import {Step} from '../src/step';

describe('MFF class', () => {
  it('should be able to create an instance of MFF', () => {
    const mff = new MFF([]);
    expect(mff).toBeInstanceOf(MFF);
  });

  it(('should properly initialize Step list'), () => {
    const steps = [new Step('B'), new Step('C', 'B')];
    const mff = new MFF(steps);
    expect(mff.input).toEqual(steps);
    expect(mff.input.length).toBe(2);
  });
});

describe('MFF Algorithm', () => {
  // how to spy: https://stackoverflow.com/questions/50091438/jest-how-to-mock-one-specific-method-of-a-class/50108368#50108368
  it('step 2 for undefined source', () => {
    const destination = 'B';
    const steps = [new Step(destination)];
    const mff = new MFF(steps);

    jest.spyOn(mff, 'step5').mockImplementation(() => {});
    jest.spyOn(mff, 'step3').mockImplementation(() => {});
    jest.spyOn(mff, 'outputCurrentPath').mockImplementation(() => {});

    mff.step2();
    
    // should call step5 and outputCurrentPath and NOT step3
    expect(mff.outputCurrentPath).toHaveBeenCalledTimes(1);
    expect(mff.step5).toHaveBeenCalledTimes(1);
    expect(mff.step3).toHaveBeenCalledTimes(0);

    // state changes
    expect(mff.Y).toBe(destination);

  });

  it('step 2 for defined source', () => {
    const steps = [new Step('B', 'A')];
    const mff = new MFF(steps);

    jest.spyOn(mff, 'step5').mockImplementation(() => {});
    jest.spyOn(mff, 'step3').mockImplementation(() => {});
    jest.spyOn(mff, 'outputCurrentPath').mockImplementation(() => {});

    mff.step2();

    // should NOT call step5 and outputCurrentPath, but Step3
    expect(mff.outputCurrentPath).toHaveBeenCalledTimes(0);
    expect(mff.step5).toHaveBeenCalledTimes(0);
    expect(mff.step3).toHaveBeenCalledTimes(1);
  });

  it('step 3 backtracking', () => {
    // step with target already in path
    const steps = [new Step('B', 'C')];
    const mff = new MFF(steps);

    jest.spyOn(mff, 'outputCurrentPath').mockImplementation(() => {});
    jest.spyOn(mff, 'step4').mockImplementation(() => {});
    jest.spyOn(mff, 'step5').mockImplementation(() => {});

    mff.Y = 'ABC';
    mff.B = mff.input[0].destination; // manually set b, which would otherwise be set by step2

    mff.step3();

    expect(mff.outputCurrentPath).toHaveBeenCalledTimes(1);
    expect(mff.step5).toHaveBeenCalledTimes(1);
    expect(mff.step4).toHaveBeenCalledTimes(0);

    expect(mff.Y).toBe('AB');
    expect(mff.F).toBe(0);

  });

  it('step 3 forward traversal', () => {
    // step with target not yet in path
    const steps = [new Step('E', 'D')];
    const mff = new MFF(steps);

    jest.spyOn(mff, 'outputCurrentPath').mockImplementation(() => {});
    jest.spyOn(mff, 'step4').mockImplementation(() => {});
    jest.spyOn(mff, 'step5').mockImplementation(() => {});

    mff.Y = 'ABC';
    mff.B = mff.input[0].destination; // manually set b, which would otherwise be set by step2

    mff.step3();

    expect(mff.outputCurrentPath).toHaveBeenCalledTimes(0);
    expect(mff.step5).toHaveBeenCalledTimes(0);
    expect(mff.step4).toHaveBeenCalledTimes(1);

    expect(mff.Y).toBe('ABC');
    expect(mff.F).toBe(1);
  });

  it('step 4 (is always forward traversal)', () => {
    const steps = [new Step('B')];
    const mff = new MFF(steps);

    mff.B = mff.input[0].destination; // manually set b, which would otherwise be set by step2

    const initY = mff.Y; 
    expect(initY).toBe('');

    jest.spyOn(mff, 'step5').mockImplementation(() => {});

    mff.step4();

    expect(mff.step5).toHaveBeenCalledTimes(1);
    expect(mff.Y).toBe('B');
  });

  it('step 5 (continue algorithm)', () => {

    const steps = [new Step('B'), new Step('C', 'B')];
    const mff = new MFF(steps);

    jest.spyOn(mff, 'step2').mockImplementation(() => {});

    mff.step5();

    expect(mff.step2).toHaveBeenCalledTimes(1);
    expect(mff.i).toBe(1);
  });

  it('step 5 (finish)', () => {

    const steps = [new Step('B'), new Step('C', 'B')];
    const mff = new MFF(steps);

    mff.i = 1; // simulate to be on last step

    jest.spyOn(mff, 'step2').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});

    mff.step5();

    expect(mff.step2).toHaveBeenCalledTimes(0);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(mff.i).toBe(2);

    jest.restoreAllMocks(); // cleanup to reset console state
  });
});

describe('MFF utils', () => {
  it('outputCurrentPath', () => {
    const mff = new MFF([]);
    jest.spyOn(console, 'log').mockImplementation(() => {});

    mff.outputCurrentPath();

    expect(console.log).toHaveBeenCalledTimes(1);
    jest.restoreAllMocks(); // cleanup to reset console state
  });
});