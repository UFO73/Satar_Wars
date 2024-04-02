"use client";
import Header from "@/components/header/header";
import LoadingOverlay from "@/components/loadingOverlay/loadingOverlay";
import StarWarsCharacters from "@/components/starWarsCharacters/starWarsCharacters";
import { useState } from "react";


export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      {/* <LoadingOverlay></LoadingOverlay> */}
      <Header></Header>
      <StarWarsCharacters></StarWarsCharacters>
    </main>
  );
}