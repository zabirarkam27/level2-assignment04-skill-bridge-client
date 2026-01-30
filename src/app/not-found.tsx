import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background px-6 text-center overflow-hidden">
      <div>
        <Image
          src="/404.png"
          alt="Page not found"
          width={500}
          height={400}
          priority
          className="mx-auto"
        />
      </div>
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
        Page Not Found
      </h1>
      <p className="mb-6 max-w-md text-sm text-muted-foreground">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
        Let’s get you back on track.
      </p>
      <Button
        asChild
        className="
          bg-[#611f69] text-white
          hover:bg-[#4a174f]
          dark:bg-[#c084fc]
          dark:text-black
          dark:hover:bg-[#d8b4fe]
        "
      >
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
