
'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Quiz() {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('questions')
        .select('*')
        .order('random()')
        .limit(10);
      setQuestions(data || []);
    })();
  }, []);

  return (
    <main style={{padding:20}}>
      <h2>測驗中（示範版）</h2>
      {questions.map((q, i) => (
        <div key={q.id} style={{marginBottom:16}}>
          <p>{i+1}. {q.text}</p>
          {q.options?.map((o:string)=> <div key={o}>{o}</div>)}
        </div>
      ))}
    </main>
  );
}
