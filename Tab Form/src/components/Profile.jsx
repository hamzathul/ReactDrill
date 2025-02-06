export default Profile = ({ data, setData }) => {
  return (
    <div>
      <div className="form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            onChange={(e) => setData({ ...data, age: e.target.value })}
          />
        </div>
        <div>
          <label>email:</label>
          <input
            type="email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
