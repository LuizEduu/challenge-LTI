export class NotAuthorizedError extends Error {
  constructor() {
    super(`User not autorized to execute operation.`);
  }
}
