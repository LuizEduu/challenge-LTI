export class DepartmentAlreadyExistsError extends Error {
  constructor() {
    super(`Department already exists.`);
  }
}
