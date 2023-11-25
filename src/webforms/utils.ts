export function addDebounce<T>(func: T, timeout: number):T {
  let timer: any;
  return ((...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      func.apply(this, args)
    }, timeout)
  }) as T;
}
