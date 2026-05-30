import worker from '../backend/src/index';

export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);
  
  if (
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/auth') ||
    url.pathname === '/status'
  ) {
    // Forward to the existing backend router
    return worker.fetch(context.request, context.env, context);
  }
  
  // Let Cloudflare Pages handle static assets and fallback to _redirects
  return context.next();
};
