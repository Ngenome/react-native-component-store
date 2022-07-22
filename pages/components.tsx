import Link from "next/link";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import data from "../data";

const Tabs: React.FC<{ tabs: Array<string> }> = ({ tabs }) => {
  return (
    <div className="flex flex-row justify-center items-center">
      {tabs.map((e, i) => {
        return (
          <div
            key={i}
            className="tab w-fit  bg-blue-600 hover:bg-blue-700 rounded-full justify-centerflex flex-row items-center py-1 px-2 mr-2"
          >
            <span className="text-sm text-white">{e}</span>
          </div>
        );
      })}
    </div>
  );
};
const CodeView = ({ id, title, code }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [copied, setCopied] = useState(false);
  return (
    <div
      key={id}
      className="flex flex-col w-[25vw] h-[25vh] rounded-lg shadow-lg bg-gray-100 p-2"
    >
      {/* copy to clipboard here */}
      <h3 className="text-blue-400 text-2xl">{title}</h3>
      <div className="relative">
        <div className="flex flex-row items-center">
          <span
            className="bg-blue-500 hover:bg-blue-700 rounded-xl px-3 py-1 text-white"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            {collapsed ? "view code" : "hide"}
          </span>
          <span className="ml-2 text-sm text-blue-700" onClick={() => {}}>
            {copied ? "copy to clipboard" : "copied"}
          </span>
        </div>
        {!collapsed && (
          <div className="absolute  ">
            <SyntaxHighlighter
              language="js"
              className="max-h-[70vh] overflow-hidden "
              style={darcula}
              customStyle={{
                width: "50vw",
                fontSize: 10,
              }}
            >
              {/* pass in code here */}

              {code}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
};
const ComponentsPage = () => {
  return (
    <div>
      <nav className="container p-6 mx-auto lg:flex lg:justify-between lg:items-center">
        <div className="flex items-center justify-between">
          <div>
            <a
              className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
              href="#"
            >
              RnComponents
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col mt-4 space-y-2 lg:-mx-6 lg:mt-0 lg:flex-row lg:space-y-0">
          <Link href="/">
            <a className="text-gray-700 dark:text-gray-200 lg:px-6 dark:hover:text-blue-400 hover:text-blue-500">
              Home
            </a>
          </Link>
          <Link href="/components">
            <a className="text-gray-700 dark:text-gray-200 lg:px-6 dark:hover:text-blue-400 hover:text-blue-500">
              Components
            </a>
          </Link>

          <Link href="/#contact">
            <a className="text-gray-700 dark:text-gray-200 lg:px-6 dark:hover:text-blue-400 hover:text-blue-500">
              Contact
            </a>
          </Link>
          {/* <a
                className="text-gray-700 dark:text-gray-200 lg:px-6 dark:hover:text-blue-400 hover:text-blue-500"
                href="#"
              >
                FAQ
              </a> */}
        </div>
        <Link href="/#contact">
          <a className="block h-10 px-5 py-2 mt-4 text-sm text-center text-gray-700 capitalize transition-colors duration-200 transform border rounded-md dark:hover:bg-gray-700 dark:text-white lg:mt-0 hover:bg-gray-100 lg:w-auto">
            Contact Us
          </a>
        </Link>
      </nav>
      <Tabs tabs={["components", "text", "sections", "screens", "animated"]} />

      {/* <div className="flex items-center justify-center h-screen">
        <div className="relative inline-block">
          <button className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none">
            <svg
              className="w-5 h-5 text-gray-800 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800">
            <a
              href="#"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {" "}
              your profile{" "}
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {" "}
              Your projects{" "}
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {" "}
              Help{" "}
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {" "}
              Settings{" "}
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {" "}
              Sign Out{" "}
            </a>
          </div>
        </div>
      </div> */}
      <div className="ml-20">
        {data.map((e, i) => {
          return (
            <CodeView key={e.id} code={e.code} title={e.title} id={e.id} />
          );
        })}
        {/* code syntax highlighter window here */}
      </div>
    </div>
  );
};
export default ComponentsPage;
