import { Step } from "./step";

/**
 * MF class only working with simple strings rn
 */
export class MF {
  F: number;
  i: number;
  Y: string;
  input: Step[];

  A?: string;
  B?: string;

  /**
   * Acts as step 1 of the MF algorithm
   * @param {string} input all steps for MF to process
   */
  constructor(input: Step[]){
    this.F = 1;
    this.i = 0;
    this.Y = '';
    this.input = input;
  }

  /**
   * Run the MF algorithm
  */
  run(){
    this.step2();
  }

  /**
   * Step 2 of the MF algorithm: Beginning a new traversal / Finished a path and starting from root
  */
  step2(){
    this.A = this.input[this.i].source;
    this.B = this.input[this.i].destination;

    if(this.A === undefined){
      this.outputCurrentPath();
      this.Y = this.B;
      this.step5();
      return;
    }
    else{
      this.step3();
      return;
    }
  }
 
  /**
   * Step 3 of the MF algorithm: Backtracking
   */
  step3(){
    let BIndexInY;
    if(this.B){
      BIndexInY = this.Y.indexOf(this.B!);
    }
    else {
      return;
    }

    if(BIndexInY >= 1 ){
      if (this.F == 1) {this.outputCurrentPath();}
      BIndexInY = BIndexInY == this.Y.length? BIndexInY : BIndexInY + 1;
      this.Y = this.Y.slice(0, BIndexInY);
      this.F = 0;
      this.step5();
      return;
    }
    else{
      this.step4();
      return;
    }
  }

  /**
   * Step 4 of the MF algorithm: Forward traversal
   */ 
  step4(){
    this.Y = this.Y + this.B;
    this.F = 1;
    this.step5();
  }

  /**
   * Step 5 of the MF algorithm: Continue algorithm
   */
  step5(){
    this.i++;
    if(this.i < this.input.length){
      this.step2();
    } else{
      this.outputCurrentPath();
      console.log("MF completed");
    }
  }

  outputCurrentPath(){
    console.log(this.Y);
  }
}