import {
  Box,
  Button,
  Select,
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
import {
  bangladeshDivisions,
  districtWithUpzila,
  divisionsWithDistricts,
} from "../../data/BdData";

function WorkerAddress({
  setShowEducationBar,
  division_id,
  district_id,
  district_name,
  division_name,
  upazila_name,
  setDivision_Id,
  setDistrict_Id,
  setUpazila_Id,
  setOtherAddress,
  other_address,
  setDivision_Name,
  setDistrict_Name,
  setUpazila_Name,
  setListWorkerAddress,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const districtList = (division_id) => {
    if (division_id) {
      const value = divisionsWithDistricts.find(
        (item) => item.division_id == division_id
      );
      if (value) {
        return value;
      }
    }
  };

  const upazilaList = (district_id) => {
    if (district_id) {
      const value = districtWithUpzila.find(
        (item) => item.district_id == district_id
      );
      if (value) {
        return value;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setListWorkerAddress([
      {
        division_name: division_name,
        district_name: district_name,
        upazila_name: upazila_name,
        others_address: other_address,
      },
    ]);
    setShowEducationBar(true);
  };

  const divisionChange = (event) => {
    const values = event.target.value.split(",");
    setDivision_Id(values[0]);
    setDivision_Name(values[1]);
  };

  const districtChange = (event) => {
    const values = event.target.value.split(",");
    setDistrict_Id(values[0]);
    setDistrict_Name(values[1]);
  };

  const upzaliaChange = (event) => {
    const values = event.target.value.split(",");
    setUpazila_Id(values[0]);
    setUpazila_Name(values[1]);
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
          <Box m="20px">
            <Formik>
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    backgroundColor: isDarkMode ? "#1f2a40" : "#f5f5f5", // Light or dark mode background
                    padding: "20px",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    className="mb-0"
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 3",
                      },
                    }}
                  >
                    <div style={{ gridColumn: "span 3" }}>
                      <Header title="Update Worker" />
                      <h1 className="p-2 mb-2 text-xl tracking-[2px] text-center dark:text-white dark:bg-slate-900">
                        Update Address
                      </h1>
                    </div>

                    <div>
                      <Typography>
                        Division Name <sup>*</sup> {division_name}
                      </Typography>
                      <select
                        required
                        onChange={divisionChange}
                        style={{ borderBottom: "1px solid black" }}
                        className={`p-[10px] w-full  rounded-t-[2px] ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-200 p-[14px]"
                        }`}
                      >
                        <option>{division_name}</option>
                        {bangladeshDivisions?.map((division) => (
                          <>
                            <option
                              key={"division"}
                              className="border cursor-pointer hover:text-blue-400"
                              value={[division.id, division.division_name]}
                            >
                              {division.division_name}
                            </option>
                          </>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Typography>
                        District Name <sup>*</sup>{district_name}
                      </Typography>
                      <select
                        required
                        fullWidth
                        variant="filled"
                        type="text"
                        style={{ borderBottom: "1px solid black" }}
                        className={`p-[10px] w-full  rounded-t-[2px] ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-200 p-[14px]"
                        }`}
                        onChange={districtChange}
                      >
                        <option>{district_name}</option>
                        {districtList(division_id)?.districts.map(
                          (district) => (
                            <option
                              key={"district"}
                              className="text-white "
                              value={[district.id, district.district_name]}
                            >
                              {district.district_name}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div>
                      <Typography>
                        Upazila Name <sup>*</sup>{upazila_name}
                      </Typography>
                      <select
                        required
                        fullWidth
                        variant="filled"
                        type="text"
                        style={{ borderBottom: "1px solid black" }}
                        className={`p-[10px] w-full  rounded-t-[2px] ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-200 p-[14px]"
                        }`}
                        onChange={upzaliaChange}
                      >
                        <option>{upazila_name}</option>
                        {upazilaList(district_id)?.upazilas.map((upazila) => (
                          <option
                            key={"upazila"}
                            value={[upazila.id, upazila.upazila_name]}
                          >
                            {upazila.upazila_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Typography>Other Address</Typography>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        value={other_address}
                        sx={{ gridColumn: "span 4" }}
                        onChange={(e) => setOtherAddress(e.target.value)}
                      />
                    </div>
                  </Box>
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
                </Box>
              </form>
            </Formik>
          </Box>
        </div>
      </div>
    </>
  );
}

export default WorkerAddress;
