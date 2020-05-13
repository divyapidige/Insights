
/**
 * Functions for getting proper url.
 */
export namespace UrlHelper {

  /**
   * Join two or more parameters as URL.
   * @param args list of string to be concatenated.
   */
  export function joinPath(...args: any[]): string {
    return Array.prototype.slice.call(args)
      .map((path: string): string =>
        path.replace(/^[\/\\]+|[\/\\]+$/g, ''))
      .join('/');
  }
}
