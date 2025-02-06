export default Interests = ({ data, setData }) => {
  const handleChange = (e, name) => {
    setData((prevData) => {
      const newInterest = e.target.checked
        ? [...prevData.interests, name]
        : prevData.interests.filter((data) => data !== name);
      return { ...prevData, interests: newInterest };
    });
  };
  return (
    <div>
      <div>
        <label>running</label>
        <input
          type="checkbox"
          checked={data.interests.includes("running")}
          onChange={(e) => handleChange(e, "running")}
        />
      </div>
      <div>
        <label>sleeping</label>
        <input
          type="checkbox"
          checked={data.interests.includes("sleeping")}
          onChange={(e) => handleChange(e, "sleeping")}
        />
      </div>
      <div>
        <label>singing</label>
        <input
          type="checkbox"
          checked={data.interests.includes("singing")}
          onChange={(e) => handleChange(e, "singing")}
        />
      </div>
    </div>
  );
};
