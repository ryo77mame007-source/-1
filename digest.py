#!/usr/bin/env python3

import os
import json
import feedparser
import anthropic
import resend
from datetime import datetime
import pytz

RSS_FEEDS = [
    ("Google News - Aquaculture", "https://news.google.com/rss/search?q=aquaculture+fish+farming&hl=en-US&gl=US&ceid=US:en"),
    ("Google News - 養殖", "https://news.google.com/rss/search?q=養殖+水産業&hl=ja&gl=JP&ceid=JP:ja"),
    ("Google News - Salmon farming", "https://news.google.com/rss/search?q=salmon+farming+shrimp+aquaculture&hl=en-US&gl=US&ceid=US:en"),
    ("The Fish Site", "https://thefishsite.com/feed"),
    ("Global Seafood Alliance", "https://www.globalseafood.org/feed/"),
    ("Seafood Source", "https://www.seafoodsource.com/rss/news"),
]

WEEKDAY_JA = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"]


def fetch_articles(max_per_feed: int = 8) -> list[dict]:
    articles = []
    seen_titles = set()

    for name, url in RSS_FEEDS:
        try:
            feed = feedparser.parse(url, request_headers={"User-Agent": "Mozilla/5.0"})
            for entry in feed.entries[:max_per_feed]:
                title = entry.get("title", "").strip()
                if not title or title in seen_titles:
                    continue
                seen_titles.add(title)
                raw_summary = entry.get("summary", entry.get("description", ""))
                # Strip basic HTML tags from summary
                import re
                clean_summary = re.sub(r"<[^>]+>", "", raw_summary)[:600]
                articles.append({
                    "source": name,
                    "title": title,
                    "summary": clean_summary.strip(),
                    "link": entry.get("link", ""),
                    "published": entry.get("published", ""),
                })
        except Exception as e:
            print(f"Warning: Could not fetch {name}: {e}")

    return articles


def generate_digest(articles: list[dict]) -> dict:
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    articles_json = json.dumps(articles, ensure_ascii=False, indent=2)

    prompt = f"""あなたは養殖・水産業の専門家アナリストです。以下のニュース記事から最も教育的価値の高い5〜7件を選び、毎朝のニュースダイジェストを日本語で作成してください。

【対象読者】養殖業に関心を持つビジネスパーソン・研究者・学習者
【重視するテーマ】技術・養殖手法 / 市場・ビジネス / 科学・研究

ニュース記事一覧：
{articles_json}

以下のJSON形式のみで出力してください（コードブロック・前後の説明不要）：
{{
  "intro": "今日のダイジェストの概要（2〜3文。今日注目すべきトレンドを示す）",
  "articles": [
    {{
      "title": "記事タイトル（日本語に翻訳または原文）",
      "source": "情報源名",
      "link": "URL",
      "category": "技術・養殖手法 or 市場・ビジネス or 科学・研究",
      "summary": "記事の要約（日本語、3〜4文。事実ベースで具体的に）",
      "learning_points": [
        "学びのポイント1（業界への示唆・応用可能な知識）",
        "学びのポイント2",
        "学びのポイント3"
      ],
      "key_term": "この記事の重要キーワード（専門用語1つ）",
      "key_term_explanation": "そのキーワードの説明（養殖文脈で1〜2文）"
    }}
  ],
  "closing_message": "今日の締めくくりメッセージ（読者の好奇心や行動を促す一言）"
}}"""

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=5000,
        messages=[{"role": "user", "content": prompt}],
    )

    response_text = message.content[0].text.strip()
    # Remove markdown code fences if present
    if response_text.startswith("```"):
        response_text = response_text.split("```")[1]
        if response_text.startswith("json"):
            response_text = response_text[4:]

    return json.loads(response_text)


