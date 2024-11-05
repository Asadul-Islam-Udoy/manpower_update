import { Box, Button, Hidden } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ColorModeContext, tokens } from "../../theme";
import Header from "../../components/dashboard/Header";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AttributionIcon from '@mui/icons-material/Attribution';
import { useTheme, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Localhost } from "../../action/host/HostConnection";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDistrictAction,
  getAllDivisionAction,
  getAllUpazilaAction,
  getAllWorkerAction,
  getSingleWorkerAction,
} from "../../action/auth_admin/AdminMaintainAction";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import WorkerDeleteModel from "../../components/modal/DeleteModal";
import { Link } from "react-router-dom";
import AvatarUpdateModal from "../../components/modal/AvatarUpdateModal";
import WorkerStatusModal from "../../components/modal/WorkerStatusModal";
const Worker = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isSidebar, setIsSidebar] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [workerId, setWorkerId] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [shwoAvator, setShowAvatar] = useState(false);
  const [divisionId, setDivisionId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [upazilaId, setUpazilaId] = useState('');
  const [showStatus,setShowStatus] = useState(false);
  const [userId,setUserId] = useState('')
  const dispatch = useDispatch();
  const { lodding, error, allworkers } = useSelector(
    (state) => state.allworkerState
  );
  const { singleworker } = useSelector((state) => state.sigleWorkerState);
  const { alldivisions, alldistricts, allupazilas } = useSelector((state) => state.bdStateCounteState);
  const deleteHandler = (id) => {
    dispatch(getSingleWorkerAction(id));
    setDeleteModal((pre) => !pre);
  };

  const avatarUpdateHandler = (id) => {
    setShowAvatar((pre) => !pre);
    setWorkerId(id);
  };

  useEffect(() => {
    dispatch(getAllDivisionAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllDistrictAction(divisionId))
  }, [dispatch, divisionId]);

  useEffect(() => {
    dispatch(getAllUpazilaAction(districtId))
  }, [dispatch, districtId]);


  const columns = [
    { field: "sn", headerName: "S/N", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number Or Email",
      flex: 2,
    },
    {
      field: "isfree",
      headerName: "Worker Free",
      flex: 2,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 2,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Link to={Localhost + `/images/avatars/${params.row.avatar}`}>
                <Typography>
                  <Avatar
                    src={Localhost + `/images/avatars/${params.row.avatar}`}
                  />
                </Typography>
              </Link>
            </div>
          </>
        );
      },
    },
    {
      field: "ratings",
      headerName: "Ratings",
      flex: 3,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Stack spacing={1}>
                <Rating
                  name="half-rating"
                  defaultValue={params.row.ratings}
                  precision={0.5}
                />
              </Stack>
            </div>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 3,
      renderCell: (params) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <button
                style={{
                  border: "none",
                  borderRadius: "3px",
                  backgroundColor: "#50a6f5",
                  padding: "0px 10px",
                  marginRight: "3px",
                  height: "30px",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                }}
                title="worker info"
              >
                <Link to={`/dashboard/worker/profile/${params?.row?.userid}`}>
                  <InfoIcon style={{ color: "white" }} />
                </Link>
              </button>
              <button
                style={{
                  border: "none",
                  borderRadius: "3px",
                  backgroundColor: "#a80caf",
                  padding: "1px 10px",
                  marginRight: "3px",
                  height: "30px",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                }}
                title="image update"
                onClick={() => avatarUpdateHandler(params?.row?.userid)}
              >
                <Link>
                  <AddPhotoAlternateIcon style={{ color: "white" }} />
                </Link>
              </button>
              <button
                style={{
                  border: "none",
                  borderRadius: "3px",
                  backgroundColor: "#50a6f5",
                  padding: "1px 10px",
                  marginRight: "3px",
                  height: "30px",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                }}
                title="update"
              >
                <Link to={`/dashboard/worker/update/${params.row.userid}`}>
                  <BorderColorIcon style={{ color: "white" }} />
                </Link>
              </button>
              <button
                style={{
                  backgroundColor: "#ef630f",
                  marginLeft: "3px",
                  border: "none",
                  borderRadius: "3px",
                  padding: "0px 10px",
                  cursor: "pointer",
                  padding: "1px 10px",
                  marginRight: "3px",
                  height: "30px",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                }}
                title="delete"
                onClick={() => deleteHandler(params.row.userid)}
              >
                <DeleteForeverIcon style={{ color: "white" }} />
              </button>
              <button
                style={{
                  border: "none",
                  borderRadius: "3px",
                  backgroundColor: "#50a6f5",
                  padding: "1px 10px",
                  marginRight: "3px",
                  height: "30px",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                  position:'relative'
                }}
                title="status"
                onClick={()=>[setShowStatus((pre)=>!pre),setWorkerName(params.row.name),setWorkerId(params.row.id),setUserId(params.row.userid)]}
              >
              <AttributionIcon style={{ color: "white" }}/>
              </button>
            </div>
          </>
        );
      },
    },
  ];
  const isDarkMode = theme.palette.mode === "dark";
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getAllWorkerAction());
  }, [dispatch, error, toast]);

  let mockDataWorkers = [];
  if (allworkers?.length > 0) {
    if (divisionId && !districtId && !upazilaId) {
      const find_division = alldivisions?.find((i) => i._id == divisionId);
      if (find_division) {
        const find_workers = allworkers.filter((i) => i._id == find_division?.profile_id);
        if (find_workers?.length > 0) {
          find_workers.forEach((item, index) => {
            mockDataWorkers.push({
              sn: index + 1,
              id:item._id,
              userid: item.user?._id,
              name: item.username,
              phone: item.phone_or_email,
              isfree: item.is_free,
              ratings: item.ratings,
              avatar: item?.avatar,
              services: [
                item?.services?.map(
                  (i, index) => `(${index + 1})` + " " + i.service?.name
                ),
              ],
            });
          });
        }
      }
    }
    else if(divisionId && districtId && !upazilaId){
      const find_district = alldistricts?.find((i) => i._id == districtId && i.division_id == divisionId);
      if (find_district) {
        const find_workers = allworkers.filter((i) => i._id == find_district?.profile_id);
        if (find_workers?.length > 0) {
          find_workers.forEach((item, index) => {
            mockDataWorkers.push({
              sn: index + 1,
              id:item._id,
              userid: item.user?._id,
              name: item.username,
              phone: item.phone_or_email,
              isfree: item.is_free,
              address: item.address,
              area: item.area,
              ratings: item.ratings,
              avatar: item?.avatar,
              services: [
                item?.services?.map(
                  (i, index) => `(${index + 1})` + " " + i.service?.name
                ),
              ],
            });
          });
        }
      }
    }
    else if(divisionId && districtId && upazilaId){
      const find_upazila = allupazilas?.find((i) => i._id == upazilaId && i.district_id == districtId);
      if (find_upazila) {
        const find_workers = allworkers.filter((i) => i._id == find_upazila?.profile_id);
        if (find_workers?.length > 0) {
          find_workers.forEach((item, index) => {
            mockDataWorkers.push({
              sn: index + 1,
              id: item._id,
              userid: item.user?._id,
              name: item.username,
              phone: item.phone_or_email,
              isfree: item.is_free,
              address: item.address,
              area: item.area,
              ratings: item.ratings,
              avatar: item?.avatar,
              services: [
                item?.services?.map(
                  (i, index) => `(${index + 1})` + " " + i.service?.name
                ),
              ],
            });
          });
        }
      }
    }
    else {
      allworkers.forEach((item, index) => {
        mockDataWorkers.push({
          sn: index + 1,
          id: item._id,
          userid: item.user?._id,
          name: item.username,
          phone: item.phone_or_email,
          isfree: item.is_free,
          address: item.address,
          area: item.area,
          ratings: item.ratings,
          avatar: item?.avatar,
          services: [
            item?.services?.map(
              (i, index) => `(${index + 1})` + " " + i.service?.name
            ),
          ],
        });
      });
    }
  }
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
          {/* worker delete modal */}
          {deleteModal && <WorkerDeleteModel workerData={singleworker} />}
          {shwoAvator && <AvatarUpdateModal id={workerId} />}
          {showStatus && <WorkerStatusModal workerId={workerId} workerName={workerName} id={userId}/>}
          <Box
            m="20px"
            sx={{
              backgroundColor: isDarkMode ? "#1f2a40" : "#f5f5f5", // Light or dark mode background
              borderRadius: "8px",
            }}
          >
            <div className="w-[100%] flex justify-center items-center">
              <Typography className=" font-serif" sx={{ gridColumn: "span 4" }}>
                Search Workers
              </Typography>
            </div>
            {/* worker division input */}
            <div className="flex w-full justify-around items-center">
              <div className="w-full">
                <div>
                  <select
                    style={{ borderBottom: "1px solid black" }}
                    onChange={(e) => setDivisionId(e.target.value)}
                    className={`p-[10px] w-[90%] ${!divisionId ? "ml-14" : "ml-0"} font-serif  rounded-md ${isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-200 p-[14px]"
                      }`}
                  >
                    <option className="">select worker division</option>
                    {alldivisions?.map((item, index) => (
                      <option key={index} value={item._id}>{item.division_name}</option>
                    ))}

                  </select>
                </div>
              </div>
              {/* worker district input */}
              {alldistricts?.length > 0 &&
                <div className="w-full">
                  <div>
                    <select
                      style={{ borderBottom: "1px solid black" }}
                      onChange={(e) => setDistrictId(e.target.value)}
                      className={`p-[10px] w-[90%] font-serif  rounded-md ${isDarkMode
                        ? "bg-gray-700"
                        : "bg-gray-200 p-[14px]"
                        }`}
                    >
                      <option>select worker district</option>
                      {alldistricts?.map((item, index) => (
                        <option key={index} value={item._id}>{item.district_name}</option>
                      ))}

                    </select>
                  </div>
                </div>
              }
              {/* worker upazila input */}
              {allupazilas?.length > 0 &&
                <div className="w-full">
                  <div>
                    <select
                      style={{ borderBottom: "1px solid black" }}
                      onChange={(e) => setUpazilaId(e.target.value)}
                      className={`p-[10px] w-[90%] font-serif  rounded-md ${isDarkMode
                        ? "bg-gray-700"
                        : "bg-gray-200 p-[14px]"
                        }`}
                    >
                      <option>select worker upazila</option>
                      {allupazilas?.map((item, index) => (
                        <option key={index} value={item._id}>{item.upazila_name}</option>
                      ))}

                    </select>
                  </div>
                </div>
              }

            </div>
            <div className="flex justify-between p-1 pb-0 justify-items-center">
              <Header title="Workers" />

              <div>

                <Link
                  to="/dashboard/worker/create"
                  style={{ color: "white", width: "100%" }}
                >
                  <Button className="!py-2 !px-5 !font-bold !text-white !bg-yellow-500 !capitalize"
                  >
                    Create Worker
                  </Button>
                </Link>
              </div>
            </div>
            <Box
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                },
              }}
            >

              <DataGrid
                rows={mockDataWorkers}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Worker;
