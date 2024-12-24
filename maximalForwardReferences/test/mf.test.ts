import {MF} from '../src/mf';
import {Step} from '../src/step';

describe('MF class', () => {
  it('should be able to create an instance of MF', () => {
    const mf = new MF([]);
    expect(mf).toBeInstanceOf(MF);
  });

  it(('should properly initialize Step list'), () => {
    const steps = [new Step('B'), new Step('C', 'B')];
    const mf = new MF(steps);
    expect(mf.input).toEqual(steps);
    expect(mf.input.length).toBe(2);
  });
});

describe('MF Algorithm', () => {
  // how to spy: https://stackoverflow.com/questions/50091438/jest-how-to-mock-one-specific-method-of-a-class/50108368#50108368
  it('step 2 for undefined source', () => {
    const destination = 'B';
    const steps = [new Step(destination)];
    const mf = new MF(steps);

    jest.spyOn(mf, 'step5').mockImplementation(() => {});
    jest.spyOn(mf, 'step3').mockImplementation(() => {});
    jest.spyOn(mf, 'outputCurrentPath').mockImplementation(() => {});

    mf.step2();
    
    // should call step5 and outputCurrentPath and NOT step3
    expect(mf.outputCurrentPath).toHaveBeenCalledTimes(1);
    expect(mf.step5).toHaveBeenCalledTimes(1);
    expect(mf.step3).toHaveBeenCalledTimes(0);

    // state changes
    expect(mf.Y).toBe(destination);

  });

  it('step 2 for defined source', () => {
    const steps = [new Step('B', 'A')];
    const mf = new MF(steps);

    jest.spyOn(mf, 'step5').mockImplementation(() => {});
    jest.spyOn(mf, 'step3').mockImplementation(() => {});
    jest.spyOn(mf, 'outputCurrentPath').mockImplementation(() => {});

    mf.step2();

    // should NOT call step5 and outputCurrentPath, but Step3
    expect(mf.outputCurrentPath).toHaveBeenCalledTimes(0);
    expect(mf.step5).toHaveBeenCalledTimes(0);
    expect(mf.step3).toHaveBeenCalledTimes(1);
  });

  it('step 3 backtracking', () => {
    // step with target already in path
    const steps = [new Step('B', 'C')];
    const mf = new MF(steps);

    jest.spyOn(mf, 'outputCurrentPath').mockImplementation(() => {});
    jest.spyOn(mf, 'step4').mockImplementation(() => {});
    jest.spyOn(mf, 'step5').mockImplementation(() => {});

    mf.Y = 'ABC';
    mf.B = mf.input[0].destination; // manually set b, which would otherwise be set by step2

    mf.step3();

    expect(mf.outputCurrentPath).toHaveBeenCalledTimes(1);
    expect(mf.step5).toHaveBeenCalledTimes(1);
    expect(mf.step4).toHaveBeenCalledTimes(0);

    expect(mf.Y).toBe('AB');
    expect(mf.F).toBe(0);

  });

  it('step 3 forward traversal', () => {
    // step with target not yet in path
    const steps = [new Step('E', 'D')];
    const mf = new MF(steps);

    jest.spyOn(mf, 'outputCurrentPath').mockImplementation(() => {});
    jest.spyOn(mf, 'step4').mockImplementation(() => {});
    jest.spyOn(mf, 'step5').mockImplementation(() => {});

    mf.Y = 'ABC';
    mf.B = mf.input[0].destination; // manually set b, which would otherwise be set by step2

    mf.step3();

    expect(mf.outputCurrentPath).toHaveBeenCalledTimes(0);
    expect(mf.step5).toHaveBeenCalledTimes(0);
    expect(mf.step4).toHaveBeenCalledTimes(1);

    expect(mf.Y).toBe('ABC');
    expect(mf.F).toBe(1);
  });

  it('step 4 (is always forward traversal)', () => {
    const steps = [new Step('B')];
    const mf = new MF(steps);

    mf.B = mf.input[0].destination; // manually set b, which would otherwise be set by step2

    const initY = mf.Y; 
    expect(initY).toBe('');

    jest.spyOn(mf, 'step5').mockImplementation(() => {});

    mf.step4();

    expect(mf.step5).toHaveBeenCalledTimes(1);
    expect(mf.Y).toBe('B');
  });

  it('step 5 (continue algorithm)', () => {

    const steps = [new Step('B'), new Step('C', 'B')];
    const mf = new MF(steps);

    jest.spyOn(mf, 'step2').mockImplementation(() => {});

    mf.step5();

    expect(mf.step2).toHaveBeenCalledTimes(1);
    expect(mf.i).toBe(1);
  });

  it('step 5 (finish)', () => {

    const steps = [new Step('B'), new Step('C', 'B')];
    const mf = new MF(steps);

    mf.i = 1; // simulate to be on last step

    jest.spyOn(mf, 'step2').mockImplementation(() => {});
    jest.spyOn(mf, 'outputCurrentPath').mockImplementation(() => {});

    mf.step5();

    expect(mf.step2).toHaveBeenCalledTimes(0);
    expect(mf.outputCurrentPath).toHaveBeenCalledTimes(1);
    expect(mf.i).toBe(2);
  });
});

