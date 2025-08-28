import React, { ButtonHTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>; 

export default function Button({ children, className, ...props }: Props) {
  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded-md ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}