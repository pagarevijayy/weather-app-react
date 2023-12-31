import Head from "next/head";
import Weather from "./components/Weather";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  return (
    <>
      <Head>
        <title> Weather App</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22> ⛅️ </text></svg>"
        ></link>
      </Head>
      <main className="bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 min-h-screen flex justify-center items-center p-4">
        <Weather />
      </main>
      <ToastContainer />
    </>
  );
}
