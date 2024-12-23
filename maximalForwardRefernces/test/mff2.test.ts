import { Step2, nodeType } from "../src/step2";
import {MFF2} from '../src/mff2';

describe('MFF variant two', () => {
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
    const mff = new MFF2(steps);
    
    const paths : Step2[] = [];

    jest.spyOn(mff, 'outputCurrentPath').mockImplementation(() => {
      paths.push(...mff.Y);
    });    
    
    mff.run();

    console.log(paths);
  })
})