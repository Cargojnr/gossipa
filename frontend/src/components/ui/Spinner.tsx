interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export default function Spinner({ size = "md", color = "border-white" }: SpinnerProps) {
  const sizeClass = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-4",
  }[size];

  return (
    <div
      className={`rounded-full border-t-transparent ${color} animate-spin ${sizeClass} border-solid`}
    />
  );
}
