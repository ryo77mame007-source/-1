import React, { useState, useEffect, useMemo } from "react";

/* =========================================================
   データ: 問題28問
   category: photo | three | solution | opinion
   domain: general | aqua (陸上養殖・仕事関連)
========================================================= */
const QUESTIONS = [
  // ---------------- Q3 写真描写 15問 ----------------
  {
    id: "p1", category: "photo", domain: "general",
    scene: "オフィスのビジネスミーティング",
    detail: "テーブルに3人。中央の男性がグラフを見せながら説明。左の金髪女性はダークスーツでペンを持つ。右の男性はグレーのジャケット。",
    sample: {
      en: "This is a picture of a business meeting in an office space. There are three people sitting at the table. In the center, a man in a dark suit is explaining something and showing a chart to the other man. On the left, there is a woman with blond hair, wearing a dark suit and holding a pen. I think the meeting is formal, because they are all wearing jackets.",
      ja: "これはオフィスでのビジネスミーティングの写真です。3人がテーブルについています。中央の男性はダークスーツを着て、何かを説明しながら図を見せています。左側には金髪の女性がいて、ダークスーツを着てペンを持っています。全員ジャケットを着ているので、フォーマルな会議だと思います。"
    },
    type: "写真を分割(中央→左→右、または奥/中央/手前)し、各人物の動作と服装を主語+現在進行形で描写する型。",
    patterns: ["In the center, a man is -ing.", "On the left/right, there is 〜.", "I think 〜, because 〜.(感想で締める)"],
    tips: "人物の人数・服装・持ち物・動作を入れ替えれば、ほぼ全てのオフィス系写真に使い回せる。This is a picture of 〜.で必ず場面から入る。",
    pitfalls: "Here I can see〜は禁止(相手に写真は見えない前提)。主語と動詞の対応(誰が何をしているか)を間違えない。"
  },
  {
    id: "p2", category: "photo", domain: "general",
    scene: "空港のロビー",
    detail: "手前にピンクのネクタイの男性が腕時計を見ている。右奥にベンチに座る男性。背景に大きなガラス窓と白い飛行機。",
    sample: {
      en: "This picture was taken at an airport. In the foreground, a man wearing a pink tie is looking at his watch. On the right-hand side of the picture, I can see a man sitting on a bench. In the background, there is a white airplane and some windows. I think he might be waiting for his flight and checking the time because he is in a hurry.",
      ja: "この写真は空港で撮られました。手前にはピンクのネクタイをつけた男性が時計を見ています。写真の右側には、ベンチに座っている男性が見えます。背景には白い飛行機と窓がいくつか見えます。彼は急いでいて、フライトを待ちながら時間を確認しているのだと思います。"
    },
    type: "場所(This picture was taken at/in 〜)から入り、手前→奥の順で人物・モノを位置語句とともに描写する型。",
    patterns: ["This picture was taken at/in 〜.", "In the foreground/background, 〜.", "On the right-hand side, I can see 〜."],
    tips: "空港・駅・道路など『場所が特定できる』写真は、まず場所を一言で言い切ると高評価。位置関係はunder/in front of/next to/behindも使えるとさらに良い。",
    pitfalls: "前置詞句(in the foreground等)はカンマで区切り、文頭に置く。is/areの数の一致(a man is / two men are)に注意。"
  },
  {
    id: "p3", category: "photo", domain: "general",
    scene: "食堂(カフェテリア)のレジ",
    detail: "中央でビジネススーツの男性がトレーを持ち会計中。トレーに緑色のガラス瓶。左に白い半袖シャツと黒いベストの店員。レジに長い列。",
    sample: {
      en: "This picture was taken in a cafeteria. The cafeteria is very crowded and there is a long line for the cashier. In the center of the picture, a man in a business suit is paying money. On his tray, there is a green glass bottle. On the left, I can see a cashier wearing a white short-sleeved shirt and a black vest. This is maybe a company cafeteria, because everyone looks like an office worker.",
      ja: "この写真は食堂で撮られました。食堂はとても混んでいて、レジに長い列ができています。写真の中央では、ビジネススーツを着た男性がお金を払っています。彼のトレーの上には緑のガラス瓶があります。左側には白い半袖シャツと黒のベストを着た店員が見えます。全員が会社員のように見えるので、社員食堂かもしれません。"
    },
    type: "全体の様子(混雑度など)→中心人物を詳しく→2人目→感想・予測、の順で展開する型。",
    patterns: ["The place is very crowded.", "On his/her tray/desk, there is 〜.", "This is maybe 〜, because 〜."],
    tips: "全体の雰囲気を表す形容詞(crowded, quiet, busy)を最初の2文で入れると情報量が増える。レストラン語彙: diner/customer/server/cashier/line up for/take an order。",
    pitfalls: "店員(staff)が客のように振る舞っていないか、主語の取り違えに注意。"
  },
  {
    id: "p4", category: "photo", domain: "aqua",
    scene: "陸上養殖プラントの設備点検",
    detail: "中央で作業着の技術者がRASの配管バルブを点検している。手前に水質測定機器。奥に大きな円形水槽が複数並ぶ。",
    sample: {
      en: "This is a picture of an aquaculture facility. In the center, a technician wearing a work uniform is checking a valve on the piping system. In the foreground, there is some water quality testing equipment on a table. In the background, I can see several large circular tanks. I think this is a recirculating aquaculture system, because the tanks and pipes are connected in a closed system.",
      ja: "これは陸上養殖施設の写真です。中央では作業着を着た技術者が配管のバルブを点検しています。手前にはテーブルの上に水質測定機器があります。背景には大きな円形の水槽がいくつか見えます。タンクと配管が閉鎖系で繋がっているので、これは循環式養殖システムだと思います。"
    },
    type: "施設系の写真は This is a picture of a/an 〜 facility. で入り、人物の作業内容→周辺機材→背景設備の順で描写する。",
    patterns: ["A technician/worker is checking/inspecting 〜.", "In the foreground/background, there is/are 〜."],
    tips: "仕事の語彙をそのまま使える: valve(バルブ)/piping(配管)/tank(水槽)/water quality(水質)/recirculating aquaculture system(RAS)。実際の現場をそのままイメージして描写すると話しやすい。",
    pitfalls: "is checking のように進行形を忘れない。固有の専門用語を使う場合も文の骨格(主語+動詞+目的語)は崩さない。"
  },
  {
    id: "p5", category: "photo", domain: "general",
    scene: "レストランでの接客",
    detail: "手前で店員が男性客にメニューを見せている。男性客はメニューを指差している。背景にテーブル席が並ぶ。",
    sample: {
      en: "This picture was taken in a restaurant. In the foreground, a server is showing a menu to a male customer. The customer is pointing at something on the menu, maybe asking a question about it. In the background, there are several tables set for dining. I think the customer is trying to decide what to order.",
      ja: "この写真はレストランで撮られました。手前では、店員が男性客にメニューを見せています。客はメニューの何かを指差していて、おそらくそれについて質問しているのでしょう。背景にはいくつかのテーブルが食事の準備をして並んでいます。客は何を注文するか決めようとしているのだと思います。"
    },
    type: "2人の人物が対話している写真は、動作の主従関係(誰が見せて誰が見ているか)を明確にして描写する型。",
    patterns: ["A is showing 〜 to B.", "B is -ing, maybe -ing.(推測を添える)"],
    tips: "maybe / perhaps / it seems that を使うと、断定しすぎずに自然な推測描写ができる。",
    pitfalls: "show A to B / show B A の語順ミスに注意。"
  },
  {
    id: "p6", category: "photo", domain: "general",
    scene: "街中の交差点",
    detail: "歩行者が信号待ちをしている。複数の車が通りに沿って停まっている。奥にビルが立ち並ぶ。",
    sample: {
      en: "This picture was taken on a street in a city. In the foreground, some pedestrians are waiting at an intersection. There are some cars parked along the street. In the background, I can see several tall buildings. I think this is a busy downtown area, because there are so many people and buildings.",
      ja: "この写真は街の通りで撮られました。手前では、何人かの歩行者が交差点で信号待ちをしています。通りに沿って車が何台か停まっています。背景には高いビルがいくつか見えます。人とビルがとても多いので、ここは賑やかな都心部だと思います。"
    },
    type: "屋外・街中の写真は there are/is構文を多用し、人・モノ・建物を並列で描写する型。",
    patterns: ["There are some cars parked along the street.", "Pedestrians are stopping at an intersection."],
    tips: "交通・街路語彙: pedestrian/traveler/intersection/parked along the street/public transportation。",
    pitfalls: "parked(過去分詞)のように「停められている」状態を表す分詞を正しく使う。"
  },
  {
    id: "p7", category: "photo", domain: "general",
    scene: "ショッピング(衣料品店)",
    detail: "女性客が棚から商品を選んでいる。店員がそばでメモを取っている。背景に商品棚がずらり。",
    sample: {
      en: "This picture was taken in a clothing shop. In the center, a customer is selecting an item from the shelf. Next to her, a shop clerk is taking notes while listening to the customer. In the background, there are many shelves full of products. I think the clerk is helping the customer find what she needs.",
      ja: "この写真は衣料品店で撮られました。中央では、客が棚から商品を選んでいます。彼女の隣で、店員は客の話を聞きながらメモを取っています。背景には商品でいっぱいの棚がたくさんあります。店員は客が欲しいものを見つける手伝いをしているのだと思います。"
    },
    type: "客と店員が同時に写る写真は、客の動作→店員の動作をnext to/while使って自然につなげる型。",
    patterns: ["A is -ing. Next to her/him, B is -ing.", "while listening to 〜(分詞構文で2動作を結ぶ)"],
    tips: "ショッピング語彙: shopper/select/browse/push a cart/shop clerk/receive money/put items on display。",
    pitfalls: "next toの後は人(her/him)か場所、品詞を間違えない。"
  },
  {
    id: "p8", category: "photo", domain: "aqua",
    scene: "海外メーカーとのオンライン打ち合わせ",
    detail: "中央でビジネスカジュアルの男性がノートPCの画面を見ながら話している。手前に図面の印刷物。奥にホワイトボード。",
    sample: {
      en: "This is a picture of an online business meeting. In the center, a man in business casual clothes is talking while looking at his laptop screen. In the foreground, there are some printed drawings on the desk. In the background, I can see a whiteboard. I think he is discussing technical details with an overseas supplier, because the documents look like engineering drawings.",
      ja: "これはオンラインのビジネス会議の写真です。中央では、ビジネスカジュアルの服を着た男性がノートパソコンの画面を見ながら話しています。手前には机の上に印刷された図面があります。背景にはホワイトボードが見えます。書類が技術図面に見えるので、彼は海外のサプライヤーと技術的な詳細について話し合っているのだと思います。"
    },
    type: "リモート会議の写真は、人物の動作(話す・見る)を進行形2つで並べ、周辺の書類・機材で文脈を補強する型。",
    patterns: ["A is talking while -ing.", "I think 〜, because the documents/equipment look like 〜."],
    tips: "仕事文脈に置き換えやすい語彙: drawing(図面)/supplier(仕入先)/technical details/online meeting。発眼卵輸入や電気申請のやり取りをイメージして話すと自分の経験が乗せやすい。",
    pitfalls: "whileの後は動名詞(-ing)、becauseの後は完全な文(S+V)にする。"
  },
  {
    id: "p9", category: "photo", domain: "general",
    scene: "公園でくつろぐ人々",
    detail: "シニア夫婦がキャンプ椅子に座って談笑している。手前にクーラーボックス。奥にキャンピングカー。",
    sample: {
      en: "This is a picture of an outside scene. A senior couple is sitting on camping chairs and talking. In the foreground, there is a white plastic cooler box. In the background, I can see a camping car. I think they are enjoying their retirement by traveling together.",
      ja: "これは屋外のシーンの写真です。シニアの夫婦がキャンプ用の椅子に座って話しています。手前には白いプラスチック製のクーラーボックスがあります。背景にはキャンピングカーが見えます。彼らは一緒に旅をしながら退職後の生活を楽しんでいるのだと思います。"
    },
    type: "感情・関係性が読み取れる写真は、最後の感想文(I think 〜)で人物同士の関係や状況を補足する型。",
    patterns: ["A senior couple is -ing.", "I think they are -ing, by -ing.(目的の補足)"],
    tips: "by -ing で「〜することによって」という補足ができ、感想文の説得力が増す。",
    pitfalls: "couple は単数扱い(is)になることが多い点に注意。"
  },
  {
    id: "p10", category: "photo", domain: "general",
    scene: "ビーチのパラソル",
    detail: "誰もいないビーチに赤いパラソルが1つ。砂浜に影を作っている。奥に波打ち際と数人の人影。",
    sample: {
      en: "This is a picture of a beach scene. In the center, there is a red parasol standing on the sand. A parasol is casting a shadow on the beach. In the background, I can see some people swimming in the ocean. I think this picture was taken in summer, because the parasol suggests it is a sunny day.",
      ja: "これはビーチのシーンの写真です。中央には砂浜に立つ赤いパラソルがあります。パラソルがビーチに影を作っています。背景には海で泳いでいる人が何人か見えます。パラソルがあることから、この写真は晴れた夏の日に撮られたのだと思います。"
    },
    type: "人物が少ない・モノが主役の写真は、モノを主語にした文(A parasol is casting a shadow)を使う型。",
    patterns: ["A 〜 is -ing.(モノが主語)", "I think this was taken in 〜, because 〜.(季節・状況の推測)"],
    tips: "季節・気温・国を推測する締めの文は、服装や風景から作ると自然(本のテスト攻略テクニック参照)。",
    pitfalls: "モノが主語でも進行形でOK(castingのように)。"
  },
  {
    id: "p11", category: "photo", domain: "general",
    scene: "図書館での勉強",
    detail: "本棚の通路で2人の学生が机に向かっている。奥に大きなガラス窓2つ。",
    sample: {
      en: "This is a picture of a library. In the background, I can see two big glass windows. There are two students sitting at desks between the bookshelves. One of them is reading a book and the other is writing something. I think they are studying for an exam together.",
      ja: "これは図書館の写真です。背景には2つの大きなガラス窓が見えます。本棚の間には机に向かっている学生が2人います。1人は本を読んでいて、もう1人は何かを書いています。彼らは一緒に試験勉強をしているのだと思います。"
    },
    type: "複数の人物が似た動作をしている写真は、One of them is 〜, and the other is 〜. で対比して描写する型。",
    patterns: ["There are two 〜 -ing.", "One of them is 〜, and the other is 〜."],
    tips: "In the background, there are 〜. と In the background, I can see 〜. はどちらも同じ意味で使い回せる定型文。",
    pitfalls: "othersではなくthe otherを使う(2人のうちもう片方は1人なので)。"
  },
  {
    id: "p12", category: "photo", domain: "aqua",
    scene: "発眼卵の輸入チェック",
    detail: "中央で技術者が白衣で発泡スチロール箱を開けて中身を確認している。手前に温度計。奥に保冷車。",
    sample: {
      en: "This is a picture of a delivery check at a facility. In the center, a worker in a lab coat is opening a styrofoam box and checking the contents. In the foreground, there is a thermometer on the table. In the background, I can see a refrigerated truck. I think they just received imported eggs and are checking the temperature and condition before unloading.",
      ja: "これは施設での搬入チェックの写真です。中央では、白衣を着た作業員が発泡スチロールの箱を開けて中身を確認しています。手前にはテーブルの上に温度計があります。背景には保冷車が見えます。輸入された卵を受け取ったばかりで、荷下ろしの前に温度と状態を確認しているのだと思います。"
    },
    type: "検品・搬入系の写真は、開ける/確認するという動作を中心に、温度・状態に関わる小道具を周辺情報として加える型。",
    patterns: ["A is opening 〜 and checking the contents.", "I think they just -ed, and are -ing.(直前の動作+現在の動作)"],
    tips: "実務語彙: imported eggs(発眼卵)/refrigerated truck(保冷車)/temperature/condition/unload。実際の輸入検品の流れをイメージすると話が広がる。",
    pitfalls: "just receivedのような過去形と、are checkingのような現在進行形を1文でつなぐ場合、andで正しく接続する。"
  },
  {
    id: "p13", category: "photo", domain: "general",
    scene: "雑貨店のショッピング",
    detail: "中央で女性客が商品棚から色とりどりのリンゴを選んでいる。右に男性が立って待っている。",
    sample: {
      en: "This is a picture of a grocery store. In the center, a woman is selecting some colorful apples from the shelf. On the right, a man is standing and waiting for her. On the left, there are many colorful apples displayed on the shelf. I think they are shopping together for dinner.",
      ja: "これは食料品店の写真です。中央では、女性が棚から色とりどりのリンゴを選んでいます。右側には、男性が立って彼女を待っています。左側には棚にたくさんの色とりどりのリンゴが並んでいます。彼らは夕食のために一緒に買い物をしているのだと思います。"
    },
    type: "色や量が印象的なモノ(リンゴ等)は colorful, several, a lot of などの形容詞・数量詞で具体的に描写する型。",
    patterns: ["On the left, there are many colorful 〜.", "A is -ing for B.(目的を添える)"],
    tips: "色の形容詞を使うと描写が具体的になり高評価。colorful/red/white/blackなど。",
    pitfalls: "standing and waitingのように動作が2つある場合はandで自然に繋ぐ。"
  },
  {
    id: "p14", category: "photo", domain: "general",
    scene: "ホテルのフロント",
    detail: "中央で受付係がカウンター越しに客に鍵を渡している。奥でもう1人の受付係が電話中。",
    sample: {
      en: "This is a scene at a hotel reception desk. In the center, a receptionist is giving a key to a guest across a counter. In the background, another receptionist is talking on the phone. I think the guest has just checked in and is excited about the trip.",
      ja: "これはホテルのフロントの場面です。中央では、受付係がカウンター越しに客に鍵を渡しています。背景では、もう1人の受付係が電話で話しています。客はちょうどチェックインしたばかりで、旅行にわくわくしているのだと思います。"
    },
    type: "サービス業の定番シーン(渡す/受け取る)は、give A to B across a counter のように前置詞句で状況を具体化する型。",
    patterns: ["A is giving 〜 to B across a counter.", "Another 〜 is -ing.(2人目を簡潔に追加)"],
    tips: "across a counter / over the counter はサービス業の写真で使い回せる便利な表現。",
    pitfalls: "another の後は単数名詞(another receptionist)。othersと混同しない。"
  },
  {
    id: "p15", category: "photo", domain: "aqua",
    scene: "RASプラントの設計打ち合わせ(社内)",
    detail: "中央でスーツの男性がモニターに表示された配管図を指して説明。左右に2人の同僚が座って聞いている。",
    sample: {
      en: "This is a picture of an internal design meeting. In the center, a man is pointing at a piping diagram on the screen and explaining something. On both sides, two colleagues are sitting and listening carefully. I think they are reviewing the layout of a new aquaculture facility before construction.",
      ja: "これは社内の設計打ち合わせの写真です。中央では、男性が画面に映った配管図を指しながら何かを説明しています。両側には、2人の同僚が座って注意深く聞いています。彼らは建設前に新しい養殖施設のレイアウトを確認しているのだと思います。"
    },
    type: "プレゼン系の写真は、話者の動作(pointing at/explaining)+聞き手の様子(listening carefully)で構成する型。",
    patterns: ["A is pointing at 〜 and explaining 〜.", "Colleagues are -ing carefully."],
    tips: "speaker(話者)語彙: give a presentation/point at something/discuss something。自分のRAS設計業務をそのまま重ねて話せる。",
    pitfalls: "on both sides は複数扱い(colleagues are)になる点に注意。"
  },

  // ---------------- Q4-6 三つの質問に答える 7セット ----------------
  {
    id: "t1", category: "three", domain: "general",
    scenario: "アメリカのマーケティング会社があなたの国でソフトドリンクについて電話インタビューをしています。",
    q4: "What is your favorite soft drink?",
    q5: "Do you prefer to buy soft drinks in a can or in a bottle?",
    q6: "Do you think children drink too many soft drinks nowadays? Why or why not?",
    sample: {
      en: "Q4: My favorite soft drink is orange soda, and I drink it once or twice a week.\nQ5: I prefer to buy soft drinks in a bottle because I don't have to drink it all at once. I can drink a little at a time and enjoy the rest later.\nQ6: I don't think so. Nowadays, many parents know soft drinks are not good for their children's health, so they usually control how much their children can drink. When my children were small, I also encouraged them to drink unsweetened tea and water.",
      ja: "Q4: 私の好きなソフトドリンクはオレンジソーダで、週に1〜2回飲みます。\nQ5: 私はボトルのものを買うのが好きです。一度に飲みきらなくてもいいからです。少しずつ飲んで後で残りを楽しめます。\nQ6: そうは思いません。最近、多くの親はソフトドリンクが子どもの健康に良くないと知っているので、たいてい飲む量をコントロールしています。私の子どもが小さかった頃も、甘くないお茶や水を飲むよう勧めていました。"
    },
    type: "準備時間なしの即答問題。Q4,5は質問の語句をそのまま再利用して即答+補足、Q6は意見→理由→具体例の型で30秒埋める。",
    patterns: ["My favorite 〜 is...", "I prefer to 〜 because 〜.", "I don't think so. 〜, so 〜."],
    tips: "Q6で何も思いつかない場合でも、I don't think so / I think so のあと、一般論(many people/parents know that...)を理由にすると安全に話を広げられる。",
    pitfalls: "ビープ音の直後に黙らない。すぐに思いつかなくても I'm not sure, but maybe... などで間を埋めて話し始める。"
  },
  {
    id: "t2", category: "three", domain: "general",
    scenario: "友人と電話で話していて、友人があなたの家に泊まりに来ることについて話しています。",
    q4: "How far is your home from the nearest train station?",
    q5: "Where is a good place to visit in your town?",
    q6: "I'd like to invite you out for dinner one night to say thanks. Where would you like to go and what dishes do you recommend from the menu?",
    sample: {
      en: "Q4: It's about 5 minutes from the station by bus or 15 minutes on foot.\nQ5: In my town, there is a nice big park. You can enjoy seasonal flowers there, and I think you'll like it.\nQ6: Thanks. Why don't we go to a local Italian restaurant? The food is really nice and the price is reasonable, too. I recommend the Pasta Carbonara or the Four Cheese Pizza. Both are delicious.",
      ja: "Q4: 駅からはバスなら5分、徒歩だと15分です。\nQ5: 私の町にはすてきな大きい公園があります。季節の花を楽しめるので、きっと気に入ると思います。\nQ6: ありがとう。地元のイタリアンレストランへ行きませんか。食べ物がとてもおいしく、料金も手頃です。カルボナーラのパスタか、4種のチーズのピザをおすすめします。どちらもおいしいです。"
    },
    type: "会話形式の3問質問。Q4,5は事実+一言補足、Q6は提案(Why don't we〜?)+理由+具体例の型。",
    patterns: ["It's about 〜 minutes from 〜 by bus/on foot.", "Why don't we 〜? 〜 is really nice and 〜."],
    tips: "Q6では固有名詞(店名・料理名)を自分で作ってよい。本当の事実である必要はない。",
    pitfalls: "距離・時間を答える際は by train/bus/on footなど手段を明示する。"
  },
  {
    id: "t3", category: "three", domain: "general",
    scenario: "英語の雑誌があなたの国で携帯電話を所有することについて記事を書こうとしており、電話インタビューに応じました。",
    q4: "When was the last time you bought a mobile phone?",
    q5: "Do you prefer to talk to friends on the phone or to send text messages?",
    q6: "What are the disadvantages of owning a mobile phone?",
    sample: {
      en: "Q4: I bought my mobile phone two years ago at a local phone shop.\nQ5: I prefer to send text messages because I can keep them as a record.\nQ6: One disadvantage is that they break easily. I recently dropped my mobile phone on the floor and the screen cracked, so I had to pay to get it repaired. Also, people can contact me at any time, so I often turn off my mobile phone in the evening.",
      ja: "Q4: 私は2年前に地元の電話ショップで携帯電話を買いました。\nQ5: 記録として残せるので、メールを送るほうが好きです。\nQ6: 欠点の1つは壊れやすいことです。最近、携帯電話を床に落としてしまい、画面にひびが入ったので修理のためにお金を払わなければなりませんでした。また、人々はいつでも私に連絡できるので、夜はしばしば携帯の電源を切っています。"
    },
    type: "When was the last time〜?型は The last time I 〜 was... で即答+場所などの補足が定番。",
    patterns: ["The last time I 〜 was [時].", "One disadvantage is that 〜. Also, 〜."],
    tips: "Q6の答えが事実かどうかは評価対象外。すぐ理由が思いつくほうを選んでよい。disadvantageを2つ、Alsoで繋ぐとほぼ満点の構成になる。",
    pitfalls: "質問がWhenで始まる場合、答えの主動詞も時制を合わせる(boughtなら過去形)。"
  },
  {
    id: "t4", category: "three", domain: "aqua",
    scenario: "海外の業界誌があなたの国の陸上養殖(RAS)について電話インタビューをしています。",
    q4: "How often do you communicate with overseas equipment manufacturers?",
    q5: "Do you prefer to discuss technical issues by email or by video call?",
    q6: "What do you think are the biggest challenges of working with overseas suppliers?",
    sample: {
      en: "Q4: I usually communicate with them once or twice a week, depending on the project schedule.\nQ5: I prefer video calls because I can explain technical drawings more clearly and we can solve problems faster.\nQ6: I think the biggest challenge is the time difference and language barrier. Sometimes it takes a long time to get a clear answer, because we need to confirm small technical details carefully. So, we always prepare documents with clear diagrams before the meeting to avoid misunderstandings.",
      ja: "Q4: プロジェクトのスケジュールにもよりますが、たいてい週に1〜2回連絡を取ります。\nQ5: ビデオ通話のほうが技術図面をより明確に説明でき、問題をより早く解決できるので好きです。\nQ6: いちばんの課題は時差と言葉の壁だと思います。細かい技術的な詳細を慎重に確認する必要があるので、はっきりした回答を得るのに時間がかかることがあります。そのため、誤解を避けるために、会議の前にいつも明確な図を添えた資料を準備しています。"
    },
    type: "仕事の頻度・手段・課題を問う3問セット。How often→頻度副詞、Do you prefer→理由付き、What do you think→課題+理由+対策の型。",
    patterns: ["I usually 〜, depending on 〜.", "I prefer A because 〜.", "I think the biggest challenge is 〜. So, 〜."],
    tips: "実際のEPC業務・海外メーカー窓口の経験(ノフィテック等)をそのまま使える設問。time difference/language barrier/technical drawingsは汎用的に使い回せる。",
    pitfalls: "depending on〜は文末に置く副詞句として使う(文頭にも置けるが文末の方が言いやすい)。"
  },
  {
    id: "t5", category: "three", domain: "general",
    scenario: "ある旅行雑誌があなたの国の交通機関についてインタビューしています。",
    q4: "Which public transportation do you prefer to take, a bus or a train?",
    q5: "Do you think it is necessary to have an Internet connection when you are on vacation?",
    q6: "Would you consider working from home if your company allowed you to do so?",
    sample: {
      en: "Q4: I prefer to take a train. It is faster than a bus and usually on time.\nQ5: No, I don't think it is necessary to have an Internet connection when I'm on vacation. I don't want to think about my job while I'm on vacation.\nQ6: Yes, I'd consider working from home if my company allowed me to do so. If I didn't have to commute, I wouldn't have any stress, and I could use the time for my family instead.",
      ja: "Q4: 電車のほうが好きです。バスより速く、たいてい時間に正確です。\nQ5: いいえ、休暇中はインターネット接続の必要はないと思います。休暇中は仕事のことを考えたくありません。\nQ6: はい、会社が許してくれれば在宅勤務をすることを考えてみるでしょう。通勤しなくてよければストレスがなくなり、その時間を家族のために使えます。"
    },
    type: "2択選好(prefer)、Yes/No+理由、仮定法(Would you〜? If 〜, I would〜)の3パターンが1セットに揃った典型問題。",
    patterns: ["I prefer A. It is 比較級 than B.", "No/Yes, I don't/do think 〜.", "If 〜 didn't/did, I would/wouldn't 〜."],
    tips: "If+過去形, 主語+would/wouldn't の仮定法は丸ごと暗記して使い回す。Q6はほぼ毎回このパターンで対応可能。",
    pitfalls: "if節は過去形、主節はwould/wouldn'tを使う(現在の事実に反する仮定)。"
  },
  {
    id: "t6", category: "three", domain: "general",
    scenario: "ある健康情報サイトがあなたの生活習慣についてインタビューしています。",
    q4: "What time do you usually go to bed and how many hours do you usually sleep?",
    q5: "What are some good ways to stay healthy?",
    q6: "What do you think about the creativity of children these days?",
    sample: {
      en: "Q4: I usually go to bed at 11 P.M. and sleep about six hours.\nQ5: For me, jogging is a good way to stay healthy. Every day after work, I run around my neighborhood for about 10km.\nQ6: I think children are less creative than before. When I was a child, I spent a lot of time outside and invented many games with my friends. But now, a lot of children spend their free time indoors playing video games. Video games provide instant excitement, so children don't have to create something interesting on their own.",
      ja: "Q4: いつも午後11時に就寝して6時間ほど寝ます。\nQ5: 私にとってはジョギングが健康維持のよい方法です。毎日仕事後に、近所を10km程度走ります。\nQ6: 子どもたちは以前より創造的でなくなっていると思います。私が子どものとき、外でたくさんの時間を過ごし、友だちと多くのゲームを作り出していました。しかし今、多くの子どもはテレビゲームをして自由時間を家の中で過ごしています。テレビゲームはすぐに興奮できるので、子どもたちは自分でおもしろいものを作る必要がありません。"
    },
    type: "Q6は意見問題の代表型:意見→過去の行動(過去形)→現在の行動(現在形)→理由、の4ステップで30秒を埋める。",
    patterns: ["I think 〜.", "When I was a child, I 〜(過去形).", "But now, 〜(現在形).", "〜, so 〜.(理由)"],
    tips: "意見問題で時間が埋まらない時は、必ず「過去はこうだった→今はこう変わった」という対比を入れると自然に30秒話せる。",
    pitfalls: "過去のことは過去形、現在のことは現在形と時制を明確に切り替える。"
  },
  {
    id: "t7", category: "three", domain: "aqua",
    scenario: "水産業界の専門誌があなたのキャリアについてインタビューしています。",
    q4: "What kind of work do you usually do in a typical week?",
    q5: "Which do you think is more important, designing new facilities or maintaining existing ones?",
    q6: "What are some advantages and disadvantages of working in the aquaculture industry?",
    sample: {
      en: "Q4: I usually work on facility design and coordinate with overseas equipment manufacturers during the week.\nQ5: I think designing new facilities is more important right now, because the industry is growing quickly and we need more production capacity.\nQ6: I think the advantages are that the industry has a lot of growth potential and the work is meaningful, because we are producing food sustainably. On the other hand, the disadvantages are that the projects often take a long time, and dealing with overseas suppliers can be challenging because of the language barrier.",
      ja: "Q4: 1週間のうちは主に施設設計と海外設備メーカーとの調整を行います。\nQ5: 今は新しい施設の設計のほうが重要だと思います。業界が急速に成長しており、より多くの生産能力が必要だからです。\nQ6: 利点は、業界に大きな成長の可能性があり、持続可能な方法で食料を生産しているので仕事にやりがいがあることだと思います。一方、欠点は、プロジェクトがしばしば長期間かかること、そして言葉の壁のために海外の仕入先との対応が難しいことがあることです。"
    },
    type: "仕事内容→比較選好(Which is more important)→利点欠点(advantages/disadvantages)の3問セット。",
    patterns: ["I usually 〜 during the week.", "I think A is more important, because 〜.", "The advantages are 〜. On the other hand, the disadvantages are 〜."],
    tips: "自分の実際の仕事(設計・事業企画・海外窓口・EPC・電気申請・発眼卵輸入)をそのまま当てはめて練習できる、最も実用的なセット。",
    pitfalls: "On the other handは対比を導入する語句として文頭に置き、カンマを忘れない。"
  },

  // ---------------- Q10 解決策を提案する 3問 ----------------
  {
    id: "s1", category: "solution", domain: "general",
    problem: "【留守電形式】カスタマーサービス担当のサンドラ・カーンからのメッセージ。問題:去年12月、社員がみな同じ時期に休みを取りたがり、最も忙しい12月に十分な人手を確保できなかった。あなたに解決策の提案を求めている。",
    sample: {
      en: "Hello, Jennifer. This is Sandra Kahn from customer service. Thank you for your call. I understand the problem is that last year, everybody wanted to have a holiday at around the same time, so we didn't have enough people to cover our business during December, our busiest month. I have a suggestion. How about making an announcement in our internal newsletter? We should explain what happened last year so that employees can be a little more careful, because many of them don't know about the problem. For example, in the newsletter, we can show some facts and numbers from last December. Then they will understand why it was such a big problem. Let me know what you think. Thanks.",
      ja: "もしもし、ジェニファーですか。私は顧客サービス担当のサンドラ・カーンです。お電話ありがとうございます。問題点はこういうことですね。去年、みんな同じ時期に休みを取りたがっていたので、最も忙しい月である12月に十分な人手を確保できなかった。あなたに提案があります。社内報で告知してはどうでしょう。去年起こったことを説明すべきです。そうすれば社員も少し慎重になると思います。多くの社員は去年起こった問題を知らないからです。例えば社内報で去年12月の事実や数値を伝えることができます。そうすればなぜこれが大きな問題だったかわかるでしょう。あなたの考えを聞かせてください。では。"
    },
    type: "Q10の基本4ステップ:①名乗り(Hello, 〜. This is 〜. Thank you for your call.)②問題要約(I understand the problem is that 〜)③解決策(I have a suggestion. How about -ing? 〜, because 〜. For example 〜.)④締め(Let me know what you think. Thanks.)",
    patterns: ["I understand the problem is that 〜.", "How about -ing? We should 〜, because 〜.", "For example, 〜. Then 〜."],
    tips: "解決策が1つしか思いつかない場合は、because(理由)とfor example(具体例)で時間いっぱい詳しく話すと60秒埋まる。これは全ての解決策提案問題に応用できる万能の型。",
    pitfalls: "問題点をうまく言えない場合は I understand your problem. とだけ言ってそのまま解決策に移ってよい(無理に詳しく要約しなくてもよい)。"
  },
  {
    id: "s2", category: "solution", domain: "general",
    problem: "【会議形式】来週開催予定の記者会見の会場に関する話し合い。当初100人収容の部屋を予約していたが、メディアと流通業者から予想以上の関心があり150人ほどが出席希望。部屋が狭すぎて、1週間しかなく会場変更もできない。広報担当として解決策を電話で提案する。",
    sample: {
      en: "Hi. This is Ron Foster from Public Relations. Following up on the last meeting, our team discussed the issue of the upcoming conference. It seems that more people want to come than we expected, but the problem is that the room is too small. One idea is to keep the same venue and room but to hold two press conferences. We can do one for the media and then another for the distributors. Another is to use live video streaming so we can hold just one press conference. We can put the additional 50 people in another room. Anyway, let me know what you think about my suggestions. This is Ron Foster, and you can reach me at extension 511.",
      ja: "もしもし、広報のロン・フォスターです。最後のミーティングを受けて、私たちのチームで次の会見に関する問題について話し合いました。私たちが予想したよりも多くの人が来場を希望しているようですが、問題は部屋が狭すぎるということです。1つの提案は同じ会場と部屋のままで、会見を2回にすることです。1つはメディア向け、そしてその後もう1回は流通業者向けにできるでしょう。もう1つの提案は記者会見を1回だけ開けばよいように、実況中継をすることです。追加の50名にはほかの部屋を用意します。どちらにしても、私の提案についてのご意見をお知らせください。こちらはロン・フォスターです。内線511が私の連絡先です。"
    },
    type: "会議形式は名乗りの定型が異なる(Following up on our meeting, I'm calling back with some suggestions.)。問題点はリスニングで聞き取り、howeverやtoo+形容詞に注目する。解決策は2つをFirst/Second(またはOne idea is.../Another is...)で並べる型。",
    patterns: ["Following up on our [the last] meeting, 〜.", "One idea is to 〜. Another is to 〜.", "We should use two rooms and connect them with live video."],
    tips: "「場所が足りない」系の問題は share the space with 人 / connect the two rooms / use live video streaming のストックがそのまま使える定番解決策。",
    pitfalls: "リスニングで too small / too late のように too+形容詞 は否定的な意味になる点を聞き逃さない。"
  },
  {
    id: "s3", category: "solution", domain: "aqua",
    problem: "【会議形式】陸上養殖プラントの溶存酸素濃度が想定より低下しているという技術的な問題が発生。原因は最近の魚の生育数増加に酸素供給システムが追いついていないこと。来週までに対策案を上司に提案する必要がある。",
    sample: {
      en: "Hi. This is calling back about the dissolved oxygen issue we discussed in the meeting. I understand the problem is that the number of fish has increased recently, but our oxygen supply system hasn't caught up with that growth. One idea is to install an additional oxygen generator temporarily while we review the long-term capacity plan. Another idea is to reduce the stocking density in some tanks until the system is upgraded. I think the first option is faster to implement, because we can rent equipment instead of waiting for a new purchase. Let me know what you think, and I can prepare a more detailed cost estimate if needed.",
      ja: "もしもし、ミーティングで話し合った溶存酸素の問題について折り返しご連絡しています。問題は、最近魚の数が増えたものの、酸素供給システムがその成長に追いついていないということだと理解しています。1つの案は、長期的な容量計画を見直す間、一時的に追加の酸素発生装置を設置することです。もう1つの案は、システムが改良されるまで一部の水槽の収容密度を下げることです。最初の選択肢のほうが実施が早いと思います。新規購入を待つ代わりに機器をレンタルできるからです。ご意見をお聞かせください。必要であれば詳細なコスト見積もりも準備します。"
    },
    type: "技術的トラブル系の解決策提案。原因(問題要約)→2つの解決策(短期対策/長期対策)→どちらが良いか理由を添えて推す、という型。",
    patterns: ["I understand the problem is that 〜, but 〜ハッテない.", "One idea is to 〜 temporarily, while 〜. Another idea is to 〜.", "I think the first option is better, because 〜."],
    tips: "RAS設計の実務(酸素供給、機器のレンタル/購入判断、容量計画)をそのまま英語の型に乗せられる設問。短期対策と長期対策を分けて提示する構成は技術系の問題で非常に使い回しが効く。",
    pitfalls: "解決策を2つ出す場合、One idea is.../Another idea is... の並列を崩さない。動詞の形(install/reduceなど原形)を揃える。"
  },

  // ---------------- Q11 意見を述べる 3問 ----------------
  {
    id: "o1", category: "opinion", domain: "general",
    question: "Some people think that working from home is better than working in an office. Do you agree or disagree? Why?",
    sample: {
      en: "I agree that working from home is better than working in an office. This is because I can save a lot of time by not commuting, and I can use that extra time for my family or for rest. For example, when I worked from home last year, I used to spend the time I saved on exercise in the morning, and I felt much healthier. Also, I can usually concentrate better at home because there are fewer interruptions from colleagues. For these reasons, I think working from home is better for many people.",
      ja: "私は在宅勤務のほうがオフィス勤務より良いと思います。なぜなら、通勤しないことで多くの時間を節約でき、その余った時間を家族や休息のために使えるからです。例えば、去年在宅勤務をしていたとき、節約した時間を朝の運動に使っていて、より健康的だと感じました。また、同僚からの邪魔が少ないので、家のほうが集中できることが多いです。これらの理由から、多くの人にとって在宅勤務のほうが良いと思います。"
    },
    type: "意見問題の基本型:意見(I agree/disagree that 〜)→理由(This is because 〜)→具体例(過去形でエピソード)→補足理由(Also, 〜)→結論(For these reasons, 〜)。",
    patterns: ["I agree/disagree that 〜.", "This is because 〜.", "For example, when I 〜(過去形), 〜.", "For these reasons, I think 〜."],
    tips: "理由は1つでも2つでもよい。Also, で2つ目の理由を追加すると60秒が埋まりやすい。最後に意見を繰り返すと締まりが良くなる。",
    pitfalls: "意見を最初の1文で明確に言い切ること(あいまいにしない)。"
  },
  {
    id: "o2", category: "opinion", domain: "general",
    question: "Which do you think is more important for a company, customer satisfaction or employee satisfaction? Why?",
    sample: {
      en: "I think employee satisfaction is more important for a company. This is because employees who are satisfied with their jobs tend to provide better service to customers naturally. For example, in my own experience, when I felt supported by my manager, I was much more motivated to help our clients carefully. On the other hand, if employees are unhappy, customer satisfaction usually goes down eventually, too. So, I believe a company should focus on its employees first.",
      ja: "私は従業員満足のほうが会社にとってより重要だと思います。なぜなら、仕事に満足している従業員は自然により良いサービスを顧客に提供する傾向があるからです。例えば、私自身の経験では、上司に支えられていると感じたとき、私は顧客を丁寧に助けるためのやる気がより高まりました。一方で、従業員が不満なら、結局は顧客満足度も下がることが多いです。ですから、会社はまず従業員に焦点を当てるべきだと信じています。"
    },
    type: "2択比較の意見問題。For me, A is more important. の代わりにI think A is more important for 〜.でも対応可能。理由→具体例→対比(On the other hand)→結論の型。",
    patterns: ["I think A is more important. This is because 〜.", "On the other hand, 〜, too.", "So, I believe 〜."],
    tips: "対比表現(on the other hand)を使うと、片方の意見を支持しつつもう片方にも触れられ、論理的な印象になる。",
    pitfalls: "比較問題では必ずどちらか一方を明確に選ぶ(両方大事ですで終わらせない)。"
  },
  {
    id: "o3", category: "opinion", domain: "aqua",
    question: "Some people think that recirculating aquaculture systems (RAS) will become more important than traditional aquaculture in the future. What do you think?",
    sample: {
      en: "I think recirculating aquaculture systems will become more important in the future. This is because RAS uses much less water and can be built closer to cities, so the fish can be delivered to consumers more quickly and fresh. For example, in my own work, I have seen that demand for locally produced, sustainable seafood has been growing recently. Also, traditional aquaculture is often limited by location and environmental regulations, while RAS can control the water quality precisely. For these reasons, I believe RAS will play a bigger role in the seafood industry going forward.",
      ja: "私は循環式養殖システム(RAS)が将来より重要になると思います。なぜなら、RASははるかに少ない水で済み、都市の近くに建設できるので、魚をより早く新鮮な状態で消費者に届けられるからです。例えば、私自身の仕事の中で、地元産で持続可能な海産物への需要が最近増えているのを見てきました。また、従来の養殖はしばしば立地や環境規制によって制限されますが、RASは水質を精密にコントロールできます。これらの理由から、RASは今後、水産業界でより大きな役割を果たすと信じています。"
    },
    type: "専門分野の意見問題。一般論+自分の実務経験(in my own work, I have seen 〜)を組み合わせると説得力のある具体例になる型。",
    patterns: ["I think 〜 will become more important. This is because 〜.", "In my own work, I have seen that 〜.", "While A, B.(対比で2つの違いを一文にまとめる)"],
    tips: "陸上養殖・RASの専門知識を直接使える唯一無二の練習問題。実際の業務内容(設計・事業企画)をin my own workに乗せれば、説得力のある具体例が自然に作れる。",
    pitfalls: "whileを使った対比文では、コンマの位置と時制の統一(現在形同士)に注意。"
  },
];

