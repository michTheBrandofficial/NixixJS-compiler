function token(value = '', type) {
    return { value, type };
}
// checki if it is string
function isAlpha(str) {
    return str.toUpperCase() != str.toLowerCase();
}
function isSkippable(str) {
    return str === ' ' || str === '\n' || str === '\t';
}
export { token, isAlpha, isSkippable };
