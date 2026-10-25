// Open Spire の特設サイトに出す中身。文はゲームの文 (openslaythe の tools/i18n/ja.json) から写した
import releaseNotes from "@/data/openspire/release_notes.json";
import warriorList from "@/data/openspire/warriors.json";

// オープニングの語り。ゲームの scripts/ui/RunIntro.gd の LINES と同じ順 (絵は public/openspire/story/intro_<番号>.webp)
// ゲームのオープニングを変えたら、ここと絵の両方を合わせる
export const STORY_LINES = [
	"北の山の上には王の都が、南の低い土地には精霊の森がありました。そのあいだには、火を吹く山がそびえていました。",
	"むかし、この森には精霊がいました。ゴーレムたちは精霊の光をわけてもらい、森の民とともに森の世話をしていました。",
	"山の上の王は、遠い森の豊かな実りと資源を自分のものにしたいと考えました。",
	"王は、兵士たちを森へ送りだしました。",
	"軍は火の山を越え、長い道のりを南へ進みました。",
	"森のゴーレムたちは精霊とともに、森を守って戦いました。",
	"けれど森は王の軍におさえられ、木は切られ、実りは北の都へ運ばれていきました。",
	"最後に王は精霊の心臓をうばい、自分の王冠に閉じこめました。心臓の光で動く森のゴーレムたちも、王の言いなりになりました。",
	"王は心臓の光でゴーレムの衛兵をつくり、長い年月がたった今も、玉座から森を見下ろしています。",
	"海を渡ってきた旅人が、森の入口にたどり着きました。",
];

export type Hero = {
	id: string;
	name: string;
	nameEn: string;
	description: string;
	// 主人公の色 (ゲームの各主人公の決まりのページの色)。名前の下の線にだけ使う
	color: string;
};

// 主人公の紹介。ゲームの Hero*Content.gd の character_description の日本語
export const HEROES: Hero[] = [
	{
		id: "vera",
		name: "ヴェラ・エンバースケイル",
		nameEn: "Vera Emberscale",
		description:
			"断崖の王国に生まれた半竜の戦士。竜鱗の爪と残り火の翼で、古の森を呑み込んだ暴走する機械仕掛けのゴーレムを引き裂く。",
		color: "#c2413a",
	},
	{
		id: "luca",
		name: "ルカ・アズリーン",
		nameEn: "Luca Azurine",
		description:
			"崖の王都から来た、物静かな少年魔法剣士。宙に浮かぶマナの玉を集め、蒼い光の刃に注ぎ込む。あるいはマナを惜しみなく使い、ひと息に呪文を連ねる。",
		color: "#4f7fe0",
	},
	{
		id: "shion",
		name: "シオン・土御門",
		nameEn: "Shion Tsuchimikado",
		description:
			"紫の法衣に眼鏡の若い祓魔師。釘を放って小さな金槌で打ち込み、札の結界で身を守る。捨てたカードは墓地に眠り、もう一度使うことも、燃やして力に変えることもできる。",
		color: "#9a6fd6",
	},
	{
		id: "kina",
		name: "キナ・ゴールドクレスト",
		nameEn: "Kina Goldcrest",
		description: "霊獣の鳥を呼び、育てて一緒に戦う森の女の子。「召喚」で霊獣が強くなる。敵の攻撃は、ブロック → 霊獣 → キナの順に受ける。",
		color: "#e2b93b",
	},
];

export const WARRIORS: string[] = warriorList.warriors;

export type Release = {
	version: string;
	date: string;
	summary?: string;
	image?: string;
	fixes?: string[];
	features?: string[];
	changes?: string[];
};

// リリース記録。正本はゲームのリポジトリの misc/release_notes.json (リリースのときに tools/release_page/publish_release_page.ps1 が写す)
export const RELEASES: Release[] = releaseNotes.releases;

// 欄の並びと見出し。ゲームの「リリース記録」の画面と同じ順・同じ言葉
export const RELEASE_GROUPS = [
	{ key: "fixes", title: "直した不具合" },
	{ key: "features", title: "追加した機能" },
	{ key: "changes", title: "変えたルール・カード" },
] as const;

// "2026-10-22" → "2026年10月22日"
export function formatDate(value: string): string {
	const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
	return m ? `${m[1]}年${Number(m[2])}月${Number(m[3])}日` : value;
}

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
