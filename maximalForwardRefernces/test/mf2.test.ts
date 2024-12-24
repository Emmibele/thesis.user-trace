import { Step2, nodeType } from "../src/step2";
import {MF2} from '../src/mf2';

describe('MF variant two', () => {
  it('should run alg', () => {
    const steps = [
      new Step2(nodeType.origin, 'origin'),
      new Step2(nodeType.userAction, 'click create'),
      new Step2(nodeType.state, 'dialog ok'),
      new Step2(nodeType.userAction, 'click confirm'),
      new Step2(nodeType.origin, 'origin'),
      new Step2(nodeType.userAction, 'click create'),
      new Step2(nodeType.state, 'dialog ok'),
      new Step2(nodeType.userAction, 'enter startTime'),
      new Step2(nodeType.state, 'dialog ok'),
      new Step2(nodeType.origin, 'origin'),
    ];
    const mf = new MF2(steps);
    
    const paths : Step2[] = [];

    jest.spyOn(mf, 'outputCurrentPath').mockImplementation(() => {
      paths.push(...mf.Y);
    });    
    
    mf.run();

    console.log(paths);
  })
})