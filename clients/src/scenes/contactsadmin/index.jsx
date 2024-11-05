import { Box } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/dashboard/Header";
import { useTheme } from "@mui/material";
import ContractSidebar from "../../components/dashboard/ContractSidebar";
import "./contract_index.css";
import { allClientMessagesAction, deleteClientMessagesAction, RefreshAdminContractAction } from "../../action/auth_admin/ContractAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientsAction } from "../../action/auth_admin/AdminMaintainAction";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminContacts = () => {
  const theme = useTheme();
  const [userId, setUserId] = useState("");
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const {error, allcontractList ,isMessageDelete } = useSelector((state) => state.contractListState);
  const {  allclients } = useSelector(
    (state) => state.allclientsState
  );
  useEffect(() => {
    if(error){
      toast.error(error);
    }
    if(isMessageDelete){
      toast.success('message delete successfully')
    }
    dispatch(allClientMessagesAction());
    dispatch(RefreshAdminContractAction())
  }, [dispatch,isMessageDelete,toast,error]);

  useEffect(() => {
    dispatch(getAllClientsAction());
  }, [dispatch]);


  const messageDeleteHandler=(userid,messageid)=>{
    dispatch(deleteClientMessagesAction(userid,messageid));
  }
 
  const messageList = allcontractList?.find((i) => i.user?._id == userId);

  return (
    <>
      <div className="sidbar__app">
        <Box>
          <ContractSidebar
            allclients={allclients}
            setUserId={setUserId}
            messageList={allcontractList}
          />
        </Box>
        <div className="contract__index__container">
          <div className="contract__index__box">
            <img
              style={{
                height: "100vh",
                width: "100%",
                opacity: "0.3",
                position: "absolute",
                top: "0",
                left: "0",
                bottom: "0",
              }}
              src="https://media.istockphoto.com/id/1440750576/vector/envelope-with-paper-plane-icon-symbol-send-mail-notification-telegram-letter-online-email.jpg?s=612x612&w=0&k=20&c=-tA6ZSO6ZhiikemeHxUTX25JlUG3RrdGsKiyWmfk9tU="
            />
            <div className="w-full text-black overflow-hidden">
              {messageList?.messages?.map((item) => (
                <div className="ml-72 bg-white w-4/5 p-6 mb-4 flex justify-center flex-col shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                  <div onClick={()=>messageDeleteHandler(messageList?.user?._id,item._id)} className="cursor-pointer z-20 w-full">
                    <span className="p-1 z-10 text-red-400 bg-gray-300 cursor-pointer  w-6 h-6 flex items-center justify-center rounded-full">
                      x
                    </span>
                  </div>
                  <div className="w-full m-3 z-10 flex justify-center">
                    <b>Email Addrress Or Phone Number : </b>
                    <Link to="/email">{item?.email_or_phone}</Link>
                  </div>
                  <div className="w-full m-1 z-10 flex justify-center">
                    <b>User Name : </b>
                    <p>{item?.username}</p>
                  </div>
                  <div className="z-10 flex flex-col">
                    <b>Date: {item.date}</b>
                    <b>Messages</b>
                    <p>{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminContacts;
