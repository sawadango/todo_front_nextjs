import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container">
        <h1>hello</h1>
        <Link href="tasks">タスク一覧へ</Link>
      </div>
    </>
  );
}
