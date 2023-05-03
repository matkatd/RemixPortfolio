export function getCurrentPath(request) {
  return new URL(request.url).pathname;
}

export function makeRedirectToFromHere(request) {
  return new URLSearchParams([["redirectTo", getCurrentPath(request)]]);
}

export function getRedirectTo(request, defaultRedirectTo = "/") {
  const url = new URL(request.url);
  return safeRedirect(url.searchParams.get("redirectTo"), defaultRedirectTo);
}

export function isGet(request) {
  return request.method.toLowerCase() === "get";
}

export function isPost(request) {
  return request.method.toLowerCase() === "post";
}

export function isDelete(request) {
  return request.method.toLowerCase() === "delete";
}

export function notFound(message) {
  return new Response(message, { status: 404 });
}

function notAllowedMethod(message) {
  return new Response(message, { status: 405 });
}

function badRequest(message) {
  return new Response(message, { status: 400 });
}

export function getRequiredParam(params, key) {
  const value = params[key];

  if (!value) {
    throw badRequest(`Missing required request param "${key}"`);
  }

  return value;
}

export function assertIsPost(request, message = "Method not allowed") {
  if (!isPost(request)) {
    throw notAllowedMethod(message);
  }
}

export function assertIsDelete(request, message = "Method not allowed") {
  if (!isDelete(request)) {
    throw notAllowedMethod(message);
  }
}

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(to, defaultRedirect = "/") {
  if (
    !to ||
    typeof to !== "string" ||
    !to.startsWith("/") ||
    to.startsWith("//")
  ) {
    return defaultRedirect;
  }

  return to;
}
