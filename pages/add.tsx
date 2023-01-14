import React from "react";
import { useAddComponentStates } from "../hooks/useAddComponent";
import { firebase } from "../config";
function EnsureFieldsAreValid(fields: Array<[string, string]>, setErrors: any) {
  // check if fields[0] is empty and return false if it is and set error message to fields[1]
  for (let i = 0; i < fields.length; i++) {
    if (fields[i][0] === "") {
      setErrors(fields[i][1]);
      return false;
    }
  }
  return true;
}
function AddComponent() {
  const {
    title,
    setTitle,
    code,
    setCode,
    tags,
    setTags,
    description,
    setDescription,
    author,
    setAuthor,
    date,
    setDate,
    framework,
    setFramework,
    category,
    setCategory,
    dependencies,
    setDependencies,
    self_render,
    setSelfRender,
    states,
    tagtext,
    setTagText,
    sellerPackage,
    setSellerPackage,
  } = useAddComponentStates();
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [error, setError] = React.useState<string>("");

  function AddComponentToFirestore() {
    // add component to firestore
    setStatus("loading");
    // check if fields are valid
    if (
      !EnsureFieldsAreValid(
        [
          [title, "Title is required"],
          [code, "Code is required"],
          [description, "Description is required"],
          [author, "Author is required"],
          [date, "Date is required"],
          [framework, "Framework is required"],
          [category, "Category is required"],
          [dependencies, "Dependencies is required"],

          [sellerPackage, "Package is required"],
        ],
        (error) => {
          setError(error);
          setStatus("error");
        }
      )
    ) {
      return;
    }

    firebase
      .firestore()
      .collection("snippets")
      .add({
        title: title,
        code: code,
        tags: tags,
        description: description,
        framework,
        category,
        dependencies,
        self_render,
        author,
        date,
        package: sellerPackage,
      })
      .then((docRef) => {
        setStatus("success");
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        setStatus("error");
        console.error("Error adding document: ", error);
      });
  }
  return (
    // tailwind form to add component to database

    <div className="flex flex-col items-center ">
      <h1 className="text-3xl text-blue-500">Add Component</h1>
      <div className="fixed top-5 left-3 bg-white shadow-xl rounded-md w-[20vw]">
        {/* loader */}

        {status === "loading" && (
          <div className="flex flex-col items-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-4"></div>
            <h1 className="text-2xl text-blue-500">Loading...</h1>
          </div>
        )}
        {/* success */}
        {status === "success" && (
          <div className="flex flex-col items-center">
            <h1 className="text-2xl text-green-500">Success!</h1>
            <button
              className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-2 px-4 rounded my-4"
              onClick={() => {
                setStatus("idle");
              }}
            >
              Add Another
            </button>
          </div>
        )}
        {/* error */}
        {status === "error" && (
          <div className="flex flex-col items-center">
            <h1 className="text-2xl text-red-500">Error!</h1>
            <p className="bg-gray-200 p-2 rounded-lg">{error}</p>
            <button
              className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-2 px-4 rounded my-4"
              onClick={() => {
                AddComponentToFirestore();
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      <form className="flex flex-col w-1/3">
        <label className="font-bold my-2">Title</label>
        <input
          className="border-2 border-gray-200  focus:border-gray-400 outline-none shadow-sm bg-gray-50  rounded-lg"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="font-bold my-2">Code</label>
        <textarea
          className="border-2 min-h-24 border-gray-200  focus:border-gray-400 outline-none shadow-sm bg-gray-50  rounded-lg"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>

        <div className="flex flex-col">
          <label className="font-bold my-2">Tags</label>
          <div className="flex flex-row items-center flex-wrap space-x-2">
            {tags.map((tag) => (
              <div className="flex flex-row items-center space-x-2">
                <div className="px-2 py-1 bg-gray-200 rounded-lg">
                  {tag}
                  <button
                    onClick={(e) => {
                      setTags(tags.filter((t) => t !== tag));
                    }}
                    className=" hover:bg-red-700 text-gray-400 font-bold py-0.5 px-1.5 rounded"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>

          <input
            className="border-2 my-4 w-32 border-gray-200  focus:border-gray-400 outline-none shadow-sm bg-gray-50  rounded-lg"
            placeholder="tag name"
            type="text"
            onSubmit={(e) => {
              e.preventDefault();
              setTags([...tags, tagtext]);
            }}
            value={tagtext}
            onChange={(e) => {
              setTagText(e.target.value);
            }}
          />
          <button
            className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-2 px-4 rounded my-4"
            // add tag to state
            onClick={(e) => {
              e.preventDefault();
              setTags([...tags, tagtext]);
              setTagText("");
            }}
          >
            Add Tag
          </button>
        </div>

        <label className="font-bold my-2">Description</label>
        <textarea
          className="border-2 border-gray-200  focus:border-gray-400 outline-none shadow-sm bg-gray-50  rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="font-bold my-2">Author</label>
        <input
          className="border-2 border-gray-200  focus:border-gray-400 outline-none shadow-sm bg-gray-50  rounded-lg"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label className="font-bold my-2">Date</label>
        <input
          className="border-2 border-gray-200  focus:border-gray-400 outline-none shadow-sm bg-gray-50  rounded-lg"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label className="font-bold my-2">Framework</label>
        <select
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
          className="border-2 border-gray-200  focus:border-gray-400 outline-none shadow-sm bg-gray-50  rounded-lg"
        >
          <option value="react">React</option>
          <option value="angular">Angular</option>
          <option value="vue">Vue</option>
          <option value="other">Other</option>
        </select>
        <label className="font-bold my-2">Package</label>
        <select
          value={sellerPackage}
          onChange={(e) => setSellerPackage(e.target.value)}
          className="border-2 border-gray-200  focus:border-gray-400 outline-none shadow-sm bg-gray-50  rounded-lg"
        >
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select>
        <label className="font-bold my-2">Category</label>
        <input
          className="border-2 border-gray-200  focus:border-gray-400 outline-none shadow-sm bg-gray-50  rounded-lg"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="navigation, forms, etc."
        />
        <label className="font-bold my-2">Dependencies</label>
        <input
          className="border-2 border-gray-200  focus:border-gray-400 outline-none shadow-sm bg-gray-50  rounded-lg"
          type="text"
          value={dependencies}
          onChange={(e) => setDependencies(e.target.value)}
          placeholder="react-router-dom, etc."
        />
        <div className="flex flex-row items-center space-x-2">
          <label className="font-bold my-2">Self Render</label>
          {/* checkbox */}
          <input
            className="border-2 border-gray-200 h-6 w-6  focus:border-gray-400 outline-none shadow-sm bg-gray-50  rounded-lg"
            type="checkbox"
            value={self_render ? "checked" : ""}
            onChange={(e) => {
              setSelfRender(!self_render);
            }}
          />
        </div>
        {/* fancy submit button with orange gradient to add component to firestore */}

        <button
          className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-2 px-4 rounded my-4"
          onClick={(e) => {
            e.preventDefault();
            // add component to firestore
            AddComponentToFirestore();
          }}
        >
          Add Component
        </button>
      </form>
    </div>
  );

  // function to add component to database
  // fields: title, code, tags, description, author, date, framweork, category, deoendencies,self_render,
  // states
}

export default AddComponent;
