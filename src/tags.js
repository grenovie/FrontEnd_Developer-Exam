import { styled } from "@mui/material/styles";

const Tags = styled("div")(({ theme }) => ({
  ...theme.typography,
  borderRadius: 5,
  border: "1px solid rgb(0, 128, 128)",
  padding: theme.spacing(0.5),
  fontSize: 12,
  color: "rgb(0, 128, 128)",
  height: 18,
}));

export default Tags;
