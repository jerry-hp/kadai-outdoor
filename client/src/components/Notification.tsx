import { FaTag } from "react-icons/fa6";
function Notification() {
  return (
    <div className="flex flex-col box-border  gap-[3px]">
      <div className="flex flex-row gap-1 h-14   overflow-hidden box-border p-1 shadow-[0_0px_3px_0_rgba(0,0,0,0.2)]">
        <img className="w-[20%] h-full rounded-[2px]" src="https://images.tokopedia.net/img/cache/100-square/VqbcmM/2022/3/5/5c1a2f47-954d-4686-8b84-6589670abd34.jpg.webp?ect=4g" alt="" />
        <div className="flex flex-col w-[80%] ">
          <h4 className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            Product Name Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet exercitationem perferendis assumenda animi commodi aspernatur distinctio est, nobis quaerat accusantium!
          </h4>
          <p className="flex gap-1 items-center">
            <FaTag />
            Rp. 100.000
          </p>
        </div>
      </div>
    </div>
  );
}

export default Notification;
