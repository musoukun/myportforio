---
name: Open Spire
description: ゲームのオープニングをそのままページにした、焦げ茶がかった黒と金の絵本の世界（/openspire/ 以下だけ）
colors:
  ground: "#0f0d0a"
  ground-raised: "#17130e"
  ground-record-hover: "#221b12"
  gold: "#e3b65b"
  gold-soft: "#f4dca2"
  gold-bright: "#fff3d4"
  text: "#ece6d6"
  text-dim: "#b9ae98"
  text-hero: "#d6ccb8"
  text-narration: "#f6eedb"
  line: "rgba(227, 182, 91, 0.28)"
  fixes: "#ef8a7a"
  features: "#78d1a4"
  changes: "#e3b65b"
  hero-vera: "#c2413a"
  hero-luca: "#4f7fe0"
  hero-shion: "#9a6fd6"
  hero-kina: "#e2b93b"
  stone-ink: "#3a2f21"
  stone-gold-ink: "#5e400c"
  on-gold: "#1b1407"
typography:
  logo:
    fontFamily: "Cinzel, serif"
    fontSize: "clamp(1.15rem, 2.4vw, 1.75rem)"
    fontWeight: 800
    lineHeight: 1.8
    letterSpacing: "0.14em"
  narration:
    fontFamily: "M PLUS Rounded 1c, Hiragino Maru Gothic ProN, Yu Gothic, sans-serif"
    fontSize: "clamp(1.1rem, 2.1vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.7
    letterSpacing: "0.03em"
  section-title:
    fontFamily: "M PLUS Rounded 1c, Hiragino Maru Gothic ProN, Yu Gothic, sans-serif"
    fontSize: "clamp(1.6rem, 3.6vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.35
  page-title:
    fontFamily: "M PLUS Rounded 1c, Hiragino Maru Gothic ProN, Yu Gothic, sans-serif"
    fontSize: "clamp(1.8rem, 5vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1.3
  version:
    fontFamily: "Cinzel, serif"
    fontSize: "1.9rem"
    fontWeight: 800
    lineHeight: 1.2
  body:
    fontFamily: "M PLUS Rounded 1c, Hiragino Maru Gothic ProN, Yu Gothic, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.8
  body-small:
    fontFamily: "M PLUS Rounded 1c, Hiragino Maru Gothic ProN, Yu Gothic, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Cinzel, serif"
    fontSize: "0.8rem"
    fontWeight: 600
    letterSpacing: "0.16em"
  counter:
    fontFamily: "Cinzel, serif"
    fontSize: "clamp(1rem, 1.6vw, 1.35rem)"
    fontWeight: 600
    letterSpacing: "0.22em"
  command:
    fontFamily: "Menlo, Consolas, monospace"
    fontSize: "0.9rem"
    lineHeight: 1.8
rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
  lg: "10px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  page-width: "760px"
  wide-width: "1240px"
components:
  top-bar:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.gold-soft}"
    typography: "{typography.logo}"
    padding: "18px 56px"
  narration-band:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.text-narration}"
    typography: "{typography.narration}"
    padding: "34px 96px 30px"
  record-link:
    backgroundColor: "{colors.ground-raised}"
    textColor: "{colors.gold-soft}"
    rounded: "{rounded.lg}"
    padding: "22px 56px 22px 24px"
  record-link-hover:
    backgroundColor: "{colors.ground-record-hover}"
  version-chip:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.gold-soft}"
    rounded: "{rounded.pill}"
    padding: "2px 14px"
  new-badge:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    rounded: "6px"
    padding: "0 10px"
  step-number:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    rounded: "50%"
    size: "30px"
  command-block:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.text}"
    typography: "{typography.command}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
---

# Design System: Open Spire

このファイルが決めるのは **`/openspire/` とその下のページ（特設サイト、`/openspire/releases/`、`/openspire/mac/`）だけ**。作者のポートフォリオ（`/`）には自分の古い見た目があり、この世界には含めない。そちらにこの色や字を持ち込まない。

## Overview

**Creative North Star: "ゲームのオープニングをめくる絵本"**

ページそのものがゲームのオープニング。描かれた絵が画面いっぱいに貼りつき、スクロールすると次の絵が下から重なってくる。語りは絵の下の暗い帯の真ん中に 1 行だけ。ゲームの画面から飛んできた人が、違うサイトに来たと感じないことを目指している。

地は焦げ茶がかった黒（#0f0d0a）で、そこに金（#e3b65b）とクリームを置く。絵が主役なので、枠や飾りはほとんど足さない。読むページ（リリース記録・Mac の注意）は同じ色と字を使いつつ、飾りをやめて読みやすさを先にする。

ビルドと PRODUCT.md のずれ: PRODUCT.md は地を「暗い青緑〜紺」と書いているが、出来上がったものは焦げ茶がかった黒である。この記録は出来上がった方に従う。

