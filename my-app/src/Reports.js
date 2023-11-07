import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import HeaderLinks from "./Components/HeaderLinks.js";

function Header() {
  return (
    <div className="header-wrapper">
      <h1>Reports</h1>
      <HeaderLinks />
    </div>
  );
}

function DateRangeDropDownCat({ data, setDateCat }) {
  const onChangeHandler = (event) => {
    let e = document.getElementById(event.target.id);
    setDateCat(e.options[e.selectedIndex].text);
    alert("Cat change: " + e.options[e.selectedIndex].text);
  };

  const [searchParams] = useSearchParams();

  const loadOptions = () => {
    let result = data.map((item) => {
      if (
        searchParams.get("dateCat") !== null &&
        item.category === searchParams.get("dateCat")
      ) {
        setDateCat(item.category);
        return (
          <option value={item.id} selected>
            {item.category}
          </option>
        );
      } else {
        return <option value={item.id}>{item.category}</option>;
      }
    });
    return result;
  };

  return (
    <div className="date-item-wrapper">
      <label
        key="DateSelectCat-Label"
        htmlFor="DateSelectCat"
        className="label top-padding"
      >
        Select Group
        <select
          id="DateSelectCat"
          name="DateSelectCat"
          key="DateSelectCat"
          className="form-control"
          onChange={onChangeHandler}
        >
          {loadOptions()}
        </select>
      </label>
    </div>
  );
}

function DateRangeDropDownDates({ dataReport, setDateFrom, setDateTo }) {
  const onChangeHandlerDate = (event) => {
    let e = document.getElementById(event.target.id);
    if (event.target.id === "dateSelectFrom")
      setDateFrom(e.options[e.selectedIndex].text);
    else setDateTo(e.options[e.selectedIndex].text);
    alert("Date change: " + e.options[e.selectedIndex].text);
  };

  return (
    <>
      <DateRangeDropDownItem
        data={dataReport}
        id="dateSelectFrom"
        setDate={setDateFrom}
        onChangeHandler={onChangeHandlerDate}
      />
      <DateRangeDropDownItem
        data={dataReport}
        id="dateSelectTo"
        setDate={setDateTo}
        onChangeHandler={onChangeHandlerDate}
      />
    </>
  );
}

function BarGraphMonthsBar({ className, amount, highest }) {
  return (
    <div
      className={className}
      style={{ height: (amount / highest) * 300 + "px" }}
    >
      {amount}
    </div>
  );
}

function BarGraphMonths({ data, highest, dateFrom, dateTo }) {
  let itemDate = "";
  let textFrom = Date.parse(dateFrom);
  let textTo = Date.parse(dateTo);

  return data.map((item, index) => {
    itemDate = Date.parse(item.date);
    if (itemDate >= textFrom && itemDate <= textTo) {
      return (
        <div className="wrapper-individual">
          <BarGraphMonthsBar
            className="actual"
            amount={item.current}
            highest={highest}
          />

          <BarGraphMonthsBar
            className="budget"
            amount={item.budget}
            highest={highest}
          />
          <div className="date-month">
            {format(Date.parse(item.date), "M/yyyy")}
          </div>
        </div>
      );
    } else return <></>;
  });
}

function IndividualBarGraphTotal({ amount, highestTotal, className }) {
  return (
    <>
      <div
        className={className}
        style={{ width: (amount / highestTotal) * 500 + "px" }}
      >
        {amount}
      </div>
    </>
  );
}

function BarGraphTotal({
  highestTotal,
  totalCurrent,
  totalBudget,
  categoryName,
}) {
  return (
    <>
      <div className="overall-balance">
        <span className="boldfont">{categoryName}</span> - overall balance since
        category inception: ${totalBudget - totalCurrent}
      </div>
      <div className="wrapper-total">
        <IndividualBarGraphTotal
          amount={totalCurrent}
          highestTotal={highestTotal}
          className="actual-total"
          total={totalCurrent}
        />

        <IndividualBarGraphTotal
          amount={totalBudget}
          highestTotal={highestTotal}
          className="budget-total"
          total={totalBudget}
        />
      </div>
    </>
  );
}

