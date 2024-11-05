import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/dashboard/Header";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import React, { useContext, useEffect, useState } from "react";
import "./worker.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  getAllServicesAction,
  getSingleWorkerAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import WorkerAddress from "../../components/workerupdate/workerAddress";
import WorkerEducation from "../../components/workerupdate/workerEducation";
import WorkerEmergencyContract from "../../components/workerupdate/workerEmContract";

function WorkerUpdate() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);
  const [showAddressBar, setShowAddressBar] = useState(false);
  const [showEducationBar, setShowEducationBar] = useState(false);
  const [showImContract, setShowImContract] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { singleworker } = useSelector((state) => state.sigleWorkerState);
  const { isUpdateWorker } = useSelector((state) => state.allworkerState);
  const { lodding, allservices, error } = useSelector(
    (state) => state.servicesState
  );
  const [username, setUserName] = useState(singleworker?.worker?.username);
  const [first_name, setFirst_Name] = useState(singleworker?.worker?.first_name);
  const [last_name, setLast_Name] = useState(singleworker?.worker?.last_name);
  const [phone_number, setPhone_Number] = useState(singleworker?.worker?.phone_number);
  const [nidnumber, setNidNumber] = useState("");
  const [relationship, setRelationShip] = useState(singleworker?.worker?.relationship);
  const [gender, setGender] = useState(singleworker?.worker?.gender);
  const [birthday, setBirthDay] = useState(singleworker?.worker?.birthday);
  const [religion, setReligion] = useState(singleworker?.worker?.religion);
  const [blood_group, setBloodGroup] = useState(singleworker?.worker?.blood_group);
  const [languages, setLanguage] = useState([]);
  const [servicesId, setServices] = useState([]);
  const [nationality, setNationality] = useState("");
  const [type, setType] = useState();
  const [mother_tongue, setMother_tongue] = useState("");
  const [profile_description, setProfileDescription] = useState(
    singleworker?.worker?.profile_description
  );
  //address
  const [division_name, setDivision_Name] = useState(singleworker?.division?.division_name);
  const [division_id, setDivision_Id] = useState();
  const [district_name, setDistrict_Name] = useState(singleworker?.district?.district_name);
  const [district_id, setDistrict_Id] = useState();
  const [upazila_name, setUpazila_Name] = useState(singleworker?.upazila?.upazila_name);
  const [upazila_id, setUpazila_Id] = useState();
  const [other_address, setOtherAddress] = useState(singleworker?.upazila?.others_address);
  const [listWorkerInfo, setListWorkerInfo] = useState([]);
  const [listWorkerAddress,setListWorkerAddress] = useState([]);
  const [inputFields, setInputFields] = useState([
    {
      institute: "",
      education_level: "",
      degree: "",
      major_subject: "",
      board_university: "",
      graduation_year:"",
      accreditation: "",
      admission_year: "",
      gpa_cgpa: "",
      honors_awards: "",
      location: "",
    },
  ]);
  ///service defalut show handler
  function showServiceHandler(singleworker, item) {
    const result =singleworker?.services?.find((i) => i.service?.name == item);
    if (result) {
      return true;
    }
    return false;
  }
  ///language defalut show handler
  function showLanguageHandler(singleworker, item) {
    const result = singleworker?.languages?.find((i) => i == item);
    if (result) {

      return true;
    }
    return false;
  }
  useEffect(() => {
    if (singleworker?.worker?.services?.length > 0) {
      singleworker?.worker?.services?.forEach((element) => {
        if (!servicesId.includes(element.service?._id)) {
          setServices((pre) => [...pre, element.service?._id]);
        }
      });
    }

    if (error) {
      toast.error(error);
      setButtonDisabled(false);
    }
  }, [error, toast, singleworker?.worker?.services?.length > 0]);


  useEffect(() => {
    if(singleworker?.worker?.languages?.length>0){
      singleworker?.worker?.languages?.forEach(element => {
        if (!languages?.includes(element)) {
            setLanguage((pre)=>[...pre,element])
        }
      });
    }
  }, [singleworker?.worker]);

  useEffect(() => {
    setUserName(singleworker?.worker?.username);
    setFirst_Name(singleworker?.worker?.first_name);
    setLast_Name(singleworker?.worker?.last_name);
    setPhone_Number(singleworker?.worker?.phone_number);
    setProfileDescription(singleworker?.worker?.profile_description);
    setRelationShip(singleworker?.worker?.relationship);
    setGender(singleworker?.worker?.gender);
    setBirthDay(singleworker?.worker?.birthday);
    setReligion(singleworker?.worker?.religion)
    setBloodGroup(singleworker?.worker?.blood_group);
    setNationality(singleworker?.worker?.nationality);
    setNidNumber(singleworker?.worker?.nid_number);
    setMother_tongue(singleworker?.worker?.mother_tongue);
    setType(singleworker?.worker?.type);
  }, [singleworker?.worker]);

  useEffect(()=>{
   if(singleworker?.worker?.education_qualification?.length>0){
    setInputFields([])
    singleworker?.worker?.education_qualification.forEach(element => {
      setInputFields((pre)=>[...pre,element])
    });
  
   }
  },[singleworker?.worker?.education_qualification?.length>0])
  useEffect(() => {
    setDistrict_Name(singleworker?.district?.district_name);
    setDivision_Name(singleworker?.division?.division_name);
    setUpazila_Name(singleworker?.upazila?.upazila_name);
    setOtherAddress(singleworker?.upazila?.others_address)
  }, [singleworker?.division,singleworker?.district,singleworker?.upazila]);

  useEffect(() => {
    if (isUpdateWorker) {
      toast.success("profile update successfully!");
      navigate("/dashboard/worker");
      setButtonDisabled(false);
    }
  }, [isUpdateWorker, toast, navigate]);

  const ServiceHandler = (item) => {
    if (!servicesId.includes(item)) {
      setServices((pre) => [...pre, item]);
    } else {
      setServices((pre) => servicesId.filter((i) => i !== item));
    }
  };

  const LanguageHandler = (item) => {
    if (!languages.includes(item)) {
      setLanguage((pre) => [...pre, item]);
    } else {
      setLanguage((pre) => languages.filter((i) => i !== item));
    }
  };

  useEffect(() => {
    dispatch(getSingleWorkerAction(id));
    dispatch(getAllServicesAction());
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAddressBar(true);
    setListWorkerInfo([
      {
        id: id,
        username: username,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        nidnumber: nidnumber,
        relationship: relationship,
        gender: gender,
        birthday: birthday,
        religion: religion,
        blood_group: blood_group,
        nationality: nationality,
        type: type,
        mother_tongue: mother_tongue,
        profile_description: profile_description,
        languages: languages,
        servicesId: servicesId,
      },
    ]);
  };

  const isDarkMode = theme.palette.mode === "dark";
  const languageList = ["Bangla", "English", "Hindi", "Arobiq"];
  return (
    <>
      <div className="sidbar__app">
        <Sidebar isSidebar={isSidebar} />
        <div
          className={
            theme.palette.mode === "dark"
              ? "sidbar__content"
              : "sidbar__container__2"
          }
        >
          <Topbar setIsSidebar={setIsSidebar} />
          {showImContract ? (
            <WorkerEmergencyContract listWorkerInfo={listWorkerInfo} listWorkerAddress={listWorkerAddress} listWorkerEducations={inputFields} emergencyContractList={singleworker?.worker?.emergency_contract}/>
          ) : (
            <>
              {showEducationBar ? (
                <WorkerEducation setShowImContract={setShowImContract}  setInputFields={setInputFields} inputFields={inputFields}/>
              ) : (
                <>
                  {showAddressBar ? (
                    <WorkerAddress
                      setShowEducationBar={setShowEducationBar}
                      setDistrict_Id={setDistrict_Id}
                      setDivision_Id={setDivision_Id}
                      setUpazila_Id={setUpazila_Id}
                      district_name={district_name}
                      division_name={division_name}
                      upazila_name={upazila_name}
                      upazila_id={upazila_id}
                      district_id={district_id}
                      division_id={division_id}
                      other_address={other_address}
                      setOtherAddress={setOtherAddress}
                      setDivision_Name={setDivision_Name}
                      setDistrict_Name={setDistrict_Name}
                      setUpazila_Name ={setUpazila_Name}
                      setListWorkerAddress={setListWorkerAddress}
                    />
                  ) : (
                    <Box
                      m="20px"
                      sx={{
                        backgroundColor: isDarkMode ? "#1f2a40" : "#f5f5f5", // Light or dark mode background
                        padding: "20px",
                        borderRadius: "8px",
                      }}
                    >
                      <Header title="Update Worker" />
                      <Formik>
                        <form onSubmit={handleSubmit}>
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
                            <h1
                              className="p-2 mb-2 text-xl tracking-[2px] text-center dark:text-white dark:bg-slate-900"
                              style={{ gridColumn: "span 3" }}
                            >
                              Update Information
                            </h1>
                            <div sx={{ gridColumn: "span 8" }}>
                              <Typography>First Name</Typography>
                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                value={first_name}
                                sx={{ gridColumn: "span 4" }}
                                onChange={(e) => setFirst_Name(e.target.value)}
                              />
                            </div>
                            <div sx={{ gridColumn: "span 8" }}>
                              <Typography>Last Name</Typography>
                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                value={last_name}
                                sx={{ gridColumn: "span 4" }}
                                onChange={(e) => setLast_Name(e.target.value)}
                              />
                            </div>
                            <div>
                              <Typography>
                                Username <sup>*</sup>
                              </Typography>
                              <TextField
                                required
                                fullWidth
                                variant="filled"
                                type="text"
                                value={username}
                                style={{ color: "red" }}
                                onChange={(e) => setUserName(e.target.value)}
                              />
                            </div>

                            <div>
                              <Typography>Phone Number</Typography>
                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                value={phone_number}
                                sx={{ gridColumn: "span 4" }}
                                onChange={(e) =>
                                  setPhone_Number(e.target.value)
                                }
                              />
                            </div>
                            <div>
                              <Typography>NID NUMBER</Typography>
                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                value={nidnumber}
                                sx={{ gridColumn: "span 4" }}
                                onChange={(e) => setNidNumber(e.target.value)}
                              />
                            </div>

                            <div>
                              <Typography sx={{ gridColumn: "span 4" }}>
                                Birthday  - {birthday}
                              </Typography>
                              <div className="flex flex-col ">
                                <input
                                  name="hour"
                                  id="hour"
                                  type="date"
                                  value={birthday}
                                  onChange={(e) => setBirthDay(e.target.value)}
                                  className="w-auto -mt-1 h-11 bg-transparent rounded-md border  border-[#e0e0e0]  py-3 px-6 text-base font-medium text-orange-300 outline-none "
                                />
                              </div>
                            </div>
                            <div>
                              <Typography>Nationality</Typography>
                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                value={nationality}
                                sx={{ gridColumn: "span 4" }}
                                onChange={(e) => setNationality(e.target.value)}
                              />
                            </div>

                            <div>
                              <Typography>Description</Typography>
                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                value={profile_description}
                                sx={{ gridColumn: "span 4" }}
                                onChange={(e) =>
                                  setProfileDescription(e.target.value)
                                }
                              />
                            </div>
                            <div>
                              <Typography>Religion</Typography>
                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                value={religion}
                                sx={{ gridColumn: "span 4" }}
                                onChange={(e) => setReligion(e.target.value)}
                              />
                            </div>

                            <div>
                              <Typography>Mother Tongue</Typography>
                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                value={mother_tongue}
                                sx={{ gridColumn: "span 4" }}
                                onChange={(e) =>
                                  setMother_tongue(e.target.value)
                                }
                              />
                            </div>
                            <div>
                              <Typography>Type</Typography>
                              <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                value={type}
                                sx={{ gridColumn: "span 4" }}
                                onChange={(e) => setType(e.target.value)}
                              />
                            </div>

                            <div>
                              <Typography sx={{ gridColumn: "span 4" }}>
                                Blood Group
                              </Typography>
                              <select
                                value={blood_group}
                                style={{ borderBottom: "1px solid black" }}
                                onChange={(e) => setBloodGroup(e.target.value)}
                                className={`p-[10px] w-full  rounded-t-[2px] ${
                                  isDarkMode
                                    ? "bg-gray-700"
                                    : "bg-gray-200 p-[14px]"
                                }`}
                              >
                                {[
                                  "A+",
                                  "A-",
                                  "B+",
                                  "B-",
                                  "O+",
                                  "O-",
                                  "AB+",
                                  "AB-",
                                ].map((item) => (
                                  <option value={item}>{item}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <Typography>Gender</Typography>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                row
                              >
                                <FormControlLabel
                                  value="male"
                                  control={<Radio />}
                                  label="Male"
                                  onClick={(e) => setGender("Male")}
                                  style={{
                                    color:
                                    singleworker?.worker?.gender == "Male"
                                        ? "red"
                                        : "white",
                                  }}
                                />
                                <FormControlLabel
                                  value="females"
                                  control={<Radio />}
                                  label="Female"
                                  onClick={(e) => setGender("Female")}
                                  style={{
                                    color:
                                    singleworker?.worker?.gender == "Female"
                                        ? "red"
                                        : "white",
                                  }}
                                />

                                <FormControlLabel
                                  value="other"
                                  control={<Radio />}
                                  label="Other"
                                  onClick={(e) => setGender("Other")}
                                  style={{
                                    color:
                                    singleworker?.worker?.gender == "Other"
                                        ? "red"
                                        : "white",
                                  }}
                                />
                              </RadioGroup>
                            </div>

                            <div>
                              {/* relationship */}
                              <Typography>Relationship</Typography>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                row
                              >
                                <FormControlLabel
                                  value="married"
                                  control={<Radio />}
                                  label="Married"
                                  style={{
                                    color:
                                    singleworker?.worker?.relationship == "Married"
                                        ? "red"
                                        : "white",
                                  }}
                                  onClick={(e) => setRelationShip("Married")}
                                />
                                <FormControlLabel
                                  value="single"
                                  control={<Radio />}
                                  label="Single"
                                  onClick={(e) => setRelationShip("Single")}
                                  style={{
                                    color:
                                    singleworker?.worker?.relationship == "Single"
                                        ? "red"
                                        : "white",
                                  }}
                                />
                              </RadioGroup>
                            </div>

                            <div>
                              <Typography>Languages</Typography>
                              {languageList.map((i) => (
                                <FormControlLabel
                                  label={i}
                                  control={
                                    <Checkbox
                                      {...label}
                                      defaultChecked={showLanguageHandler(
                                        singleworker?.worker,
                                        i
                                      )}
                                      color="secondary"
                                      onClick={() => LanguageHandler(i)}
                                    />
                                  }
                                />
                              ))}
                            </div>

                            <div style={{ gridColumn: "span 3" }}>
                              <Typography>WROKERS SERVICES</Typography>
                              <FormGroup
                                style={{
                                  minHeight: "100px",
                                  margin: "5px",
                                  display: "inline-block",
                                }}
                              >
                                {allservices?.map((item, index) => (
                                  <FormControlLabel
                                    label={`${item.name}`}
                                    control={
                                      <Checkbox
                                        {...label}
                                        defaultChecked={showServiceHandler(
                                          singleworker?.worker,
                                          item.name
                                        )}
                                        color="secondary"
                                        onClick={() => ServiceHandler(item._id)}
                                      />
                                    }
                                  />
                                ))}
                              </FormGroup>
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
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default WorkerUpdate;
