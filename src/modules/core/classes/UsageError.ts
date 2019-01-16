export class UsageError extends Error {
  constructor(public reason: string) {
    super(reason)
  }
}
