import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-screen bg-gray-100">
      <Head>
        <script defer src="../path/to/flowbite/dist/flowbite.js"></script>
      </Head>
      <body className="h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
