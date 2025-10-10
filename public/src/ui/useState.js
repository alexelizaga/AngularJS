export function useState(scope, initial, rerender) {
  let value = typeof initial === 'function' ? initial() : initial;

  const get = () => value;

  const set = (next) => {
    value = typeof next === 'function' ? next(value) : next;
    scope.$evalAsync(() => { if (typeof rerender === 'function') rerender(); });
  };

  return [get, set];
}