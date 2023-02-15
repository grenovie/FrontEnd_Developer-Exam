import { Typography } from "@mui/material";
import "./app.css";
export const DatE = ({ date }) => {
  // DATE FORMAT
  const newDate = new Date(date * 1000);
  // for numeric date
  const optionsDay = { day: "numeric" };
  const formattedDay = newDate.toLocaleDateString("default", optionsDay);
  const optionsMonth = { month: "short" };
  const formattedMonth = newDate.toLocaleDateString("default", optionsMonth);
  return (
    <>
      <div className="header-date">
        <Typography fontSize={20} variant="h5">
          {formattedDay}
        </Typography>
        <Typography fontSize={10}>{formattedMonth.toUpperCase()}</Typography>
      </div>
    </>
  );
};

export const FormattedDate = ({ date }) => {
  const newDate = new Date(date * 1000);
  const formattedDate = newDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return <>{formattedDate}</>;
};