def build_html_email(digest_data: dict) -> str:
    jst = pytz.timezone("Asia/Tokyo")
    today = datetime.now(jst)
    weekday = WEEKDAY_JA[today.weekday()]
    date_str = f"{today.year}年{today.month}月{today.day}日（{weekday}）"

    category_styles = {
        "技術・養殖手法": ("#2E86AB", "⚙️"),
        "市場・ビジネス": ("#A23B72", "📈"),
        "科学・研究": ("#E76F51", "🔬"),
    }

    articles_html = ""
    for article in digest_data.get("articles", []):
        cat = article.get("category", "一般")
        color, emoji = category_styles.get(cat, ("#607D8B", "📰"))

        learning_points_html = "".join(
            f'<li style="margin-bottom:8px;color:#444;">{p}</li>'
            for p in article.get("learning_points", [])
        )

        articles_html += f"""
    <div style="background:#ffffff;border-radius:14px;padding:24px 28px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.07);border-left:5px solid {color};">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap;">
        <span style="background:{color};color:white;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.5px;">{emoji} {cat}</span>
        <span style="color:#aaa;font-size:12px;">出典：{article.get('source', '')}</span>
      </div>

      <h2 style="margin:0 0 12px 0;font-size:18px;line-height:1.5;color:#1a1a2e;">
        <a href="{article.get('link', '#')}" style="color:#1a1a2e;text-decoration:none;" target="_blank">{article.get('title', '')}</a>
      </h2>

      <p style="margin:0 0 18px 0;color:#555;line-height:1.8;font-size:14px;">{article.get('summary', '')}</p>

      <div style="background:#f7f9fc;border-radius:10px;padding:16px 20px;margin-bottom:14px;">
        <p style="margin:0 0 10px 0;font-weight:700;color:#333;font-size:13px;">📚 学びのポイント</p>
        <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.7;">
          {learning_points_html}
        </ul>
      </div>

      <div style="background:linear-gradient(135deg,{color}11,{color}22);border-radius:10px;padding:12px 16px;border-left:3px solid {color};">
        <p style="margin:0 0 4px 0;font-size:13px;font-weight:700;color:{color};">🔑 キーワード：{article.get('key_term', '')}</p>
        <p style="margin:0;font-size:13px;color:#555;line-height:1.6;">{article.get('key_term_explanation', '')}</p>
      </div>

      <div style="margin-top:14px;text-align:right;">
        <a href="{article.get('link', '#')}" style="color:{color};font-size:13px;font-weight:600;text-decoration:none;" target="_blank">元記事を読む →</a>
      </div>
    </div>"""

    return f"""<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>養殖ニュースダイジェスト</title>
</head>
<body style="margin:0;padding:0;background:#eef2f7;font-family:-apple-system,BlinkMacSystemFont,'Hiragino Kaku Gothic ProN','Hiragino Sans',Meiryo,'Yu Gothic',sans-serif;">
  <div style="max-width:660px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0077b6 0%,#023e8a 100%);border-radius:18px;padding:36px 32px;margin-bottom:20px;text-align:center;">
      <p style="color:#90e0ef;margin:0 0 6px 0;font-size:11px;letter-spacing:3px;font-weight:600;">DAILY AQUACULTURE DIGEST</p>
      <h1 style="color:#ffffff;margin:0 0 10px 0;font-size:28px;font-weight:800;">🐟 養殖ニュースダイジェスト</h1>
      <p style="color:#ade8f4;margin:0;font-size:14px;">{date_str}</p>
    </div>

    <!-- Intro -->
    <div style="background:#ffffff;border-radius:14px;padding:22px 28px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06);text-align:center;">
      <p style="color:#555;margin:0;line-height:1.8;font-size:15px;">{digest_data.get('intro', '')}</p>
    </div>

    <!-- Articles -->
    {articles_html}

    <!-- Closing -->
    <div style="background:linear-gradient(135deg,#023e8a 0%,#0077b6 100%);border-radius:14px;padding:24px 28px;margin-bottom:20px;text-align:center;">
      <p style="color:#ade8f4;margin:0;font-size:15px;line-height:1.8;">💡 {digest_data.get('closing_message', '')}</p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:12px;">
      <p style="color:#aaa;font-size:12px;margin:0 0 4px 0;">このメールはAIが生成した養殖ニュースダイジェストです。</p>
      <p style="color:#aaa;font-size:12px;margin:0;">情報の正確性については各元記事をご確認ください。</p>
    </div>

  </div>
</body>
</html>"""


def send_email(html_content: str, subject: str) -> dict:
    resend.api_key = os.environ["RESEND_API_KEY"]
    to_email = os.environ["TO_EMAIL"]
    from_email = os.environ.get("FROM_EMAIL", "Aquaculture Digest <onboarding@resend.dev>")

    params: resend.Emails.SendParams = {
        "from": from_email,
        "to": [to_email],
        "subject": subject,
        "html": html_content,
    }

    return resend.Emails.send(params)


def main():
    print("=== 養殖ニュースダイジェスト生成開始 ===")

    print("📡 ニュースを収集中...")
    articles = fetch_articles()
    print(f"✅ {len(articles)} 件の記事を収集")

    if not articles:
        print("❌ 記事が取得できませんでした")
        return

    print("🤖 AIでダイジェストを生成中...")
    digest_data = generate_digest(articles)
    article_count = len(digest_data.get("articles", []))
    print(f"✅ {article_count} 件のダイジェストを生成")

    print("📧 HTMLメールを作成中...")
    html_content = build_html_email(digest_data)

    jst = pytz.timezone("Asia/Tokyo")
    today = datetime.now(jst)
    subject = f"🐟 養殖ダイジェスト {today.month}/{today.day} — {article_count}件のニュース"

    print("📤 メールを送信中...")
    result = send_email(html_content, subject)
    print(f"✅ 送信完了: {result}")


if __name__ == "__main__":
    main()
