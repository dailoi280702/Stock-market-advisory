export const getColorFromString = (str: string) => {
  if (str === '') {
    return '#a3a3a3';
  }

  const firstLetter = str.charAt(0).toUpperCase();

  const mColor: Record<string, string> = {
    A: '#6b7280',
    B: '#71717a',
    C: '#a3a3a3',
    D: '#78716c',
    E: '#78716c',
    F: '#ef4444',
    G: '#f97316',
    H: '#f59e0b',
    I: '#eab308',
    J: '#84cc16',
    K: '#22c55e',
    L: '#10b981',
    M: '#10b981',
    N: '#14b8a6',
    O: '#06b6d4',
    P: '#0ea5e9',
    Q: '#3b82f6',
    R: '#6366f1',
    S: '#8b5cf6',
    T: '#a855f7',
    U: '#d946ef',
    V: '#ec4899',
    W: '#f43f5e',
    X: '#0ea5e9',
    Y: '#10b981',
    Z: '#14b8a6'
  };

  if (mColor[firstLetter]) {
    return mColor[firstLetter];
  }

  return '#a3a3a3';
};