**Key Characteristics:**
- 暗い地に金とクリーム。色は少なく、絵が色を持つ。
- ロゴ・ローマ数字・版番号・名前の刻みは Cinzel、文章は M PLUS Rounded 1c。
- 影は「絵の上で字を読ませる」ためか、石に彫る表現にだけ使う。
- 動きはスクロール連動だけ。動きを減らす設定では止める。
- 角の丸みは小さい（4〜10px）。立ち絵や石は丸めない。

## Colors

地は焦げ茶の黒、差し色は金ひとつ。主人公 4 人の色は立ち絵の足もとにだけ出る。

### Primary
- **古い金** (#e3b65b `gold`): 目盛りの点灯、ページ数字、矢印、フォーカスの輪、「最新」の札、手順の丸。色面として使うときは必ず上に濃い字 (#1b1407) を置く。
- **淡い金のクリーム** (#f4dca2 `gold-soft`): 見出し、ロゴ、リンク、版のチップの字。ホバーでは #fff3d4 に明るくなる。

### Neutral
- **焦げ茶の黒** (#0f0d0a `ground`): ページ全体の地、舞台の地、上の帯と下の縁の地。ブラウザの色（theme-color、スクロールバー）もこれ。
- **一段上の茶** (#17130e `ground-raised`): 記録へのリンクの札の地。ホバーで #221b12。
- **羊皮紙の本文** (#ece6d6 `text`): 本文。
- **くすんだ本文** (#b9ae98 `text-dim`): 日付、導入文、英語名、フッター。
- **語りのクリーム** (#f6eedb `text-narration`): 下の帯の語りだけ。立ち絵の説明文は #d6ccb8 (`text-hero`)。
- **金の細線** (rgba(227,182,91,0.28) `line`): 区切り線、札や枠の線、帯の下線。

### Tertiary
- **リリース記録の 3 色**: 直した不具合は珊瑚 (#ef8a7a)、追加した機能は緑 (#78d1a4)、変えたルール・カードは金 (#e3b65b)。見出しの菱形と各項目の点にだけ使う。
- **主人公の色**: ヴェラ深紅 (#c2413a)、ルカ青 (#4f7fe0)、シオン紫 (#9a6fd6)、キナ黄 (#e2b93b)。名前の下の短い線と足もとの淡い影にだけ使い、面にはしない。（正本は content.ts）
- **石の字の色**: 碑の見出し #3a2f21、名前の金箔 #5e400c。石の上だけ。

### Named Rules
**The One Gold Rule.** 差し色は金ひとつ。リリース記録の 3 色と主人公の色は「分類の印」であって、画面の差し色を増やすものではない。
**The Dark Ground Rule.** 地は #0f0d0a から動かさない。明るい地の面は作らない（石の碑は絵の中のもの）。

## Typography

**Display Font:** Cinzel (serif)、太さ 600 / 800
**Body Font:** M PLUS Rounded 1c (Hiragino Maru Gothic ProN、Yu Gothic、sans-serif)、太さ 400 / 700 / 800
**Label/Mono Font:** コマンド表示だけ Menlo / Consolas / monospace

**Character:** ローマの碑文のような大文字の Cinzel が「物語の世界」の合図で、丸ゴシックが日本語をやさしく読ませる。Cinzel は英字だけ、日本語は必ず丸ゴシック。

### Hierarchy
- **Logo** (800、1.15〜1.75rem、字間 0.14em): 上の帯の OPEN SPIRE。淡い金で、うっすら金の光。
- **語り** (700、1.1〜1.75rem、行間 1.7、字間 0.03em): 帯の 1 行。最大 36em、中央、`text-wrap: balance`。
- **Section title** (800、1.6〜2.5rem、行間 1.35): 特設サイトの各区画の見出し。中央。
- **Page title** (800、1.8〜2.6rem、行間 1.3): 読むページの見出し。
- **Version** (Cinzel 800、1.9rem): リリース記録の版番号。
- **Body** (400、1rem、行間 1.8): 本文。読むページの幅は 760px。
- **Label** (Cinzel 600、0.8rem、字間 0.16em): 主人公の英語名。ページ数字 (I / VIII) は 600、字間 0.22em。

### Named Rules
**The Cinzel Is Latin Rule.** Cinzel はロゴ・ローマ数字・版番号・英語名・石の名前だけ。日本語の文章には使わない。
**The Phrase Break Rule.** 日本語の見出しと語りは `word-break: auto-phrase` と `text-wrap: balance` で、文節の途中で折らない。

## Layout

特設サイトは縦に 4 つの区画が並ぶ。物語 (場面ごとに高さ 240vh、次の場面を -100vh 重ねる) → 旅人 (4 列グリッド、最大 1240px、900px 以下で 2 列) → 戦士の石壁 (3:2、最大 1320px) → 記録へのリンク (2 列、最大 1040px、700px 以下で 1 列)。余白は `clamp()` で画面幅に合わせる。横の余白は `clamp(16px, 4vw, 56px)` が基本。

読むページは幅 760px の 1 列、上 48px・下 80px。版のチップの帯は上の帯の下に貼りつく。上の帯は物語の上では固定で透け、読むページでは地の色で貼りつく。

ブレークポイントは 480 / 640 / 700 / 900px。石壁は 700px 以下で絵を 143% に拡大し、碑を画面の真ん中に寄せる。

## Elevation & Depth

平らな地の上に、絵と暗い帯が重なる。深さは影ではなく「重なり」と「暗さ」で出す。

### Shadow Vocabulary
- **帯の上の影** (`box-shadow: 0 -18px 40px rgba(0,0,0,0.35)`): 語りの帯が絵から浮く。
- **字の影** (`text-shadow: 0 1px 8px rgba(0,0,0,0.8)` 前後): 絵の上のリンクや数字を読ませる。
- **立ち絵の影** (`filter: drop-shadow(0 14px 18px rgba(0,0,0,0.55))`): 立ち絵を地から浮かせる。
- **彫り込み** (`text-shadow` を上に濃い影・下に明るい縁の 2 段): 石の碑の字だけ。

### Named Rules
**The Text Over Art Rule.** 影は、絵の上の字を読ませるか、石の彫りを作るためにだけ使う。札や枠の飾りには使わない。

## Shapes

丸みは小さい。記録の札は 10px、コマンドや版の画像は 8px、帯の数字の下地は 4px、目盛りは 2px。版のチップだけ完全な丸 (999px)、手順の番号も丸。リリース記録の見出しの印は 45° に回した小さな菱形 (9px)、項目の印は丸い点 (6px)。線は 1px の金の細線。絵と碑は丸めない。

## Components

### Top Bar
- 左に OPEN SPIRE (Cinzel)、右に「旅人」「戦士の石壁」「リリース記録」(700、0.95rem、淡い金)。
- 物語の上では黒から透明のグラデーションで固定。読むページでは 94% の黒と下の金の細線で貼りつく。
- ホバーはクリームに明るくなり下線。640px 以下では「旅人」を隠す。

### 語りの帯 (Narration Band)
- 80% の黒の帯の中央に語り 1 行と、8 つの目盛り (26px × 3px、点灯は金)。帯の上に右へ ページ数字、左へ「物語をとばす →」、中央に下向きの矢印。
- 語りは次の場面で左から書かれる (clip-path)。

### 旅人 (Traveler)
- 立ち絵、足もとにその人の色の淡い影、名前 (800)、その人の色の 36px の短い線、英語名 (Cinzel)、説明 (0.92rem、左揃え、最大 24em)。

### 戦士の石壁 (Stone Wall)
- 絵の中の平らな碑の上に、名前を重ねる。位置は絵に対する割合の変数で決め、字の大きさは碑の幅 (container query の `cqi`) に比例させる。
- 名前は Cinzel 800 の金箔の彫り文字。6 人を超えると 2 列で字が小さくなる。見えてくると 1 人ずつ左から刻まれる。左右の松明は明るさがゆらぐ。

### Record Link
- 一段上の茶の地、金の細線、角 10px。ホバーで地と線が明るくなり、矢印が 4px 右へ。

### Version Chip / 最新の札
- チップは丸い角の細線の札、ホバーで金が濃くなる。「最新」の札は金の地に濃い字。

### Release Group
- 見出しは分類の色の菱形つき。項目は薄い区切り線で分け、行頭に分類の色の点。

### Step / Command
- 手順は金の丸に Cinzel の数字。コマンドは黒 40% の地に細線、角 8px、等幅。

## Do's and Don'ts

### Do:
- **Do** 地は #0f0d0a、差し色は金ひとつにする。
- **Do** 絵の上の字には、字の影か暗い下地を付ける。
- **Do** スクロール連動の動きは `animation-timeline` の対応ブラウザだけに付け、`prefers-reduced-motion: no-preference` のときだけ動かす。対応しないブラウザでは止まった絵のまま読めるようにする。
- **Do** 読むページは幅 760px・本文 1rem・行間 1.8 で、飾りは版番号と色の印だけにする。
- **Do** フォーカスは 2px の金の輪 (offset 3px)。

### Don't:
- **Don't** 「大きな見出し + 機能の札の列」のゲーム紹介ページにしない。ダウンロード・応援・連絡の欄は置かない。
- **Don't** ポートフォリオ (`/`) の見た目をこの区画に混ぜない。
- **Don't** 日本語の文章に Cinzel を使わない。
- **Don't** 主人公の色を面や背景に広げない。
- **Don't** 重い 3D の仕掛けを足さない。

### 記録に入れなかったもの
- 上の帯のロゴと「物語をとばす」に `!important` で色を上書きしている。作りの癖であって、規則ではない。