function DateRangeDropDownItem({ data, id, setDate, onChangeHandler }) {
  let currentDateMonth = "";
  let currentDateYear = "";
  let dateToFind = "";
  let label = "From";

  if (id === "dateSelectFrom") {
    currentDateMonth = format(new Date(), "M");
    currentDateYear = String(Number(format(new Date(), "yyyy")) - 1);
    dateToFind = currentDateMonth + "/1/" + currentDateYear;
  } else {
    currentDateMonth = format(new Date(), "M");
    currentDateYear = format(new Date(), "yyyy");
    dateToFind = currentDateMonth + "/1/" + currentDateYear;
    label = "To";
  }
  setDate(dateToFind);

  const loadOptions = () => {
    let result = data.map((item) => {
      if (item.date === dateToFind)
        return (
          <option value={item.date} selected>
            {item.date}
          </option>
        );
      else return <option value={item.date}>{item.date}</option>;
    });
    return result;
  };

  return (
    <div className="date-item-wrapper">
      <label key={id + "-Label"} htmlFor={id} className="label top-padding">
        {label}
        <select
          id={id}
          name={id}
          key={id}
          className="form-control"
          onChange={onChangeHandler}
        >
          {loadOptions()}
        </select>
      </label>
    </div>
  );
}

function BarGraph({ data, dateCat, dateFrom, dateTo }) {
  let highest = 0;
  let highestTotal = 0;
  let totalCurrent = 0;
  let totalBudget = 0;

  let textFrom = Date.parse(dateFrom);
  let textTo = Date.parse(dateTo);

  data.map((item) => {
    if (Date.parse(item.date) >= textFrom && Date.parse(item.date) <= textTo) {
      if (item.budget > highest) highest = item.budget;
      if (item.current > highest) highest = item.current;
    }
    totalCurrent += item.current;
    totalBudget += item.budget;
    return <></>;
  });

  highestTotal = totalCurrent > totalBudget ? totalCurrent : totalBudget;

  return (
    <>
      <BarGraphMonths
        data={data}
        highest={highest}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
      <BarGraphTotal
        highestTotal={highestTotal}
        totalCurrent={totalCurrent}
        totalBudget={totalBudget}
        categoryName={dateCat}
      />
    </>
  );
}

export default function Reports() {
  const [data, setData] = useState(null);
  const [dataCat, setDataCat] = useState();

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [dateCat, setDateCat] = useState("");

  let baseURLReport = `http://localhost:3000/dataReport.json?dateCat="${dateCat}&dateFrom="${dateFrom}&dateTo="${dateTo}`;

  let baseURLCat = "http://localhost:3000/dataCategories.json";
  useEffect(() => {
    axios.get(baseURLReport).then((response) => {
      setData(response.data);
    });
    axios.get(baseURLCat).then((response) => {
      setDataCat(response.data);
    });
  }, [dateFrom, dateTo, dateCat, baseURLCat, baseURLReport]);
  if (!data) return "error data";

  let localDateCat = dateCat;
  if (localDateCat === "") localDateCat = dataCat[0].category;

  return (
    <>
      <Header />
      <div
        id="ReportDatesWrapper"
        key="ReportDatesWrapper"
        className="report-dates-well left-indent card card-body bg-light"
      >
        <div key="ReportDatesWell">
          <DateRangeDropDownCat data={dataCat} setDateCat={setDateCat} />
          <DateRangeDropDownDates
            dataReport={data}
            setDateFrom={setDateFrom}
            setDateTo={setDateTo}
          />
        </div>
      </div>
      <BarGraph
        data={data}
        dateCat={localDateCat}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
      ;
    </>
  );
}
