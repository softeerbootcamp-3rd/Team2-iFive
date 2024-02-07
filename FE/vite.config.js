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
                        naverApiKey: env.VITE_NAVER_KEY
                    }
                }
            })
        ],
        resolve: {
            alias: [{ find: "@", replacement: "/src" }]
        }
    };
});
