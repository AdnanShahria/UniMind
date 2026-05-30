// Minimal type definitions for Cloudflare specific globals used in this project
// Standard Web APIs (Request, Response, URL, etc) are provided by the "DOM" lib in tsconfig.json

interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}

interface R2Bucket {
  get(key: string, options?: any): Promise<any | null>;
  head(key: string): Promise<any | null>;
  put(key: string, value: any, options?: any): Promise<any | null>;
  delete(key: string | string[]): Promise<void>;
  list(options?: any): Promise<any>;
}
