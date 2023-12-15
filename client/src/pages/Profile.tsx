import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice";
import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import useProfile from "../hooks/useProfile";
function Profile() {
  const user = useSelector((state: any) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { changeRole, setChangeRole, isNumber, setIsNumber, isAddress, setIsAddress, cancel, handleChange, updatedDataUser, setUpdatedDataUser, handleUpdateProfile } = useProfile();

  return (
    <div className="max-w-6xl mx-auto box-border p-2 sm:p-0 ">
      <form action="" className=" shadow-[0_0_5px_0_#0B2545] mx-auto mt-2 sm:mt-5 box-border p-2 sm:p-5 flex flex-col gap-1 sm:gap-2 rounded-lg sm:w-[50%] lg:w-[40%] relative">
        <img src={user.image} alt="" className="w-20 h-20 rounded-full mx-auto" />
        <div className="flex justify-between  text-[#0B2545] text-sm sm:text-base font-bold ">
          <p className="w-1/3">Name</p>
          <p className="w-2/3">{user.username}</p>
        </div>
        <div className="flex justify-between  text-[#0B2545] text-sm sm:text-base font-bold ">
          <p className="w-1/3">Email</p>
          <p className="w-2/3">{user.email}</p>
        </div>
        <div className="flex justify-between  text-[#0B2545] text-sm sm:text-base font-bold ">
          <p className="w-1/3">Phone number</p>
          {user.phone ? (
            <p className="w-2/3">{user.phone}</p>
          ) : isNumber ? (
            <input
              onChange={handleChange}
              type="text"
              id="phone"
              placeholder="ex: 081234567890"
              className="w-2/3 border-b-[1px] border-b-[#0B2545] bg-transparent focus:outline-none text-[#0B2545]  placeholder-green-700 placeholder:text-sm"
            />
          ) : (
            <p className="w-2/3 text-green-700 font-semibold cursor-pointer" onClick={() => setIsNumber(!isNumber)}>
              Set your phone number here
            </p>
          )}
        </div>
        <div className="flex justify-between  text-[#0B2545] text-sm sm:text-base font-bold ">
          <p className="w-1/3">Address</p>
          {user.address ? (
            <p className="w-2/3">{user.address}</p>
          ) : isAddress ? (
            <input
              onChange={handleChange}
              type="text"
              id="address"
              placeholder="ex: Jl. Raya No. 12..."
              className="w-2/3 border-b-[1px] border-b-[#0B2545] bg-transparent focus:outline-none text-[#0B2545] placeholder-green-700 placeholder:text-sm"
            />
          ) : (
            <p className="w-2/3 text-green-700 font-semibold cursor-pointer" onClick={() => setIsAddress(!isAddress)}>
              Set your address here
            </p>
          )}
        </div>
        <div className="flex justify-between  text-[#0B2545] text-sm sm:text-base font-bold ">
          <p className="w-1/3">Role</p>
          <p className="w-2/3">{user.role}</p>
        </div>
        {user.role === "Costumer" && (
          <p className="text-green-700 font-semibold mx-auto cursor-pointer" onClick={() => setChangeRole(!changeRole)}>
            {changeRole ? "Are you sure?" : "Do you wanna be a seller?"}
          </p>
        )}
        {changeRole && (
          <div className="mx-auto flex gap-2">
            <button className="py-2 w-[100px] bg-red-700 text-[#EEF4ED] rounded-lg" onClick={() => setChangeRole(false)}>
              Cancel
            </button>
            <button type="button" className="py-2  w-[100px] bg-[#0B2545] text-[#EEF4ED] rounded-lg" onClick={() => setUpdatedDataUser({ ...updatedDataUser, role: "Seller" })}>
              Yes
            </button>
          </div>
        )}
        {(changeRole || isNumber || isAddress) && (
          <div className="mx-auto">
            <p className="text-[#0B2545] font-semibold text-center">Save change?</p>
            <div className="mx-auto flex gap-2">
              <button className="py-2 w-[100px] bg-red-700 text-[#EEF4ED] rounded-lg" onClick={() => cancel()}>
                Cancel
              </button>
              <button className="py-2  w-[100px] bg-[#0B2545] text-[#EEF4ED] rounded-lg" onClick={handleUpdateProfile}>
                Yes
              </button>
            </div>
          </div>
        )}
        <button className="p-1 pr-2 hover:opacity-80  w-[max-content] bg-[#0B2545] text-[#EEF4ED] rounded-lg flex absolute top" onClick={() => dispatch(logout()) && navigate("/sign-in")}>
          <TbLogout2 className=" text-2xl mx-auto cursor-pointer" />
        </button>
      </form>
    </div>
  );
}

export default Profile;
