(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>APIDocsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$BackgroundVideos$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/luxbin-app/components/BackgroundVideos.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$AnimatedTokenLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/luxbin-app/components/AnimatedTokenLogo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/luxbin_chain/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function APIDocsPage() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("overview");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$BackgroundVideos$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackgroundVideos"], {}, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-[#667eea]/20 via-[#764ba2]/20 to-[#0a0a0f]/40 pointer-events-none",
                style: {
                    zIndex: 1
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                lineNumber: 14,
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$luxbin$2d$app$2f$components$2f$AnimatedTokenLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LuxbinTokenLogoRotating"], {
                                            size: 40
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 22,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent",
                                            children: "LUXBIN API"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 23,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                    lineNumber: 20,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "flex gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/",
                                            className: "text-gray-300 hover:text-white transition-colors text-sm font-medium",
                                            children: "← Home"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 28,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/about",
                                            className: "text-gray-300 hover:text-white transition-colors text-sm font-medium",
                                            children: "About"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 31,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/mirror",
                                            className: "text-gray-300 hover:text-white transition-colors text-sm font-medium",
                                            children: "Mirror"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 34,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/developers",
                                            className: "text-gray-300 hover:text-white transition-colors text-sm font-medium",
                                            children: "Developers"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 37,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                    lineNumber: 27,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "px-6 py-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-6xl mx-auto text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent",
                                    children: "LUXBIN API Documentation"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl text-gray-300 mb-4",
                                    children: "Complete JSON-RPC API Reference for LUXBIN Chain"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400",
                                    children: "Build amazing dApps with our gasless blockchain infrastructure"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "px-6 py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-6xl mx-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold mb-4",
                                        children: "🔗 API Endpoints"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid md:grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-400 text-sm mb-1",
                                                        children: "WebSocket RPC"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                        lineNumber: 66,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                        className: "text-green-300 font-mono bg-black/50 px-4 py-2 rounded block",
                                                        children: "ws://localhost:9944"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                        lineNumber: 67,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                lineNumber: 65,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-400 text-sm mb-1",
                                                        children: "HTTP RPC"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                        className: "text-green-300 font-mono bg-black/50 px-4 py-2 rounded block",
                                                        children: "http://localhost:9944"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                        lineNumber: 73,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                lineNumber: 71,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-400 mt-4",
                                        children: [
                                            "💡 All transactions on LUXBIN are ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-green-300",
                                                children: "completely free"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                lineNumber: 79,
                                                columnNumber: 51
                                            }, this),
                                            " - zero gas fees!"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "px-6 py-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-6xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4 mb-8 overflow-x-auto",
                                    children: [
                                        {
                                            id: "overview",
                                            name: "Overview"
                                        },
                                        {
                                            id: "rpc",
                                            name: "RPC Methods"
                                        },
                                        {
                                            id: "storage",
                                            name: "Storage"
                                        },
                                        {
                                            id: "extrinsics",
                                            name: "Extrinsics"
                                        },
                                        {
                                            id: "events",
                                            name: "Events"
                                        }
                                    ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveTab(tab.id),
                                            className: `px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-white/10 hover:bg-white/20"}`,
                                            children: tab.name
                                        }, tab.id, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 96,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this),
                                activeTab === "overview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-3xl font-bold mb-4",
                                                children: "Getting Started"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                lineNumber: 114,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-300 mb-4",
                                                children: "LUXBIN uses the Substrate JSON-RPC API, which is compatible with all Polkadot ecosystem tools."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                lineNumber: 115,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-bold mb-3 mt-6",
                                                children: "Authentication"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                lineNumber: 119,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-300 mb-4",
                                                children: "No API keys required! The RPC endpoint is open for local development."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                lineNumber: 120,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-bold mb-3 mt-6",
                                                children: "Rate Limits"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                lineNumber: 122,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-300 mb-4",
                                                children: "No rate limits for local development. For production, implement your own rate limiting."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                lineNumber: 123,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-bold mb-3 mt-6",
                                                children: "Response Format"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                lineNumber: 125,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-300 mb-2",
                                                children: "All responses follow the JSON-RPC 2.0 specification:"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                lineNumber: 126,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-black/80 rounded-xl p-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                    className: "text-sm text-green-300",
                                                    children: `{
  "jsonrpc": "2.0",
  "id": 1,
  "result": { ... }
}`
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                lineNumber: 127,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                        lineNumber: 113,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 15
                                }, this),
                                activeTab === "rpc" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-bold mb-6",
                                            children: "RPC Methods"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 143,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-2 text-purple-300",
                                                    children: "system_chain"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-300 text-sm mb-4",
                                                    children: "Get the chain name"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-black/80 rounded-xl p-4 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400 mb-2",
                                                            children: "Request:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                            lineNumber: 150,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                            className: "text-sm text-green-300",
                                                            children: `{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "system_chain"
}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-black/80 rounded-xl p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400 mb-2",
                                                            children: "Response:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                            lineNumber: 160,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                            className: "text-sm text-blue-300",
                                                            children: `{
  "jsonrpc": "2.0",
  "result": "LUXBIN",
  "id": 1
}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                            lineNumber: 161,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 146,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-2 text-purple-300",
                                                    children: "chain_getBlock"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-300 text-sm mb-4",
                                                    children: "Get block details by hash"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-black/80 rounded-xl p-4 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400 mb-2",
                                                            children: "Request:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                            lineNumber: 176,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                            className: "text-sm text-green-300",
                                                            children: `{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "chain_getBlock",
  "params": ["0x...blockhash"]
}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                            lineNumber: 177,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-2 text-purple-300",
                                                    children: "state_getStorage"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-300 text-sm mb-4",
                                                    children: "Query chain storage"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-black/80 rounded-xl p-4 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400 mb-2",
                                                            children: "Request:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                            lineNumber: 193,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                            className: "text-sm text-green-300",
                                                            children: `{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "state_getStorage",
  "params": ["0x...storageKey"]
}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                            lineNumber: 194,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 189,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-2 text-purple-300",
                                                    children: "author_submitExtrinsic"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-300 text-sm mb-4",
                                                    children: "Submit a signed transaction (ZERO FEES!)"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-black/80 rounded-xl p-4 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400 mb-2",
                                                            children: "Request:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                            className: "text-sm text-green-300",
                                                            children: `{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "author_submitExtrinsic",
  "params": ["0x...signedExtrinsic"]
}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-green-500/20 border border-green-500/50 rounded-xl p-4 mt-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-green-300 text-sm",
                                                        children: [
                                                            "💰 ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Zero Gas Fees:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                                lineNumber: 222,
                                                                columnNumber: 26
                                                            }, this),
                                                            " Unlike other chains, LUXBIN transactions are completely free!"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 206,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                    lineNumber: 142,
                                    columnNumber: 15
                                }, this),
                                activeTab === "storage" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-bold mb-6",
                                            children: "Storage Queries"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 232,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-2 text-purple-300",
                                                    children: "Query Account Balance"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-black/80 rounded-xl p-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                        className: "text-sm text-green-300",
                                                        children: `const account = await api.query.system.account(address);
