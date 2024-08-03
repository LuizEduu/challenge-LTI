export class BenefitNotFoundError extends Error {
  constructor() {
    super(`Benefit not found.`);
  }
}
