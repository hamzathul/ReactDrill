import { useState } from "react";
import Tabs from "./components/Tabs";
import "./styles.css";

export default function App() {
  const [data, setData] = useState({
    name: "",
    age: 0,
    email: "",
    interests: ["running", "sleeping"],
  });

  const handleSubmit = () => {
    if (data.name.length < 2 || !data.name) {
      console.error("not a valid name");
    }
    if (data.age < 18 || !data.age) {
      console.error("not a valid age");
    }
    if (data.email.length < 3 || !data.email) {
      console.error("not a valid email");
    }
    console.log(data);
  };
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <div className="App">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {activeTab === "profile" && <Profile data={data} setData={setData} />}
        {activeTab === "interests" && (
          <Interests data={data} setData={setData} />
        )}
        {activeTab === "settings" && <Settings onSubmit={handleSubmit} />}
      </div>
    </div>
  );
}
