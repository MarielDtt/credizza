'use client'
import Script from "next/script";



export default function CrispWidget() {

    return (

        <>
            <Script id="crisp-chat" strategy="afterInteractive">
                {` 
                    window.$crisp=[];
                    window.CRISP_WEBSITE_ID="a5d583e4-c94f-4e90-95c0-e5c9d3486fb8";
                    (function(){
                    var d=document;
                    var s=d.createElement("script");
                    s.src="https://client.crisp.chat/l.js";
                    s.async=1;
                    d.getElementsByTagName("head")[0].appendChild(s);
                    })();
                `}
            </Script>
        </>
    )
}