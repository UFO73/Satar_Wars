import LoadingOverlay from "@/components/loadingOverlay/loadingOverlay";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <LoadingOverlay></LoadingOverlay>
    </main>
  );
}
