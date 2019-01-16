export class PermissionError extends Error {
  constructor(public reason: string) {
    super(reason)
  }
}
