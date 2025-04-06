import { useState } from "react";
import "./styles.css";

const checkboxesData = [
  {
    id: 1,
    name: "Fruits",
    children: [
      {
        id: 2,
        name: "Apple",
        children: [
          {
            id: 3,
            name: "Banana",
            children: [],
          },
          {
            id: 4,
            name: "Jackfruit",
            children: [],
          },
        ],
      },
      {
        id: 5,
        name: "Lemon",
        children: [
          {
            id: 6,
            name: "Strawberry",
            children: [],
          },
          {
            id: 7,
            name: "blueberry",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Tropical",
    children: [],
  },
  {
    id: 9,
    name: "K Fruit",
    children: [],
  },
];

const Checkboxes = ({ data, checked, setChecked }) => {
  const handleChange = (isChecked, node) => {
    setChecked((prev) => {
      let newState = { ...prev };

      newState[node.id] = isChecked;

      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked;
          updateChildren(child);
        });
      };
      updateChildren(node);

      const verifyParentNodes = (tree) => {
        for (const node of tree) {
          if (node.children && node.children.length > 0) {
            verifyParentNodes(node.children);

            const allChildrenChecked = node.children.every(
              (child) => newState[child.id]
            );

            newState[node.id] = allChildrenChecked;
          }
        }
      };

      verifyParentNodes(checkboxesData);

      return newState;
    });
  };

  return (
    <div>
      {data.map((node) => (
        <div key={node.id} className="parent">
          <input
            type="checkbox"
            checked={checked[node.id]}
            onChange={(e) => handleChange(e.target.checked, node)}
          />
          <span>{node.name}</span>
          {node?.children && (
            <Checkboxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [checked, setChecked] = useState({});
  return (
    <div className="App">
      <h1>Nested Checkboxes</h1>
      <Checkboxes
        data={checkboxesData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
}