console.log('Balance:', account.data.free.toString());`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                        lineNumber: 237,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 234,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-2 text-purple-300",
                                                    children: "Query Total Issuance"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-black/80 rounded-xl p-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                        className: "text-sm text-green-300",
                                                        children: `const totalIssuance = await api.query.balances.totalIssuance();
console.log('Total LUXBIN:', totalIssuance.toString());`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                        lineNumber: 247,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 244,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                    lineNumber: 231,
                                    columnNumber: 15
                                }, this),
                                activeTab === "extrinsics" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-bold mb-6",
                                            children: "Extrinsics (Transactions)"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 259,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-2 text-purple-300",
                                                    children: "Transfer LUXBIN Tokens"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 262,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-black/80 rounded-xl p-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                        className: "text-sm text-green-300",
                                                        children: `const transfer = api.tx.balances.transfer(
  recipientAddress,
  amount
);

// Sign and send (ZERO GAS FEES!)
await transfer.signAndSend(senderKeyPair, ({ status }) => {
  if (status.isInBlock) {
    console.log('Transaction included in block');
  }
});`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 261,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-2 text-purple-300",
                                                    children: "Batch Transactions"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 281,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-black/80 rounded-xl p-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                        className: "text-sm text-green-300",
                                                        children: `const batch = api.tx.utility.batch([
  api.tx.balances.transfer(address1, amount1),
  api.tx.balances.transfer(address2, amount2),
]);

