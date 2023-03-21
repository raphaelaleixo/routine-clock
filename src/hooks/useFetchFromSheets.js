import { useEffect, useState } from "react";

const fetchFromSheets = async (page) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const spreadSheet = process.env.REACT_APP_SPREADSHEET_KEY;
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheet}/values/${page}?alt=json&key=${apiKey}`
  );
  const data = await response.json();
  const { values } = data;
  const keys = values[0];
  return values.slice(1).map((values) =>
    values.reduce((obj, val, i) => {
      obj[keys[i]] = val;
      return obj;
    }, {})
  );
};

export const useFetchFromSheets = () => {
  const [weekday, setWeekDay] = useState(null);
  const [weekend, setWeekEnd] = useState(null);
  const [specialDay, setSpecialDay] = useState(null);
  const [loading, setLoading] = useState(false);

  const reload = async () => {
    setLoading(true);
    const weekdayData = await fetchFromSheets("weekday");
    setWeekDay(weekdayData);
    setLoading(false);
  };

  useEffect(() => {
    reload();
  }, []);

  return {
    loading,
    weekday,
    reload,
  };
};
