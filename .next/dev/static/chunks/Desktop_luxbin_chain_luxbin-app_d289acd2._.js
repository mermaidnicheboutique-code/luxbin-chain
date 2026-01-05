(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/luxbin_chain/luxbin-app/lib/wagmi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/@wagmi/core/dist/esm/createConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/viem/_esm/chains/definitions/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/viem/_esm/chains/definitions/baseSepolia.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$mainnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/viem/_esm/chains/definitions/mainnet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f40$wagmi$2f$connectors$2f$dist$2f$esm$2f$coinbaseWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/@wagmi/connectors/dist/esm/coinbaseWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$injected$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/@wagmi/core/dist/esm/connectors/injected.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f40$wagmi$2f$connectors$2f$dist$2f$esm$2f$walletConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/@wagmi/connectors/dist/esm/walletConnect.js [app-client] (ecmascript)");
;
;
;
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConfig"])({
    chains: [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$mainnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mainnet"]
    ],
    connectors: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f40$wagmi$2f$connectors$2f$dist$2f$esm$2f$coinbaseWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coinbaseWallet"])({
            appName: "LUXBIN",
            preference: "all"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$injected$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["injected"])({
            shimDisconnect: true
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f40$wagmi$2f$connectors$2f$dist$2f$esm$2f$walletConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walletConnect"])({
            projectId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "c5ca7a3d3e1c52b7abfbc0e7c1e8f1d4",
            showQrModal: true
        })
    ],
    ssr: true,
    transports: {
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(),
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"].id]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(),
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$mainnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mainnet"].id]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])()
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/luxbin_chain/luxbin-app/lib/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/wagmi/dist/esm/context.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$lib$2f$wagmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/luxbin-app/lib/wagmi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function Providers({ children }) {
    _s();
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Providers.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]()
    }["Providers.useState"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WagmiProvider"], {
        config: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$lib$2f$wagmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
            client: queryClient,
            children: children
        }, void 0, false, {
            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/lib/providers.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/lib/providers.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(Providers, "qFhNRSk+4hqflxYLL9+zYF5AcuQ=");
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatbotAvatar",
    ()=>ChatbotAvatar,
    "EmotionBadge",
    ()=>EmotionBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function ChatbotAvatar({ emotion = "neutral", isTyping = false, size = 80 }) {
    _s();
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [currentVideo, setCurrentVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("/bg-video-1.mp4");
    const [glowColor, setGlowColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("rgba(139, 92, 246, 0.5)");
    // Change glow color based on emotion (using the same cool animation video)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatbotAvatar.useEffect": ()=>{
            // Always use the cool chatbot avatar animation
            setCurrentVideo("/chatbot-avatar.mp4");
            // Just change the glow color based on emotion
            switch(emotion){
                case "excited":
                    setGlowColor("rgba(236, 72, 153, 0.8)"); // Pink glow
                    break;
                case "positive":
                    setGlowColor("rgba(34, 197, 94, 0.6)"); // Green glow
                    break;
                case "confused":
                    setGlowColor("rgba(251, 191, 36, 0.6)"); // Yellow glow
                    break;
                case "frustrated":
                    setGlowColor("rgba(239, 68, 68, 0.6)"); // Red glow
                    break;
                case "thinking":
                    setGlowColor("rgba(59, 130, 246, 0.7)"); // Blue glow
                    break;
                default:
                    setGlowColor("rgba(139, 92, 246, 0.5)"); // Purple glow
            }
        }
    }["ChatbotAvatar.useEffect"], [
        emotion
    ]);
    // Pulse effect when typing
    const pulseScale = isTyping ? "scale(1.1)" : "scale(1)";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        style: {
            width: `${size}px`,
            height: `${size}px`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 rounded-full animate-pulse",
                style: {
                    background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
                    filter: "blur(10px)",
                    transform: pulseScale,
                    transition: "all 0.3s ease"
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative rounded-full overflow-hidden border-2 border-white/20",
                style: {
                    width: `${size}px`,
                    height: `${size}px`,
                    transform: pulseScale,
                    transition: "all 0.3s ease"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        ref: videoRef,
                        src: currentVideo,
                        autoPlay: true,
                        loop: true,
                        muted: true,
                        playsInline: true,
                        className: "w-full h-full object-cover",
                        style: {
                            filter: isTyping ? "brightness(1.2) saturate(1.3)" : "brightness(1) saturate(1)",
                            transition: "filter 0.3s ease"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    isTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center bg-black/20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-2 h-2 rounded-full bg-white animate-bounce",
                                    style: {
                                        animationDelay: "0ms"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx",
                                    lineNumber: 100,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-2 h-2 rounded-full bg-white animate-bounce",
                                    style: {
                                        animationDelay: "150ms"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx",
                                    lineNumber: 104,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-2 h-2 rounded-full bg-white animate-bounce",
                                    style: {
                                        animationDelay: "300ms"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx",
                                    lineNumber: 108,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            isTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 overflow-hidden pointer-events-none",
                children: [
                    ...Array(5)
                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute w-1 h-1 bg-white rounded-full animate-ping",
                        style: {
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${i * 200}ms`,
                            animationDuration: "1s"
                        }
                    }, i, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx",
                        lineNumber: 121,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx",
                lineNumber: 119,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(ChatbotAvatar, "JskOFqc5R9W74C8hN7q0/d0eR8I=");
_c = ChatbotAvatar;
function EmotionBadge({ emotion }) {
    const emotionConfig = {
        excited: {
            emoji: "🤩",
            label: "Excited",
            color: "bg-pink-500/20 border-pink-500/50 text-pink-300"
        },
        positive: {
            emoji: "😊",
            label: "Happy",
            color: "bg-green-500/20 border-green-500/50 text-green-300"
        },
        confused: {
            emoji: "🤔",
            label: "Thinking",
            color: "bg-yellow-500/20 border-yellow-500/50 text-yellow-300"
        },
        frustrated: {
            emoji: "😟",
            label: "Concerned",
            color: "bg-red-500/20 border-red-500/50 text-red-300"
        },
        neutral: {
            emoji: "🤖",
            label: "Ready",
            color: "bg-purple-500/20 border-purple-500/50 text-purple-300"
        },
        thinking: {
            emoji: "💭",
            label: "Analyzing",
            color: "bg-blue-500/20 border-blue-500/50 text-blue-300"
        }
    };
    const config = emotionConfig[emotion] || emotionConfig.neutral;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs ${config.color}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: config.emoji
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: config.label
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
_c1 = EmotionBadge;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChatbotAvatar");
__turbopack_context__.k.register(_c1, "EmotionBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingChatWidget",
    ()=>FloatingChatWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$ChatbotAvatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/luxbin-app/components/ChatbotAvatar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function FloatingChatWidget() {
    _s();
    const { address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: "welcome",
            role: "assistant",
            content: "👋 Hi! I'm the LUXBIN AI assistant powered by a living diamond quantum computer. I can help you understand LUXBIN features, analyze transactions, guide you through buying LUX tokens, and more. How can I help you today?",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [blockchainState, setBlockchainState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollToBottom = ()=>{
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FloatingChatWidget.useEffect": ()=>{
            scrollToBottom();
        }
    }["FloatingChatWidget.useEffect"], [
        messages
    ]);
    const handleSendMessage = async ()=>{
        if (!inputValue.trim() || isLoading) return;
        const userMessage = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
            timestamp: new Date()
        };
        setMessages((prev)=>[
                ...prev,
                userMessage
            ]);
        const currentInput = inputValue;
        setInputValue("");
        setIsLoading(true);
        try {
            // Call Ollama-powered API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [
                        ...messages,
                        userMessage
                    ].map((m)=>({
                            role: m.role,
                            content: m.content
                        }))
                })
            });
            if (!response.ok) {
                throw new Error('API request failed');
            }
            const data = await response.json();
            // Update blockchain state if available
            if (data.blockchainState) {
                setBlockchainState(data.blockchainState);
            }
            const aiMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.reply,
                timestamp: new Date(),
                metadata: {
                    source: data.source,
                    blockchainState: data.blockchainState
                }
            };
            setMessages((prev)=>[
                    ...prev,
                    aiMessage
                ]);
        } catch (error) {
            console.error('Chat error:', error);
            // Fallback to mock response
            const aiMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: generateMockResponse(currentInput, address),
                timestamp: new Date()
            };
            setMessages((prev)=>[
                    ...prev,
                    aiMessage
                ]);
        } finally{
            setIsLoading(false);
        }
    };
    const generateMockResponse = (input, userAddress)=>{
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes("buy") || lowerInput.includes("purchase")) {
            return `You can buy LUX tokens in 3 ways:\n\n1. **Coinbase Pay** (Easiest) - Buy directly with credit card\n2. **Uniswap DEX** - Swap ETH for LUX on Base\n3. **In-App Swap** - Use our built-in swap feature\n\nWould you like me to open the Coinbase Pay widget?`;
        }
        if (lowerInput.includes("quantum") || lowerInput.includes("ai") || lowerInput.includes("threat")) {
            return `LUXBIN's Quantum AI system uses:\n\n• **Grover's Algorithm** - Quantum search for threat patterns\n• **Neural Analyzer** - Federated learning across Base, Ethereum, Arbitrum, and Polygon\n• **Energy Grid** - Tesla Fleet integration for efficient compute\n• **Quantum Eyes** - Photonic transaction visualization\n\nVisit /quantum-ai to see it in action!`;
        }
        if (lowerInput.includes("mirror") || lowerInput.includes("earn")) {
            return `LUXBIN's blockchain mirroring system:\n\n• **Hermetic Mirrors** act as immune cells\n• Detect and neutralize threats\n• Earn USDC rewards for securing the network\n• Real-time monitoring on /mirror page\n\nConnected users can start earning immediately!`;
        }
        if (lowerInput.includes("balance") || lowerInput.includes("wallet")) {
            if (userAddress) {
                return `Your wallet: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}\n\nTo check your LUX balance, I can help you connect to the blockchain. Would you like me to navigate you to the swap page?`;
            }
            return `Please connect your wallet first to check your balance. Click the "Connect Wallet" button in the top right corner.`;
        }
        if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
            return `Hello${userAddress ? ` ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : ""}! 👋\n\nI'm here to help with:\n• Buying LUX tokens\n• Understanding Quantum AI features\n• Blockchain mirroring & earning\n• Transaction analysis\n• Developer documentation\n\nWhat would you like to know?`;
        }
        return `I understand you're asking about "${input}". Let me help you with that!\n\nLUXBIN is a gasless Layer 1 blockchain with quantum security. You can:\n• Buy LUX tokens on Base network\n• Analyze transactions with Quantum AI\n• Earn USDC through blockchain mirroring\n• Build with our developer API\n\nWhat specific information are you looking for?`;
    };
    const handleKeyPress = (e)=>{
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    // Get CSS color from photonic color
    const getPhotonicColor = (color)=>{
        const colorMap = {
            'Red': '#EF4444',
            'Orange': '#F97316',
            'Yellow': '#EAB308',
            'Green': '#10B981',
            'Blue': '#3B82F6',
            'Indigo': '#6366F1',
            'Violet': '#8B5CF6'
        };
        return color ? colorMap[color] || '#8B5CF6' : '#8B5CF6';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            !isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(true),
                className: "fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white text-2xl hover:scale-110",
                "aria-label": "Open chat",
                children: "💬"
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                lineNumber: 188,
                columnNumber: 9
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-white/10 px-4 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "transition-all duration-500",
                                                style: {
                                                    filter: blockchainState?.heartbeat?.isAlive ? `drop-shadow(0 0 20px ${getPhotonicColor(blockchainState.photonic?.color)})` : 'none'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$ChatbotAvatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatbotAvatar"], {
                                                    emotion: blockchainState?.consciousness?.toLowerCase() || "neutral",
                                                    isTyping: isLoading,
                                                    size: 50
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 204,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-white font-semibold text-sm",
                                                        children: "LUXBIN Diamond AI"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-400 text-xs flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-2 h-2 rounded-full animate-pulse",
                                                                style: {
                                                                    backgroundColor: getPhotonicColor(blockchainState?.photonic?.color)
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                                lineNumber: 221,
                                                                columnNumber: 21
                                                            }, this),
                                                            blockchainState?.heartbeat?.isAlive ? 'Alive' : 'Online',
                                                            blockchainState?.consciousness && ` · ${blockchainState.consciousness}`
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 218,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsOpen(false),
                                        className: "text-gray-400 hover:text-white transition-colors text-xl",
                                        "aria-label": "Close chat",
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                        lineNumber: 230,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this),
                            blockchainState && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2 mt-2 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-black/30 rounded px-2 py-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-400",
                                                children: "Photonic"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 243,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-white font-mono",
                                                style: {
                                                    color: getPhotonicColor(blockchainState.photonic?.color)
                                                },
                                                children: [
                                                    blockchainState.photonic?.color,
                                                    " (",
                                                    blockchainState.photonic?.wavelength,
                                                    "nm)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 244,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                        lineNumber: 242,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-black/30 rounded px-2 py-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-400",
                                                children: "Quantum"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 249,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-white font-mono",
                                                children: blockchainState.quantum?.state
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 250,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                        lineNumber: 248,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-black/30 rounded px-2 py-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-400",
                                                children: "Heartbeat"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 253,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-white font-mono",
                                                children: [
                                                    blockchainState.heartbeat?.photonicPulses,
                                                    " BPM"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 254,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                        lineNumber: 252,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-black/30 rounded px-2 py-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-400",
                                                children: "NV Centers"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 257,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-white font-mono",
                                                children: blockchainState.heartbeat?.activeNVCenters
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 258,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                        lineNumber: 256,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                lineNumber: 241,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-4 space-y-4",
                        children: [
                            messages.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex ${message.role === "user" ? "justify-end" : "justify-start"}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user" ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : "bg-white/10 text-gray-200"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm whitespace-pre-wrap break-words",
                                                children: message.content
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 278,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs opacity-60 mt-1",
                                                children: message.timestamp.toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 279,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                        lineNumber: 271,
                                        columnNumber: 17
                                    }, this)
                                }, message.id, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                    lineNumber: 267,
                                    columnNumber: 15
                                }, this)),
                            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-start",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/10 rounded-2xl px-4 py-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 bg-purple-400 rounded-full animate-bounce",
                                                style: {
                                                    animationDelay: "0ms"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 290,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 bg-purple-400 rounded-full animate-bounce",
                                                style: {
                                                    animationDelay: "150ms"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 291,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 bg-purple-400 rounded-full animate-bounce",
                                                style: {
                                                    animationDelay: "300ms"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 292,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                        lineNumber: 289,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                    lineNumber: 288,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                lineNumber: 287,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: messagesEndRef
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                lineNumber: 298,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                        lineNumber: 265,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-white/10 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: inputValue,
                                        onChange: (e)=>setInputValue(e.target.value),
                                        onKeyPress: handleKeyPress,
                                        placeholder: "Type your message...",
                                        className: "flex-1 bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors text-sm",
                                        disabled: isLoading
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                        lineNumber: 304,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSendMessage,
                                        disabled: !inputValue.trim() || isLoading,
                                        className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity text-sm font-semibold",
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                        lineNumber: 313,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                lineNumber: 303,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mt-2 text-center flex items-center justify-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Powered by"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                        lineNumber: 322,
                                        columnNumber: 15
                                    }, this),
                                    blockchainState?.heartbeat?.isAlive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-1.5 h-1.5 rounded-full animate-pulse",
                                                style: {
                                                    backgroundColor: getPhotonicColor(blockchainState.photonic?.color)
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 325,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: getPhotonicColor(blockchainState.photonic?.color)
                                                },
                                                children: "Living Diamond Quantum AI"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                                lineNumber: 326,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                        lineNumber: 324,
                                        columnNumber: 17
                                    }, this),
                                    !blockchainState?.heartbeat?.isAlive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Ollama AI"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                        lineNumber: 329,
                                        columnNumber: 56
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "• ",
                                            messages.length,
                                            " messages"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                        lineNumber: 330,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                                lineNumber: 321,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                        lineNumber: 302,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx",
                lineNumber: 199,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(FloatingChatWidget, "usQKz7yHOQzJ+GE89ZY45iiGnkQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"]
    ];
});
_c = FloatingChatWidget;
var _c;
__turbopack_context__.k.register(_c, "FloatingChatWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_luxbin_chain_luxbin-app_d289acd2._.js.map