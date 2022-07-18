import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import data from "../data";

const CodeView = ({ id, title, code }) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div
      key={id}
      className="h-[30vh] w-[30vw] bg-red-200  flex flex-col justify-center items-center"
    >
      {/* copy to clipboard here */}
      <h3>{title}</h3>
      <span
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        {collapsed ? "view code" : "hide"}
      </span>
      {!collapsed && (
        <SyntaxHighlighter
          language="js"
          className="h-20 overflow-hidden"
          style={darcula}
          customStyle={{
            width: "50vw",
            fontSize: 10,
          }}
        >
          {/* pass in code here */}

          {code}
        </SyntaxHighlighter>
      )}
    </div>
  );
};
const ComponentsPage = () => {
  return (
    <div>
      <h1> React Native Components</h1>

      {data.map((e, i) => {
        return <CodeView code={e.code} title={e.title} id={e.id} />;
      })}
      {/* code syntax highlighter window here */}
    </div>
  );
};
export default ComponentsPage;
