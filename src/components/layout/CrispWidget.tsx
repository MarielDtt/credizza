/* chat web */
'use client'
import Script from "next/script";

export default function CrispWidget() {
  return (
    <Script id="crisp-chat" strategy="afterInteractive">
      {`
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "a5d583e4-c94f-4e90-95c0-e5c9d3486fb8";

        window.CRISP_RUNTIME_CONFIG = {
          lockFullview: false,
          lockMaximized: false,
        };

        (function () {
          var d = document;
          var s = d.createElement("script");
          s.src = "https://client.crisp.chat/l.js";
          s.async = 1;

          s.onload = function () {
            // Oculta el launcher original
            window.$crisp.push(["do", "chat:hide"]);

            // Cuando se abre el chat
            window.$crisp.push([
              "on",
              "chat:opened",
              function () {
                document.body.classList.add("crisp-open");
                window.$crisp.push(["do", "chat:hide"]);
              }
            ]);

            // Cuando se cierra el chat
            window.$crisp.push([
              "on",
              "chat:closed",
              function () {
                document.body.classList.remove("crisp-open");
                window.$crisp.push(["do", "chat:hide"]);
              }
            ]);
          };

          d.getElementsByTagName("head")[0].appendChild(s);
        })();
      `}
    </Script>
  );
}
