import { useState } from "react";
import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Transfer() {
  const [startDate, setStartDate] = useState(new Date());
  let baseURL = "http://localhost:3000/dataCategories.json";
  const [data, setData] = useState(null);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setData(response.data);
    });
  }, [baseURL]);

  if (!data) return "error";

  const handleTransferAdd = (event) => {
    alert("add transfer");
  };

  return (
    <>
      <div id="Transfer" key="Transfer" className="is-hidden ">
        <div className="top-margin left-indent card card-body bg-light">
          <div className="transfer-input-wrapper">
            <div className="transfer-item-wrapper">
              <label className="label">
                Date
                <DatePicker
                  className="date-picker"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </label>
            </div>
            <div className="transfer-item-wrapper">
              <label htmlFor="Transfer-Number" className="label">
                Amount
                <input
                  type="number"
                  id="Transfer-Number"
                  key="Transfer-Number"
                  className="form-control"
                  style={{ width: "100px" }}
                />
              </label>
            </div>
            <div className="transfer-item-wrapper">
              <label htmlFor="Transfer-Select" className="label">
                From
                <select
                  id="Transfer-Select"
                  name="Transfer-Select"
                  key="Transfer-Select"
                  style={{ width: "170px" }}
                  className="form-control"
                >
                  <option value="" key="Transfer-Select-Blank"></option>
                  {data.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.category}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <div className="transfer-item-wrapper">
              <label htmlFor="Transfer-Select" className="label">
                To
                <select
                  id="Transfer-Select"
                  name="Transfer-Select"
                  key="Transfer-Select"
                  style={{ width: "170px" }}
                  className="form-control"
                >
                  <option value=""></option>
                  {data.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.category}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <div className="transfer-item-wrapper">
              <button
                type="submit"
                id="Transfer-Submit"
                key="Transfer-Submit"
                className="form-control"
                onClick={handleTransferAdd}
              >
                add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
