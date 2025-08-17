import Footer from "../components/footer/footer";
import MusicPlayer from "../components/musicPlayer/musicPlayer";

export default function Player() {
    return (
        <div className="flex h-[100vh] w-full flex-col items-center justify-center mt-3">
            <div className="flex flex-col items-center justify-center w-8/9 xl:w-1/3 mt-3 xl:p-5 rounded-[8px] relative">
                <video
                    autoPlay
                    muted
                    loop
                    className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-[8px]"
                    src="/video/cccc.mp4"
                />
                <div className="relative z-10 w-full">
                    <MusicPlayer />
                </div>
            </div>
            <div className="pt-30"></div>
            <Footer />
        </div>

    );
}
