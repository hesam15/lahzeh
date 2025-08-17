import Loader from "../components/loader/loader";

export default function Preloader() {
  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center">

      <Image
        src="/images/logo.png"
        alt="Logo"
        width={200}
        height={200}
        className="mb-30"
      />

      <Loader />
      <h1 className="text-3xl font-bolder text-white my-4">لحظه</h1>
      <h2 className="text-white my-4">ترجیحا یک متن شعاری</h2>
      <h3 className="text-white my-4">V 1.0.0</h3>

    </div>
  );
}
