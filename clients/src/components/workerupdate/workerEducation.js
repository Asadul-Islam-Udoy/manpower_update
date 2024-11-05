import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import Header from "../../components/dashboard/Header";
import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { ColorModeContext, tokens } from "../../theme";
import { BdEducatioLevels, BdEducationDegree } from "../../data/Education";
function WorkerEducation({ setShowImContract, inputFields, setInputFields }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFromChange = (index, e) => {
    let data = [...inputFields];
    data[index][e.target.name] = e.target.value;
    setInputFields(data);
  };
  const addFieldHandler = () => {
    let newfield = {
      institute: "",
      education_level: "",
      degree: "",
      major_subject: "",
      board_university: "",
      accreditation: "",
      graduation_year: "",
      admission_year: "",
      gpa_cgpa: "",
      honors_awards: "",
      location: "",
    };
    setInputFields([...inputFields, newfield]);
  };

  const removeHandler = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowImContract(true);
  };
  const isDarkMode = theme.palette.mode === "dark";
  return (
    <>
      <div className="sidbar__app">
        <div
          className={
            theme.palette.mode === "dark"
              ? "sidbar__content"
              : "sidbar__container__2"
          }
        >
          <Box
            m="20px"
            sx={{
              backgroundColor: isDarkMode ? "#1f2a40" : "#f5f5f5", // Light or dark mode background
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <Header title="Update Worker" />
            <h1 className="p-2 mb-2 text-xl tracking-[2px] text-center dark:text-white dark:bg-slate-900">
              Update Education Qualification
            </h1>

            <div className="flex items-end justify-end w-full">
              <button
                onClick={addFieldHandler}
                className="px-4 pt-2 pb-1 font-bold bg-green-500 "
              >
                Add More
              </button>
            </div>
            <Formik>
              <form onSubmit={handleSubmit}>
                {inputFields.map((item, index) => (
                  <>
                    {index !== 0 && (
                      <div className="w-full">
                        <div className="w-full mt-4 mb-4 border "></div>
                        <div className="flex items-end justify-end w-full">
                          {" "}
                          <button
                            onClick={() => removeHandler(index)}
                            className="pt-2 pb-2 pl-4 pr-4 bg-orange-500 rounded-md"
                          >
                            remove
                          </button>
                        </div>
                      </div>
                    )}
                    <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 3",
                        },
                      }}
                    >
                      <>
                        <div>
                          <Typography>Institute </Typography>
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            name="institute"
                            value={item?.institute}
                            sx={{ gridColumn: "span 4" }}
                            onChange={(event) => handleFromChange(index, event)}
                          />
                        </div>
                        <div>
                          <Typography>Education Level</Typography>
                          <select
                            fullWidth
                            variant="filled"
                            name="education_level"
                            type="text"
                            style={{ borderBottom: "1px solid black" }}
                            className={`p-[10px] w-full  rounded-t-[2px] ${
                              isDarkMode
                                ? "bg-gray-700"
                                : "bg-gray-200 p-[14px]"
                            }`}
                            value={item?.education_level}
                            sx={{ gridColumn: "span 4" }}
                            onChange={(e) => handleFromChange(index, e)}
                          >
                            <option>{item?.education_level}</option>
                            {BdEducatioLevels.map((lavel) => (
                              <option key={"lavel"} value={lavel}>
                                {lavel}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Typography>Degree</Typography>
                          <select
                            fullWidth
                            variant="filled"
                            type="text"
                            name="degree"
                            style={{ borderBottom: "1px solid black" }}
                            className={`p-[10px] w-full  rounded-t-[2px] ${
                              isDarkMode
                                ? "bg-gray-700"
                                : "bg-gray-200 p-[14px]"
                            }`}
                            value={item?.degree}
                            sx={{ gridColumn: "span 4" }}
                            onChange={(e) => handleFromChange(index, e)}
                          >
                            <option>{item?.degree}</option>
                            {BdEducationDegree.map((degree) => (
                              <option key={"degree"} value={degree}>
                                {degree}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Typography>Major Subject</Typography>
                          <TextField
                            fullWidth
                            variant="filled"
                            name="major_subject"
                            type="text"
                            value={item?.major_subject}
                            sx={{ gridColumn: "span 4" }}
                            onChange={(e) => handleFromChange(index, e)}
                          />
                        </div>

                        <div>
                          <Typography>Board University</Typography>
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            name="board_university"
                            value={item?.board_university}
                            sx={{ gridColumn: "span 4" }}
                            onChange={(e) => handleFromChange(index, e)}
                          />
                        </div>
                        <div>
                          <Typography>Accreditation</Typography>
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            name="accreditation"
                            value={item?.accreditation}
                            sx={{ gridColumn: "span 4" }}
                            onChange={(e) => handleFromChange(index, e)}
                          />
                        </div>
                        <div>
                          <Typography>Graduation Year</Typography>
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            name="graduation_year"
                            value={item?.graduation_year}
                            sx={{ gridColumn: "span 4" }}
                            onChange={(e) => handleFromChange(index, e)}
                          />
                        </div>
                        <div>
                          <Typography>Admission Year</Typography>
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            name="admission_year"
                            value={item?.admission_year}
                            sx={{ gridColumn: "span 4" }}
                            onChange={(e) => handleFromChange(index, e)}
                          />
                        </div>
                        <div>
                          <Typography>gpa/cgpa</Typography>
                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            name="gpa_cgpa"
                            value={item?.gpa_cgpa}
                            sx={{ gridColumn: "span 4" }}
                            onChange={(e) => handleFromChange(index, e)}
                          />
                        </div>
                        <div>
                          <Typography>Honors Awards</Typography>
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            name="honors_awards"
                            value={item?.honors_awards}
                            sx={{ gridColumn: "span 4" }}
                            onChange={(e) => handleFromChange(index, e)}
                          />
                        </div>
                        <div>
                          <Typography>Location</Typography>
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            name="location"
                            value={item?.location}
                            sx={{ gridColumn: "span 4" }}
                            onChange={(e) => handleFromChange(index, e)}
                          />
                        </div>
                      </>
                    </Box>
                  </>
                ))}
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                    disabled={buttonDisabled}
                    type="submit"
                    color="secondary"
                    variant="contained"
                    style={{ fontWeight: "bold" }}
                  >
                    Next
                  </Button>
                </Box>
              </form>
            </Formik>
          </Box>
        </div>
      </div>
    </>
  );
}

export default WorkerEducation;
