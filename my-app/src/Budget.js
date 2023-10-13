import { useState } from "react";
import React from "react";
import axios from "axios";

function Header() {
  return (
    <div className="header-wrapper">
      <h1>Budget</h1>
      <div className="header-links">
        <a href="./UploadBalances">Upload balances</a>&nbsp;&nbsp;
        <a href="./reports">Reports</a>
      </div>{" "}
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

function Items({ originalData }) {
  const [data, setData] = useState(originalData);

  return data.map((item, index) => {
    return (
      <Item
        id={item.id}
        title={item.title}
        currentBalance={item.current}
        budgetBalance={item.budget}
        arrayIndex={index}
        setData={setData}
        data={data}
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

function Item({
  id,
  title,
  currentBalance,
  budgetBalance,
  arrayIndex,
  setData,
  data,
}) {
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
        <input
          type="text"
          id={id + "TitleEdit"}
          key={id + "TitleEdit"}
          defaultValue={title}
          size="30"
        />
        <button
          type="submit"
          id={id + "TitleSave"}
          key={id + "TitleSave"}
          onClick={(event) => saveEdit(event)}
        >
          save
        </button>
      </>
    );
    budgetBalanceField = (
      <input
        type="number"
        id={id + "BudgetEdit"}
        key={id + "BudgetEdit"}
        defaultValue={budgetBalance}
        style={{ width: "70px" }}
      />
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
    console.log(localAccount);
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

function BudgetSection({ originalData }) {
  return (
    <div>
      <Header />
      <Items originalData={originalData} />
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

  return <BudgetSection originalData={data} />;
}
