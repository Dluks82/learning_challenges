export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replaceAll(
    routeParametersRegex,
    "(?<$1>[a-z0-9-_]+)"
  );

  const pathRegex = new RegExp(
    // /(?<id>[a-f\d-]+)(?<status>\/complete)?(?<query>\\?(.*))?$/g
    `^${pathWithParams}(?<status>\/complete)?(?<query>\\?(.*))?$`
  );

  return pathRegex;
}
