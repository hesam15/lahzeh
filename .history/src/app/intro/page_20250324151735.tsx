import Image from "next/image";
import Footer from "../components/footer/footer";
import CustomVideoPlayer from "../components/videoPlayer/videoPlayer";
import { IoCloseOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Intro() {

  const router = useRouter();

  const handleClick = () => {
    router.push('/home');
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-3">
      <button className="absolute left-2 top-2" onClick={handleClick}>
        <IoCloseOutline color="red" size={40}/>

      </button>


      <div className="flex flex-col items-center justify-center w-8/9  xl:w-1/3 mt-3 p-5 rounded-[8px] text-white">
        <Image src="/images/woman meditating.png" alt="Login Image" width={200} height={80} />
        <h3 className="text-right text-xl my-7">معرفی لحظه</h3>
        <CustomVideoPlayer />

        <p className="text-right text-xs my-7">کاربر عزیز به شما پیشنهاد میکنیم که حتما برای آشنایی کامل با ما و برنامه این ویدیو رو بصورت کامل  ببینی تا بتونی بهترین کاربری رو تجربه کنی </p>



      </div>
      <div className="mt-30"></div>

      <Footer />

    </div>
  );
}
