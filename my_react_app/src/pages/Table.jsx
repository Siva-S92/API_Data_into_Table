import React, { useEffect, useState } from "react";
import Title from "../components/Title";

function Table() {
  const [contents, setContents] = useState([]);
  const [filterNo, setFilterNo] = useState(null);

  useEffect(() => {
    fetchApi();
  }, [filterNo]);

  const fetchApi = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "GET",
        }
      );
      const data = await response.json();

      if (filterNo != null && filterNo != "") {
        let filtered_data = data.filter((item) => item.id == filterNo);
        setContents(filtered_data);
      } else {
        setContents(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="px-[150px]">
        <Title />

        <label htmlFor="number">
          Enter the ID number to get the specific information:
        </label>
        <br />
        <input
          type="text"
          id="number"
          name="number"
          placeholder="Enter the ID number"
          className="w-1/4 mb-5 border border-black"
          onChange={(e) => setFilterNo(e.target.value)}
          onClick={focus}
        />

        <table id="table1">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {contents.map((val, index) => (
              <tr key={index}>
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
