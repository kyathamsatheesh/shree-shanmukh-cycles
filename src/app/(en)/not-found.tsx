import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-start gap-4 py-24">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Link href="/" className="font-semibold text-brand underline">Go to the home page</Link>
    </div>
  );
}
