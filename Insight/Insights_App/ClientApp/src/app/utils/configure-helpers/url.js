/**
 * Functions for getting proper url.
 */
export var UrlHelper;
(function (UrlHelper) {
    /**
     * Join two or more parameters as URL.
     * @param args list of string to be concatenated.
     */
    function joinPath(...args) {
        return Array.prototype.slice.call(args)
            .map((path) => path.replace(/^[\/\\]+|[\/\\]+$/g, ''))
            .join('/');
    }
    UrlHelper.joinPath = joinPath;
})(UrlHelper || (UrlHelper = {}));
//# sourceMappingURL=url.js.map