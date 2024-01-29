const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3002;


const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "postgres",
  password: "OndPost06",
  port: 5432,
});
app.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query || query?.trim() == '') {
    res.json(null);
    return;
  }
  try {
    const result = await pool.query(`SELECT * FROM queries    `);
    const filteredResults = result.rows.filter((result) => {
      return (
        levenshteinDistance(result.keyword, query) < 2  ||
        checkSearchRelevant(result.keyword, query) ||
        checkResultStartWithQuery(result.fullquery, query)

      );
    });

    filteredResults.sort((a, b) => {
      return getSimilarity(b.keyword, query) - getSimilarity(a.keyword, query);
    });
    res.json(filteredResults);
  } catch (error) {
    console.error("Error executing search query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const checkSearchRelevant = (keyword, query) => {
  if (query.replace(/\s/g, "") === "") {
    return false;
  }
  const keywordWithoutSpaces = keyword
    .replace(/\s+/g, " ")
    .toLocaleLowerCase()
    .trim();
  const queryWithoutSpaces = query
    .replace(/\s+/g, " ")
    .toLocaleLowerCase()
    .trim();

  // console.log( keywordWithoutSpaces.indexOf(queryWithoutSpaces),queryWithoutSpaces.indexOf(keywordWithoutSpaces.toLocaleLowerCase()), keywordWithoutSpaces, ' x ' , queryWithoutSpaces)
  return (
    keywordWithoutSpaces.indexOf(queryWithoutSpaces) >= 0 ||
    queryWithoutSpaces.indexOf(keywordWithoutSpaces) >= 0
  );
};

const checkResultStartWithQuery = (result, query) => {
  return (
    result
      .replace(/\s+/g, " ")
      .trim()
      .toLocaleLowerCase()
      .indexOf(query.replace(/\s+/g, " ").trim().toLocaleLowerCase()) == 0
  );
};

function getSimilarity(result, query) {
  result = result.toLowerCase();
  query = query.toLowerCase();
  return result.length - result.replace(new RegExp(query, "g"), "").length;
}

function levenshteinDistance(word1, word2) {
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