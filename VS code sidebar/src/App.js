// The main concept is recursion

import "./styles.css";
import json from "./data.json";
import { useState } from "react";
// Nested file or folder structure
// Expand and collapse
// Add or remove

const List = ({ data, handleNew, handleDelete }) => {
  const [expanded, setExpanded] = useState({});

  return (
    <div className="main-container">
      {data?.map((item) => {
        return (
          <div key={item?.id} className="container">
            {item?.isFolder && (
              <span
                onClick={() =>
                  setExpanded((prev) => ({
                    ...prev,
                    [item.name]: !prev[item.name],
                  }))
                }
              >
                {expanded[item.name] ? "- " : "+ "}
              </span>
            )}
            <span>{item?.name}</span>
            {item?.isFolder && (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfMt43f5llkF5OgPwtIozkZk38jQu2r-3XCg&s"
                alt="icon"
                onClick={() => handleNew(item.id)}
              />
            )}
            <img
              src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
              alt="delete icon"
              onClick={() => handleDelete(item.id)}
            />
            <div>
              {expanded[item?.name] && (
                <List
                  data={item?.children}
                  handleNew={handleNew}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function App() {
  const [data, setData] = useState(json);

  const handleNew = (parentId) => {
    const name = prompt("name");
    const updateTree = (list) => {
      return list.map((node) => {
        if (node?.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              { id: Date.now(), name, isFolder: true, children: [] },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };
    setData((prev) => updateTree(prev));
  };

  const handleDelete = (itemId) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id !== itemId)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }

          return node;
        });
    };
    setData((prev) => updateTree(prev));
  };

  return (
    <div className="App">
      <h1>VS Code sidebar</h1>
      <List data={data} handleNew={handleNew} handleDelete={handleDelete} />
    </div>
  );
}