const CATEGORY_META = {
  photo: { label: "写真描写", short: "Q3", color: "bg-sky-600" },
  three: { label: "3つの質問に答える", short: "Q4-6", color: "bg-emerald-600" },
  solution: { label: "解決策を提案", short: "Q10", color: "bg-amber-600" },
  opinion: { label: "意見を述べる", short: "Q11", color: "bg-rose-600" },
};

/* =========================================================
   モチベーションメッセージ(日替わり)
========================================================= */
const MOTIVATIONS = [
  "継続が大事。今日の1問が、本番の1点になる。",
  "諦めたらそこで終了だよ。あと少し、進めてみよう。",
  "椎名さんの期待、忘れてないよね？今日もコツコツいこう。",
  "海外研修、行きたいんだろ？その夢につながる練習が今これだ。",
  "シャオランさんが待ってるよ。あの時話せなかった分、今日取り返そう。",
  "アクアヘンの会議、忘れたか？あの時話せなかった記憶、思い出して。",
  "毎日続けてきたあなたを、未来のあなたがきっと褒めてくれる。",
  "完璧じゃなくていい。今日もマイクの前に立つこと自体が勝ちだ。",
  "小さな積み重ねが、8月9日の自信になる。",
  "今日の自分が一番伸びしろがある。さあ、1問やってみよう。",
];

