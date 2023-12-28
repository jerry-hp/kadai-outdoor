import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice";
import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import useProfile from "../hooks/useProfile";
import { FaEdit } from "react-icons/fa";
function Profile() {
  const user = useSelector((state: any) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isNumber, setIsNumber, isAddress, setIsAddress, cancel, handleChange, handleUpdateProfile, isName, setIsName, isEmail, setIsEmail } = useProfile();

  return (
    <div className="max-w-6xl mx-auto box-border p-2 sm:p-0 min-h-screen ">
      <form action="" className=" shadow-[0_0_5px_0_#0B2545] mx-auto mt-16 sm:mt-24 box-border p-2 sm:p-5 flex flex-col gap-1 sm:gap-2 rounded-lg sm:w-[50%] lg:w-[40%] relative">
        <img src={user.image} alt="" className="w-20 h-20 rounded-full mx-auto" />
        {/* name */}
        <div className="flex justify-between  text-[#0B2545] text-sm sm:text-base font-bold ">
          <p className="w-1/3">Name</p>
          {!isName && user.username ? (
            <div className="w-2/3 flex items-center gap-1">
              <p>{user.username}</p>
              <FaEdit onClick={() => setIsName(!isName)} />
            </div>
          ) : (
            <input
              onChange={handleChange}
              type="text"
              id="username"
              placeholder="ex: jerry hp"
              className="w-2/3 border-b-[1px] border-b-[#0B2545] bg-transparent focus:outline-none text-[#0B2545]  placeholder-green-700 placeholder:text-sm"
            />
          )}
        </div>
        <div className="flex justify-between  text-[#0B2545] text-sm sm:text-base font-bold ">
          <p className="w-1/3">Email</p>
          {!isEmail ? (
            <div className="w-2/3 flex gap-1 items-center">
              <p>{user.email}</p>
              <FaEdit onClick={() => setIsEmail(!isEmail)} />
            </div>
          ) : (
            <input
              onChange={handleChange}
              type="text"
              id="newEmail"
              placeholder="ex: j@Gmail.com"
              className="w-2/3 border-b-[1px] border-b-[#0B2545] bg-transparent focus:outline-none text-[#0B2545]  placeholder-green-700 placeholder:text-sm"
            />
          )}
        </div>
        {/* phone */}
        <div className="flex   text-[#0B2545] text-sm sm:text-base font-bold ">
          <p className="w-1/3">Phone number</p>
          {!isNumber && user.phone && (
            <div className="w-2/3 items-center flex gap-1">
              <p className="">{user.phone}</p>
              <FaEdit onClick={() => setIsNumber(!isNumber)} />
            </div>
          )}
          {isNumber ? (
            <input
              onChange={handleChange}
              type="text"
              id="phone"
              placeholder="ex: 081234567890"
              className="w-2/3 border-b-[1px] border-b-[#0B2545] bg-transparent focus:outline-none text-[#0B2545]  placeholder-green-700 placeholder:text-sm"
            />
          ) : (
            !user.phone && (
              <p className="w-2/3 text-green-700 font-semibold cursor-pointer" onClick={() => setIsNumber(!isNumber)}>
                Set your phone number here
              </p>
            )
          )}
        </div>
        {/* address */}
        <div className="flex justify-between  text-[#0B2545] text-sm sm:text-base font-bold ">
          <p className="w-1/3">Address</p>
          {!isAddress && user.address && (
            <div className="w-2/3 flex gap-1 items-center">
              <p>{user.address}</p>
              <FaEdit onClick={() => setIsAddress(!isAddress)} />
            </div>
          )}
          {isAddress ? (
            <input
              onChange={handleChange}
              type="text"
              id="address"
              placeholder="ex: Jl. Raya No. 12..."
              className="w-2/3 border-b-[1px] border-b-[#0B2545] bg-transparent focus:outline-none text-[#0B2545] placeholder-green-700 placeholder:text-sm"
            />
          ) : (
            !user.address && (
              <p className="w-2/3 text-green-700 font-semibold cursor-pointer" onClick={() => setIsAddress(!isAddress)}>
                Set your address here
              </p>
            )
          )}
        </div>
        {(isNumber || isAddress || isName || isEmail) && (
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
