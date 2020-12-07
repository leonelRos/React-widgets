import React, { useEffect, useState } from "react";
import axios from "axios";

//using the debounced method to minimize the amount of request that users makes per typing.
//This could potentially save money when APi is paid.
const Convert = ({ language, text }) => {
  //language and text come from translate component as props
  const [translated, setTranslated] = useState("");
  const [debouncedText, setDebouncedText] = useState(text);

  //using timeout to give the user time to type and then render the page
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM",
          },
        }
      );
      setTranslated(data.data.translations[0].translatedText);
    };
    doTranslation();
    // console.log("here is translatetion");
  }, [language, debouncedText]);

  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  );
};

export default Convert;
