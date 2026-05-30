import worker from './_api-core/index';

interface PagesContext {
  request: Request;
  env: Record<string, string>;
  next: () => Promise<Response>;
  waitUntil: (promise: Promise<unknown>) => void;
}

export const onRequest = async (context: PagesContext) => {
  const url = new URL(context.request.url);

  if (
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/auth') ||
    url.pathname.startsWith('/compress') ||
    url.pathname === '/status'
  ) {
    // Forward to the _api-core router (all server-side logic)
    return worker.fetch(context.request, context.env as any, context as any);
  }

  // Let Cloudflare Pages handle static assets and SPA fallback
  return context.next();
};
