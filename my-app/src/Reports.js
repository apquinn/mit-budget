import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";

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

function BarGraphMonths({ data, highest }) {
  let itemDate = "";
  let e = document.getElementById("dateSelectFrom");
  let textFrom = e.options[e.selectedIndex].text;
  textFrom = Date.parse(textFrom);

  e = document.getElementById("dateSelectTo");
  let textTo = e.options[e.selectedIndex].text;
  textTo = Date.parse(textTo);

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
    }
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

function DateRangeDropDownItem({ data, id, type, onChangeHandler }) {
  let currentDate = "";
  let lastOption = null;
  let found = false;
  let firstCat = true;
  const element = document.getElementById(id);
  const [searchParams, setSearchParams] = useSearchParams();
  if (element == null) {
    var selectList = document.createElement("select");
    selectList.id = id;
    selectList.onchange = onChangeHandler;
    document.getElementById("dates").appendChild(selectList);

    let first = "";
    data.map((item) => {
      if (first == "") first = item.date;
    });

    data.map((item, index) => {
      var option = document.createElement("option");
      option.value = index;
      if (type == "cat") {
        option.text = item.category;
        if (
          searchParams.get("category") != null &&
          item.category == searchParams.get("category")
        )
          option.selected = true;
        if (firstCat && searchParams.get("category") == null) {
          option.selected = true;
        }
        firstCat = false;
      } else {
        if (type == "dateFrom") {
          currentDate = String(Number(format(new Date(), "yyyy")) - 1);
          currentDate =
            String(Number(format(new Date(), "M")) + 1) + "/1/" + currentDate;
          option.text = item.date;
          if (currentDate == item.date) option.selected = true;
        } else {
          currentDate = format(new Date(), "M/1/yyyy");
          option.text = item.date;
          if (currentDate == item.date) {
            option.selected = true;
            found = true;
          }
          lastOption = option;
        }
      }

      selectList.appendChild(option);
    });

    if (!found && type == "dateTo") lastOption.selected = true;
  }
}

function DateRangeDropDownCat({ url, setUrl, dataCat }) {
  const onChangeHandlerCat = () => {
    let e = document.getElementById("dateSelectCat");
    let extension = e.options[e.selectedIndex].text;
    setUrl(url + "&" + extension);
  };

  return (
    <>
      <DateRangeDropDownItem
        data={dataCat}
        id="dateSelectCat"
        type="cat"
        onChangeHandler={onChangeHandlerCat}
      />
    </>
  );
}

function DateRangeDropDown({ url, setUrl, dataReport }) {
  const onChangeHandlerDate = (event) => {
    var e = document.getElementById(event.target.id);
    var text = e.options[e.selectedIndex].text;

    if (event.target.id == "dateSelectFrom") setUrl(url + "&fromDate" + text);
    if (event.target.id == "dateSelectTo") setUrl(url + "&toDate" + text);
  };

  return (
    <>
      <DateRangeDropDownItem
        data={dataReport}
        id="dateSelectFrom"
        type="dateFrom"
        onChangeHandler={onChangeHandlerDate}
      />
      <DateRangeDropDownItem
        data={dataReport}
        id="dateSelectTo"
        type="dateTo"
        onChangeHandler={onChangeHandlerDate}
      />
    </>
  );
}

function BarGraph({ data }) {
  let highest = 0;
  let highestTotal = 0;
  let totalCurrent = 0;
  let totalBudget = 0;

  let e = document.getElementById("dateSelectFrom");
  let textFrom = e.options[e.selectedIndex].text;
  textFrom = Date.parse(textFrom);

  e = document.getElementById("dateSelectTo");
  let textTo = e.options[e.selectedIndex].text;
  textTo = Date.parse(textTo);

  data.map((item) => {
    if (Date.parse(item.date) >= textFrom && Date.parse(item.date) <= textTo) {
      if (item.budget > highest) highest = item.budget;
      if (item.current > highest) highest = item.current;
    }
    totalCurrent += item.current;
    totalBudget += item.budget;
  });

  highestTotal = totalCurrent > totalBudget ? totalCurrent : totalBudget;
  e = document.getElementById("dateSelectCat");

  return (
    <>
      <BarGraphMonths data={data} highest={highest} />
      <BarGraphTotal
        highestTotal={highestTotal}
        totalCurrent={totalCurrent}
        totalBudget={totalBudget}
        categoryName={e.options[e.selectedIndex].text}
      />
    </>
  );
}

export default function Reports() {
  const [url, setUrl] = useState("http://localhost:3000/dataReport.json?");
  const [data, setData] = useState(null);
  const [dataCat, setDataCat] = useState();

  let baseURLCat = "http://localhost:3000/dataCategories.json";
  React.useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
    axios.get(baseURLCat).then((response) => {
      setDataCat(response.data);
    });
  }, [url]);
  if (!data) return "error data";

  return (
    <>
      <DateRangeDropDownCat url={url} setUrl={setUrl} dataCat={dataCat} />
      <DateRangeDropDown url={url} setUrl={setUrl} dataReport={data} />
      <BarGraph data={data} />;
    </>
  );
}
