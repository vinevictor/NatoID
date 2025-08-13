// /components/ui/StateMessage.tsx

import React from "react";
import { RiInformation2Fill, RiErrorWarningFill } from "react-icons/ri";

interface StateMessageProps {
  type: "info" | "error";
  title: string;
  message: string;
}

export const StateMessage = ({ type, title, message }: StateMessageProps) => {
  const isError = type === "error";
  const Icon = isError ? RiErrorWarningFill : RiInformation2Fill;
  const colors = isError
    ? "bg-red-50 text-red-700 border-red-200"
    : "bg-blue-50 text-blue-700 border-blue-200";

  return (
    <div
      className={`p-4 rounded-lg border ${colors} flex items-start gap-4 mt-4`}
    >
      <Icon className="w-6 h-6 mt-1 flex-shrink-0" />
      <div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p>{message}</p>
      </div>
    </div>
  );
};
