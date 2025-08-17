import Image from "next/image";
import Footer from "../components/footer/footer";

export default function Intro() {



  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-3">


      <div className="flex flex-col items-center justify-center bg-[#00313CCC]  w-8/9  xl:w-1/3 mt-3 p-5 rounded-[8px]">
        <Image src="/images/speech.png" alt="Login Image" width={150} height={80} />

        <div className="flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full">


          <input
            className="bg-transparent text-right p-2 w-full text-white text-xs focus:outline-none"
            placeholder="کد 5 رقمی احراز هویت را وارد کنید"
          />
          <div className="w-[1px] h-6 bg-white mx-2"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-6 h-6"
          >
            <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 12H4V8l8 5 8-5v8zm-8-6L4 6h16l-8 4z" />
          </svg>

        </div>


        <div className="flex flex-row w-full">
          <button className="rounded-[4px] p-4 my-2 text-white text-xs w-full bg-[#005C70]">اعتبار سنجی و تکمیل ثبت نام </button>
        </div>



      </div>
      <Footer/>

    </div>
  );
}
