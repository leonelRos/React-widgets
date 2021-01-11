import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("coding");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);
    return () => {
      clearTimeout(timerID);
    };
  }, [term]);

  //useffect is like  lyfecycles methos in react and to invoke a api request using
  //async await i need to create a helper function to be inmediatly invoked
  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedTerm,
        },
      });
      setResults(data.query.search);
      setTerm(""); //this could be delete if user doesnt care about clean input
    };

    //this statement helps to reduce to time of loading once the page is render  to the browser
    // if (term && !results.length) {
    //   search();
    // } else {
    //   //this solve the problem of making to many request when user typing
    //   const cancelTimeOut = setTimeout(() => {
    //     //this is to check if there is a term in the input do search otherwise do not
    //     if (term) {
    //       search();
    //     }
    //   }, 1000);
    //   return () => {
    //     clearTimeout(cancelTimeOut);
    //   };
    // }

    // //this solve the problem of making to many request when user typing
    // const cancelTimeOut = setTimeout(() => {
    //   //this is to check if there is a term in the input do search otherwise do not
    //   if (term) {
    //     search();
    //   }
    // }, 500);
    // return () => {
    //   clearTimeout(cancelTimeOut);
    // };
    //THIS CHECK IF THE INPUT IS EMPTY DO NOTHING AND APP DOESNT CRASH
    if (debouncedTerm) {
      search();
    }
  }, [debouncedTerm]);
  //   //useffect is like  lyfecycles methos in react and to invoke a api request using
  //   //async await i need to create a helper function to be inmediatly invoked
  //   useEffect(() => {
  //     const search = async () => {
  //       const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
  //         params: {
  //           action: "query",
  //           list: "search",
  //           origin: "*",
  //           format: "json",
  //           srsearch: term,
  //         },
  //       });
  //       setResults(data.query.search);
  //     };

  //     //this statement helps to reduce to time of loading once the page is render  to the browser
  //     if (term && !results.length) {
  //       search();
  //     } else {
  //       //this solve the problem of making to many request when user typing
  //       const cancelTimeOut = setTimeout(() => {
  //         //this is to check if there is a term in the input do search otherwise do not
  //         if (term) {
  //           search();
  //         }
  //       }, 1000);
  //       return () => {
  //         clearTimeout(cancelTimeOut);
  //       };
  //     }

  //     // //this solve the problem of making to many request when user typing
  //     // const cancelTimeOut = setTimeout(() => {
  //     //   //this is to check if there is a term in the input do search otherwise do not
  //     //   if (term) {
  //     //     search();
  //     //   }
  //     // }, 500);
  //     // return () => {
  //     //   clearTimeout(cancelTimeOut);
  //     // };
  //   }, [term]);

  //title and snippet are propertities from the wiki api
  const renderedResults = results.map((result) => {
    const source = `https://en.wikipedia.org?curid=${result.pageid}`;
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a href={source} className="ui button">
            Go
          </a>
        </div>

        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          {/* /*when working with input always remmber target value  */}
          <input
            type="text"
            className="input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
