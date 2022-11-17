import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from "../components/login-btn";

export const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cyclist Studio App</title>
      </Head>

      <main>
        <h2>Welcome</h2>
        <Button />
      </main>
    </div>
  );
};

// noinspection JSUnusedGlobalSymbols
export default Home;
