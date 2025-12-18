'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function QuizPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .limit(10);

      if (error) {
        console.error(error);
        setError('題目載入失敗');
      } else {
        setQuestions(data || []);
      }

      setLoading(false);
    };

    loadQuestions();
  }, []);

  if (loading) {
    return <main style={{ padding: 20 }}>載入題目中...</main>;
  }

  if (error) {
    return <main style={{ padding: 20, color: 'red' }}>{error}</main>;
  }

  return (
    <main style={{ padding: 20 }}>
      <h2>測驗中（示範版）</h2>

      {questions.length === 0 && (
        <p>目前沒有題目，請確認題庫是否已匯入。</p>
      )}

      {questions.map((q, index) => (
        <div key={q.id} style={{ marginBottom: 20 }}>
          <p>
            {index + 1}. {q.text}
          </p>

          {Array.isArray(q.options) &&
            q.options.map((opt: string, i: number) => (
              <div key={i}>• {opt}</div>
            ))}
        </div>
      ))}
    </main>
  );
}
