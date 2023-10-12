import React from "react";
import "animate.css";
import { MoveRight } from "lucide-react";
import Link from "next/link";
export default function StatsCard({ props }) {
  return (
    <div class="max-w-sm p-3 group hover:bg-white border border-gray-200 rounded-lg shadow ">
      <div className="mb-5">{props.icon}</div>
      <a href="#">
        <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 ">
          {props.title}
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-500 ">{props.description}</p>
      <Link
        class="inline-flex items-center text-blue-600 hover:underline"
        href="/search"
      >
        {props.hyperlinkText}
        <MoveRight
          size={20}
          className="ml-1 opacity-0 duration-200 group-hover:opacity-100 "
        />
      </Link>
    </div>
  );
}
