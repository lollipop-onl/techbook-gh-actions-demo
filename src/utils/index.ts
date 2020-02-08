/**
 * 指定時間後にPromiseを解決させるメソッド
 * @param duration 待機時間[ms]
 */
export const sleep = (duration: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, duration));
