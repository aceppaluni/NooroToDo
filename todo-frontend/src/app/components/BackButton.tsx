"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  label?: string; // optional custom label
  className?: string; // optional extra styling
};

export default function BackButton({ label = "Back", className = "" }: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`bg-black-200 text-white px-4 py-2 ${className}`}
    >
      {label}
    </button>
  );
}
