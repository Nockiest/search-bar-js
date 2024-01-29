import { useState, useEffect } from "react";
import OneQuery from "./OneQuery";
import { levenshteinDistance } from "./utils";
const QueryListTable = ({results,  query, setQuery}) => {
    const [shownResults, setShownResults] = useState ([]);

    useEffect(() => {
        let newShownResults  = [];
        console.log(results)
        results.forEach((result) => {
          console.log(result);
          const fullquery = result.fullquery.replace(/\s+/g, " ");

          const queryWithoutSpaces = query.replace(/\s+/g, " ");

          const indexOfQuery = fullquery
            .toLocaleLowerCase()
            .indexOf(queryWithoutSpaces.toLocaleLowerCase());
          const beforeQuery = fullquery.slice(0, indexOfQuery);
          const afterQuery = fullquery.slice(
            indexOfQuery + queryWithoutSpaces.length
          );
          console.log(queryWithoutSpaces, indexOfQuery)
        if( indexOfQuery !== -1 || levenshteinDistance(result.keyword, query) < 2   ){
            newShownResults.push({
                boldedPartBefore: beforeQuery,
                normalText: queryWithoutSpaces,
                boldedPartAfter: afterQuery,
                popularity: result.popularity,
              });
        }

        });

     // Sort the newShownQueries array based on popularity in descending order
     newShownResults.sort((a, b) => b.popularity - a.popularity);

     setShownResults(newShownResults);

   }, [query, results]);

     return (
       <>
         {shownResults.length > 0 && query && (
           <table
             style={{
               width: "100%",
               zIndex: -1,
               backgroundColor: "#f7f6f2",
               padding: "0.25em",
               maxHeight: "500px",
             }}
           >
             <tbody>
               {shownResults.map((shownQuery, key) => {
                 return (
                   <OneQuery
                     key={key}
                     boldedPartBefore={shownQuery.boldedPartBefore}
                     normalText={shownQuery.normalText}
                     boldedPartAfter={shownQuery.boldedPartAfter}
                     query={query}
                      setQuery={setQuery}
                   />
                 );
               })}
             </tbody>
           </table>
         )}
       </>
     );
   };
   export default QueryListTable