import React from "react";

export const useAddComponentStates = () => {
  // states for add component
  // title, code, tags, description, author, date, framweork, category, deoendencies,self_render,
  // states
  const [title, setTitle] = React.useState("");
  const [code, setCode] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagtext, setTagText] = React.useState<string>("");
  const [description, setDescription] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [date, setDate] = React.useState("");
  const [framework, setFramework] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [dependencies, setDependencies] = React.useState("");
  const [self_render, setSelfRender] = React.useState(false);

  const [sellerPackage, setSellerPackage] = React.useState("");

  return {
    title,
    tagtext,
    setTagText,
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

    sellerPackage,
    setSellerPackage,
  };
};
