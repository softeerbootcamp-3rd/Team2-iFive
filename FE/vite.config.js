import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    console.log(env); // 터미널에 선언한 환경변수들이 보인다.
    return {
        plugins: [
            react(),
            createHtmlPlugin({
                minify: true,
                inject: {
                    data: {
                        naverApiKey: env.VITE_NAVER_KEY_ID
                    }
                }
            }),
            VitePWA({
                registerType: "autoUpdate",
                includeAssets: ["favicon.svg", "robots.txt"],
                manifest: {
                    name: "iDrop",
                    short_name: "iDrop",
                    description: "믿을 수 있는 아이 픽업 서비스",
                    theme_color: "#ffffff",
                    icons: [
                        {
                            src: "logo_192.png",
                            sizes: "192x192",
                            type: "image/png"
                        },
                        {
                            src: "logo_512.png",
                            sizes: "512x512",
                            type: "image/png"
                        }
                    ]
                }
            })
        ],
        resolve: {
            alias: [{ find: "@", replacement: "/src" }]
        }
    };
});
