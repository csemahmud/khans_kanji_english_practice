// utils/timerUtils.ts

let timerId: NodeJS.Timeout | null = null;

/**
 * Starts a countdown timer.
 * @param duration Number of seconds to count down from
 * @param onTick Callback fired every second with remaining time
 * @param onTimeout Callback fired when timer reaches zero
 */
export const startTimer = (
  duration: number,
  onTick: (remainingTime: number) => void,
  onTimeout: () => void
) => {
  let remainingTime = duration;

  if (timerId) {
    clearInterval(timerId);
  }

  onTick(remainingTime); // Initial tick
  timerId = setInterval(() => {
    remainingTime -= 1;
    onTick(remainingTime);

    if (remainingTime <= 0) {
      clearInterval(timerId!);
      timerId = null;
      onTimeout();
    }
  }, 1000);
};

/**
 * Clears any active timer.
 */
export const clearTimer = () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
};