function getDailyMotivation() {
  const today = new Date();
  const dayIndex = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  return MOTIVATIONS[dayIndex % MOTIVATIONS.length];
}

function daysUntilExam() {
  const examDate = new Date(new Date().getFullYear(), 7, 9); // 8月9日(月=7)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let target = new Date(examDate);
  target.setHours(0, 0, 0, 0);
  if (target < today) target.setFullYear(target.getFullYear() + 1);
  const diffMs = target - today;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

/* =========================================================
   ストレージ補助(ブラウザのlocalStorageを使用)
========================================================= */
async function loadState(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
async function saveState(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    /* noop */
  }
}

/* =========================================================
   メインアプリ
========================================================= */
export default function App() {
  const [screen, setScreen] = useState("home"); // home | practice | review
  const [list, setList] = useState(QUESTIONS); // 現在の出題リスト
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [bookmarks, setBookmarks] = useState({});
  const [evals, setEvals] = useState({});
  const [streak, setStreak] = useState({ count: 0, lastDate: null });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const bm = await loadState("bookmarks", {});
      const ev = await loadState("evals", {});
      const st = await loadState("streak", { count: 0, lastDate: null });

      // streak update
      const today = todayStr();
      if (st.lastDate !== today) {
        const yest = new Date();
        yest.setDate(yest.getDate() - 1);
        const yestStr = `${yest.getFullYear()}-${yest.getMonth() + 1}-${yest.getDate()}`;
        if (st.lastDate === yestStr) {
          st.count = (st.count || 0) + 1;
        } else {
          st.count = 1;
        }
        st.lastDate = today;
        await saveState("streak", st);
      }

      setBookmarks(bm);
      setEvals(ev);
      setStreak(st);
      setLoaded(true);
    })();
  }, []);

  const toggleBookmark = (id) => {
    const next = { ...bookmarks, [id]: !bookmarks[id] };
    setBookmarks(next);
    saveState("bookmarks", next);
  };

  const setEval = (id, val) => {
    const next = { ...evals, [id]: val };
    setEvals(next);
    saveState("evals", next);
  };

  const startCategory = (cat) => {
    const filtered = cat === "all" ? QUESTIONS : QUESTIONS.filter((q) => q.category === cat);
    setList(filtered);
    setIndex(0);
    setShowAnswer(false);
    setScreen("practice");
  };

  const startReview = () => {
    const filtered = QUESTIONS.filter((q) => bookmarks[q.id]);
    setList(filtered);
    setIndex(0);
    setShowAnswer(false);
    setScreen("review");
  };

  const startRandom10 = () => {
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
    setList(shuffled);
    setIndex(0);
    setShowAnswer(false);
    setScreen("practice");
  };

  const goNext = () => {
    setShowAnswer(false);
    setIndex((i) => Math.min(i + 1, list.length - 1));
  };
  const goPrev = () => {
    setShowAnswer(false);
    setIndex((i) => Math.max(i - 1, 0));
  };

  const progressByCategory = useMemo(() => {
    const result = {};
    Object.keys(CATEGORY_META).forEach((cat) => {
      const items = QUESTIONS.filter((q) => q.category === cat);
      const done = items.filter((q) => evals[q.id]).length;
      result[cat] = { done, total: items.length };
    });
    return result;
  }, [evals]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400 text-sm">
        読み込み中...
      </div>
    );
  }

  if (screen === "home") {
    return (
      <HomeScreen
        streak={streak}
        progressByCategory={progressByCategory}
        bookmarkCount={Object.values(bookmarks).filter(Boolean).length}
        onStartCategory={startCategory}
        onStartReview={startReview}
        onStartRandom={startRandom10}
      />
    );
  }

  return (
    <PracticeScreen
      list={list}
      index={index}
      showAnswer={showAnswer}
      setShowAnswer={setShowAnswer}
      onNext={goNext}
      onPrev={goPrev}
      onBack={() => setScreen("home")}
      bookmarks={bookmarks}
      toggleBookmark={toggleBookmark}
      evals={evals}
      setEval={setEval}
      isReview={screen === "review"}
    />
  );
}

