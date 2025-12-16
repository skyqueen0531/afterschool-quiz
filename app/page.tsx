
import Link from 'next/link';
export default function Home() {
  return (
    <main style={{padding:20}}>
      <h1>課後複習測驗</h1>
      <p>Google 登入後即可開始測驗</p>
      <Link href="/quiz">開始測驗</Link>
    </main>
  );
}
