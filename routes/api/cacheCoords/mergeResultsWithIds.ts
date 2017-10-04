export const mergeResultsWithIds = (results, stations) => {
    let mergedResults = [];
    for (let i = 0; i < results.length; i++) {
        mergedResults.push({ id: stations[i].id, ...results[i] });
    }
    return mergedResults;
};