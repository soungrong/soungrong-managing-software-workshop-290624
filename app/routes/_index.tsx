import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import "~/app.css";

export const loader = () => {
  // GET requests are loaded here
  // https://remix.run/docs/en/main/route/loader
  return { notice: "Send a message to Discord!" };
};

export const action = async ({ request }) => {
  // POST requests are loaded here
  // https://remix.run/docs/en/main/route/action
  const DISCORD_API_URL =
    "https://discord.com/api/webhooks/1256277435692093531/7bCCSYi_NUwanTMtTgc-MGWwTasDPbscl4Xwc1P_Qn3wVAo9vQSZF1w8O44zFVD-DxmK";

  const form = await request.formData();
  await fetch(DISCORD_API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: form.get("message"),
    }),
  });

  return redirect("/");
};

export default function Index() {
  // GET request data is loaded here
  // Along with your HTML and other frontend code.
  // https://remix.run/docs/en/main/discussion/data-flow#route-component
  const loaderData = useLoaderData();

  return (
    <>
      <h1 style={{ textAlign: "center", fontFamily: "Arial" }}>
        {loaderData?.notice}
      </h1>
      <form className="discord-form" method="post" action="?index">
        <label htmlFor="message">Enter your message: </label>
        <input type="text" name="message" id="message" />
        <input type="submit" style={{ marginLeft: "4px" }} />
      </form>
    </>
  );
}
