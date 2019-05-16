import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Export2Doc, getArrayBuffer, uncompressFile } from "./helper";

import "./styles.css";

class App extends Component {
  saveContent = async () => {
    const allContent = document.createElement("div");

    const leadingContent = document.createElement("p");
    let textContent = document.getElementById("my-content").value;
    leadingContent.innerText = textContent;

    const footerImage = document.createElement("img");
    let imgFromApi = await getArrayBuffer();
    let uc = await uncompressFile({ body: { data: imgFromApi.someImage } });

    let slob = new Blob([uc.uncompressed], { type: "image/png" });
    var reader = new FileReader();
    await reader.readAsDataURL(slob);
    reader.onloadend = function() {
      let base64data = reader.result;
      console.log(base64data);
      footerImage.src = base64data;
    };

    allContent.appendChild(leadingContent);
    allContent.appendChild(footerImage);

    Export2Doc(allContent, "file.doc");
  };
  render() {
    return (
      <div className="App">
        <textarea id="my-content" />
        <button onClick={this.saveContent}>Submit</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
