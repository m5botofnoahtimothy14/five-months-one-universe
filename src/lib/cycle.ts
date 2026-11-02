/**
 * Non-repeating message cycling ("shuffle bag").
 * Every item is shown once before any repeats, and a new round never
 * starts with the item that was just shown.
 */
export function shuffledOrder(length: number, avoidFirst = -1, rand: () => number = Math.random): number[] {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j]!, order[i]!];
  }
  if (length > 1 && order[0] === avoidFirst) {
    [order[0], order[1]] = [order[1]!, order[0]!];
  }
  return order;
}

export type Bag = { order: number[]; pos: number };

export function newBag(length: number, rand: () => number = Math.random): Bag {
  return { order: shuffledOrder(length, -1, rand), pos: 0 };
}

export function bagCurrent(bag: Bag): number {
  return bag.order[bag.pos] ?? 0;
}

/** Advance; reshuffles once the round is used up. */
export function bagNext(bag: Bag, rand: () => number = Math.random): Bag {
  if (bag.pos + 1 < bag.order.length) return { order: bag.order, pos: bag.pos + 1 };
  return { order: shuffledOrder(bag.order.length, bagCurrent(bag), rand), pos: 0 };
}
