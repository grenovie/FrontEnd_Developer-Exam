import React, { useState } from "react";
import { Button, Stack, Checkbox, AppBar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Tags from "./tags";
import "./app.css";
import Data from "./data/data";
import { DatE, FormattedDate } from "./function";

const App = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [emailData, setEmailData] = useState(Data);
  const sliceData = emailData.slice(0, 10);
  const [expanded, setExpanded] = useState(Data.id);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      {/* 3 buttons at the top bar */}
      <AppBar color="transparent">
        <div className="gray-outline">
          <Stack spacing={2} direction="row">
            <Checkbox />
            <Button
              style={{ backgroundColor: "rgb(208, 242, 229)" }}
              variant="outlined"
              color="success"
              endIcon={<SaveIcon />}
            >
              SAVE
            </Button>
            <Button
              variant="outlined"
              style={{ color: "gray", borderColor: "gray" }}
              endIcon={<FilterAltOutlinedIcon />}
            >
              MANAGE FILTERS
            </Button>
            <hr />
            <Button
              style={{ backgroundColor: "rgb(242, 208, 208)" }}
              variant="outlined"
              color="error"
              endIcon={<DeleteIcon />}
              onClick={() => {
                const filteredData = sliceData.filter(
                  ({ id }) => !checkedItems.includes(id)
                );
                setCheckedItems([]);
                setEmailData(filteredData);
              }}
            >
              DELETE
            </Button>
          </Stack>
        </div>
      </AppBar>
      <div style={{ marginTop: 80 }}>
        <div className="accordion">
          {sliceData.map(
            ({
              id,
              date,
              subject,
              sender,
              sender_name,
              receiver,
              receiver_name,
              tags,
            }) => (
              <>
                <div className="singleAccordion">
                  <Accordion
                    expanded={expanded === id}
                    onChange={handleChange(id)}
                    TransitionProps={{ unmountOnExit: true }}
                  >
                    <AccordionSummary
                      aria-controls={id}
                      id={id}
                      expandIcon={
                        <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />
                      }
                    >
                      {/* this state when not expanded */}

                      <div className="icon-check">
                        <MoreVertIcon />
                        <input
                          className="checkbox"
                          checked={checkedItems.includes(id)}
                          type="checkbox"
                          onChange={(event) => {
                            if (event.target.checked) {
                              setCheckedItems([...checkedItems, id]);
                            } else {
                              setCheckedItems(
                                checkedItems.filter((Id) => Id !== id)
                              );
                            }
                          }}
                        />
                        <div style={{ width: 10 }}></div>
                        <div className="circle"></div>

                        <div>
                          <DatE date={date} />
                        </div>
                        {/* name initials */}
                        <div className="initials">
                          <Typography fontSize={18}>
                            {sender.substring(0, 2).toUpperCase()}
                          </Typography>
                        </div>
                        {/* subject of the mail */}
                        <div className="subject">
                          <div style={{ width: "100%" }}>
                            <Typography fontSize={18} fontWeight={"bold"}>
                              FWD: {subject}
                            </Typography>
                            <div className="sender_info">
                              <Typography>{sender_name} </Typography>
                              <Typography ml={1} fontSize={15} color="GrayText">
                                &lt;{sender}&gt;
                              </Typography>

                              <Typography ml={1} fontSize={15} color="GrayText">
                                | <FormattedDate date={date} />
                              </Typography>
                              <div style={{ flexGrow: 1 }} />
                              {/* email tags at end display */}
                              <div className="tag_display">
                                {tags
                                  .split(", ")
                                  .slice(0, 2)
                                  .map((tag, index) => (
                                    <Tags key={index}>{tag}</Tags>
                                  ))}
                                {
                                  <Tags>{`${
                                    tags.split(", ").length - 2
                                  }+`}</Tags>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionSummary>
                    <hr
                      style={{
                        height: "1px",
                        borderWidth: "0",
                        boxShadow: "0 10px 10px -10px #8c8b8b inset",
                      }}
                    />
                    {/* here details when container click */}
                    <AccordionDetails>
                      <div className="header_details">
                        <div>
                          <Typography fontWeight={"bold"}>
                            {sender_name}
                          </Typography>
                          <Typography>
                            <FormattedDate date={date} />
                          </Typography>
                        </div>
                      </div>
                      <div style={{ marginTop: 25 }}>
                        <Typography>------Forwarded Message------</Typography>
                        <Typography>
                          <div style={{ display: "flex", gap: 5 }}>
                            From:
                            <Typography fontWeight={"bold"}>
                              {sender_name}
                            </Typography>
                            &lt;<Typography color={"blue"}>{sender}</Typography>
                            &gt;
                          </div>
                          <div>
                            Date:
                            <FormattedDate date={date} />
                          </div>
                          <div>Subject: {subject}</div>
                          <div style={{ display: "flex", gap: 5 }}>
                            To:
                            <Typography fontWeight={"bold"}>
                              {receiver_name}
                            </Typography>
                            &lt;
                            <Typography color={"blue"}>{receiver}</Typography>
                            &gt;
                          </div>
                        </Typography>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default App;
