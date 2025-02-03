export interface RequestContext {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: unknown;
}
