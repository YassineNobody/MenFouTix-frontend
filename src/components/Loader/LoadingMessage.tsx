import type { JSX } from "react";
import SpinnerLoader from "../Spinner/Loader";

interface LoadingMessageProps {
  label?: string;
  size?: number;
}

export const LoadingMessage = ({
  label = "Loading ...",
  size = 100,
  ...rest
}: LoadingMessageProps): JSX.Element => {
  return (
    <div className="flex grow justify-center items-center" {...rest}>
      <div className="flex flex-col items-center gap-4">
        <SpinnerLoader size={size} />
        <h1 className="text-center text-xl font-semibold text-black dark:text-white">{label}</h1>
      </div>
    </div>
  );
};
