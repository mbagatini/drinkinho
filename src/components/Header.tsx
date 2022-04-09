import Head from "next/head";
import { NavMenu } from "./Menu";

export function Header() {
  return (
    <>
      <Head>
        <title>Drinkinho.co</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavMenu />
    </>
  );
}
