// 超基礎英語 — 26 topics for business / aquaculture context

export const basicTopics = [

  // ─────────────────────────────────────────
  // 1. 曜日
  // ─────────────────────────────────────────
  {
    id: 1,
    emoji: "📅",
    title: "曜日",
    subtitle: "Days of the Week",
    columns: ["日本語", "English", "略語", "読み方"],
    rows: [
      ["月曜日", "Monday", "Mon", "マンデイ"],
      ["火曜日", "Tuesday", "Tue", "チューズデイ"],
      ["水曜日", "Wednesday", "Wed", "ウェンズデイ（d は黙字）"],
      ["木曜日", "Thursday", "Thu", "サーズデイ（th に注意）"],
      ["金曜日", "Friday", "Fri", "フライデイ"],
      ["土曜日", "Saturday", "Sat", "サタデイ"],
      ["日曜日", "Sunday", "Sun", "サンデイ"],
    ],
    usage: [
      "前置詞は必ず on：on Monday / on Thursday afternoon",
      "日程調整：\"Are you available next Wednesday?\"",
      "締め切り：\"Please send the report by Friday.\"",
      "メール件名の略語：\"Meeting — Wed 5 Jun\"",
    ],
    notes: [
      "Wednesday の d は発音しない→「ウェンズデイ」（ウェドネスデイは誤り）",
      "Thursday の th は「サ」の音に近い",
      "週の始まり：アメリカ＝日曜始まり / ヨーロッパ・日本＝月曜始まり",
      "\"this Monday\" と \"next Monday\" は話者により解釈が違う場合があるので要確認",
    ],
    examples: [
      { english: "I will be out of office on Monday.", japanese: "月曜日は外出のため不在です。" },
      { english: "Could we schedule the call for next Thursday?", japanese: "来週木曜日に電話会議を設定できますか？" },
      { english: "The deadline is this Friday, June 6.", japanese: "締め切りは今週金曜6月6日です。" },
      { english: "I am available on Tuesday and Thursday mornings.", japanese: "火曜と木曜の午前中が対応可能です。" },
      { english: "Let's have a Wednesday meeting to review the P&ID.", japanese: "P&IDの確認は水曜の会議で行いましょう。" },
    ],
  },

  // ─────────────────────────────────────────
  // 2. 月
  // ─────────────────────────────────────────
  {
    id: 2,
    emoji: "🗓️",
    title: "月",
    subtitle: "Months of the Year",
    columns: ["日本語", "English", "略語", "読み方"],
    rows: [
      ["1月", "January", "Jan", "ジャニュアリー"],
      ["2月", "February", "Feb", "フェブラリー（r が2つ）"],
      ["3月", "March", "Mar", "マーチ"],
      ["4月", "April", "Apr", "エイプリル"],
      ["5月", "May", "May", "メイ（略語なし）"],
      ["6月", "June", "Jun", "ジューン"],
      ["7月", "July", "Jul", "ジュライ"],
      ["8月", "August", "Aug", "オーガスト"],
      ["9月", "September", "Sep/Sept", "セプテンバー"],
      ["10月", "October", "Oct", "オクトーバー"],
      ["11月", "November", "Nov", "ノベンバー"],
      ["12月", "December", "Dec", "ディセンバー"],
    ],
    usage: [
      "前置詞は in：in January / in December",
      "メールでは月名をフルスペルで：\"Please deliver by March 15.\"",
      "略語はカレンダーや件名に：\"Site visit — Aug 20\"",
      "期間：\"The project runs from April to September.\"",
    ],
    notes: [
      "May は略語なし（すでに3文字）",
      "February は「フェブアリー」と略して発音されることも多い",
      "September の略語は Sep と Sept の両方が正しい",
      "月の前は in（曜日と違う：on Monday / in June）",
    ],
    examples: [
      { english: "Please submit the document by January 31.", japanese: "書類を1月31日までにご提出ください。" },
      { english: "The project will start in April.", japanese: "プロジェクトは4月に開始します。" },
      { english: "We are planning a site visit in August.", japanese: "8月に現場視察を予定しています。" },
      { english: "The handover is scheduled for December 20.", japanese: "引き渡しは12月20日を予定しています。" },
      { english: "Can we reschedule the delivery to November?", japanese: "納品を11月に変更できますか？" },
    ],
  },

  // ─────────────────────────────────────────
  // 3. 季節
  // ─────────────────────────────────────────
  {
    id: 3,
    emoji: "🌸",
    title: "季節",
    subtitle: "Seasons",
    columns: ["日本語", "US English", "UK English", "読み方"],
    rows: [
      ["春", "spring", "spring", "スプリング"],
      ["夏", "summer", "summer", "サマー"],
      ["秋", "fall", "autumn", "フォール / オータム"],
      ["冬", "winter", "winter", "ウィンター"],
    ],
    usage: [
      "前置詞は in：in spring / in winter",
      "プロジェクトの目安に：\"We plan to complete Phase 1 by summer.\"",
      "天気の雑談に：\"How is Norway in winter?\"",
    ],
    notes: [
      "秋は米国＝fall、英国・ノルウェー＝autumn（どちらも通じる）",
      "Nofitechなどノルウェー系企業との会話では autumn が自然",
      "季節は小文字：\"in spring\" ○ / \"in Spring\" ×",
      "ノルウェーの夏は 15〜20°C 程度（日本の初秋に近い）",
    ],
    examples: [
      { english: "The installation is planned for next spring.", japanese: "設置は来春の予定です。" },
      { english: "Norway has very cold, long winters.", japanese: "ノルウェーの冬はとても寒く長いです。" },
      { english: "The project will be completed by autumn.", japanese: "プロジェクトは秋までに完了します。" },
      { english: "How's the weather in Norway in summer?", japanese: "ノルウェーの夏の気候はどうですか？" },
      { english: "We visited the exhibition in fall last year.", japanese: "昨年の秋に展示会を訪問しました。" },
    ],
  },

  // ─────────────────────────────────────────
  // 4. 天気
  // ─────────────────────────────────────────
  {
    id: 4,
    emoji: "☀️",
    title: "天気",
    subtitle: "Weather",
    columns: ["日本語", "English", "読み方"],
    rows: [
      ["晴れ", "sunny / clear", "サニー / クリア"],
      ["曇り", "cloudy", "クラウディ"],
      ["雨降り", "rainy", "レイニー"],
      ["風が強い", "windy", "ウィンディ"],
      ["雪", "snowy", "スノーウィ"],
      ["霧", "foggy", "フォギー"],
      ["暑い", "hot", "ホット"],
      ["暖かい", "warm", "ウォーム"],
      ["涼しい", "cool", "クール"],
      ["寒い", "cold", "コールド"],
      ["氷点下", "freezing", "フリージング"],
      ["湿気が多い", "humid", "ヒューミッド"],
      ["乾燥", "dry", "ドライ"],
      ["大雨", "heavy rain", "ヘビー レイン"],
      ["小雨・霧雨", "drizzle", "ドリズル"],
    ],
    usage: [
      "雑談の定番：\"How's the weather over there?\"",
      "現在の天気：\"It's sunny today.\" / \"It's been raining all week.\"",
      "出張・展示会前後の会話として自然に使える",
    ],
    notes: [
      "\"rainy\" は天気の状態 / \"it's raining\" は今降っている最中",
      "\"How's the weather?\" が自然（How is より短縮形が口語的）",
      "\"freezing\" は比喩的に「ものすごく寒い」の意味でも使う",
      "\"heavy snow\" = 大雪 / \"light snow\" = 小雪",
    ],
    examples: [
      { english: "It's quite cold in Bergen in January.", japanese: "ベルゲンの1月はかなり寒いです。" },
      { english: "How's the weather in Japan right now?", japanese: "今の日本の天気はどうですか？" },
      { english: "We had heavy snow last week and deliveries were delayed.", japanese: "先週大雪で納品が遅延しました。" },
      { english: "Today is sunny — perfect for the site visit.", japanese: "今日は晴れで現場視察に最適です。" },
      { english: "It's been very humid in Japan this summer.", japanese: "今年の日本の夏はとても湿気が多いです。" },
    ],
  },

  // ─────────────────────────────────────────
  // 5. 数字 0〜100
  // ─────────────────────────────────────────
  {
    id: 5,
    emoji: "🔢",
    title: "数字 0〜100",
    subtitle: "Numbers 0–100",
    columns: ["数", "English", "読み方（ポイント）"],
    rows: [
      ["0", "zero", "ゼロ"],
      ["1〜6", "one / two / three / four / five / six", "ワン〜シックス"],
      ["7〜9", "seven / eight / nine", "セブン / エイト / ナイン"],
      ["10〜12", "ten / eleven / twelve", "テン / イレブン / トゥウェルブ"],
      ["13 ⚠️", "thirteen", "サーティーン（最後を強く）"],
      ["14 ⚠️", "fourteen", "フォーティーン（最後を強く）"],
      ["15 ⚠️", "fifteen", "フィフティーン（最後を強く）"],
      ["16〜19", "sixteen〜nineteen", "〜ティーン（最後を強く）"],
      ["20", "twenty", "トゥエンティ"],
      ["30 ⚠️", "thirty", "サーティ（最初を強く）"],
      ["40 ⚠️", "forty", "フォーティ（最初を強く）※u なし"],
      ["50 ⚠️", "fifty", "フィフティ（最初を強く）"],
      ["60〜90", "sixty〜ninety", "〜ティ（最初を強く）"],
      ["100", "one hundred", "ワン ハンドレッド"],
    ],
    usage: [
      "数量：\"We need 15 sensors.\" / \"The capacity is 50 m³.\"",
      "温度：\"Set the temperature to 20 degrees Celsius.\"",
      "聞き間違えたとき：\"Sorry, did you say fifteen or fifty?\"",
      "明確にしたいとき：\"That's one-five, fifteen.\"",
    ],
    notes: [
      "13/30、14/40、15/50 は特に聞き間違えやすい！",
      "-teen（13〜19）= 最後の音節を強く発音",
      "-ty（30〜90）= 最初の音節を強く発音",
      "forty は u なし（\"fourty\" は誤り）",
      "電話・会議で確認：\"Could you confirm: one-five (15) or five-zero (50)?\"",
    ],
    examples: [
      { english: "The pipe diameter is 50 mm.", japanese: "パイプ径は50mmです。（フィフティ）" },
      { english: "We need 13 sensors for this system.", japanese: "このシステムには13個のセンサーが必要です。" },
      { english: "The temperature should be 15 degrees Celsius.", japanese: "温度は15℃に設定してください。" },
      { english: "Could you confirm: 40 units or 14 units?", japanese: "確認ですが、40個ですか、14個ですか？" },
      { english: "The tank holds 100 cubic meters of water.", japanese: "タンクは100立方メートルの水を保持します。" },
    ],
  },

  // ─────────────────────────────────────────
  // 6. 大きい数字
  // ─────────────────────────────────────────
  {
    id: 6,
    emoji: "💯",
    title: "大きい数字",
    subtitle: "Large Numbers",
    columns: ["数値", "English", "日本語換算"],
    rows: [
      ["100", "one hundred", "百"],
      ["1,000", "one thousand", "千"],
      ["10,000", "ten thousand", "1万（\"万\" に対応する英語はない）"],
      ["100,000", "one hundred thousand", "10万"],
      ["1,000,000", "one million", "百万"],
      ["10,000,000", "ten million", "千万"],
      ["100,000,000", "one hundred million", "1億"],
      ["1,000,000,000", "one billion", "10億"],
    ],
    usage: [
      "予算：\"The budget is $2 million.\"（＝200万ドル）",
      "容量・数量：\"The flow rate is 1,500 liters per hour.\"",
      "生産目標：\"We target 10,000 tons per year.\"（＝1万トン）",
    ],
    notes: [
      "英語はカンマが3桁ごと / 日本語は4桁ごと→区切り方が違う！",
      "「万」に対応する英単語はない→ \"ten thousand\"",
      "「億」= hundred million（\"oku\" は通じない）",
      "小数点は \"point\"：1.5 → \"one point five\"",
    ],
    examples: [
      { english: "The budget for this project is $2 million.", japanese: "このプロジェクトの予算は200万ドルです。" },
      { english: "The flow rate is 1,500 liters per hour.", japanese: "流量は毎時1,500リットルです。" },
      { english: "We are targeting 10,000 tons per year.", japanese: "年間1万トンの生産を目指しています。" },
      { english: "The total cost is approximately 500,000 USD.", japanese: "総費用は約50万ドルです。" },
      { english: "The RAS houses 50,000 fish.", japanese: "RASには5万匹の魚がいます。" },
    ],
  },

  // ─────────────────────────────────────────
  // 7. 序数
  // ─────────────────────────────────────────
  {
    id: 7,
    emoji: "1️⃣",
    title: "序数",
    subtitle: "Ordinal Numbers",
    columns: ["数字", "書き方", "English", "読み方"],
    rows: [
      ["1", "1st", "first", "ファースト"],
      ["2", "2nd", "second", "セカンド"],
      ["3", "3rd", "third", "サード"],
      ["4", "4th", "fourth", "フォース"],
      ["5", "5th", "fifth", "フィフス（five→fifth）"],
      ["6〜7", "6th / 7th", "sixth / seventh", "シックスス / セブンス"],
      ["8", "8th", "eighth", "エイス（eight→eighth）"],
      ["9", "9th", "ninth", "ナインス（nine→ninth）"],
      ["10〜11", "10th / 11th", "tenth / eleventh", "テンス / イレブンス"],
      ["12", "12th", "twelfth", "トゥウェルフス（twelve→twelfth）"],
      ["20", "20th", "twentieth", "トゥエンティエス"],
      ["21", "21st", "twenty-first", "トゥエンティ ファースト"],
      ["30th", "30th", "thirtieth", "サーティエス"],
    ],
    usage: [
      "日付：\"The meeting is on the 15th.\" = \"…on the fifteenth.\"",
      "フロア：\"Our office is on the 3rd floor.\"",
      "改訂版：\"This is the 3rd revision of the drawing.\"",
      "順番：\"This is our 5th project with Nofitech.\"",
    ],
    notes: [
      "1st / 2nd / 3rd は不規則（4th以降は -th で統一）",
      "日付の口頭：\"May sixth\" または \"the sixth of May\"",
      "書くとき：\"May 6\" でも \"May 6th\" でも正しい",
      "five→fifth、nine→ninth、twelve→twelfth は特殊変化",
    ],
    examples: [
      { english: "The kick-off meeting is on the 1st of April.", japanese: "4月1日にキックオフ会議があります。" },
      { english: "This is the 3rd revision of the drawing.", japanese: "これは図面の第3改訂版です。" },
      { english: "Please send the 2nd invoice by the end of the month.", japanese: "第2請求書を月末までに送付してください。" },
      { english: "The sensor is on the 2nd floor.", japanese: "センサーは2階にあります。" },
      { english: "This is our 5th project with Nofitech.", japanese: "Nofitechとは5件目のプロジェクトです。" },
    ],
  },

  // ─────────────────────────────────────────
  // 8. 日付の書き方
  // ─────────────────────────────────────────
  {
    id: 8,
    emoji: "📝",
    title: "日付の書き方",
    subtitle: "Date Formats",
    columns: ["形式", "書き方", "読み方"],
    rows: [
      ["アメリカ式（正式）", "May 6, 2026", "May sixth, twenty twenty-six"],
      ["アメリカ式（口語）", "May 6th, 2026", "May sixth"],
      ["イギリス式（正式）", "6 May 2026", "the sixth of May"],
      ["略式", "6th May 2026", "the sixth of May"],
      ["ISO形式（技術文書）", "2026-05-06", "年-月-日（国際標準）"],
    ],
    usage: [
      "メール推奨：\"The delivery date is May 6, 2026.\"（月名を英語で）",
      "口頭：\"We'll meet on May sixth.\"",
      "技術文書：ISO 形式（2026-05-06）が最も誤解が少ない",
    ],
    notes: [
      "数字のみの日付（5/6/2026）は絶対に避けること！米英で意味が変わる",
      "アメリカ式：年の前にコンマ→ \"May 6, 2026\"",
      "イギリス式：コンマなし→ \"6 May 2026\"",
      "プロの鉄則：メールでは必ず月名を英語で書く",
    ],
    examples: [
      { english: "The inspection is scheduled for June 3, 2026.", japanese: "検査は2026年6月3日を予定しています。" },
      { english: "Please confirm: is the delivery May 6 or June 5?", japanese: "確認ですが、納品は5月6日ですか、6月5日ですか？" },
      { english: "The contract start date is 1 April 2026.", japanese: "契約開始日は2026年4月1日です。" },
      { english: "We received the drawing on July 10, 2025.", japanese: "図面は2025年7月10日に受領しました。" },
      { english: "The deadline is November 30, 2026.", japanese: "締め切りは2026年11月30日です。" },
    ],
  },

  // ─────────────────────────────────────────
  // 9. 米式・英式の違い
  // ─────────────────────────────────────────
  {
    id: 9,
    emoji: "🇺🇸",
    title: "米式・英式の違い",
    subtitle: "US vs UK Date Format",
    columns: ["表記", "アメリカの読み方", "イギリスの読み方"],
    rows: [
      ["5/6/2026", "May 6（5月6日）", "6 May（6月5日）← 逆！"],
      ["3/4/2026", "March 4（3月4日）", "4 March（4月3日）← 逆！"],
      ["順序", "MM/DD/YYYY（月→日→年）", "DD/MM/YYYY（日→月→年）"],
      ["ノルウェー", "—", "DD/MM/YYYY（ヨーロッパ式）"],
      ["ISO 国際標準", "YYYY-MM-DD", "YYYY-MM-DD（最も安全）"],
    ],
    usage: [
      "国際ビジネス：月を英語で→ \"May 6, 2026\" または \"6 May 2026\"",
      "ISO形式も安全：2026-05-06（年-月-日）",
      "取引先の国を確認してから日付表記を統一する",
    ],
    notes: [
      "同じ \"5/6/2026\" が米＝5月6日、英・ノルウェー＝6月5日になる！",
      "ノルウェー・ヨーロッパ全般は DD/MM/YYYY",
      "プロの鉄則：メールでは必ず月名を英語で書く",
      "図面・ドキュメントでは ISO 形式（2026-05-06）が国際的に最も安全",
    ],
    examples: [
      { english: "To avoid confusion, please write the date as May 6, 2026.", japanese: "混乱を避けるため、日付は2026年5月6日と記載してください。" },
      { english: "I received a document dated 3/4/2026 — is that March 4 or April 3?", japanese: "3/4/2026という日付の文書を受け取りました。3月4日ですか、4月3日ですか？" },
      { english: "In Norway, they use the format DD/MM/YYYY.", japanese: "ノルウェーでは DD/MM/YYYY 形式を使います。" },
      { english: "Please use the month name to avoid misunderstanding.", japanese: "誤解を避けるため、月名を使って記載してください。" },
    ],
  },

  // ─────────────────────────────────────────
  // 10. 時間の前置詞
  // ─────────────────────────────────────────
  {
    id: 10,
    emoji: "⏰",
    title: "時間の前置詞",
    subtitle: "Prepositions of Time",
    columns: ["前置詞", "使う場面", "例"],
    rows: [
      ["on", "曜日・日付", "on Monday / on May 6 / on Tuesday morning"],
      ["in", "月・年・季節・午前午後", "in June / in 2026 / in spring / in the morning"],
      ["at", "時刻・特定の時", "at 3 p.m. / at noon / at midnight"],
      ["by", "締め切り（期限）", "by Friday / by the end of the month"],
      ["until / till", "継続の終了", "until Friday / till 5 p.m."],
      ["from...to", "期間", "from Monday to Friday"],
      ["within", "〜以内に", "within 3 business days"],
      ["before", "〜より前", "before noon / before the deadline"],
      ["after", "〜より後", "after the meeting / after 5 p.m."],
      ["during", "〜の期間中", "during the meeting / during installation"],
      ["for", "継続期間", "for three days / for two weeks"],
      ["in（未来）", "〜後（未来）", "in two weeks / in three months"],
    ],
    usage: [
      "on Monday at 10 a.m.（曜日は on、時刻は at）",
      "by Friday（締め切り）vs until Friday（継続）",
      "within 3 business days（3営業日以内）",
    ],
    notes: [
      "by = 期限（金曜が締め切り）/ until = 継続（金曜まで続く）",
      "\"in two weeks\" = 2週間後（未来）/ \"for two weeks\" = 2週間継続",
      "at noon / at midnight は \"at 12 p.m.\" よりも明確",
      "on Monday morning / in the morning の違いに注意",
    ],
    examples: [
      { english: "The meeting is on Monday at 10 a.m.", japanese: "会議は月曜日の午前10時です。" },
      { english: "Please submit the report by Friday.", japanese: "金曜日までに報告書を提出してください。" },
      { english: "I will be in Norway from June 5 to June 10.", japanese: "6月5日から10日までノルウェーにいます。" },
      { english: "The site is closed until January 3.", japanese: "現場は1月3日まで閉鎖されています。" },
      { english: "Please respond within 3 business days.", japanese: "3営業日以内にご返答ください。" },
    ],
  },

  // ─────────────────────────────────────────
  // 11. 時間の読み方
  // ─────────────────────────────────────────
  {
    id: 11,
    emoji: "🕐",
    title: "時間の読み方",
    subtitle: "Reading Time",
    columns: ["時刻", "基本の読み方", "自然な言い方（英国・ノルウェー風）"],
    rows: [
      ["1:00", "one o'clock", "one o'clock"],
      ["2:00", "two o'clock", "two o'clock"],
      ["2:30", "two thirty", "half past two"],
      ["3:15", "three fifteen", "a quarter past three"],
      ["3:45", "three forty-five", "a quarter to four"],
      ["4:05", "four oh five", "five past four"],
      ["4:50", "four fifty", "ten to five"],
      ["9:10", "nine ten", "ten past nine"],
      ["11:55", "eleven fifty-five", "five to twelve"],
      ["12:00（昼）", "twelve noon", "noon（正午）"],
      ["12:00（夜）", "twelve midnight", "midnight（深夜0時）"],
    ],
    usage: [
      "ビジネスでは \"two thirty\" のようにシンプルに読むことが多い",
      "英国・ノルウェーでは \"half past\" \"quarter to\" が多用される",
      "\"o'clock\" は :00 のときだけ使う",
    ],
    notes: [
      "noon（正午）と midnight（深夜0時）を覚えると便利",
      "時刻の前の前置詞は at：\"at 3 p.m.\" / \"at noon\"",
      "\"oh\" は英語でゼロの意味：4:05 → \"four oh five\"",
      "アメリカは \"two thirty\" / 英国は \"half past two\" の傾向がある",
    ],
    examples: [
      { english: "The call starts at two o'clock.", japanese: "電話は2時に始まります。" },
      { english: "Can we meet at half past ten?", japanese: "10時半に会えますか？" },
      { english: "The presentation starts at a quarter past nine.", japanese: "プレゼンは9時15分に始まります。" },
      { english: "I need to leave by a quarter to five.", japanese: "4時45分までに退席する必要があります。" },
      { english: "The deadline is midnight tonight.", japanese: "締め切りは今夜の深夜12時です。" },
    ],
  },

  // ─────────────────────────────────────────
  // 12. a.m. / p.m.
  // ─────────────────────────────────────────
  {
    id: 12,
    emoji: "🌅",
    title: "a.m. / p.m.",
    subtitle: "12-Hour & 24-Hour Time",
    columns: ["12時間表記", "24時間表記", "読み方", "意味"],
    rows: [
      ["12:00 a.m.", "00:00", "midnight", "深夜0時"],
      ["1:00 a.m.", "01:00", "one a.m.", "午前1時"],
      ["6:00 a.m.", "06:00", "six a.m.", "午前6時"],
      ["9:00 a.m.", "09:00", "nine a.m.", "午前9時"],
      ["12:00 p.m.", "12:00", "noon", "正午"],
      ["1:00 p.m.", "13:00", "one p.m.", "午後1時"],
      ["3:00 p.m.", "15:00", "three p.m.", "午後3時"],
      ["6:00 p.m.", "18:00", "six p.m.", "午後6時"],
      ["9:00 p.m.", "21:00", "nine p.m.", "午後9時"],
      ["11:00 p.m.", "23:00", "eleven p.m.", "午後11時"],
    ],
    usage: [
      "ビジネスメール：\"The meeting is at 3 p.m. JST.\"",
      "午前を明確に：\"Please send before 9 a.m. tomorrow.\"",
      "紛らわしい12時は noon / midnight を使う",
    ],
    notes: [
      "a.m. = ante meridiem（ラテン語「正午前」）",
      "p.m. = post meridiem（ラテン語「正午後」）",
      "\"12 a.m.\" と \"12 p.m.\" は紛らわしい→ noon / midnight を使う",
      "ヨーロッパ・ノルウェーでは24時間表記（15:00）が一般的",
    ],
    examples: [
      { english: "The meeting is at 3 p.m. JST.", japanese: "会議は日本時間の午後3時です。" },
      { english: "Please send the email before 9 a.m. tomorrow.", japanese: "明日の午前9時までにメールを送ってください。" },
      { english: "The site closes at 5 p.m.", japanese: "現場は午後5時に閉まります。" },
      { english: "Let's schedule the call for noon.", japanese: "正午に電話会議を設定しましょう。" },
      { english: "I received your reply at 2 a.m. — thank you!", japanese: "午前2時に返信を受け取りました。ありがとうございます！" },
    ],
  },

  // ─────────────────────────────────────────
  // 13. タイムゾーン
  // ─────────────────────────────────────────
  {
    id: 13,
    emoji: "🌍",
    title: "タイムゾーン",
    subtitle: "Time Zones",
    columns: ["略語", "名称", "UTC差", "地域"],
    rows: [
      ["JST", "Japan Standard Time", "UTC+9", "日本"],
      ["UTC", "Coordinated Universal Time", "UTC+0", "世界標準"],
      ["GMT", "Greenwich Mean Time", "UTC+0", "英国（冬）"],
      ["BST", "British Summer Time", "UTC+1", "英国（夏）"],
      ["CET", "Central European Time", "UTC+1", "ノルウェー（冬）"],
      ["CEST", "Central European Summer Time", "UTC+2", "ノルウェー（夏）"],
      ["EST", "Eastern Standard Time", "UTC-5", "ニューヨーク（冬）"],
      ["EDT", "Eastern Daylight Time", "UTC-4", "ニューヨーク（夏）"],
      ["PST", "Pacific Standard Time", "UTC-8", "ロサンゼルス（冬）"],
    ],
    usage: [
      "会議設定：\"Let's meet at 9 a.m. JST (= 1 a.m. CET).\"",
      "招待状には UTC 時間を記載すると混乱が少ない",
      "\"Please confirm the meeting time in your local time zone.\"",
    ],
    notes: [
      "JST からノルウェー（冬・CET）は -8時間",
      "JST からノルウェー（夏・CEST）は -7時間",
      "サマータイムは国によって開始・終了日が異なる",
      "便利ツール：worldtimebuddy.com / time.is",
    ],
    examples: [
      { english: "The meeting is at 9 a.m. JST, which is 1 a.m. CET.", japanese: "会議はJST午前9時（CET午前1時）です。" },
      { english: "Norway is 8 hours behind Japan in winter.", japanese: "ノルウェーは冬、日本より8時間遅れています。" },
      { english: "Please confirm the meeting time in your local time zone.", japanese: "会議時間をあなたの現地タイムゾーンで確認してください。" },
      { english: "I will send the calendar invite in UTC.", japanese: "カレンダー招待はUTC時間で送ります。" },
      { english: "What time is 3 p.m. Oslo time in Japan?", japanese: "オスロ時間の午後3時は日本では何時ですか？" },
    ],
  },

  // ─────────────────────────────────────────
  // 14. 単位
  // ─────────────────────────────────────────
  {
    id: 14,
    emoji: "📏",
    title: "単位",
    subtitle: "Units of Measurement",
    columns: ["単位", "略語", "読み方", "用途"],
    rows: [
      ["ミリメートル", "mm", "millimeter", "長さ"],
      ["センチメートル", "cm", "centimeter", "長さ"],
      ["メートル", "m", "meter", "長さ"],
      ["キロメートル", "km", "kilometer", "長さ"],
      ["グラム", "g", "gram", "重量"],
      ["キログラム", "kg", "kilogram", "重量"],
      ["メトリックトン", "t", "metric ton / tonne", "重量"],
      ["ミリリットル", "mL", "milliliter", "容量"],
      ["リットル", "L", "liter", "容量"],
      ["立方メートル", "m³", "cubic meter", "容量"],
      ["摂氏度", "°C", "degrees Celsius", "温度"],
      ["バール", "bar", "bar", "圧力"],
      ["キロパスカル", "kPa", "kilopascal", "圧力"],
      ["ボルト", "V", "volt", "電圧"],
      ["アンペア", "A", "ampere", "電流"],
      ["キロワット", "kW", "kilowatt", "電力"],
      ["毎時流量", "m³/h", "cubic meters per hour", "流量"],
      ["毎分流量", "L/min", "liters per minute", "流量"],
      ["回転数", "rpm", "revolutions per minute", "回転"],
    ],
    usage: [
      "単位は数値の後に：\"5 kg\" → \"five kilograms\"",
      "流量：\"The pump capacity is 200 m³/h.\"",
      "圧力：\"Maintain the pressure below 3 bar.\"",
    ],
    notes: [
      "meter はアメリカ英語 / metre はイギリス英語（意味は同じ）",
      "liter / litre も同様（アメリカ/イギリス）",
      "m³ は \"cubic meter\" または \"meter cubed\"",
      "小数点は \"point\"：2.5 m → \"two point five meters\"",
    ],
    examples: [
      { english: "The pipe diameter is 50 mm.", japanese: "パイプ径は50mmです。" },
      { english: "The tank volume is 500 cubic meters.", japanese: "タンク容量は500立方メートルです。" },
      { english: "The motor is rated at 7.5 kW.", japanese: "モーターは7.5kWの定格です。" },
      { english: "The flow rate is 200 m³/h.", japanese: "流量は毎時200立方メートルです。" },
      { english: "Please maintain the pressure below 3 bar.", japanese: "圧力は3bar以下に維持してください。" },
    ],
  },

  // ─────────────────────────────────────────
  // 15. 温度
  // ─────────────────────────────────────────
  {
    id: 15,
    emoji: "🌡️",
    title: "温度",
    subtitle: "Temperature",
    columns: ["°C", "°F", "English 読み方"],
    rows: [
      ["-10°C", "14°F", "minus ten degrees Celsius"],
      ["0°C", "32°F", "zero degrees Celsius（氷点）"],
      ["10°C", "50°F", "ten degrees Celsius"],
      ["15°C", "59°F", "fifteen degrees Celsius（養殖適水温）"],
      ["20°C", "68°F", "twenty degrees Celsius（室温）"],
      ["25°C", "77°F", "twenty-five degrees Celsius"],
      ["37°C", "99°F", "thirty-seven degrees Celsius（体温）"],
      ["37.5°C", "99.5°F", "thirty-seven point five degrees Celsius"],
      ["100°C", "212°F", "one hundred degrees Celsius（沸点）"],
    ],
    usage: [
      "水温設定：\"Maintain the water temperature at 15 degrees Celsius.\"",
      "小数点：37.5°C → \"thirty-seven point five degrees\"",
      "マイナス：-10°C → \"minus ten degrees Celsius\"",
    ],
    notes: [
      "Celsius（摂氏）= ヨーロッパ・日本 / Fahrenheit（華氏）= アメリカ",
      "換算式：°F = (°C × 9/5) + 32",
      "ビジネスでは \"Celsius\" を明記すると誤解を防げる",
      "\"degrees\" は省略して \"15 Celsius\" と言う場合もある",
    ],
    examples: [
      { english: "The water temperature is maintained at 15 degrees Celsius.", japanese: "水温は15℃に維持されています。" },
      { english: "It was minus 10 degrees Celsius in Oslo last week.", japanese: "先週オスロはマイナス10℃でした。" },
      { english: "The inlet water temperature must not exceed 18°C.", japanese: "流入水温が18℃を超えてはなりません。" },
      { english: "The alarm is triggered at 22 degrees Celsius.", japanese: "22℃でアラームが作動します。" },
      { english: "Body temperature is 37 degrees Celsius, or about 99 degrees Fahrenheit.", japanese: "体温は37℃、約99°Fです。" },
    ],
  },

  // ─────────────────────────────────────────
  // 16. 長さ・重さ・容量の読み方
  // ─────────────────────────────────────────
  {
    id: 16,
    emoji: "⚖️",
    title: "長さ・重さ・容量",
    subtitle: "Length, Weight & Volume",
    columns: ["表記", "English", "読み方"],
    rows: [
      ["10 mm", "ten millimeters", "テン ミリミーターズ"],
      ["50 cm", "fifty centimeters", "フィフティ センチミーターズ"],
      ["2.5 m", "two point five meters", "トゥー ポイント ファイブ ミーターズ"],
      ["1.2 km", "one point two kilometers", "ワン ポイント トゥー キロミーターズ"],
      ["100 g", "one hundred grams", "ワン ハンドレッド グラムズ"],
      ["4.5 kg", "four point five kilograms", "フォー ポイント ファイブ キログラムズ"],
      ["10 t", "ten metric tons", "テン メトリック タンズ"],
      ["250 mL", "two hundred fifty milliliters", "トゥー ハンドレッド フィフティ ミリリーターズ"],
      ["5 L", "five liters", "ファイブ リーターズ"],
      ["100 m³", "one hundred cubic meters", "ワン ハンドレッド キュービック ミーターズ"],
      ["200 m³/h", "two hundred cubic meters per hour", "〜 パー アワー"],
    ],
    usage: [
      "パイプ径：\"The pipe is 150 mm in diameter.\"",
      "魚の体重：\"Each fish weighs approximately 4.5 kg at harvest.\"",
      "タンク：\"Please fill the tank to 300 cubic meters.\"",
    ],
    notes: [
      "小数点は \"point\"：4.5 → \"four point five\"",
      "複数の単位はほぼ全部に s がつく：kilograms / liters / meters",
      "\"per hour\" を \"/h\" と略すことも",
      "L（リットル）はアメリカ英語で \"liter\"、イギリスで \"litre\"",
    ],
    examples: [
      { english: "The pipe diameter is 150 mm.", japanese: "パイプ径は150mmです。" },
      { english: "Each fish weighs approximately 4.5 kg at harvest.", japanese: "収穫時、1匹あたり約4.5kgです。" },
      { english: "The drum filter processes 500 liters per minute.", japanese: "ドラムフィルターは毎分500リットルを処理します。" },
      { english: "The total pipe length is 85 meters.", japanese: "総配管長は85メートルです。" },
      { english: "Please fill the tank to 300 cubic meters.", japanese: "タンクを300立方メートルまで充填してください。" },
    ],
  },

  // ─────────────────────────────────────────
  // 17. 分数・四則演算
  // ─────────────────────────────────────────
  {
    id: 17,
    emoji: "➗",
    title: "分数・四則演算",
    subtitle: "Fractions & Arithmetic",
    columns: ["表記", "English", "読み方"],
    rows: [
      ["1/2", "one half", "ワン ハーフ"],
      ["1/3", "one third", "ワン サード"],
      ["1/4", "one quarter / one fourth", "ワン クォーター"],
      ["3/4", "three quarters", "スリー クォーターズ"],
      ["2/3", "two thirds", "トゥー サーズ"],
      ["5 + 3 = 8", "five plus three equals eight", "プラス / イクウォルズ"],
      ["10 − 4 = 6", "ten minus four equals six", "マイナス"],
      ["4 × 5 = 20", "four times five equals twenty", "タイムズ"],
      ["15 ÷ 3 = 5", "fifteen divided by three equals five", "ディバイデッド バイ"],
      ["2²", "two squared", "トゥー スクウェアード"],
      ["√9 = 3", "the square root of nine is three", "スクウェア ルート"],
      ["75%", "seventy-five percent", "セブンティ ファイブ パーセント"],
    ],
    usage: [
      "効率・割合：\"The efficiency is approximately three quarters (75%).\"",
      "水の配分：\"The flow is split in half between the two tanks.\"",
      "設計計算：\"The total is 200 plus 50, which equals 250 m³.\"",
    ],
    notes: [
      "\"one quarter\" と \"one fourth\" は同じ意味（1/4）",
      "\"times\" は掛け算（×）の読み方",
      "\"equals\" または \"is\" を使う：\"5 + 3 is 8\"",
      "パーセント：75% → \"seventy-five percent\"",
    ],
    examples: [
      { english: "The efficiency is approximately three quarters, or 75%.", japanese: "効率はおよそ4分の3（75%）です。" },
      { english: "The flow is split in half between the two tanks.", japanese: "流量は2つのタンクに半分ずつ分配されます。" },
      { english: "Total capacity is 200 plus 50, equals 250 cubic meters.", japanese: "総容量は200＋50＝250立方メートルです。" },
      { english: "The fish weight increased by one third over three months.", japanese: "魚の体重は3ヶ月で3分の1増加しました。" },
      { english: "The survival rate is ninety-two point five percent.", japanese: "生残率は92.5%です。" },
    ],
  },

  // ─────────────────────────────────────────
  // 18. 比率
  // ─────────────────────────────────────────
  {
    id: 18,
    emoji: "📊",
    title: "比率",
    subtitle: "Ratios",
    columns: ["表記", "English", "読み方"],
    rows: [
      ["1:2", "one to two", "ワン トゥー トゥー"],
      ["3:1", "three to one", "スリー トゥー ワン"],
      ["1:1", "one to one", "ワン トゥー ワン"],
      ["50:50", "fifty-fifty", "フィフティ フィフティ"],
      ["1:10", "one to ten", "ワン トゥー テン"],
      ["A to B ratio", "A-to-B ratio", "エー トゥー ビー レイシオ"],
      ["95%循環率", "ninety-five percent recirculation", "リサーキュレーション レイト"],
    ],
    usage: [
      "水量配分：\"The water is split at a ratio of 3 to 1.\"",
      "配合：\"Mix at a ratio of 1 to 3 (1:3).\"",
      "RAS設計：\"The recirculation rate is 95%.\"",
    ],
    notes: [
      "コロン（:）は \"to\" と読む：1:2 → \"one to two\"",
      "\"fifty-fifty\" = 50:50（均等に）",
      "\"A to B ratio\" = AとBの比率",
      "水産・養殖でよく使う：FCR（飼料効率比）、収容密度など",
    ],
    examples: [
      { english: "The water-to-feed ratio is 10 to 1.", japanese: "水と餌の比率は10対1です。" },
      { english: "Mix solution A and B at a ratio of 1 to 3.", japanese: "溶液AとBを1対3の割合で混合してください。" },
      { english: "The project is a 50-50 collaboration between two companies.", japanese: "このプロジェクトは2社の50-50の共同出資です。" },
      { english: "The recirculation rate is 95%, meaning 19 to 1.", japanese: "循環率は95%、つまり19対1です。" },
      { english: "The stocking density is 60 kg per cubic meter.", japanese: "収容密度は1立方メートルあたり60kgです。" },
    ],
  },

  // ─────────────────────────────────────────
  // 19. 方角・八方位
  // ─────────────────────────────────────────
  {
    id: 19,
    emoji: "🧭",
    title: "方角・八方位",
    subtitle: "Compass Directions",
    columns: ["日本語", "English", "略語", "読み方"],
    rows: [
      ["北", "North", "N", "ノース"],
      ["南", "South", "S", "サウス"],
      ["東", "East", "E", "イースト"],
      ["西", "West", "W", "ウェスト"],
      ["北東", "Northeast", "NE", "ノースイースト"],
      ["北西", "Northwest", "NW", "ノースウェスト"],
      ["南東", "Southeast", "SE", "サウスイースト"],
      ["南西", "Southwest", "SW", "サウスウェスト"],
      ["北向き", "facing north", "—", "フェイシング ノース"],
      ["北部の（形容詞）", "northern", "—", "ノーザン（小文字）"],
    ],
    usage: [
      "施設の位置：\"The pump room is on the north side.\"",
      "展示会場：\"Our booth is in the northwest corner of Hall B.\"",
      "図面説明：\"The inlet is located on the south side.\"",
    ],
    notes: [
      "方角は大文字で始まる：North / South / East / West",
      "形容詞形は小文字：northern / southern / eastern / western",
      "\"in the north\" = 北部に / \"to the north\" = 北の方向に",
      "\"facing north\" = 北向き",
    ],
    examples: [
      { english: "The inlet is located on the south side of the RAS building.", japanese: "RAS棟の南側に流入口があります。" },
      { english: "Our booth is in the northeast section of the exhibition hall.", japanese: "展示場の北東エリアにブースがあります。" },
      { english: "Norway is in northern Europe.", japanese: "ノルウェーは北ヨーロッパにあります。" },
      { english: "The control panel faces east.", japanese: "制御盤は東を向いています。" },
      { english: "The outlet is on the west side of the tank.", japanese: "流出口はタンクの西側にあります。" },
    ],
  },

  // ─────────────────────────────────────────
  // 20. 右・左・上・下
  // ─────────────────────────────────────────
  {
    id: 20,
    emoji: "↔️",
    title: "右・左・上・下",
    subtitle: "Left, Right, Up, Down",
    columns: ["日本語", "English", "読み方"],
    rows: [
      ["左", "left", "レフト"],
      ["右", "right", "ライト"],
      ["上 / 上方", "up / above / upper", "アップ / アバブ / アッパー"],
      ["下 / 下方", "down / below / lower", "ダウン / ビロウ / ロウワー"],
      ["前", "front / forward", "フロント / フォーワード"],
      ["後ろ", "back / rear", "バック / リア"],
      ["内側", "inside / inner", "インサイド / インナー"],
      ["外側", "outside / outer", "アウトサイド / アウター"],
      ["隣", "next to / adjacent to", "ネクスト トゥー / アジェイセント"],
      ["向かい", "opposite / across from", "オポジット / アクロス フロム"],
      ["〜の真下", "directly below / right below", "ダイレクトリー ビロウ"],
      ["〜の側面に", "alongside / beside", "アロングサイド / ビサイド"],
    ],
    usage: [
      "図面説明：\"The valve is on the left side of the pump.\"",
      "センサー位置：\"Mounted above the water line.\"",
      "タンク：\"The drain is at the lower left corner.\"",
    ],
    notes: [
      "above = 上方（接触なし）/ on = 上（接触あり）",
      "below = 下方（接触なし）/ under = 真下（接触あり）",
      "\"upper\" と \"lower\" は形容詞：upper section / lower part",
      "\"left-hand side\" / \"right-hand side\" はよりフォーマル",
    ],
    examples: [
      { english: "Turn left at the entrance; the pump room is on the right.", japanese: "入口で左折し、ポンプ室は右側にあります。" },
      { english: "The DO sensor is mounted above the water line.", japanese: "DOセンサーは水位より上に取り付けられています。" },
      { english: "The drain valve is at the lower left corner of the tank.", japanese: "ドレンバルブはタンクの左下隅にあります。" },
      { english: "The control panel is on the front wall.", japanese: "制御盤は前面壁にあります。" },
      { english: "The inner surface of the pipe must be smooth.", japanese: "配管の内面は滑らかでなければなりません。" },
    ],
  },

  // ─────────────────────────────────────────
  // 21. 座標・位置
  // ─────────────────────────────────────────
  {
    id: 21,
    emoji: "📐",
    title: "座標・位置",
    subtitle: "Position & Layout",
    columns: ["日本語", "English", "読み方"],
    rows: [
      ["中心", "center / centre", "センター"],
      ["端", "edge", "エッジ"],
      ["角", "corner", "コーナー"],
      ["表面", "surface", "サーフェス"],
      ["断面", "cross-section", "クロス セクション"],
      ["水平", "horizontal", "ホリゾンタル"],
      ["垂直（縦）", "vertical", "バーティカル"],
      ["上部", "upper section / top", "アッパー セクション"],
      ["下部", "lower section / bottom", "ロウワー セクション"],
      ["中間部", "middle section", "ミドル セクション"],
      ["隣接する", "adjacent to", "アジェイセント"],
      ["平行な", "parallel to", "パラレル"],
      ["直角な", "perpendicular to", "パーペンディキュラー"],
      ["中心線", "centerline / CL", "センターライン"],
      ["基準点", "reference point", "レファレンス ポイント"],
    ],
    usage: [
      "図面説明：\"The nozzle is at the center of the tank wall.\"",
      "配管：\"The pipe runs horizontally from the pump to the filter.\"",
      "設備配置：\"The two pipes are parallel to each other.\"",
    ],
    notes: [
      "center はアメリカ英語 / centre はイギリス英語（同じ意味）",
      "\"perpendicular to\" = 直角に交わる",
      "centerline は図面で \"CL\" と略されることが多い",
      "\"vertical\" = 縦方向 / \"horizontal\" = 横方向",
    ],
    examples: [
      { english: "The nozzle is located at the center of the tank wall.", japanese: "ノズルはタンク壁の中心に位置します。" },
      { english: "The pipe runs horizontally from the pump to the filter.", japanese: "配管はポンプからフィルターまで水平に走ります。" },
      { english: "Please check the upper and lower dimensions in the drawing.", japanese: "図面の上部・下部の寸法を確認してください。" },
      { english: "The two pipes are parallel to each other.", japanese: "2本の配管は互いに平行です。" },
      { english: "Install the bracket at the edge of the platform.", japanese: "ブラケットはプラットフォームの端に設置してください。" },
    ],
  },

  // ─────────────────────────────────────────
  // 22. カレンダー関係
  // ─────────────────────────────────────────
  {
    id: 22,
    emoji: "📆",
    title: "カレンダー関係",
    subtitle: "Calendar Terms",
    columns: ["日本語", "English", "読み方"],
    rows: [
      ["平日", "weekday / working day", "ウィークデイ / ワーキング デイ"],
      ["週末", "weekend", "ウィークエンド"],
      ["祝日", "public holiday / national holiday", "パブリック ホリデイ"],
      ["営業日", "business day", "ビジネス デイ"],
      ["今週", "this week", "ジス ウィーク"],
      ["来週", "next week", "ネクスト ウィーク"],
      ["先週", "last week", "ラスト ウィーク"],
      ["再来週", "the week after next", "ザ ウィーク アフター ネクスト"],
      ["今月", "this month", "ジス マンス"],
      ["来月", "next month", "ネクスト マンス"],
      ["今年度", "this fiscal year", "フィスカル イヤー"],
      ["第1四半期", "Q1 / first quarter", "キュー ワン"],
      ["月末", "end of the month", "エンド オブ ザ マンス"],
      ["年度末", "end of fiscal year", "エンド オブ フィスカル イヤー"],
    ],
    usage: [
      "書類送付：\"I will send the documents next week.\"",
      "営業日確認：\"Please confirm within 3 business days.\"",
      "四半期目標：\"We target delivery by end of Q3.\"",
    ],
    notes: [
      "\"business day\" = 営業日（祝日除く平日）",
      "\"the week after next\" = 再来週（\"next next week\" は不自然）",
      "Q1=1〜3月 / Q2=4〜6月 / Q3=7〜9月 / Q4=10〜12月（一般的）",
      "日本の会計年度は4月始まりなので、海外と Q の定義が違う場合がある",
    ],
    examples: [
      { english: "I will send the documents next week.", japanese: "来週書類を送ります。" },
      { english: "Please confirm within 3 business days.", japanese: "3営業日以内にご確認ください。" },
      { english: "The factory is closed on weekends and public holidays.", japanese: "工場は週末と祝日は閉まっています。" },
      { english: "We target delivery by the end of Q3.", japanese: "Q3末までの納品を目標にしています。" },
      { english: "Can we schedule the meeting for the week after next?", japanese: "再来週に会議を設定できますか？" },
    ],
  },

  // ─────────────────────────────────────────
  // 23. 期間・締め切り
  // ─────────────────────────────────────────
  {
    id: 23,
    emoji: "⏳",
    title: "期間・締め切り",
    subtitle: "Duration & Deadlines",
    columns: ["表現", "意味", "例"],
    rows: [
      ["for + 期間", "〜の間（継続）", "for three days（3日間）"],
      ["in + 期間（未来）", "〜後に（未来）", "in two weeks（2週間後）"],
      ["within + 期間", "〜以内に", "within 3 days（3日以内）"],
      ["by + 日付", "〜までに（締め切り）", "by Friday（金曜締め切り）"],
      ["until / till", "〜まで（継続）", "until Friday（金曜まで続く）"],
      ["from A to B", "AからBまで", "from Monday to Friday"],
      ["over + 期間", "〜にわたって", "over 3 months（3ヶ月にわたって）"],
      ["during", "〜の間に（内側）", "during the installation"],
      ["no later than", "遅くとも〜までに", "no later than Friday"],
      ["as of + 日付", "〜時点で", "as of June 1（6月1日時点）"],
    ],
    usage: [
      "締め切り：\"Please submit the drawing by March 15.\"",
      "以内：\"We will respond within 5 business days.\"",
      "期間：\"The installation will take approximately two weeks.\"",
    ],
    notes: [
      "by と until の違い：by = 期限 / until = 継続",
      "\"by Friday\" = 金曜までに完了（締め切り）",
      "\"until Friday\" = 金曜まで続く（状態）",
      "\"no later than\" = 「遅くとも〜までに」（メールでよく使う）",
    ],
    examples: [
      { english: "Please submit the drawing by March 15.", japanese: "3月15日までに図面を提出してください。" },
      { english: "We will respond within 5 business days.", japanese: "5営業日以内に返答します。" },
      { english: "I will be on site from Monday to Wednesday.", japanese: "月曜から水曜まで現場にいます。" },
      { english: "The project extends over a period of 18 months.", japanese: "このプロジェクトは18ヶ月にわたります。" },
      { english: "Please complete the form no later than Friday.", japanese: "金曜日までにフォームを完成させてください。" },
    ],
  },

  // ─────────────────────────────────────────
  // 24. 頻度
  // ─────────────────────────────────────────
  {
    id: 24,
    emoji: "🔁",
    title: "頻度",
    subtitle: "Frequency",
    columns: ["日本語", "English", "読み方"],
    rows: [
      ["毎日", "every day / daily", "エブリ デイ / デイリー"],
      ["1日おき", "every other day", "エブリ アザー デイ"],
      ["週1回", "once a week / weekly", "ワンス ア ウィーク / ウィークリー"],
      ["週2回", "twice a week", "トゥワイス ア ウィーク"],
      ["週3回", "three times a week", "スリー タイムズ ア ウィーク"],
      ["2週に1回", "once every two weeks", "ワンス エブリ トゥー ウィークス"],
      ["月1回", "once a month / monthly", "マンスリー"],
      ["3ヶ月に1回", "once every three months / quarterly", "クォータリー"],
      ["年1回", "once a year / annually", "アニュアリー"],
      ["毎時間", "every hour / hourly", "アワリー"],
      ["24時間", "around the clock / 24/7", "アラウンド ザ クロック"],
      ["常に", "always / at all times", "オールウェイズ"],
      ["時々", "sometimes / occasionally", "オケイジョナリー"],
      ["めったに", "rarely / seldom", "レアリー / セルダム"],
    ],
    usage: [
      "報告：\"Please send a weekly progress report every Monday.\"",
      "監視：\"The water quality is monitored hourly.\"",
      "メンテナンス：\"Maintenance is done once every three months.\"",
    ],
    notes: [
      "\"biweekly\" は「2週に1回」または「週2回」の両方の意味がある（紛らわしい！）",
      "明確にするなら：\"once every two weeks\" / \"twice a week\"",
      "\"quarterly\" = 四半期ごと（3ヶ月に1回）",
      "\"24/7\" = 24時間365日（twenty-four seven）",
    ],
    examples: [
      { english: "Please send a weekly progress report every Monday.", japanese: "毎週月曜日に週次進捗報告を送ってください。" },
      { english: "The water quality is monitored hourly.", japanese: "水質は1時間ごとに監視されています。" },
      { english: "We have a monthly review meeting.", japanese: "月1回のレビュー会議を実施しています。" },
      { english: "Maintenance should be done once every three months.", japanese: "メンテナンスは3ヶ月に1回行うべきです。" },
      { english: "I check my emails twice a day.", japanese: "メールは1日2回確認します。" },
    ],
  },

  // ─────────────────────────────────────────
  // 25. 世界の主要祝日
  // ─────────────────────────────────────────
  {
    id: 25,
    emoji: "🎉",
    title: "世界の主要祝日",
    subtitle: "International Holidays",
    columns: ["祝日", "日付", "備考・使い方"],
    rows: [
      ["New Year's Day（元日）", "January 1", "世界共通・\"Happy New Year!\""],
      ["Valentine's Day", "February 14", "文化的行事・仕事への影響は少ない"],
      ["Easter（復活祭）", "春（年により変動）", "ノルウェー含む欧州で4〜5日連続休暇"],
      ["Norwegian Constitution Day", "May 17", "ノルウェー建国記念日（Syttende Mai）"],
      ["Memorial Day（米）", "5月最終月曜日", "アメリカの戦没者追悼・長い週末"],
      ["Midsummer（北欧）", "6月下旬", "ノルウェー・スウェーデンで重要な夏祭り"],
      ["Independence Day（米）", "July 4", "アメリカ独立記念日（連休になることが多い）"],
      ["Halloween", "October 31", "仮装・パーティー文化（仕事への影響は少ない）"],
      ["Thanksgiving（米）", "11月第4木曜日", "アメリカ最大級の休日（前後も含む）"],
      ["Christmas Eve", "December 24", "欧米で重要（特にノルウェーはメイン）"],
      ["Christmas Day", "December 25", "世界共通・\"Merry Christmas!\""],
      ["Boxing Day", "December 26", "英国・オーストラリアなどの祝日"],
      ["New Year's Eve", "December 31", "大晦日・\"Happy New Year's Eve!\""],
    ],
    usage: [
      "欧米との会議調整：Thanksgiving前後・Christmas周辺は避ける",
      "ノルウェーのEaster（復活祭）は4〜5日連続休暇",
      "\"Happy Constitution Day!\" = 5月17日にノルウェー人に使う挨拶",
    ],
    notes: [
      "Easter は年によって日程が変わる（3月下旬〜4月）",
      "Thanksgiving はアメリカの大きな休日（その週は返信が遅くなる）",
      "欧米の Christmas〜New Year は約2週間の長期休暇になることが多い",
      "ノルウェーは5月17日の建国記念日が特に重要な祝日",
    ],
    examples: [
      { english: "Our office will be closed for Easter from April 18–21.", japanese: "復活祭のため4月18〜21日は休業です。" },
      { english: "I'll be on holiday from Christmas to New Year's.", japanese: "クリスマスから元日にかけて休暇を取ります。" },
      { english: "Happy Constitution Day! Enjoy the celebrations in Oslo.", japanese: "建国記念日おめでとう！オスロでの祝典をお楽しみください。" },
      { english: "Could we schedule the meeting for after Thanksgiving?", japanese: "感謝祭後に会議を設定できますか？" },
      { english: "Our factory has a two-week shutdown for Christmas.", japanese: "工場はクリスマスに2週間の操業停止があります。" },
    ],
  },

  // ─────────────────────────────────────────
  // 26. 電話・会議の基本表現
  // ─────────────────────────────────────────
  {
    id: 26,
    emoji: "📞",
    title: "電話・会議の基本表現",
    subtitle: "Phone & Meeting Basics",
    columns: ["場面", "English", "日本語"],
    rows: [
      ["聞き返す", "Sorry, could you repeat that?", "もう一度おっしゃっていただけますか？"],
      ["数字の確認", "Did you say fifteen or fifty?", "15ですか、50ですか？"],
      ["ゆっくり頼む", "Could you speak more slowly, please?", "もう少しゆっくり話していただけますか？"],
      ["スペル確認", "Could you spell that for me?", "スペルを教えていただけますか？"],
      ["再確認", "Let me confirm: the number is 50, correct?", "確認ですが、50で合っていますか？"],
      ["理解した", "I understand. / Got it.", "了解しました。"],
      ["聞き取れない", "I'm afraid I didn't catch that.", "聞き取れませんでした。"],
      ["つなぎ言葉", "Let me think for a moment.", "少し考えさせてください。"],
      ["接続問題", "Sorry, we have a connection issue.", "接続の問題があるようです。"],
      ["ミュートのミス", "Sorry, I was on mute.", "ミュートになっていました。すみません。"],
      ["聞こえ確認", "Can you hear me clearly?", "はっきり聞こえますか？"],
      ["画面共有", "Could you share your screen, please?", "画面を共有していただけますか？"],
      ["会議終了", "Thank you for your time. Talk to you soon.", "お時間をいただきありがとうございます。"],
    ],
    usage: [
      "数字が聞き取れない：\"Could you confirm: one-five (15) or five-zero (50)?\"",
      "聞き取れなかった：\"I'm sorry, I didn't catch that. Could you repeat?\"",
      "会議の締め：\"Thank you for your time. Let's follow up by email.\"",
    ],
    notes: [
      "\"Got it.\" は口語でカジュアル。フォーマルな場面では \"I understand.\" を使う",
      "\"I was on mute\" = よくあるミュートのミス（笑いでカバーできる）",
      "接続が悪いとき：\"I think we lost you.\" または \"You're breaking up.\"",
      "\"Could you speak up a little?\" = もう少し大きな声で話してもらえますか？",
    ],
    examples: [
      { english: "Sorry, could you repeat that? I didn't catch the number.", japanese: "すみません、もう一度おっしゃっていただけますか？数字が聞き取れませんでした。" },
      { english: "Did you say fifteen or fifty?", japanese: "15ですか、50ですか？" },
      { english: "Could you speak more slowly, please? My English is not perfect.", japanese: "もう少しゆっくり話していただけますか？英語が得意でないので。" },
      { english: "I'm sorry, I was on mute. Let me start again.", japanese: "すみません、ミュートになっていました。もう一度始めます。" },
      { english: "Thank you for your time today. I'll follow up by email.", japanese: "本日はお時間をいただきありがとうございます。メールでフォローアップします。" },
    ],
  },
];
