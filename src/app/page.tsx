"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Preloader from "./preloader/page";


export default function Home() {
  const router = useRouter();
  
  console.log('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 2000);

    return () => clearTimeout(timer); 
  }, [router]);

  return (
    <div className="rtl">
      <Preloader />
    </div>
  );
}