import Image from "next/image";
import Page from "@/app/Dashboard/page";
import Admin from "@/app/Admin/admin";
export default function Home() {
  return (
    <main>
      <Page/>
      <Admin/>
    </main>
  );
}
