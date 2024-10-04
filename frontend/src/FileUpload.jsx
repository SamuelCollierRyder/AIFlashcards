import React, { useState, useEffect, useRef } from "react";
import Button from "@cloudscape-design/components/button";
import { fetchWithAuth } from "./utils";

async function readFile(event, setFileContent) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = (e) => {
      setFileContent(e.target.result);
    };
  }
}

export default function FileUpload({ text }) {
  const [fileContent, setFileContent] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log(fileContent);
    if (fileContent) {
      fetchWithAuth(
        `http://localhost:5000/get-cards-from-file`,
        bodyContent=fileContent,
      ).then((data) =>
        data.json().then((data) => {
          console.log(data);
        }),
      );
    }
  }, [fileContent]);

  return (
    <>
      <input
        accept=".txt, .md"
        hidden
        type="file"
        ref={inputRef}
        onChange={(e) => readFile(e, setFileContent)}
      />
      <Button onClick={() => inputRef.current.click()}>{text}</Button>
    </>
  );
}
