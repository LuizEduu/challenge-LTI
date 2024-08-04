export class PayrollInPeriodAlreadyExistsError extends Error {
  constructor() {
    super('payroll for this user already exists in the period informed.');
  }
}
