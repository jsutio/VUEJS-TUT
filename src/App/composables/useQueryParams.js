export function useQueryParams() {
    function setQueryParams(query) {
   
      let queryParams = [];
   
      for (const key in query) {
         
        if (
          query[key] !== null &&
          query[key] !== undefined &&
          query[key] !== "" &&
          query[key] !== null
        ) {
          if (Array.isArray(query[key])) {
            if (query[key].length > 0) {
              for (const val of query[key]) {
                if (
                  val !== null &&
                  val !== undefined &&
                  query[key] !== "" &&
                  query[key] !== null
                ) {
                  queryParams.push(`${key}=${val}`);
                }
              }
            }
          } else {
            queryParams.push(`${key}=${query[key]}`);
          }
        }
       
      }
   
   
   
      return queryParams.join("&");
    }
   
    return { setQueryParams };
  }