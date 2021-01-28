export * from './paginate';

export function resolvePath(
  path: string | string[],
  obj: any,
  separator = '.'
) {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}
