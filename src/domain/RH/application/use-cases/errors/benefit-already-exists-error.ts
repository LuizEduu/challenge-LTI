export class BenefitAlreadyExistsError extends Error {
  constructor() {
    super(`Benefit already exists.`);
  }
}
