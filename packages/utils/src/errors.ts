export class MicroscopeError extends Error {
  constructor(
    message: string,
    readonly code:
      | 'UNSUPPORTED'
      | 'INVALID_SOURCE'
      | 'TOO_LARGE'
      | 'UNSAFE_ARCHIVE'
      | 'RENDER_FAILED'
      | 'ABORTED',
    override readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'MicroscopeError';
  }
}
