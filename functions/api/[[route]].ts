import { Bot, InputFile, InputMediaBuilder } from "grammy";
import { InputMediaPhoto } from "grammy/types";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { handle } from "hono/cloudflare-pages";
import { ENV } from "./types";

const IP_HEADER = "CF-Connecting-IP";

const newSuccess = (message = "success") => ({ code: 0, message });
const newError500 = (message = "server internal error") => ({
  code: 500.001,
  message,
});
const newErrorFormat400 = (
  message = "The data format of the request is invalid. Please check and use the correct data format."
) => ({ code: 400.001, message });

const app = new Hono();

app.onError((err, c) => {
  console.error(String(err));
  return c.json(newError500(), 500);
});

app.get("/api", (c) => {
  return c.text("Hello, Project Trans SuggestionBox!");
});

app.post("/api/v1/suggestion", async (c) => {
  const { TG_BOT_TOKEN, TG_GROUP_ID } = env<ENV>(c);
  if (!TG_BOT_TOKEN) {
    throw new Error("TG_BOT_TOKEN is not set");
  }
  if (!TG_GROUP_ID) {
    throw new Error("TG_GROUP_ID is not set");
  }
  const bot = new Bot(TG_BOT_TOKEN);

  let metaUA = "";
  let metaIP = "";
  let metaReferrer = "";
  let contactContent = "";
  let textContent = "";
  const reqImages: File[] = [];
  const msgImages: InputMediaPhoto[] = [];

  try {
    const form = await c.req.formData();

    metaIP = c.req.header(IP_HEADER) || "";
    metaReferrer = c.req.header("Referer") || "";
    metaUA = c.req.header("User-Agent") || "";
    textContent = form.get("textContent") || "";
    contactContent = form.get("contactContent") || "";

    reqImages.push(...(form.getAll("images") as unknown as File[]));
    for (const image of reqImages) {
      const buffer = new Uint8Array(await image.arrayBuffer());
      const tgInputFile = new InputFile(buffer, image.name);
      msgImages.push(InputMediaBuilder.photo(tgInputFile));
    }
  } catch (error) {
    // TODO log error
    console.error(error);
    return c.json(newErrorFormat400(), 400);
  }

  const msgs = [`<b>意见箱收到新消息</b>\n`];
  msgs.push(`${replaceHtmlTag(textContent)}\n`);
  contactContent &&
    msgs.push(
      `<b>联系方式</b>\n<blockquote><code>${replaceHtmlTag(
        contactContent
      )}</code></blockquote>`
    );
  metaReferrer &&
    msgs.push(
      `<b>Referrer</b>\n<blockquote>${replaceHtmlTag(
        metaReferrer
      )}</blockquote>`
    );
  if (metaIP) {
    msgs.push(
      `<b>IP</b>    <i><a href="https://ip.sb/ip/${encodeURIComponent(
        metaIP
      )}">View in Web</a></i>\n<blockquote><code>${replaceHtmlTag(
        metaIP
      )}</code></blockquote>`
    );
  }
  if (metaUA) {
    msgs.push(
      `<b>UA</b>    <i><a href="https://uaparser.js.org/?ua=${encodeURIComponent(
        metaUA
      )}">View in Web</a></i>\n<pre><code>${replaceHtmlTag(
        metaUA
      )}</code></pre>`
    );
  }
  const message = msgs.join("\n");

  if (msgImages.length) {
    msgImages[0].caption = message;
    msgImages[0].parse_mode = "HTML";
  }

  try {
    if (msgImages.length) {
      await bot.api.sendMediaGroup(TG_GROUP_ID, msgImages);
    } else {
      await bot.api.sendMessage(TG_GROUP_ID, message, { parse_mode: "HTML" });
    }
    return c.json(newSuccess());
  } catch (error) {
    // TODO handle error
    // TODO log error
    console.error(error);
    throw error;
  }
});

export const onRequest = handle(app);

function replaceHtmlTag(str: string) {
  return str
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("&", "&amp;");
}
