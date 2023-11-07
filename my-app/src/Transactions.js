import { useState } from "react";
import React from "react";
import axios from "axios";
import HeaderLinks from "./Components/HeaderLinks.js";
import Transfer from "./Components/Transfer.js";
import "react-datepicker/dist/react-datepicker.css";

function Header() {
  return (
    <div className="header-wrapper">
      <h1>Transactions</h1>
      <HeaderLinks />
    </div>
  );
}

function Import() {
  const handleImport = (event) => {
    alert("add import");
    event.preventDefault();
  };

  return (
    <>
      <div id="Import" key="Import" className="is-hidden ">
        <div className="top-margin left-indent card card-body bg-light">
          <div className="Import-input-wrapper">
            <form action="/action_page.php">
              <div className="import-item-wrapper">
                <label htmlFor="Import-Chase" className="label">
                  Amazon Chase
                  <input
                    type="file"
                    id="Import-File-Chase"
                    key="Import-File-Chase"
                    className="input-for-upload"
                    name="Import-File-Chase"
                  />
                </label>
              </div>
              <div className="import-item-wrapper">
                <label htmlFor="Import-Incredible" className="label">
                  Incredible Bank
                  <input
                    type="file"
                    id="Import-File-Incredible"
                    key="Import-File-Incredible"
                    className="input-for-upload"
                    name="Import-File-Incredible"
                  />
                </label>
              </div>
              <div className="import-item-wrapper">
                <button
                  type="submit"
                  id="Import-Submit"
                  key="Import-Submit"
                  className="form-control"
                  style={{ width: "100px" }}
                  onClick={handleImport}
                >
                  upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function Filters({ dataCat, data, setData, origData }) {
  const handleSelectChange = () => {
    let localData = [];
    let value = document.getElementById("Filters-Select").value;
    if (value !== "") {
      localData = origData.filter(
        (item) =>
          item.category === value &&
          item.description
            .toLowerCase()
            .includes(
              document.getElementById("Filters-Text").value.toLowerCase()
            )
      );
    } else {
      localData = origData.filter((item) =>
        item.description
          .toLowerCase()
          .includes(document.getElementById("Filters-Text").value.toLowerCase())
      );
    }
    setData(localData);
  };

  return (
    <>
      <div id="Filters" key="Filters" className="is-hidden ">
        <div className="top-margin left-indent card card-body bg-light">
          <div className="Filters-input-wrapper">
            <div className="filters-item-wrapper">
              <label htmlFor="Filters-Text" className="label">
                Keyword
                <input
                  type="text"
                  id="Filters-Text"
                  key="Filters-Text"
                  className="form-control"
                  onChange={handleSelectChange}
                />
              </label>
            </div>
            <div className="filters-item-wrapper">
              <label htmlFor="Filters-Select" className="label">
                Category
                <select
                  id="Filters-Select"
                  name="Filters-Select"
                  key="Filters-Select"
                  style={{ width: "150px" }}
                  className="form-control"
                  onChange={handleSelectChange}
                >
                  <option value=""></option>
                  {dataCat.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.category}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ManageWells(toToggle) {
  if (toToggle !== "Import")
    document.getElementById("Import").classList.add("is-hidden");

  if (toToggle !== "Filters")
    document.getElementById("Filters").classList.add("is-hidden");

  if (toToggle !== "Transfer")
    document.getElementById("Transfer").classList.add("is-hidden");

  let e = document.getElementById(toToggle);
  if (e.classList.contains("is-hidden")) e.classList.remove("is-hidden");
  else e.classList.add("is-hidden");
}

function Subheader({ dataCat, data, setData, origData }) {
  const handleImport = () => {
    ManageWells("Import");
  };
  const handleUncat = () => {
    setData(origData);
    if (
      document.getElementById("Subheader-Uncatagorized").innerHTML ===
      "uncategorized"
    ) {
      document.getElementById("Subheader-Uncatagorized").innerHTML = "show all";
      let localData = data.filter((item) => item.category === "");
      setData(localData);
    } else {
      document.getElementById("Subheader-Uncatagorized").innerHTML =
        "uncategorized";
    }
  };
  const handleFilters = () => {
    setData(origData);
    if (document.getElementById("Subheader-Filters").innerHTML === "filters") {
      document.getElementById("Subheader-Filters").innerHTML = "show all";
    } else {
      document.getElementById("Subheader-Filters").innerHTML = "filters";
      document.getElementById("Filters-Select").selectedIndex = 0;
      document.getElementById("Filters-Text").value = "";
    }

    ManageWells("Filters");
  };
  const handleTransfer = () => {
    ManageWells("Transfer");
  };

  return (
    <div key="Subheader-Wrapper" className="subheader-wrapper">
      <div key="Subheader-Buttons" className="subheader-buttons">
        <button key="Subheader-Groups" onClick={handleImport}>
          import
        </button>
        &nbsp;&nbsp;
        <button
          id="Subheader-Uncatagorized"
          key="Subheader-Uncatagorized"
          onClick={handleUncat}
        >
          uncategorized
        </button>
        &nbsp;&nbsp;
        <button
          id="Subheader-Filters"
          key="Subheader-Filters"
          onClick={handleFilters}
        >
          filters
        </button>
        &nbsp;&nbsp;
        <button key="Subheader-Transfer" onClick={handleTransfer}>
          transfer
        </button>
        &nbsp;&nbsp;
      </div>
      <div key="Subheader-SubItems" className="subItems">
        <Transfer />
        <Import />
        <Filters
          dataCat={dataCat}
          data={data}
          setData={setData}
          origData={origData}
        />
      </div>
    </div>
  );
}

function Category({ category, id, dataCat }) {
  const handleCatChange = (event) => {
    alert("Cat change for " + event.target.id);
  };
  return (
    <>
      <div key={"Category-Wrapper-" + id} className="col-md-2 category-wrapper">
        <select
          id={"Category-Select-" + id}
          name={"Category-Select-" + id}
          key={"Category-Select-" + id}
          style={{ width: "150px" }}
          className="form-control"
          onChange={handleCatChange}
          defaultValue={category}
        >
          <option key={"empty" + id} value=""></option>
          {dataCat.map((item) => {
            return (
              <option value={item.id} key={item.id}>
                {item.category}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}

function IndividualTransactions({ dataCat, data }) {
  const handleDuplicate = (id) => {
    alert("Mark duplicate: " + id);
  };
  return (
    <>
      <div key="Container" className="container">
        {data.map((item) => {
          return (
            <>
              <div
                key={"IndividualTransactionWrapper" + item.id}
                className="row individual-transaction-wrapper"
              >
                <div key={"ItDate" + item.id} className="col-md-1 it-date">
                  {item.date}
                </div>
                <div
                  key={"ItDescription" + item.id}
                  className="col-md-4 it-description"
                >
                  {item.description}
                </div>
                <div key={"ItAmount" + item.id} className="col-md-1 it-amount">
                  {item.amount}
                </div>
                <Category
                  category={item.category}
                  id={item.id}
                  dataCat={dataCat}
                />
                {item.isDuplicate === true ? (
                  <button
                    onClick={() => handleDuplicate(item.id)}
                    key={"ItDup" + item.id}
                    className="col-md-2 it-dup"
                  >
                    mark as duplicate
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          );
        })}
      </div>{" "}
    </>
  );
}

export default function Transactions() {
  const [baseURLCat] = useState("http://localhost:3000/dataCategories.json");
  const [baseURL] = useState("http://localhost:3000/dataTransactions.json");
  const [dataCat, setDataCat] = useState(null);
  const [data, setData] = useState(null);
  const [origData, setOrigData] = useState(null);
  React.useEffect(() => {
    axios.get(baseURLCat).then((response) => {
      setDataCat(response.data);
    });
    axios.get(baseURL).then((response) => {
      setData(response.data);
      setOrigData(response.data.slice());
    });
  }, [baseURL, baseURLCat]);

  if (!dataCat) return "Transactions cat error";
  if (!data) return "Transactions data error";

  return (
    <>
      <Header />
      <Subheader
        dataCat={dataCat}
        data={data}
        setData={setData}
        origData={origData}
      />
      <IndividualTransactions dataCat={dataCat} data={data} />
    </>
  );
}
