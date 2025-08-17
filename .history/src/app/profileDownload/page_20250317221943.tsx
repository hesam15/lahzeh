"use client";

import Image from "next/image";
import Footer from "../components/footer/footer";
import Tabs from "../components/tab/tab";
import PodcastRow from "../components/podcastRow/podcastRow";


export default function ProfileDownload() {

  const tabs = [
    {
      id: "tab1", label: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="w-8 h-8">
        <rect x="3" y="3" width="7" height="9" />
        <rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" />
        <rect x="3" y="16" width="7" height="5" />
      </svg>
      , content:
        <div className="flex flex-col items-center justify-center ">

        </div>
    },
    {
      id: "tab2", label: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="w-8 h-8">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      , content:
        <div className="text-white text-right my-6 flex flex-col items-center justify-center w-full ">

          <div className="flex flex-col">
            <PodcastRow />
            <PodcastRow />
            <PodcastRow />
            <PodcastRow />
          </div>


        </div>
    },

    {
      id: "tab3", label: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
        <path d="M5 3v18l7-5 7 5V3z" />
      </svg>
      , content:
        <div className="text-white text-right my-6 flex flex-col items-center justify-center w-full ">

          <div className="flex flex-col">
            <PodcastRow />
            <PodcastRow />
            <PodcastRow />
            <PodcastRow />
          </div>


        </div>
    },
  ];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-3">


      <div className="flex flex-col items-center justify-center bg-[#00313CCC]  w-8/9  xl:w-1/3 mt-3 p-5 rounded-[8px]">
        {/* تصویر فول اسکرین */}
        <div className="w-full flex flex-row itexms-center justify-between">
          <Image
            src="/images/vip.png"
            alt="Background Image"
            className=" rounded-[300px]"
            width={200}
            height={200}
          />

          <div className="flex flex-col text-white items-center justify-center">
            <h2 className="w-full text-right text-2xl text-white ">دریا پناهی </h2>
            <h3 className="text-gray-500">۰۹۳۶۹۴۹۱۹۴۲</h3>
            <h4 className="text-gray-500">User ID : 458922</h4>

            <div className="flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>

            </div>
          </div>
        </div>


        <Tabs tabs={tabs} />




      </div>


      <Footer />

    </div>
  );
}
