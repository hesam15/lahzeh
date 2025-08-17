import Loader from "./components/loader/loader";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">

      <h1 className="text-6xl text-white mb-50">[LOGO]</h1>

      <Loader />
      <h1>لحظه</h1>
      <h2>ترجیحا یک متن شعاری</h2>
      <h3>V 1.0.0</h3>

    </div>
  );
}
