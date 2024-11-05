import { useEffect, useState } from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { ProSidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import "./ContractSidebar.css";
import { tokens } from "../../theme";
import BorderOuterIcon from "@mui/icons-material/BorderOuter";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import EngineeringIcon from "@mui/icons-material/Engineering";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import CategoryIcon from "@mui/icons-material/Category";
import { useDispatch, useSelector } from "react-redux";
import { Localhost } from "../../action/host/HostConnection";
import { singleClientMessagesAction } from "../../action/auth_admin/ContractAction";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
// import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
// import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
//import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[600],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const ContractSidebar = ({ allclients, setUserId, messageList }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const dispatch = useDispatch();
  ///new message get color system
  const listFilterMethod = (list, item) => {
    const filter = list.find((i) => i.user?._id == item?.user?._id);
    if (filter) {
      if (filter?.is_admin_get === false) {
        return true;
      }
    }
  };

  const singleMessageGetHandler=(id)=>{
    setUserId(id)
    dispatch(singleClientMessagesAction(id));
  }
  ///new message get color system
  const listSortMethod = (messageList, allclients) => {
    const searchList = [].sort((a,b)=>a-b);
    const otherList = [];
    if (allclients.length > 0) {
      allclients?.forEach((element) => {
        const filter = messageList.find(
          (i) => i.user?._id == element?.user?._id
        );
        if (filter) {
          if (filter?.is_admin_get === false) {
            searchList.push(element);
          }
          if(filter?.is_admin_get === true){
            otherList.unshift(element); 
          }
        }
        else{
          otherList.unshift(element);  
        }
      });
     if(otherList.length > 0){
      otherList.forEach((item)=>{
        searchList.push(item)
      })
     }
    }
    return searchList;
  };
  const sortedDates = messageList?.map(obj => { return { ...obj, date: new Date(obj.date) } }).sort((a, b) => b.date - a.date);


  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "rgb(185 220 243)",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar style={{ Height: "100vh", position:'fixed' }} collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[600],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" style={{ color: "#093533" }}>
                  Contract Pages
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box
            style={{ height: "98vh", marginRight: "30px" }}
            paddingLeft={isCollapsed ? undefined : "10%"}
          >
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            ></Typography>
            {listSortMethod(sortedDates, allclients)?.map((item) => (
              <div
                style={{
                  backgroundColor: listFilterMethod(messageList, item)
                    ? "white"
                    : "#d4e0f5",
                  margin: "2px",
                  width: "300px",
                }}
                onClick={() => singleMessageGetHandler(item?.user?._id)}
              >
                <Item
                  title={
                    item.username || item?.user?.email || item?.user?.phone
                  }
                  icon={
                    item.avatar ? (
                      <img
                        style={{
                          height: "30px",
                          width: "30px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        src={
                          Localhost + `/images/avatars/${item?.avatar}` ||
                          "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                      />
                    ) : (
                      <img
                        style={{
                          height: "30px",
                          width: "30px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                      />
                    )
                  }
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default ContractSidebar;
