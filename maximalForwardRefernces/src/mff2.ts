import { Step2, nodeType } from "./step2";

export class MFF2 {
  F: boolean = true;
  i: number = 0;


  Y : Step2[] = [];
  input: Step2[];
  currentNode?: Step2;

  constructor(input: Step2[]){
    this.input = input;
  }

  /**
   * step 2 in the original algorithm
   */
  newPath(){
    this.currentNode = this.input[this.i];
    
    if(this.currentNode.nodeType === nodeType.origin){
      this.outputCurrentPath();
      this.Y = [];
      this.Y.push(this.currentNode);
      this.advanceAlgorithm();
    }
    else{
      this.stepBack();
    }
  }

  /**
   * step 3 in the original algorithm
   */
  stepBack(){
    let stepIndex = this.Y.findIndex(step => step.id === this.currentNode?.id);
    if(stepIndex >= 1){
      if (this.F) {this.outputCurrentPath();}
      stepIndex = stepIndex == this.Y.length ? stepIndex : stepIndex + 1;
      this.Y = this.Y.slice(0, stepIndex);
      this.F = false;
      this.advanceAlgorithm();
    }    
    {
      this.stepForward();
    }
  }

  /**
   * step 4 in the original algorithm
   */
  stepForward(){
    this.Y.push(this.currentNode!);
    this.F = true;
    this.advanceAlgorithm();
  }


  /**
   * step 5 in original algorithm
   */
  advanceAlgorithm(){
    this.i++;
    if(this.i < this.input.length){
      this.newPath();
    }
    else{
      this.outputCurrentPath();
      console.log("MFF completed");
    }
  }

  outputCurrentPath(){
    console.log(this.Y);
  }


}