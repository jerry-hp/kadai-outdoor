import logo from "../assets/logo.png";
import { FaInstagram, FaFacebook, FaTiktok, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";
import { BiLogoGmail } from "react-icons/bi";
function Footer() {
  return (
    <div className="bg-[#0B2545]  text-[#EEF4ED] w-full box-border p-2 pb-5 ">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row  justify-between">
        <div className="flex flex-col gap-2 ">
          <img className="w-[200px]" src={logo} alt="" />
          <p className="text-sm">© 2023. All Rights Reserved.</p>
          <p className="text-sm font-bold">Dapatkan promo terbaru dan info lainnya hanya dengan belanja item terbaru!</p>
          <div className="flex gap-4 items-center">
            <FaInstagram />
            <FaFacebook />
            <FaTiktok />
            <FaTwitter />
          </div>
        </div>
        <div className="my-2 sm:my-0">
          <h4 className="font-bold">Bantuan</h4>
          <p className="text-[#9db4c0]">Pengiriman</p>
          <p className="text-[#9db4c0]">Pembayaran</p>
          <p className="text-[#9db4c0]">Tentang akun anda</p>
          <p className="text-[#9db4c0]">Tentang Toko kami</p>
          <p className="text-[#9db4c0]">Syarat dan ketentuan</p>
        </div>
        <div className="flex flex-col gap-1 ">
          <h4 className="font-bold flex gap-1 items-center">
            <RiCustomerService2Line />
            Layanan 24 Jam
          </h4>
          <p className="text-[#9db4c0] flex gap-1 items-center">
            <BiLogoGmail /> jerry17hutariputra@gmail.com
          </p>
          <p className="text-[#9db4c0] flex gap-1 items-center">
            <FaWhatsapp /> 081218634019
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
