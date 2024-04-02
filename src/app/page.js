"use client";
import Header from "@/components/header/header";
import LoadingOverlay from "@/components/loadingOverlay/loadingOverlay";
import StarWarsCharacters from "@/components/starWarsCharacters/starWarsCharacters";

export default function Home() {

  return (
    <main className="p-4">
      <LoadingOverlay></LoadingOverlay>
      <Header></Header>
      <StarWarsCharacters></StarWarsCharacters>
    </main>
  );
}