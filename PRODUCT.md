# Product

<!-- impeccable:product-schema 1 -->

この記録は、作者（musoukun）のサイトの中の **Open Spire の区画（`/openspire/` 以下と `/api/openspire/`）** についてのもの。サイトのほかの部分（ポートフォリオ）はまだ記録していない。

## Platform

web

## Users

- **身内の遊び手**: 作者が Discord で配ったインストーラーで Open Spire を遊んでいる友達。ゲームのタイトル画面の「作者を応援する」「リリース記録」から、またはリリースの Discord の知らせのリンクから来る。スマホで Discord から開くことも、PC でゲームから開くこともある。
- **作者本人**: リリースのたびに、リリース記録をこのサイトに載せる。

## Product Purpose

Open Spire（Slay the Spire 風のデッキ構築ローグライク。Godot 製。作者が個人で作り、身内に配っている）の、ゲームの外の居場所。

- **特設サイト** `/openspire/`: ゲームの世界と主人公を見せ、ゲームをクリアした人の名前を石壁に刻んで残す。来た人には「見てもらうだけ」でよい（応援の欄・寄付・連絡の欄は置かない）。
- **リリース記録** `/openspire/releases/`: 版ごとに「直した不具合」「追加した機能」「変えたルール・カード」を読む。ゲームの中の「リリース記録」の画面と同じ中身。特設サイトから行ける別のページ。
- **Mac 版のインストールの注意** `/openspire/mac/`: Mac で開けないときの手順。
- **不具合報告の受け口** `/api/openspire/bug-report`: ゲームの「不具合を報告」から届いた報告を GitHub の issue にし、Discord に知らせる（画面なし）。

## Capabilities and Constraints

- Next.js（App Router）を Vercel に置いている。デプロイは作者の PC から `vercel deploy --prod`。
- リリース記録の中身の正本はゲームのリポジトリ（musoukun/openslaythe）の `misc/release_notes.json`。リリースの作業のときに、ゲームのリポジトリのスクリプトがこのサイトの `data/openspire/` に写して公開する。
- **ダウンロードのリンクは載せない**（2026-10-26 ユーザー）。配布は今どおり Discord で身内にだけ送る。
- 受け口の鍵（GitHub の token・Discord の Webhook）は Vercel の環境変数にだけ置く。
- 前の版のゲームは Google Apps Script の受け口に送り続けるので、そちらは残す。
- Three.js などの重い仕掛けは使わない。まずはシンプルに（ユーザー）。

## Brand Commitments

- 名前は「Open Spire」。ロゴの字は Cinzel、本文は M PLUS Rounded 1c（ゲームとリリース記録のページで使っている）。
- 色は、焦げ茶がかった黒の地（`#0f0d0a`）に金（`#e3b65b`）とクリーム。ゲームのタイトル画面と同じ金とクリームを使う（地の色の正本は DESIGN.md）。
- 絵はゲームのもの（主人公 4 人の立ち絵、幕の背景、ボスの背景、オープニングの絵）を使う。
- 文は日本語。遊ぶ人に向けた、ふつうのやさしい言葉。

## Evidence on Hand

- 主人公 4 人の立ち絵: Vera（深紅の竜人の拳闘士）・Luca（青いローブの少年）・シオン（紫の祓魔師。ID は noa）・キナ（霊獣を呼ぶ黄色の女の子）。ゲームのリポジトリの `sprites/ui/hero_standing*.png`。
- 背景: `external/sprites/backgrounds/`（幕 1〜3・休憩所・ボス 11 体分）、オープニング `external/sprites/intro/intro_1〜8.png`、タイトル `sprites/ui/title_background.png`。
- クリアした人（2026-10-26 ユーザー確定）: meijicocoa・yammo・boku_risky。「この世界を支えてくれた戦士たち」として石壁に刻む（見出しの文言は 2026-10-26 ユーザー指定）。あとから人が増える。
- リリース記録は v0.1.0（2026-10-22）から。v0.3.0 には紹介の絵がある。
- 遊んだ人の感想・レビュー・数字（遊んだ人数など）は手元に無い。作らない。

## Product Principles

1. ゲームの中と外で同じ世界に見える（タイトル画面から飛んできて、違うサイトに来たと感じさせない）。
2. 遊んだ人が主役。クリアした人の名前がいちばんの見せ場。
3. 読むページ（リリース記録・Mac の注意）は読みやすさが先。飾りは特設サイトに寄せる。
4. 軽く速く。スマホの Discord から開いてもすぐ読める。
