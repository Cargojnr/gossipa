import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl font-medium mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button variant="default">Back to Home</Button>
      </Link>
    </div>
  );
}
