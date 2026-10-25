---
version: 1
slug: "app-openspire"
primary_target: "app/openspire"
related_targets: ["app/openspire/releases","app/openspire/mac"]
---

## Scope

`/openspire/`（特設サイト）。Experience。リリース記録 `/openspire/releases/` と Mac の注意 `/openspire/mac/` は Read の別ページで、同じ世界の材料を読みやすさ優先で使う。

## Audience and job

Discord やゲームの「作者を応援する」から来た身内の遊び手。見てもらうだけ（ダウンロード・応援の欄なし）。見せ場は石壁「この世界を支えてくれた戦士たち」（meijicocoa・yammo・boku_risky。あとで増える）。

## Direction contract

THESIS: ページそのものがゲームのオープニング。描かれた 8 枚の絵を、下の帯の語りと一緒にスクロールでめくる絵本にする。ゲームの紹介ページによくある「大きな見出し＋機能の札の列」は作らない。

OWN-WORLD: 地は焦げ茶がかった黒 #0f0d0a、語りの帯は半透明の黒、金 #e3b65b・クリーム #f4dca2・本文 #ece6d6。ロゴとローマ数字は Cinzel、語りと本文は M PLUS Rounded 1c。絵はゲームのオープニングの絵（今は 10 枚）を全面に。石壁は Codex の石の碑に、名前を彫り込み（暗い字＋上下の光と影）と金箔で刻む。

STORY: 森と精霊と王の物語を 場面ごとに読む → 森に着いた旅人 4 人（ヴェラ・ルカ・シオン・キナ）に会う → 石壁でこの世界を支えてくれた戦士の名を見る → リリース記録や Mac の注意へ行ける。

FIRST VIEWPORT: オープニングの 1 枚目（精霊とゴーレムの森）が画面いっぱい。上の端に OPEN SPIRE（左）と 旅人・戦士の石壁・リリース記録（右）。下の高さ約 200px の暗い帯の真ん中に「むかし、この森には精霊がいました。」（30px 前後）と 8 つの目盛り。帯の上の右に I / VIII、左に「物語をとばす →」。

FORM: 絵本の場面めくり（場面ごとの区画に、画面いっぱいに貼りつく絵。スクロールで次の場面が上に重なり、対応するブラウザでは場面の中で絵がゲームと同じく左から右へゆっくり流れ、次の絵が溶けて出る）。並べた候補の 4 番目。seed:c5fa61c600da6975。署名の動き: スクロールに連動した横パン（ゲームのオープニングと同じ動き）。CSS のスクロール連動アニメだけで作り、対応しないブラウザでは止まった絵が重なっていく。動きを減らす設定では動かさない。

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- 戦士がこれから増えたときの並べ方（今は 3 人。名前の一覧は data/openspire/warriors.json）。
