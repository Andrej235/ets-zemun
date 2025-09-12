"use client";
import dynamic from "next/dynamic";

const Scroller = dynamic(() => import("./scroller"), { ssr: false });
export default Scroller;
