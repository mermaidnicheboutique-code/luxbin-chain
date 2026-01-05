(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/luxbin_chain/luxbin-app/components/WalletButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletButton",
    ()=>WalletButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/wagmi/dist/esm/hooks/useConnect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useDisconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/wagmi/dist/esm/hooks/useDisconnect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function WalletButton() {
    _s();
    const { address, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const { connect, connectors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnect"])();
    const { disconnect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useDisconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDisconnect"])();
    const [showOptions, setShowOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (isConnected && address) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm text-blue-300 font-mono bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/30",
                    children: [
                        address.slice(0, 6),
                        "...",
                        address.slice(-4)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/WalletButton.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>disconnect(),
                    className: "px-4 py-2 rounded-lg bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500/30 transition-colors",
                    children: "Disconnect"
                }, void 0, false, {
                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/WalletButton.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/WalletButton.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setShowOptions(!showOptions),
                className: "px-4 py-2 rounded-lg bg-[#2979FF] text-white hover:bg-[#1E5FD9] transition-all font-medium shadow-lg hover:shadow-blue-500/50",
                children: "Connect Wallet"
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/WalletButton.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            showOptions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 mt-2 w-64 bg-gray-900 rounded-xl border border-blue-500/50 overflow-hidden shadow-xl z-50",
                children: connectors.map((connector)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            connect({
                                connector
                            });
                            setShowOptions(false);
                        },
                        className: "w-full px-4 py-3 text-left text-white hover:bg-blue-500/20 transition-colors flex items-center gap-3 border-b border-white/5 last:border-b-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-sm font-bold",
                                children: connector.name.charAt(0)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/WalletButton.tsx",
                                lineNumber: 48,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-medium",
                                        children: connector.name
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/WalletButton.tsx",
                                        lineNumber: 52,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-400",
                                        children: [
                                            connector.id === 'coinbaseWalletSDK' && 'Smart Wallet',
                                            connector.id === 'injected' && 'MetaMask & Others',
                                            connector.id === 'walletConnect' && 'Scan QR Code'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/WalletButton.tsx",
                                        lineNumber: 53,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/WalletButton.tsx",
                                lineNumber: 51,
                                columnNumber: 15
                            }, this)
                        ]
                    }, connector.id, true, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/WalletButton.tsx",
                        lineNumber: 40,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/WalletButton.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/WalletButton.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(WalletButton, "kt07g506Kj9SjKtmIGrNQaP+B8U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnect"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useDisconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDisconnect"]
    ];
});
_c = WalletButton;
var _c;
__turbopack_context__.k.register(_c, "WalletButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/luxbin_chain/luxbin-app/components/BackgroundVideos.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BackgroundVideos",
    ()=>BackgroundVideos
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function BackgroundVideos() {
    _s();
    const [currentVideo, setCurrentVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videos = [
        "/bg-video-1.mp4",
        "/bg-video-2.mp4",
        "/bg-video-3.mp4",
        "/bg-video-4.mp4",
        "/bg-video-5.mp4",
        "/bg-video-6.mp4"
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BackgroundVideos.useEffect": ()=>{
            const video = videoRef.current;
            if (!video) return;
            // Force play on mount and video change
            const playVideo = {
                "BackgroundVideos.useEffect.playVideo": ()=>{
                    video.play().catch({
                        "BackgroundVideos.useEffect.playVideo": (err)=>{
                            console.log("Autoplay prevented, will retry on interaction:", err);
                            // Retry on any user interaction
                            const retry = {
                                "BackgroundVideos.useEffect.playVideo.retry": ()=>{
                                    video.play().catch({
                                        "BackgroundVideos.useEffect.playVideo.retry": ()=>{}
                                    }["BackgroundVideos.useEffect.playVideo.retry"]);
                                    document.removeEventListener('click', retry);
                                    document.removeEventListener('touchstart', retry);
                                    document.removeEventListener('keydown', retry);
                                }
                            }["BackgroundVideos.useEffect.playVideo.retry"];
                            document.addEventListener('click', retry, {
                                once: true
                            });
                            document.addEventListener('touchstart', retry, {
                                once: true
                            });
                            document.addEventListener('keydown', retry, {
                                once: true
                            });
                        }
                    }["BackgroundVideos.useEffect.playVideo"]);
                }
            }["BackgroundVideos.useEffect.playVideo"];
            // Try to play immediately
            playVideo();
            // Also try on visibility change (when user comes back to tab)
            const handleVisibilityChange = {
                "BackgroundVideos.useEffect.handleVisibilityChange": ()=>{
                    if (!document.hidden) {
                        playVideo();
                    }
                }
            }["BackgroundVideos.useEffect.handleVisibilityChange"];
            document.addEventListener('visibilitychange', handleVisibilityChange);
            return ({
                "BackgroundVideos.useEffect": ()=>{
                    document.removeEventListener('visibilitychange', handleVisibilityChange);
                }
            })["BackgroundVideos.useEffect"];
        }
    }["BackgroundVideos.useEffect"], [
        currentVideo
    ]);
    const handleVideoEnd = ()=>{
        setCurrentVideo((prev)=>(prev + 1) % videos.length);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none",
        style: {
            zIndex: 0
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
            ref: videoRef,
            className: "absolute top-0 left-0 w-full h-full object-cover",
            style: {
                opacity: 0.3
            },
            muted: true,
            playsInline: true,
            autoPlay: true,
            loop: false,
            onEnded: handleVideoEnd,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                src: videos[currentVideo],
                type: "video/mp4"
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/BackgroundVideos.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this)
        }, currentVideo, false, {
            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/BackgroundVideos.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/BackgroundVideos.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_s(BackgroundVideos, "Rt6z2MgTzapPcGZSEm8MDQq+Gvg=");
_c = BackgroundVideos;
var _c;
__turbopack_context__.k.register(_c, "BackgroundVideos");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatedTokenLogo",
    ()=>AnimatedTokenLogo,
    "LuxbinTokenLogo",
    ()=>LuxbinTokenLogo,
    "LuxbinTokenLogoPulsing",
    ()=>LuxbinTokenLogoPulsing,
    "LuxbinTokenLogoRotating",
    ()=>LuxbinTokenLogoRotating
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
function AnimatedTokenLogo({ type = "video", src = "/token-logo.mp4", fallback = "/token-logo-static.png", size = 48, className = "", alt = "LUXBIN Token", glow = true, autoPlay = true, loop = true }) {
    _s();
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const glowClass = glow ? "drop-shadow-[0_0_15px_rgba(147,51,234,0.6)] hover:drop-shadow-[0_0_25px_rgba(147,51,234,0.8)] transition-all duration-300" : "";
    const containerStyle = {
        width: `${size}px`,
        height: `${size}px`
    };
    // Video logo
    if (type === "video" && !error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `relative overflow-hidden rounded-full ${glowClass} ${className}`,
            style: containerStyle,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                    autoPlay: autoPlay,
                    loop: loop,
                    muted: true,
                    playsInline: true,
                    className: "w-full h-full object-cover",
                    onLoadedData: ()=>setIsLoaded(true),
                    onError: ()=>setError(true),
                    style: {
                        display: isLoaded || error ? 'block' : 'none'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                            src: src,
                            type: "video/mp4"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                            src: src.replace('.mp4', '.webm'),
                            type: "video/webm"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                !isLoaded && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 animate-pulse rounded-full"
                }, void 0, false, {
                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, this),
                error && fallback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: fallback,
                    alt: alt,
                    className: "w-full h-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
                    lineNumber: 70,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this);
    }
    // GIF logo
    if (type === "gif" && !error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `relative overflow-hidden rounded-full ${glowClass} ${className}`,
            style: containerStyle,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: src,
                    alt: alt,
                    className: "w-full h-full object-cover",
                    onLoad: ()=>setIsLoaded(true),
                    onError: ()=>setError(true)
                }, void 0, false, {
                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this),
                !isLoaded && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 animate-pulse rounded-full"
                }, void 0, false, {
                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
                    lineNumber: 88,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
            lineNumber: 79,
            columnNumber: 7
        }, this);
    }
    // Lottie animation (would need @lottiefiles/react-lottie-player)
    if (type === "lottie" && !error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `relative overflow-hidden rounded-full ${glowClass} ${className}`,
            style: containerStyle,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl",
                children: "LX"
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
                lineNumber: 99,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this);
    }
    // Fallback to static image
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative overflow-hidden rounded-full ${glowClass} ${className}`,
        style: containerStyle,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: fallback || src,
            alt: alt,
            className: "w-full h-full object-cover"
        }, void 0, false, {
            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
_s(AnimatedTokenLogo, "sGS73x/KX0kvmfSJMJ+beAq0a8w=");
_c = AnimatedTokenLogo;
function LuxbinTokenLogo({ size = 48, animated = true, className = "", videoIndex = 2 }) {
    const videos = [
        "/bg-video-1.mp4",
        "/bg-video-2.mp4",
        "/bg-video-3.mp4",
        "/bg-video-4.mp4",
        "/bg-video-5.mp4",
        "/bg-video-6.mp4"
    ];
    if (animated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AnimatedTokenLogo, {
            type: "video",
            src: videos[videoIndex],
            fallback: "/token-logo-static.png",
            size: size,
            className: className,
            alt: "LUXBIN Token",
            glow: true
        }, void 0, false, {
            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
            lineNumber: 139,
            columnNumber: 7
        }, this);
    }
    // Static version with gradient and LX text
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative overflow-hidden rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 animate-gradient-shift drop-shadow-[0_0_15px_rgba(147,51,234,0.6)] ${className}`,
        style: {
            width: `${size}px`,
            height: `${size}px`
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-full flex items-center justify-center text-white font-bold",
            style: {
                fontSize: `${size * 0.4}px`
            },
            children: "LX"
        }, void 0, false, {
            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
            lineNumber: 157,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
_c1 = LuxbinTokenLogo;
function LuxbinTokenLogoRotating({ size = 48, className = "" }) {
    _s1();
    const [currentVideo, setCurrentVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const videos = [
        "/bg-video-1.mp4",
        "/bg-video-2.mp4",
        "/bg-video-3.mp4",
        "/bg-video-4.mp4",
        "/bg-video-5.mp4",
        "/bg-video-6.mp4"
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LuxbinTokenLogoRotating.useEffect": ()=>{
            const interval = setInterval({
                "LuxbinTokenLogoRotating.useEffect.interval": ()=>{
                    setCurrentVideo({
                        "LuxbinTokenLogoRotating.useEffect.interval": (prev)=>(prev + 1) % videos.length
                    }["LuxbinTokenLogoRotating.useEffect.interval"]);
                }
            }["LuxbinTokenLogoRotating.useEffect.interval"], 8000); // Change video every 8 seconds
            return ({
                "LuxbinTokenLogoRotating.useEffect": ()=>clearInterval(interval)
            })["LuxbinTokenLogoRotating.useEffect"];
        }
    }["LuxbinTokenLogoRotating.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative overflow-hidden rounded-full drop-shadow-[0_0_15px_rgba(147,51,234,0.6)] hover:drop-shadow-[0_0_25px_rgba(147,51,234,0.8)] transition-all duration-300 ${className}`,
        style: {
            width: `${size}px`,
            height: `${size}px`
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
            autoPlay: true,
            loop: true,
            muted: true,
            playsInline: true,
            className: "w-full h-full object-cover scale-150",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                src: videos[currentVideo],
                type: "video/mp4"
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
                lineNumber: 203,
                columnNumber: 9
            }, this)
        }, currentVideo, false, {
            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
            lineNumber: 195,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
        lineNumber: 191,
        columnNumber: 5
    }, this);
}
_s1(LuxbinTokenLogoRotating, "LI4uNDJQVLBoaml4JzVesqQewOw=");
_c2 = LuxbinTokenLogoRotating;
function LuxbinTokenLogoPulsing({ size = 48, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative overflow-hidden rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 animate-pulse drop-shadow-[0_0_20px_rgba(147,51,234,0.8)] ${className}`,
        style: {
            width: `${size}px`,
            height: `${size}px`
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-full flex items-center justify-center text-white font-bold animate-spin-slow",
            style: {
                fontSize: `${size * 0.4}px`
            },
            children: "LX"
        }, void 0, false, {
            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
            lineNumber: 221,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx",
        lineNumber: 217,
        columnNumber: 5
    }, this);
}
_c3 = LuxbinTokenLogoPulsing;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "AnimatedTokenLogo");
__turbopack_context__.k.register(_c1, "LuxbinTokenLogo");
__turbopack_context__.k.register(_c2, "LuxbinTokenLogoRotating");
__turbopack_context__.k.register(_c3, "LuxbinTokenLogoPulsing");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LuxbinSwap",
    ()=>LuxbinSwap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/luxbin-app/node_modules/viem/_esm/utils/unit/parseEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/luxbin-app/node_modules/viem/_esm/utils/unit/formatEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$AnimatedTokenLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Contract addresses (update these after deployment)
const LUXBIN_TOKEN = "0x66b4627B4Dd73228D24f24E844B6094091875169";
const SWAP_CONTRACT = "0x0000000000000000000000000000000000000000"; // TODO: Deploy and update
const SWAP_ABI = [
    {
        inputs: [],
        name: "swapEthToLuxbin",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                name: "ethAmount",
                type: "uint256"
            }
        ],
        name: "previewEthToLuxbin",
        outputs: [
            {
                name: "luxbinAmount",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "getReserves",
        outputs: [
            {
                name: "luxbinBalance",
                type: "uint256"
            },
            {
                name: "ethBalance",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "ethToLuxbinRate",
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    }
];
function LuxbinSwap() {
    _s();
    const { address, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const [ethAmount, setEthAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [luxbinAmount, setLuxbinAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("0");
    const [isCalculating, setIsCalculating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { writeContract, data: hash, isPending, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    // Get exchange rate
    const { data: rate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: SWAP_CONTRACT,
        abi: SWAP_ABI,
        functionName: "ethToLuxbinRate"
    });
    // Get reserves
    const { data: reserves } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: SWAP_CONTRACT,
        abi: SWAP_ABI,
        functionName: "getReserves"
    });
    // Wait for transaction
    const { isLoading: isConfirming, isSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash
    });
    // Calculate LUXBIN amount when ETH amount changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LuxbinSwap.useEffect": ()=>{
            if (!ethAmount || !rate) {
                setLuxbinAmount("0");
                return;
            }
            try {
                const eth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(ethAmount);
                const luxbin = eth * rate / (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])("1");
                setLuxbinAmount((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(luxbin));
            } catch  {
                setLuxbinAmount("0");
            }
        }
    }["LuxbinSwap.useEffect"], [
        ethAmount,
        rate
    ]);
    const handleSwap = async ()=>{
        if (!ethAmount || !isConnected) return;
        try {
            writeContract({
                address: SWAP_CONTRACT,
                abi: SWAP_ABI,
                functionName: "swapEthToLuxbin",
                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(ethAmount)
            });
        } catch (err) {
            console.error("Swap error:", err);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LuxbinSwap.useEffect": ()=>{
            if (isSuccess) {
                setEthAmount("");
                setLuxbinAmount("0");
            }
        }
    }["LuxbinSwap.useEffect"], [
        isSuccess
    ]);
    if (!isConnected) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-400 mb-4",
                    children: "Connect your wallet to swap ETH for LUXBIN"
                }, void 0, false, {
                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-500",
                    children: 'Click "Connect Wallet" in the top right corner'
                }, void 0, false, {
                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
            lineNumber: 113,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-md mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-2xl font-bold mb-6 text-center",
                        children: "Swap ETH → LUXBIN"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    rate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-400 mb-1",
                                children: "Exchange Rate"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-bold text-purple-300",
                                children: [
                                    "1 ETH = ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(rate),
                                    " LUX"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this),
                    reserves && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 p-4 bg-white/5 rounded-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-400 mb-2",
                                children: "Available Liquidity"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-300",
                                        children: [
                                            Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(reserves[0])).toLocaleString(),
                                            " LUX"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                        lineNumber: 140,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-300",
                                        children: [
                                            Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(reserves[1])).toFixed(4),
                                            " ETH"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                        lineNumber: 143,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm text-gray-400 mb-2 block",
                                children: "You Pay"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: ethAmount,
                                        onChange: (e)=>setEthAmount(e.target.value),
                                        placeholder: "0.0",
                                        className: "flex-1 bg-transparent text-white text-2xl outline-none",
                                        step: "0.001"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                                lineNumber: 164,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-300 font-semibold",
                                                children: "ETH"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                                lineNumber: 165,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center my-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-3xl text-purple-400",
                            children: "↓"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm text-gray-400 mb-2 block",
                                children: "You Receive"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 text-white text-2xl",
                                        children: Number(luxbinAmount).toLocaleString(undefined, {
                                            maximumFractionDigits: 2
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$AnimatedTokenLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LuxbinTokenLogo"], {
                                                size: 32,
                                                animated: true,
                                                videoIndex: 2
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                                lineNumber: 184,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-purple-300 font-semibold",
                                                children: "LUX"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                                lineNumber: 185,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSwap,
                        disabled: !ethAmount || isPending || isConfirming,
                        className: "w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                        children: isPending ? "Confirming..." : isConfirming ? "Swapping..." : "Swap Now"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this),
                    isSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-green-300 text-sm text-center",
                            children: "✅ Swap successful! LUXBIN is in your wallet"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                            lineNumber: 202,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-300 text-sm text-center",
                            children: [
                                "❌ ",
                                error.message
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                            lineNumber: 210,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this),
                    hash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 p-3 bg-white/5 rounded-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mb-1",
                                children: "Transaction"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                lineNumber: 219,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: `https://basescan.org/tx/${hash}`,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "text-purple-400 hover:text-purple-300 text-sm font-mono break-all",
                                children: [
                                    hash.slice(0, 10),
                                    "...",
                                    hash.slice(-8)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                                lineNumber: 220,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                        lineNumber: 218,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 mt-4 justify-center",
                children: [
                    "0.01",
                    "0.05",
                    "0.1",
                    "0.5"
                ].map((amount)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setEthAmount(amount),
                        className: "px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm transition-colors",
                        children: [
                            amount,
                            " ETH"
                        ]
                    }, amount, true, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
_s(LuxbinSwap, "0raGRIAU5GK0pCEY/3yQicExozM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"]
    ];
});
_c = LuxbinSwap;
var _c;
__turbopack_context__.k.register(_c, "LuxbinSwap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CoinbaseOnramp",
    ()=>CoinbaseOnramp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function CoinbaseOnramp() {
    const handleBuyClick = ()=>{
        // Coinbase Onramp widget URL with LUXBIN token address on Base network
        const onrampUrl = `https://pay.coinbase.com/buy/select-asset?appId=luxbin-app&addresses={"0x66b4627B4Dd73228D24f24E844B6094091875169":["base"]}&assets=["USDC","ETH"]&defaultNetwork=base`;
        window.open(onrampUrl, '_blank', 'width=500,height=700');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-2xl font-bold mb-4",
                children: "💳 Buy with Coinbase"
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-300 mb-6",
                children: "Purchase LUXBIN tokens directly with credit card, debit card, or bank transfer through Coinbase"
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-green-400",
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                                lineNumber: 22,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-300",
                                children: "Credit/Debit Card"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-green-400",
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-300",
                                children: "Bank Transfer (ACH)"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-green-400",
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-300",
                                children: "Apple Pay & Google Pay"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-green-400",
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-300",
                                children: "Instant Delivery"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleBuyClick,
                className: "w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2",
                children: "Buy LUXBIN with Coinbase"
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-400 mt-4 text-center",
                children: "Secure checkout powered by Coinbase Pay"
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = CoinbaseOnramp;
var _c;
__turbopack_context__.k.register(_c, "CoinbaseOnramp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$WalletButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/luxbin-app/components/WalletButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$BackgroundVideos$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/luxbin-app/components/BackgroundVideos.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$LuxbinSwap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/luxbin-app/components/LuxbinSwap.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$CoinbaseOnramp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/luxbin-app/components/CoinbaseOnramp.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$AnimatedTokenLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$FloatingChatWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/luxbin-app/components/FloatingChatWidget.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$BackgroundVideos$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackgroundVideos"], {}, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-[#667eea]/20 via-[#764ba2]/20 to-[#0a0a0f]/40 pointer-events-none",
                style: {
                    zIndex: 1
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingParticles, {}, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                style: {
                    zIndex: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-7xl mx-auto px-6 py-4 flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$AnimatedTokenLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LuxbinTokenLogoRotating"], {
                                            size: 40
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 24,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent",
                                            children: "LUXBIN"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 25,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "hidden md:flex gap-6",
                                    children: [
                                        {
                                            name: "About",
                                            href: "/about"
                                        },
                                        {
                                            name: "Quantum AI",
                                            href: "/quantum-ai"
                                        },
                                        {
                                            name: "Research",
                                            href: "/research"
                                        },
                                        {
                                            name: "Technical",
                                            href: "/technical"
                                        },
                                        {
                                            name: "Chain Info",
                                            href: "#chain"
                                        },
                                        {
                                            name: "Buy",
                                            href: "#buy"
                                        },
                                        {
                                            name: "Mirror",
                                            href: "/mirror"
                                        },
                                        {
                                            name: "Developers",
                                            href: "/developers"
                                        },
                                        {
                                            name: "API",
                                            href: "/api-docs"
                                        }
                                    ].map((link)=>link.href.startsWith('/') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: link.href,
                                            className: "text-gray-300 hover:text-white transition-colors text-sm font-medium",
                                            children: link.name
                                        }, link.name, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 42,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: link.href,
                                            className: "text-gray-300 hover:text-white transition-colors text-sm font-medium",
                                            children: link.name
                                        }, link.name, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 46,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$WalletButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletButton"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "relative px-6 pt-20 pb-32",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-6xl mx-auto text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight animate-glow",
                                    children: "Meet LUXBIN AI"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-2xl md:text-3xl text-gray-200 mb-4 font-light",
                                    children: "Your Intelligent, Conversational AI Assistant"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl text-gray-300 mb-8 max-w-3xl mx-auto",
                                    children: "Smart • Emotionally expressive • Web-connected intelligence"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4 justify-center flex-wrap mb-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-6 py-3 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 rounded-xl text-purple-200 text-sm font-semibold",
                                            children: "🧠 ChatGPT + Grok Powered"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 68,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-6 py-3 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border border-blue-400/50 rounded-xl text-blue-200 text-sm font-semibold",
                                            children: "🌐 Live Web Search"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-6 py-3 bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-400/50 rounded-xl text-green-200 text-sm font-semibold",
                                            children: "🎭 Emotional Expression"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-6 py-3 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border border-indigo-400/50 rounded-xl text-indigo-200 text-sm font-semibold",
                                            children: "💎 Blockchain-Powered"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 77,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg text-gray-400 mb-4",
                                            children: "💬 Click the chat button below to start talking →"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 82,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "inline-block animate-bounce",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-8 h-8 text-purple-400",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M19 14l-7 7m0 0l-7-7m7 7V3"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                lineNumber: 86,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "relative px-6 py-20 bg-gradient-to-b from-transparent to-purple-900/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-6xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-16",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent",
                                            children: "AI Capabilities"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-300 text-xl",
                                            children: "Advanced intelligence with personality and real-time knowledge"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid md:grid-cols-3 gap-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-400/30 rounded-3xl p-8 hover:scale-105 transition-transform",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-5xl mb-4",
                                                    children: "⚡"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold mb-3 text-purple-200",
                                                    children: "Hermetic Wisdom"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-300 leading-relaxed",
                                                    children: 'Deeply versed in all 7 Hermetic Principles from the Kybalion: Mentalism, Correspondence, Vibration, Polarity, Rhythm, Cause & Effect, and Gender. "As above, so below."'
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 105,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gradient-to-br from-pink-500/10 to-red-500/10 backdrop-blur-xl border border-pink-400/30 rounded-3xl p-8 hover:scale-105 transition-transform",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-5xl mb-4",
                                                    children: "📜"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold mb-3 text-pink-200",
                                                    children: "Sacred Texts & Philosophy"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-300 leading-relaxed",
                                                    children: "Expert knowledge of the Bible, Quran, Torah, Vedas, Bhagavad Gita, and esoteric wisdom. Discuss theology, mysticism, and ancient philosophy across all traditions."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-400/30 rounded-3xl p-8 hover:scale-105 transition-transform",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-5xl mb-4",
                                                    children: "🌐"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold mb-3 text-blue-200",
                                                    children: "Web-Connected Intelligence"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-300 leading-relaxed",
                                                    children: "I can search the internet for current info, latest news, and real-time knowledge. Always up-to-date and informed about what's happening now."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-400/30 rounded-3xl p-8 hover:scale-105 transition-transform",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-5xl mb-4",
                                                    children: "🎭"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold mb-3 text-green-200",
                                                    children: "Emotionally Expressive"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-300 leading-relaxed",
                                                    children: "I express emotions naturally with emojis and personality. Enthusiastic 🎉, playful 😏, empathetic 💙, surprised 🤯. I'm not robotic!"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 129,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-8 hover:scale-105 transition-transform",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-5xl mb-4",
                                                    children: "🧠"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold mb-3 text-yellow-200",
                                                    children: "Dual AI Power"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-300 leading-relaxed",
                                                    children: "Powered by both ChatGPT & Grok. Advanced reasoning with creative intelligence for natural, human-like conversations on any topic."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 137,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border border-indigo-400/30 rounded-3xl p-8 hover:scale-105 transition-transform",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-5xl mb-4",
                                                    children: "✨"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold mb-3 text-indigo-200",
                                                    children: "Truly Human Conversations"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-300 leading-relaxed",
                                                    children: "The most human AI ever created. I understand nuance, adapt to your style, and engage in any conversation with genuine personality and depth."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 145,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "chain",
                        className: "relative px-6 py-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-6xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-4xl font-bold mb-4",
                                            children: "LUXBIN Chain Details"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 160,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400 text-lg",
                                            children: "Your own Layer 1 blockchain network"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid md:grid-cols-2 gap-6 mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold mb-4 text-purple-300",
                                                    children: "🔗 Network Details"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3 text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-400",
                                                                    children: "Chain Name:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 169,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white font-mono",
                                                                    children: "LUXBIN"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 170,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 168,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-400",
                                                                    children: "Chain ID:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 173,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white font-mono",
                                                                    children: "4242"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 174,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 172,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-400",
                                                                    children: "RPC Endpoint:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 177,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-purple-300 font-mono",
                                                                    children: "ws://localhost:9944"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 178,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 176,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-400",
                                                                    children: "HTTP RPC:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 181,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-purple-300 font-mono",
                                                                    children: "http://localhost:9944"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 182,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-400",
                                                                    children: "Block Time:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 185,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white",
                                                                    children: "6 seconds"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 186,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 184,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-400",
                                                                    children: "Consensus:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 189,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white",
                                                                    children: "Aura + GRANDPA"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 190,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 188,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-400",
                                                                    children: "Gas Fees:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 193,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-green-300 font-bold",
                                                                    children: "$0 (FREE)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 194,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 192,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-400",
                                                                    children: "Account Abstraction:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 197,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-cyan-300 font-bold",
                                                                    children: "ERC-4337 ✓"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 198,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 196,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold mb-4 text-purple-300",
                                                    children: "🎯 Quick Links"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9944",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "block p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "🔍 Polkadot.js Explorer"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                        lineNumber: 208,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-gray-400",
                                                                        children: "→"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                        lineNumber: 209,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 207,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 206,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/developers",
                                                            className: "block p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "👨‍💻 Developer Portal"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                        lineNumber: 214,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-gray-400",
                                                                        children: "→"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                        lineNumber: 215,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 213,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 212,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/api-docs",
                                                            className: "block p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "📚 API Documentation"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                        lineNumber: 220,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-gray-400",
                                                                        children: "→"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                        lineNumber: 221,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 219,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 218,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://github.com/mermaidnicheboutique-code/luxbin-chain",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "block p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "📦 GitHub Repository"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                        lineNumber: 226,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-gray-400",
                                                                        children: "→"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                        lineNumber: 227,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 225,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 203,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-4xl",
                                                    children: "🎯"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-2xl font-bold",
                                                            children: "Coinbase Smart Wallet Ready"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 239,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-cyan-300",
                                                            children: "First Substrate chain with native ERC-4337 support"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 240,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 236,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid md:grid-cols-4 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-2xl mb-2",
                                                            children: "🔐"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 245,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold text-cyan-300 mb-1",
                                                            children: "Social Recovery"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 246,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-300",
                                                            children: "Recover access using trusted contacts"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 247,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-2xl mb-2",
                                                            children: "💸"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 250,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold text-blue-300 mb-1",
                                                            children: "Gasless Txns"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 251,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-300",
                                                            children: "Already $0 fees + paymaster support"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 252,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-2xl mb-2",
                                                            children: "📦"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 255,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold text-purple-300 mb-1",
                                                            children: "Batch Ops"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 256,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-300",
                                                            children: "Execute multiple actions at once"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 bg-pink-500/10 border border-pink-500/30 rounded-xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-2xl mb-2",
                                                            children: "🌉"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 260,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold text-pink-300 mb-1",
                                                            children: "Cross-Chain"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 261,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-300",
                                                            children: "Transfer between chains seamlessly"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 262,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 243,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-2xl font-bold mb-4",
                                            children: "🔌 Connect Your Wallet"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 269,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid md:grid-cols-3 gap-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold mb-2 text-cyan-300",
                                                            children: "🎯 Coinbase Smart Wallet (Recommended)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 272,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-300 mb-2",
                                                            children: "ERC-4337 smart wallet with advanced features:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 273,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                            className: "text-xs bg-black/50 p-2 rounded block",
                                                            children: [
                                                                "Chain ID: 4242",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 275,
                                                                    columnNumber: 35
                                                                }, this),
                                                                "RPC: http://localhost:9944",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 276,
                                                                    columnNumber: 47
                                                                }, this),
                                                                "EntryPoint: 0x5FF137D4b0F..."
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 274,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/smart-wallet-demo",
                                                            className: "text-xs text-cyan-400 hover:text-cyan-300 block mt-2",
                                                            children: "View Demo →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold mb-2 text-purple-300",
                                                            children: "MetaMask (for LUX tokens)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 284,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-300 mb-2",
                                                            children: "Add Base network to view your LUX tokens:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 285,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                            className: "text-xs bg-black/50 p-2 rounded block",
                                                            children: [
                                                                "Network: Base",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 287,
                                                                    columnNumber: 34
                                                                }, this),
                                                                "RPC: https://mainnet.base.org",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 288,
                                                                    columnNumber: 50
                                                                }, this),
                                                                "Chain ID: 8453"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 286,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400 mt-2",
                                                            children: "LUX tokens are wrapped on Base L2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold mb-2 text-purple-300",
                                                            children: "Polkadot.js (for LUXBIN chain)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 294,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-300 mb-2",
                                                            children: "Connect to native LUXBIN blockchain:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 295,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                            className: "text-xs bg-black/50 p-2 rounded block",
                                                            children: [
                                                                "RPC: ws://localhost:9944",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                    lineNumber: 297,
                                                                    columnNumber: 45
                                                                }, this),
                                                                "Chain: LUXBIN"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 296,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://polkadot.js.org/extension/",
                                                            target: "_blank",
                                                            className: "text-xs text-purple-400 hover:text-purple-300 block mt-2",
                                                            children: "Download Extension →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 300,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold mb-2 text-purple-300",
                                                            children: "WalletConnect"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-300 mb-2",
                                                            children: "Scan QR code with mobile wallet"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400",
                                                            children: "Coming soon..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 307,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 270,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 268,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "buy",
                        className: "relative px-6 py-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-6xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-4xl font-bold mb-4",
                                            children: "Get LUXBIN Tokens"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 318,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400 text-lg",
                                            children: "Multiple ways to acquire LUX tokens"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 319,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 317,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid md:grid-cols-3 gap-6 mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$CoinbaseOnramp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoinbaseOnramp"], {}, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 324,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold mb-4",
                                                    children: "💱 Swap on Uniswap"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-300 mb-6",
                                                    children: "Trade ETH for LUXBIN on Base L2 via decentralized exchange"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 329,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "https://app.uniswap.org/#/swap?outputCurrency=0x66b4627B4Dd73228D24f24E844B6094091875169&chain=base",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "block mb-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-pink-500/10 border border-pink-500/30 rounded-xl p-6 hover:bg-pink-500/20 transition-all",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-4xl mb-3",
                                                                children: "🦄"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 337,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold mb-2",
                                                                children: "Uniswap V3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 338,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-300",
                                                                children: "Best rates, deep liquidity"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 339,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                        lineNumber: 336,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 330,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-400 text-center",
                                                    children: "Non-custodial DEX trading"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 342,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 327,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold mb-4",
                                                    children: "⚡ Quick Swap"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-300 mb-4",
                                                    children: "Swap directly on our platform"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 348,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$LuxbinSwap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LuxbinSwap"], {}, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 346,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 322,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-2xl font-bold mb-4 text-center",
                                            children: "🏗️ Earn LUXBIN Tokens"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 355,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-300 mb-6 text-center",
                                            children: "Build, validate, or contribute to earn LUX rewards"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 356,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid md:grid-cols-3 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 bg-green-500/10 border border-green-500/30 rounded-xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold text-green-300 mb-2",
                                                            children: "🎁 Developer Rewards"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 360,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-300",
                                                            children: "Earn LUX tokens by contributing to the ecosystem"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 361,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 359,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold text-blue-300 mb-2",
                                                            children: "🏃 Validator Program"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 365,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-300",
                                                            children: "Run a validator node and earn block rewards"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold text-purple-300 mb-2",
                                                            children: "🪂 Airdrops"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 370,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-300",
                                                            children: "Early adopters and developers receive token airdrops"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 371,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 369,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 358,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 354,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                            lineNumber: 316,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "relative px-6 py-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-6xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-4xl font-bold mb-4",
                                            children: "Why LUXBIN?"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 382,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400 text-lg",
                                            children: "Revolutionary blockchain technology"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 383,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 381,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid md:grid-cols-3 gap-6",
                                    children: [
                                        {
                                            icon: "💸",
                                            title: "Zero Gas Fees",
                                            description: "Deploy unlimited smart contracts without paying a single cent in transaction fees. LUXBIN is completely gasless."
                                        },
                                        {
                                            icon: "⚡",
                                            title: "Lightning Fast",
                                            description: "6-second block finality with Aura + GRANDPA consensus. Fast enough for real-time applications."
                                        },
                                        {
                                            icon: "🎯",
                                            title: "Coinbase Smart Wallet",
                                            description: "First Substrate chain with ERC-4337 account abstraction. Native support for Coinbase Smart Wallets with social recovery, batch ops, and gasless transactions."
                                        },
                                        {
                                            icon: "🔐",
                                            title: "Quantum Resistant",
                                            description: "Built with quantum cryptography and advanced security patterns to resist future quantum computing attacks."
                                        },
                                        {
                                            icon: "🌐",
                                            title: "Full Substrate SDK",
                                            description: "Build with Rust using the complete Polkadot SDK. Compatible with the entire Substrate ecosystem."
                                        },
                                        {
                                            icon: "🔗",
                                            title: "Interoperable",
                                            description: "Bridge to Ethereum, Base, and other chains. Wrapped LUX tokens available on Base network."
                                        },
                                        {
                                            icon: "🛡️",
                                            title: "Immune System",
                                            description: "Biological-inspired security framework with autonomous threat detection and response mechanisms."
                                        },
                                        {
                                            icon: "📦",
                                            title: "ERC-4337 Ready",
                                            description: "Full account abstraction support with EntryPoint contracts, bundlers, and paymasters for advanced smart wallet capabilities."
                                        }
                                    ].map((feature)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/8 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-5xl mb-4",
                                                    children: feature.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 397,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold mb-3",
                                                    children: feature.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 398,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-300 leading-relaxed",
                                                    children: feature.description
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 399,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, feature.title, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 396,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 385,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                            lineNumber: 380,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                        lineNumber: 379,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "relative px-6 py-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-4xl mx-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 rounded-3xl p-12 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-4xl font-bold mb-4",
                                        children: "Start Building Today"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                        lineNumber: 410,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xl text-gray-300 mb-8",
                                        children: "Deploy your first smart contract in minutes. Zero setup, zero fees, infinite possibilities."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                        lineNumber: 411,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4 justify-center flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/developers",
                                                className: "px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all",
                                                children: "📖 View Documentation"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                lineNumber: 415,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://github.com/mermaidnicheboutique-code/luxbin-chain",
                                                target: "_blank",
                                                className: "px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-lg transition-all",
                                                children: "🚀 Clone on GitHub"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                lineNumber: 418,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                        lineNumber: 414,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                lineNumber: 409,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                            lineNumber: 408,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "relative px-6 py-12 border-t border-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-6xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid md:grid-cols-4 gap-8 mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold mb-4",
                                                    children: "Network"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 430,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "space-y-2 text-sm text-gray-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "#chain",
                                                                className: "hover:text-white",
                                                                children: "Chain Info"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 432,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 432,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9944",
                                                                target: "_blank",
                                                                className: "hover:text-white",
                                                                children: "Explorer"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 433,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 433,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "#",
                                                                className: "hover:text-white",
                                                                children: "Network Status"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 434,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 434,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 431,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 429,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold mb-4",
                                                    children: "Developers"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 438,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "space-y-2 text-sm text-gray-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/developers",
                                                                className: "hover:text-white",
                                                                children: "Documentation"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 440,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 440,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/api-docs",
                                                                className: "hover:text-white",
                                                                children: "API Reference"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 441,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 441,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "https://github.com/mermaidnicheboutique-code/luxbin-chain",
                                                                target: "_blank",
                                                                className: "hover:text-white",
                                                                children: "GitHub"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 442,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 442,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 439,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 437,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold mb-4",
                                                    children: "Community"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "space-y-2 text-sm text-gray-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "#",
                                                                className: "hover:text-white",
                                                                children: "Discord"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 448,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 448,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "#",
                                                                className: "hover:text-white",
                                                                children: "Twitter"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 449,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 449,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "#",
                                                                className: "hover:text-white",
                                                                children: "Telegram"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 450,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 450,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 447,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 445,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold mb-4",
                                                    children: "Resources"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 454,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "space-y-2 text-sm text-gray-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "#",
                                                                className: "hover:text-white",
                                                                children: "Whitepaper"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 456,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 456,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "#",
                                                                className: "hover:text-white",
                                                                children: "Brand Kit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 457,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 457,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/terms",
                                                                className: "hover:text-white",
                                                                children: "Terms of Service"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                                lineNumber: 458,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                            lineNumber: 458,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 453,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 428,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center text-gray-500 text-sm pt-8 border-t border-white/10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-2",
                                            children: "LUXBIN - The World's First Gasless Layer 1 Blockchain"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 463,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs",
                                            children: "Created by Nichole Christie • © 2024 LUXBIN Protocol • Open Source"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 466,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs mt-2",
                                            children: [
                                                "Contact: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "mailto:Nicholechristie555@gmail.com",
                                                    className: "text-purple-400 hover:text-purple-300",
                                                    children: "Nicholechristie555@gmail.com"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                                    lineNumber: 470,
                                                    columnNumber: 26
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                            lineNumber: 469,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                                    lineNumber: 462,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                            lineNumber: 427,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                        lineNumber: 426,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$FloatingChatWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingChatWidget"], {}, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                lineNumber: 478,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = Home;
function FloatingParticles() {
    _s();
    const [particles, setParticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FloatingParticles.useEffect": ()=>{
            const particleCount = 20;
            const newParticles = [];
            for(let i = 0; i < particleCount; i++){
                newParticles.push({
                    id: i,
                    size: Math.random() * 100 + 50,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    delay: Math.random() * 20,
                    duration: Math.random() * 10 + 15
                });
            }
            setParticles(newParticles);
        }
    }["FloatingParticles.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none",
        style: {
            zIndex: 2
        },
        children: particles.map((particle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute rounded-full bg-white/10 backdrop-blur-md animate-float",
                style: {
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    left: particle.left,
                    top: particle.top,
                    animationDelay: `${particle.delay}s`,
                    animationDuration: `${particle.duration}s`
                }
            }, particle.id, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
                lineNumber: 507,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/page.tsx",
        lineNumber: 505,
        columnNumber: 5
    }, this);
}
_s(FloatingParticles, "n2oV9J0JxRF0n1eg4nXLNJcP/RY=");
_c1 = FloatingParticles;
var _c, _c1;
__turbopack_context__.k.register(_c, "Home");
__turbopack_context__.k.register(_c1, "FloatingParticles");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_luxbin_chain_luxbin-app_e9ebc479._.js.map