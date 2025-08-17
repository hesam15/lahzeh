"use client";

import Image from "next/image";
import Footer from "../components/footer/footer";
import Tabs from "../components/tab/tab";
import PodcastRow from "../components/podcastRow/podcastRow";
import { GiNightSleep } from "react-icons/gi";
import { RiVipCrown2Line } from "react-icons/ri";


export default function ProfileDownload() {

  const tabs = [
    {
      id: "tab1", label: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
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

    {
      id: "tab2", label: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
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
      id: "tab3", label: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="3" y="3" width="7" height="9" />
        <rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" />
        <rect x="3" y="16" width="7" height="5" />
      </svg>
      , content:
        <div className="flex flex-col items-center justify-center ">

        </div>
    },
  ];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-3">


      <div className="flex flex-col items-center justify-center w-full  xl:w-1/3 mt-3 rounded-[8px]"  style={{ background: "linear-gradient(191.3deg, #007994 8.77%, #00333E 96.66%)" }}>
        {/* تصویر فول اسکرین */}
        <div className="w-full flex flex-row itexms-center justify-between">
          <Image
            src="/images/woman avatar.png"
            alt="Profile Avatar" 
            className="rounded-full w-[100px] h-[100px] object-cover ml-6 mt-6"
            width={100}
            height={100}
          />

          <div className="flex flex-col text-white items-end justify-right ">
          <h2 className="w-full text-right text-3xl text-white font-bold my-5">دریا پناهی </h2>


            <div className="flex flex-col text-white items-end justify-right m-3">
              <div className="flex flex-row text-right text-xs items-center whitespace-nowrap m-2">
                <span className="font-bold">۰۸:۳۰:۰۰</span>
                <span className="ml-2">:زمان بیدار شدن</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="flex flex-row text-right text-xs items-center whitespace-nowrap m-2">
                <span className="font-bold"> ۰۸:۳۰:۰۰</span>
                <span className="ml-2">:زمان خوابیدن</span>
                <GiNightSleep className="ml-2" size={20} color="white"/>


              </div>
              <div className="flex flex-row text-right text-xs items-center whitespace-nowrap m-2">
                <span className="font-bold"> ۰۸:۳۰:۰۰</span>
                <span className="ml-2">:اشتراک ویژه</span>
                <RiVipCrown2Line  className="ml-2" size={20} color="white"/>

              </div>
            </div>

          </div>

        </div>


        <div className="flex w-full  flex-row  text-white items-center justify-between m-3 font-bold">
          <span>ID : 458922</span>
          <span className="text-right text-xs text-yellow-300" style={{ direction: "rtl", unicodeBidi: "embed" }}>
            ۲۰ روز و ۱۸ ساعت تا پایان اشتراک ویژه
          </span>
                  </div>
        <Tabs tabs={tabs} />




      </div>
      <div className="mt-30"></div>


      <Footer />

    </div>
  );
}
