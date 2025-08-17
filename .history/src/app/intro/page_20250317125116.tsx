import Image from "next/image";
import Footer from "../components/footer/footer";
import CustomVideoPlayer from "../components/videoPlayer/videoPlayer";

export default function Intro() {



  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-3">


      <div className="flex flex-col items-center justify-center bg-[#00313CCC]  w-8/9  xl:w-1/3 mt-3 p-5 rounded-[8px]">
        <Image src="/images/woman meditating.png" alt="Login Image" width={150} height={80} />
        <CustomVideoPlayer />

        <p className="text-right text-xs text-white my-">کاربر عزیز به شما پیشنهاد میکنیم که حتما برای آشنایی کامل با ما و برنامه این ویدیو رو بصورت کامل  ببینی تا بتونی بهترین کاربری رو تجربه کنی </p>



      </div>
      <Footer />

    </div>
  );
}
