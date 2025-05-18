# Next.js + Supabase TODOアプリ

Next.jsとSupabaseを使用したTODOアプリケーションです。

## 必要条件

- Node.js 18以上
- Docker Desktop
- Supabase CLI

## セットアップ手順

1. リポジトリのクローン
```bash
git clone https://github.com/clab-to/todo-next.js.git
cd todo-next.js
```

2. 依存関係のインストール
```bash
npm install
```

3. Supabase CLIのインストール（macOS）
```bash
brew install supabase/tap/supabase
```

4. ローカルSupabaseの初期化と起動
```bash
supabase init
supabase start
```

5. 環境変数の設定
`.env`ファイルを作成し、以下の内容を追加：
```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

6. データベースのセットアップ
Supabaseのダッシュボード（http://127.0.0.1:54323）にアクセスし、SQLエディタで以下のSQLを実行：
```sql
create table todos (
  id uuid default gen_random_uuid() primary key,
  text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

7. 開発サーバーの起動
```bash
npm run dev
```

8. アプリケーションにアクセス
ブラウザで http://localhost:3000 にアクセス

## 機能

- TODOの追加
- TODOの一覧表示
- TODOの削除

## 技術スタック

- Next.js 15
- TypeScript
- Supabase（ローカル）
- Tailwind CSS

## はじめ方

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、アプリケーションが表示されます。

### アプリケーションの編集

- `app/page.tsx` を編集することで、メインページの内容を変更できます
- `app/api/todos/route.ts` でTODOの取得と追加のAPIを管理しています
- `app/api/todos/[id]/route.ts` でTODOの削除APIを管理しています

### データベースの確認

1. Supabaseダッシュボード（http://127.0.0.1:54323）にアクセス
2. 左側のメニューから「Table Editor」を選択
3. `todos`テーブルを選択して、データの確認や編集が可能

### 環境変数の管理

- `.env`ファイルで環境変数を管理しています
- 本番環境では、適切な環境変数を設定してください

## デプロイ

このアプリケーションは以下の方法でデプロイできます：

1. **Vercel**（推奨）
   - [Vercel Platform](https://vercel.com/new)からデプロイ可能
   - GitHubリポジトリと連携して自動デプロイも可能

2. **その他のプラットフォーム**
   - Dockerコンテナとしてデプロイ
   - その他のホスティングサービス（Netlify, AWS, GCP等）

## トラブルシューティング

### よくある問題

1. **ポート3000が使用中の場合**
   - 別のポート（例：3001）が自動的に使用されます
   - ブラウザで http://localhost:3001 にアクセスしてください

2. **Supabaseに接続できない場合**
   - Docker Desktopが起動しているか確認
   - `supabase start`コマンドを再実行

3. **TODOが保存されない場合**
   - ブラウザのコンソールでエラーを確認
   - Supabaseダッシュボードでテーブルが正しく作成されているか確認
