export function levenshteinDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const trimmedWord = word1.trim().toLocaleLowerCase()
    const trimmedWord2 = word2.trim().toLocaleLowerCase()
    // Create a 2D matrix to store the distances
    const dp = Array(m + 1)
      .fill(null)
      .map(() => Array(n + 1).fill(0));

    // Initialize the first row and column of the matrix
    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }

    // Calculate the distances
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (trimmedWord[i - 1] === trimmedWord2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1, // Deletion
            dp[i][j - 1] + 1, // Insertion
            dp[i - 1][j - 1] + 1 // Substitution
          );
        }
      }
    }
    console.log(dp[m][n], trimmedWord, trimmedWord2 )
    // Return the distance between the two words
    return dp[m][n];
  }