/* =========================================================
   ホーム画面
========================================================= */
function HomeScreen({ streak, progressByCategory, bookmarkCount, onStartCategory, onStartReview, onStartRandom }) {
  const motivation = getDailyMotivation();
  const days = daysUntilExam();

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <div className="bg-slate-900 text-white px-5 pt-8 pb-6 rounded-b-3xl shadow-sm">
        <h1 className="text-xl font-bold tracking-tight">TOEIC SW スピーキング練習</h1>
        <p className="text-slate-300 text-sm mt-1">タップで何度でも練習できます</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="bg-slate-800 rounded-2xl p-4">
            <p className="text-slate-400 text-xs">連続学習日数</p>
            <p className="text-2xl font-bold mt-1">🔥 {streak.count}<span className="text-base font-normal"> 日</span></p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-4">
            <p className="text-slate-400 text-xs">試験まで</p>
            <p className="text-2xl font-bold mt-1">{days}<span className="text-base font-normal"> 日</span></p>
            <p className="text-slate-400 text-xs mt-0.5">8月9日 本番</p>
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-400/30 rounded-2xl p-4">
          <p className="text-amber-200 text-xs font-semibold mb-1">今日の一言</p>
          <p className="text-white text-sm leading-relaxed">{motivation}</p>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-3">
        {Object.entries(CATEGORY_META).map(([cat, meta]) => {
          const prog = progressByCategory[cat];
          return (
            <button
              key={cat}
              onClick={() => onStartCategory(cat)}
              className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-3">
                <span className={`${meta.color} text-white text-xs font-bold px-2 py-1 rounded-lg`}>{meta.short}</span>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">{meta.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{prog.done}/{prog.total} 問評価済み</p>
                </div>
              </div>
              <span className="text-slate-300 text-xl">›</span>
            </button>
          );
        })}

        <button
          onClick={onStartRandom}
          className="w-full bg-indigo-600 text-white rounded-2xl shadow-sm p-4 flex items-center justify-between active:scale-[0.98] transition-transform mt-4"
        >
          <span className="font-semibold">🎲 ランダム10問</span>
          <span className="text-xl">›</span>
        </button>

        <button
          onClick={onStartReview}
          disabled={bookmarkCount === 0}
          className={`w-full rounded-2xl shadow-sm p-4 flex items-center justify-between active:scale-[0.98] transition-transform ${
            bookmarkCount === 0 ? "bg-slate-100 text-slate-400" : "bg-white text-slate-800"
          }`}
        >
          <span className="font-semibold">☆ 復習リスト（{bookmarkCount}問）</span>
          <span className="text-xl">›</span>
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   練習画面
========================================================= */
function PracticeScreen({
  list, index, showAnswer, setShowAnswer, onNext, onPrev, onBack,
  bookmarks, toggleBookmark, evals, setEval, isReview,
}) {
  if (list.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <p className="text-slate-500 mb-4">問題がありません。</p>
        <button onClick={onBack} className="px-5 py-3 bg-slate-900 text-white rounded-xl">ホームに戻る</button>
      </div>
    );
  }

  const q = list[index];
  const meta = CATEGORY_META[q.category];
  const isBookmarked = !!bookmarks[q.id];
  const currentEval = evals[q.id];

  return (
    <div className="min-h-screen bg-slate-50 pb-44">
      {/* ヘッダー */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="text-slate-500 text-sm px-2 py-1">← ホーム</button>
        <div className="flex items-center gap-2">
          <span className={`${meta.color} text-white text-xs font-bold px-2 py-1 rounded-lg`}>{meta.short}</span>
          <span className="text-xs text-slate-400">{index + 1} / {list.length}</span>
        </div>
        <button
          onClick={() => toggleBookmark(q.id)}
          className={`text-2xl px-2 ${isBookmarked ? "text-amber-400" : "text-slate-300"}`}
          aria-label="ブックマーク"
        >
          {isBookmarked ? "★" : "☆"}
        </button>
      </div>

      {/* 本体 */}
      <div className="px-4 mt-4 space-y-4">
        <QuestionBody q={q} />

        {/* 解答を見るボタン */}
        {!showAnswer && (
          <button
            onClick={() => setShowAnswer(true)}
            className="w-full bg-slate-900 text-white rounded-2xl py-4 font-semibold text-base active:scale-[0.98] transition-transform shadow-sm"
          >
            解答・解説を見る
          </button>
        )}

        {showAnswer && <AnswerBody q={q} />}

        {showAnswer && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-slate-400 mb-2">自己評価</p>
            <div className="flex gap-2">
              {[
                { v: "good", label: "◎ できた", color: "bg-emerald-500" },
                { v: "mid", label: "△ まあまあ", color: "bg-amber-500" },
                { v: "bad", label: "✗ 苦手", color: "bg-rose-500" },
              ].map((opt) => (
                <button
                  key={opt.v}
                  onClick={() => setEval(q.id, opt.v)}
                  className={`flex-1 py-3 rounded-xl text-white text-sm font-medium ${
                    currentEval === opt.v ? opt.color : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 下部ナビゲーション */}
      <div
        className="fixed left-0 right-0 z-[200] bg-white border-t border-slate-100 px-4 py-3 flex gap-3 mx-auto"
        style={{ bottom: "calc(68px + env(safe-area-inset-bottom, 0px))", maxWidth: "430px" }}
      >
        <button
          onClick={onPrev}
          disabled={index === 0}
          className={`flex-1 py-3 rounded-xl font-medium ${index === 0 ? "bg-slate-100 text-slate-300" : "bg-slate-200 text-slate-700"}`}
        >
          ← 前の問題
        </button>
        <button
          onClick={onNext}
          disabled={index === list.length - 1}
          className={`flex-1 py-3 rounded-xl font-medium ${index === list.length - 1 ? "bg-slate-100 text-slate-300" : "bg-slate-900 text-white"}`}
        >
          次の問題 →
        </button>
      </div>
    </div>
  );
}

function QuestionBody({ q }) {
  if (q.category === "photo") {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-xs text-slate-400 mb-1">場面</p>
        <p className="font-semibold text-slate-800 mb-3">{q.scene}</p>
        <div className="bg-slate-100 rounded-xl p-4 text-sm text-slate-600 leading-relaxed">
          {q.detail}
        </div>
        <p className="text-xs text-slate-400 mt-3">この場面を英語で描写してみましょう（準備30秒・発話45秒の感覚で練習）</p>
      </div>
    );
  }
  if (q.category === "three") {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
        <div>
          <p className="text-xs text-slate-400 mb-1">シナリオ</p>
          <p className="text-sm text-slate-700 leading-relaxed">{q.scenario}</p>
        </div>
        {["q4", "q5", "q6"].map((k, i) => (
          <div key={k} className="bg-slate-100 rounded-xl p-3">
            <p className="text-xs font-bold text-slate-400 mb-1">Question {i + 4}</p>
            <p className="text-sm text-slate-800">{q[k]}</p>
          </div>
        ))}
      </div>
    );
  }
  if (q.category === "solution") {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-xs text-slate-400 mb-1">問題状況</p>
        <p className="text-sm text-slate-700 leading-relaxed">{q.problem}</p>
        <p className="text-xs text-slate-400 mt-3">問題を理解したことを示し、解決策を提案してください（準備30秒・発話60秒の感覚で練習）</p>
      </div>
    );
  }
  // opinion
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <p className="text-xs text-slate-400 mb-1">質問</p>
      <p className="text-base text-slate-800 leading-relaxed font-medium">{q.question}</p>
      <p className="text-xs text-slate-400 mt-3">意見とその理由を述べてください（準備15秒・発話60秒の感覚で練習）</p>
    </div>
  );
}

function AnswerBody({ q }) {
  return (
    <div className="space-y-3">
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
        <p className="text-xs font-bold text-emerald-700 mb-2">模範解答</p>
        <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">{q.sample.en}</p>
        <div className="h-px bg-emerald-100 my-3" />
        <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{q.sample.ja}</p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
        <Section title="この問題の型" text={q.type} />
        <Section title="使える定型表現" list={q.patterns} />
        <Section title="応用ポイント（他の問題にも使える）" text={q.tips} />
        <Section title="よくある減点ポイント" text={q.pitfalls} accent="rose" />
      </div>
    </div>
  );
}

function Section({ title, text, list, accent }) {
  const accentColor = accent === "rose" ? "text-rose-600" : "text-indigo-600";
  return (
    <div>
      <p className={`text-xs font-bold mb-1 ${accentColor}`}>{title}</p>
      {text && <p className="text-sm text-slate-700 leading-relaxed">{text}</p>}
      {list && (
        <ul className="space-y-1 mt-1">
          {list.map((item, i) => (
            <li key={i} className="text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
