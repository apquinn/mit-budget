import { useState, useContext } from "react";
import React from "react";
import axios from "axios";
import HeaderLinks from "./Components/HeaderLinks.js";
import Transfer from "./Components/Transfer.js";
import { ShowProvider, ShowContext } from "./Contexts/budgetContext.js";
import "react-datepicker/dist/react-datepicker.css";

function Header() {
  return (
    <div className="header-wrapper">
      <h1>Budget</h1>
      <HeaderLinks />
    </div>
  );
}

function ManageGroups() {
  let baseURL = "http://localhost:3000/dataManageGroups.json";
  const [data, setData] = useState(null);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setData(response.data);
    });
  }, [baseURL]);

  if (!data) return "error";

  const handleGroupDelete = (event) => {
    alert("delete id:" + event.target.id);
  };

  const handleGroupEdit = (event) => {
    alert("edit id:" + event.target.id);
  };
  const handleManageGroupAdd = (event) => {
    alert("add group");
  };

  return (
    <>
      <div id="ManageGroups" key="ManageGroups" className="is-hidden">
        <div
          key="ManageGroupsWell"
          className="top-margin left-indent card card-body bg-light"
        >
          {data.map((item) => {
            return (
              <>
                <div key={"GroupRow-" + item.id} className="row">
                  <div
                    key={"GroupWrapper-" + item.id}
                    className="manage-groups-item-wrapper"
                  >
                    <button
                      id={"GroupDelete-" + item.id}
                      key={"GroupDelete-" + item.id}
                      className="button-href"
                      onClick={handleGroupDelete}
                    >
                      delete
                    </button>
                    <button
                      id={"GroupEdit-" + item.id}
                      key={"GroupEdit-" + item.id}
                      className="button-href"
                      onClick={handleGroupEdit}
                    >
                      edit
                    </button>
                    &nbsp;&nbsp;
                    {item.name}
                  </div>
                </div>
              </>
            );
          })}
          <div
            key="ManageGroupInputWrapper"
            className="manage-groups-input-wrapper"
          >
            <div className="manage-group-item-wrapper">
              <label
                key="ManageGroup-Label"
                htmlFor="ManageGroup-Submit"
                className="label top-padding"
              >
                New Group
                <input
                  type="text"
                  id="ManageGroups-Input"
                  key="ManageGroups-Input"
                  className="form-control"
                />
              </label>
            </div>
            <div className="manage-group-item-wrapper">
              <button
                type="submit"
                id="ManageGroup-Submit"
                key="ManageGroup-Submit"
                className="form-control"
                onClick={handleManageGroupAdd}
              >
                add
              </button>
            </div>
          </div>
          <div
            id="ManageGroups-Note"
            key="ManageGroups-Note"
            className="manage-groups-note"
          >
            Note: Deleting a group does not delete the envelopes within the
            group.
          </div>
        </div>
      </div>
    </>
  );
}
function AddEnvelope() {
  let baseURL = "http://localhost:3000/dataManageGroups.json";
  const [data, setData] = useState(null);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setData(response.data);
    });
  }, [baseURL]);

  if (!data) return "error";

  const handleAddEnvelopeAdd = (event) => {
    alert("add envelope");
  };

  return (
    <>
      <div id="AddEnvelope" key="AddEnvelope" className="is-hidden ">
        <div className="top-margin left-indent card card-body bg-light">
          <div className="add-envelope-input-wrapper">
            <div className="add-envelope-item-wrapper">
              <label className="label">
                New Envelope
                <input
                  type="text"
                  id="AddEnvelope-Text"
                  key="AddEnvelope-Text"
                  className="form-control"
                />
              </label>
            </div>
            <div className="add-envelope-item-wrapper">
              <label htmlFor="AddEnvelope-Number" className="label">
                Amount
                <input
                  type="number"
                  id="AddEnvelope-Number"
                  key="AddEnvelope-Number"
                  className="form-control"
                />
              </label>
            </div>
            <div className="add-envelope-item-wrapper">
              <label htmlFor="AddEnvelope-Select" className="label">
                Group (optional)
                <select
                  id="AddEnvelope-Select"
                  name="AddEnvelope-Select"
                  key="AddEnvelope-Select"
                  style={{ width: "150px" }}
                  className="form-control"
                >
                  <option value=""></option>
                  {data.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <div className="add-envelope-item-wrapper">
              <button
                type="submit"
                id="AddEnvelope-Submit"
                key="AddEnvelope-Submit"
                className="form-control"
                onClick={handleAddEnvelopeAdd}
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

function ManageWells(toToggle) {
  if (toToggle !== "ManageGroups")
    document.getElementById("ManageGroups").classList.add("is-hidden");

  if (toToggle !== "AddEnvelope")
    document.getElementById("AddEnvelope").classList.add("is-hidden");

  if (toToggle !== "Transfer")
    document.getElementById("Transfer").classList.add("is-hidden");

  let e = document.getElementById(toToggle);
  if (e.classList.contains("is-hidden")) e.classList.remove("is-hidden");
  else e.classList.add("is-hidden");
}

function Subheader() {
  const handleManageGroups = () => {
    ManageWells("ManageGroups");
  };
  const handleAddEnvelope = () => {
    ManageWells("AddEnvelope");
  };
  const handleTransfer = () => {
    ManageWells("Transfer");
  };

  return (
    <div key="Subheader-Wrapper" className="subheader-wrapper">
      <div key="Subheader-Buttons" className="subheader-buttons">
        <button key="Subheader-Groups" onClick={handleManageGroups}>
          manage groups
        </button>
        &nbsp;&nbsp;
        <button key="Subheader-AddEnvelope" onClick={handleAddEnvelope}>
          add envelope
        </button>
        &nbsp;&nbsp;
        <button key="Subheader-Transfer" onClick={handleTransfer}>
          transfer
        </button>
        &nbsp;&nbsp;
      </div>
      <div key="Subheader-SubItems" className="subItems finances-well">
        <ManageGroups />
        <AddEnvelope />
        <Transfer />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer-wrapper">
      <h1>Footer</h1>
    </div>
  );
}

function Items() {
  const { data } = useContext(ShowContext);

  return data.map((item, index) => {
    return (
      <Item
        id={item.id}
        key={item.id}
        title={item.title}
        currentBalance={item.current}
        budgetBalance={item.budget}
        arrayIndex={index}
      />
    );
  });
}

function Controls({ id, handleDeleteClick, handleEditClick, titleField }) {
  return (
    <div id={id + "Title"} key={id + "Title"} className="item-title">
      <button
        key={id + "DeleteLink"}
        className="edit-delete-button"
        onClick={(event) => handleDeleteClick(event)}
      >
        <i className="bi bi-trash"></i> &nbsp;
      </button>
      <button
        key={id + "EditLink"}
        className="edit-delete-button"
        onClick={(event) => handleEditClick(event)}
      >
        <i className="bi bi-pencil-square"></i>
      </button>
      &nbsp;
      {titleField}
    </div>
  );
}

function Bar({ id, width }) {
  return (
    <div className="bar-wrapper">
      <div
        id={id + "BarCurrent"}
        key={id + "BarCurrent"}
        style={{ width: width + "%" }}
        className="item-current"
      ></div>
      <div
        id={id + "BarBudget"}
        key={id + "BarBudget"}
        style={{ width: 100 - width + "%" }}
        className="item-budget"
      ></div>
    </div>
  );
}

function Item({ id, title, currentBalance, budgetBalance, arrayIndex }) {
  const { data, setData } = useContext(ShowContext);

  const [edit, setEdit] = useState(false);
  let titleField = title;
  let budgetBalanceField = budgetBalance;

  let width = (currentBalance / budgetBalance) * 100;
  if (width > 99) width = 100;

  const saveEdit = (event) => {
    let localAccount = data.slice();
    localAccount[arrayIndex].title = document.getElementById(
      `${id}TitleEdit`
    ).value;
    localAccount[arrayIndex].budget = Number(
      document.getElementById(`${id}BudgetEdit`).value
    );
    setData(localAccount);
    setEdit(false);
    event.preventDefault();
  };

  if (edit) {
    titleField = (
      <>
        <div className="item-wrapper">
          <input
            type="text"
            id={id + "TitleEdit"}
            key={id + "TitleEdit"}
            className="title-edit"
            defaultValue={title}
            size="30"
          />
        </div>
        <div className="item-wrapper">
          <input
            type="number"
            className="budget-edit"
            id={id + "BudgetEdit"}
            key={id + "BudgetEdit"}
            defaultValue={budgetBalance}
            style={{ width: "85px" }}
          />
        </div>
        <div className="item-wrapper">
          <button
            type="submit"
            className="title-button"
            id={id + "TitleSave"}
            key={id + "TitleSave"}
            onClick={(event) => saveEdit(event)}
          >
            save
          </button>
        </div>
      </>
    );
  } else {
    titleField = title;
    budgetBalanceField = currentBalance + " of " + budgetBalance;
  }

  const handleEditClick = (event) => {
    if (edit) setEdit(false);
    else setEdit(true);
    event.preventDefault();
  };

  const handleDeleteClick = (event) => {
    let localAccount = data.slice();
    localAccount.splice(arrayIndex, 1);
    setData(localAccount);
    event.preventDefault();
  };
  return (
    <>
      <div
        id={id + "WrapperDiv"}
        key={id + "WrapperDiv"}
        className="title-wrapper"
      >
        <Controls
          id={id}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
          titleField={titleField}
        />

        <div id={id + "Balance"} key={id + "Balance"} className="item-balance">
          {budgetBalanceField}
        </div>
      </div>
      <Bar id={id} width={width} />
    </>
  );
}

function BudgetSection() {
  return (
    <div>
      <Header />
      <Subheader />
      <Items />
      <Footer />
    </div>
  );
}

export default function Budget() {
  let baseURL = "http://localhost:3000/data.json";
  const [data, setData] = useState(null);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setData(response.data);
    });
  }, [baseURL]);

  if (!data) return "error";

  return (
    <ShowProvider data={data} setData={setData}>
      <BudgetSection />;
    </ShowProvider>
  );
}