describe('MF utils', () => {
  it('outputCurrentPath', () => {
    const mf = new MF([]);
    jest.spyOn(console, 'log').mockImplementation(() => {});

    mf.outputCurrentPath();

    expect(console.log).toHaveBeenCalledTimes(1);
    jest.restoreAllMocks(); // cleanup to reset console state
  });
});

describe('MF run', () => {
  it('should correctly path along the steps from the paper', () => {
    let steps = [
      new Step('A'),
      new Step('B', 'A'),
      new Step('C', 'B'),
      new Step('D', 'C'),
      new Step('C', 'D'),
      new Step('B', 'C'),
      new Step('E', 'B'),
      new Step('G', 'E'),
      new Step('H', 'G'),
      new Step('G', 'H'),
      new Step('W', 'G'),
      new Step('A'),
      new Step('O', 'A'),
      new Step('U', 'O'),
      new Step('O', 'U'),
      new Step('V', 'O'),
    ];
    const mf = new MF(steps);

    const result :string[] = [];
    jest.spyOn(mf, 'outputCurrentPath').mockImplementation(() => {
      result.push(mf.Y);
    });

    mf.run();
    
    // console.log(result);
    expect(result.length).toBe(6);

    expect(result[0]).toBe(''); // should be filtered out by actual implementation of outputCurrentPath
    expect(result[1]).toBe('ABCD');
    expect(result[2]).toBe('ABEGH');
    expect(result[3]).toBe('ABEGW');
    expect(result[4]).toBe('AOU');
    expect(result[5]).toBe('AOV');
  });
  it('just a test', () => {
    let steps = [
      new Step('A'),
      new Step('B', 'A'),
      new Step('C', 'B'),
      new Step('D', 'C'),
      new Step('C', 'D'),
      new Step('D', 'C'),
      new Step('C', 'D'),
      new Step('E', 'C'),
      new Step('C', 'E'),
      new Step('A'),
    ];

    const mf = new MF(steps);

    const result :string[] = [];
    jest.spyOn(mf, 'outputCurrentPath').mockImplementation(() => {
      result.push(mf.Y);
    });

    mf.run();
    console.log(result);
  });
  it('test realIsh situation', () => {
    let steps = [
      new Step('A'), // origin
      new Step('B', 'A'), // click create
      new Step('C', 'B'), // dialog ok
      new Step('D', 'C'), // dialog enter time
      new Step('C', 'D'), // dialog ok
      new Step('D', 'C'), // dialog enter time
      new Step('E', 'D'), // dialog not ok
      new Step('D', 'E'), // dialog enter time
      new Step('C', 'D'), // dialog ok
      new Step('F', 'C'), // dialog confirm
      new Step('A', 'F'), // origin

    ];
    const mf = new MF(steps);

    const result :string[] = [];
    jest.spyOn(mf, 'outputCurrentPath').mockImplementation(() => {
      result.push(mf.Y);
    });

    mf.run();
    console.log(result);
    // [ '', 'ABCD', 'ABCDE', 'ABCFA' ]
    // always pathing to the furthest viable state / action achievable in a single straight line 
    // should lead to singular features


  });

});