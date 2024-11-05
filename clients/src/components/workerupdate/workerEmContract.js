import {
  Box,
  Button,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import Header from "../dashboard/Header";
import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { ColorModeContext, tokens } from "../../theme";
import { useDispatch } from "react-redux";
import { workerProfileUpdateAction } from "../../action/auth_admin/AdminMaintainAction";
function WorkerEmergencyContract({
  listWorkerInfo,
  listWorkerAddress,
  listWorkerEducations,
  emergencyContractList
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [name, setName] = useState(emergencyContractList?.name);
  const [phone, setPhone] = useState(emergencyContractList?.phone);
  const [relationship, setRelationShip] = useState(emergencyContractList?.relationship);
  const [address, setAddress] = useState(emergencyContractList?.address);
  const [profession, setProfession] = useState(emergencyContractList?.profession);
  const [email, setEmail] = useState(emergencyContractList?.email);
  const [emergencyContract, setEmergencyContract] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    // setButtonDisabled(true);
    dispatch(
      workerProfileUpdateAction(
        listWorkerInfo[0]?.id,
        listWorkerInfo,
        listWorkerAddress,
        listWorkerEducations,
        emergencyContract
      )
    );
  };
  useEffect(()=>{
    setEmergencyContract({
      name: name || emergencyContractList?.name,
      email: email || emergencyContractList?.email,
      phone: phone || emergencyContractList?.phone,
      address:address || emergencyContractList?.address,
      relationship: relationship ||emergencyContractList?.relationship,
      profession: profession || emergencyContractList?.profession,
    });
  },[name,email,phone,relationship,address,profession,emergencyContractList])
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
              Update Emergency Contract
            </h1>

            
            <Formik>
              <form onSubmit={handleSubmit}>
                <Box mt="40px"
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 3",
                    },
                  }}
                >
                  <div>
                    <Typography>Name</Typography>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={name}
                      sx={{ gridColumn: "span 4" }}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <Typography>Phone Number</Typography>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={phone}
                      sx={{ gridColumn: "span 4" }}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div>
                    <Typography>Relationship</Typography>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={relationship}
                      sx={{ gridColumn: "span 4" }}
                      onChange={(e) => setRelationShip(e.target.value)}
                    />
                  </div>

                  <div>
                    <Typography>Email</Typography>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={email}
                      sx={{ gridColumn: "span 4" }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Typography>Address</Typography>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={address}
                      sx={{ gridColumn: "span 4" }}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <Typography>Profession</Typography>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={profession}
                      sx={{ gridColumn: "span 4" }}
                      onChange={(e) => setProfession(e.target.value)}
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
              </form>
            </Formik>
          </Box>
        </div>
      </div>
    </>
  );
}

export default WorkerEmergencyContract
