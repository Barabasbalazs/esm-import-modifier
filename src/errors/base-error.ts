export class BaseError extends Error {
  override name = "BaseError";
  constructor(...params: ConstructorParameters<typeof Error>) {
    super(...params);
  }
}
