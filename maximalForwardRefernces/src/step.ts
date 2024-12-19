/**
 * Describes a single step in the interaction path taken by the user
 */
export class Step {
  source?: string;
  destination: string;

  constructor(destination: string, source?: string) {
    this.source = source;
    this.destination = destination;
  }
}
