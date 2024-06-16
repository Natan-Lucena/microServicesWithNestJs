export class UserAlreadyExistsException extends Error {
  constructor() {
    super('User already exists');
  }
}
export class UserDoesNotExistsException extends Error {
  constructor() {
    super('User does not exists');
  }
}
export class InvalidCredentialsException extends Error {
  constructor() {
    super('Invalid credentials');
  }
}
