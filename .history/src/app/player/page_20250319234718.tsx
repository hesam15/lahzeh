import Footer from "../components/footer/footer";
import MusicPlayer from "../components/musicPlayer/musicPlayer";

export default function Player() {
    return (
        <div className="flex h-[90vh] w-full flex-col items-center justify-center mt-3">
            <div className="flex flex-col items-center justify-center  bg-[#e1e5f2]  w-8/9  xl:w-1/3 mt-3 p-5 rounded-[8px]">
                <MusicPlayer />
            </div>
            <div className="mt-30"></div>
            <Footer />
        </div>

    );
}
