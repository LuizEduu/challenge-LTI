export class UserAlreadyExistsError extends Error {
  constructor(identifier: string) {
    super(`User with "${identifier}" already exists.`);
  }
}
