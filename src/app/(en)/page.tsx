import { HomePage, homeMetadata } from "@/views/pages";

export const metadata = homeMetadata("en");
export default function Page() {
  return <HomePage lang="en" />;
}