await batch.signAndSend(senderKeyPair);`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 280,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                    lineNumber: 258,
                                    columnNumber: 15
                                }, this),
                                activeTab === "events" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-bold mb-6",
                                            children: "Subscribe to Events"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 299,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-2 text-purple-300",
                                                    children: "New Blocks"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 302,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-black/80 rounded-xl p-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                        className: "text-sm text-green-300",
                                                        children: `const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
  console.log('New block:', header.number.toNumber());
});`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 301,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-2 text-purple-300",
                                                    children: "System Events"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-black/80 rounded-xl p-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                        className: "text-sm text-green-300",
                                                        children: `api.query.system.events((events) => {
  events.forEach((record) => {
    const { event } = record;
    console.log(event.section, event.method, event.data.toString());
  });
});`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 312,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-2 text-purple-300",
                                                    children: "Balance Transfers"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 327,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-black/80 rounded-xl p-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                        className: "text-sm text-green-300",
                                                        children: `api.query.system.events((events) => {
  events.forEach((record) => {
    const { event } = record;
    if (event.section === 'balances' && event.method === 'Transfer') {
      const [from, to, amount] = event.data;
      console.log(\`Transfer: \${amount} from \${from} to \${to}\`);
    }
  });
});`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 326,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                    lineNumber: 298,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "px-6 py-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-6xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold mb-8",
                                    children: "📦 SDK Libraries"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                    lineNumber: 350,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid md:grid-cols-3 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-3 text-yellow-300",
                                                    children: "JavaScript/TypeScript"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 354,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                    className: "text-sm bg-black/50 px-3 py-2 rounded block mb-4 text-green-300",
                                                    children: "npm install @polkadot/api"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 355,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "https://polkadot.js.org/docs/",
                                                    target: "_blank",
                                                    className: "text-purple-400 hover:text-purple-300 text-sm",
                                                    children: "View Docs →"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 353,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-3 text-orange-300",
                                                    children: "Rust"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                    className: "text-sm bg-black/50 px-3 py-2 rounded block mb-4 text-green-300",
                                                    children: 'subxt = "0.35"'
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "https://docs.rs/subxt/latest/subxt/",
                                                    target: "_blank",
                                                    className: "text-purple-400 hover:text-purple-300 text-sm",
                                                    children: "View Docs →"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 368,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 363,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold mb-3 text-blue-300",
                                                    children: "Python"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 374,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                    className: "text-sm bg-black/50 px-3 py-2 rounded block mb-4 text-green-300",
                                                    children: "pip install substrate-interface"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 375,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "https://github.com/polkascan/py-substrate-interface",
                                                    target: "_blank",
                                                    className: "text-purple-400 hover:text-purple-300 text-sm",
                                                    children: "View Docs →"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                            lineNumber: 373,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                    lineNumber: 352,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                            lineNumber: 349,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                        lineNumber: 348,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "px-6 py-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-6xl mx-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 rounded-3xl p-12 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-bold mb-4",
                                        children: "Need Help?"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                        lineNumber: 390,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xl text-gray-300 mb-8",
                                        children: "Our developer community is here to support you"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4 justify-center flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/developers",
                                                className: "px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all",
                                                children: "📖 Developer Portal"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                lineNumber: 395,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$luxbin_chain$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://github.com/mermaidnicheboutique-code/luxbin-chain/issues",
                                                target: "_blank",
                                                className: "px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-lg transition-all",
                                                children: "🐙 GitHub Issues"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                                lineNumber: 398,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                        lineNumber: 394,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                                lineNumber: 389,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                            lineNumber: 388,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                        lineNumber: 387,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/luxbin_chain/luxbin-app/app/api-docs/page.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(APIDocsPage, "0RhE9c0qkQp+3CR2mJOCewxRmMU=");
_c = APIDocsPage;
var _c;
__turbopack_context__.k.register(_c, "APIDocsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_luxbin_chain_luxbin-app_1921a58e._.js.map