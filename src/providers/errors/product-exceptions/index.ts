export class ProductDoesNotExists extends Error {
  constructor() {
    super('Product does not exist');
  }
}
