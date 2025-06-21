export async function setWait<T>(execute : () => Promise<T>, onWaited : (result : T) => void, timeout : number = 2500) {
  const start = Date.now();
  const result = await execute();
  const finished = Date.now();
  const wait = Math.max(1, timeout - (finished - start));
  setTimeout(() => { onWaited(result); }, wait);
}