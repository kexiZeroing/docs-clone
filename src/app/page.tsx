import Link from "next/link";

const Home = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      Click <Link href="/documents/1">
      <span className="text-blue-500 underline px-1">here</span>
      </Link>
      to go to a document
    </div>
  )
};

export default Home;