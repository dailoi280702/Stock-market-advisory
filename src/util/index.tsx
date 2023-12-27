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

// Function to calculate cosine similarity between two arrays
const calculateCosineSimilarity = (arr1: string[], arr2: string[]): number => {
  const intersection = arr1.filter((symbol) => arr2.includes(symbol));

  const magnitudeArr1 = Math.sqrt(arr1.length);
  const magnitudeArr2 = Math.sqrt(arr2.length);
  const magnitudeIntersection = Math.sqrt(intersection.length);

  // Cosine Similarity formula
  const similarity =
    magnitudeIntersection === 0 ? 0 : intersection.length / (magnitudeArr1 * magnitudeArr2);

  return similarity;
};

// Function to find k-nearest neighbors based on similarity scores
const findNearestNeighbors = (similarities: Record<string, number>, k: number): string[] => {
  const sortedNeighbors = Object.keys(similarities).sort(
    (a, b) => similarities[b] - similarities[a]
  );

  return sortedNeighbors.slice(0, k);
};

// Function to recommend symbols to a user
export const recommendSymbols = (
  userWatchlist: Watchlist,
  allWatchlists: Watchlist[],
  k: number,
  maxRecommendations: number // New parameter for max number of recommendations
): string[] => {
  // Step 1: Calculate similarity between the target user and other users
  const userSimilarities: Record<string, number> = {};
  allWatchlists.forEach((otherWatchlist) => {
    if (otherWatchlist !== userWatchlist) {
      const similarity = calculateCosineSimilarity(
        userWatchlist.watchlist,
        otherWatchlist.watchlist
      );
      userSimilarities[otherWatchlist.name] = similarity; // Use the name or another identifier instead of user_id
    }
  });

  // Step 2: Find k-nearest neighbors
  const nearestNeighbors = findNearestNeighbors(userSimilarities, k);

  // Step 3: Aggregate symbols from nearest neighbors
  const recommendedSymbols: string[] = [];
  nearestNeighbors.forEach((neighborName) => {
    const neighborWatchlist = allWatchlists.find((watchlist) => watchlist.name === neighborName);
    if (neighborWatchlist) {
      neighborWatchlist.watchlist.forEach((symbol) => {
        if (
          !userWatchlist.watchlist.includes(symbol) &&
          !recommendedSymbols.includes(symbol) &&
          recommendedSymbols.length < maxRecommendations // Check if the max recommendations limit is reached
        ) {
          recommendedSymbols.push(symbol);
        }
      });
    }
  });

  // Step 4: Return the recommended symbols (up to the specified limit)
  return recommendedSymbols;
};
