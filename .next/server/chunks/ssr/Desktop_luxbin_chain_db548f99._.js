module.exports=[550488,(a,b,c)=>{"use strict";b.exports=a.r(76805).vendored.contexts.AppRouterContext},258145,(a,b,c)=>{"use strict";b.exports=a.r(76805).vendored["react-ssr"].ReactServerDOMTurbopackClient},730831,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},861428,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={DEFAULT_SEGMENT_KEY:function(){return l},NOT_FOUND_SEGMENT_KEY:function(){return m},PAGE_SEGMENT_KEY:function(){return k},addSearchParamsIfPageSegment:function(){return i},computeSelectedLayoutSegment:function(){return j},getSegmentValue:function(){return f},getSelectedLayoutSegmentPath:function(){return function a(b,c,d=!0,e=[]){let g;if(d)g=b[1][c];else{let a=b[1];g=a.children??Object.values(a)[0]}if(!g)return e;let h=f(g[0]);return!h||h.startsWith(k)?e:(e.push(h),a(g,c,!1,e))}},isGroupSegment:function(){return g},isParallelRouteSegment:function(){return h}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});function f(a){return Array.isArray(a)?a[1]:a}function g(a){return"("===a[0]&&a.endsWith(")")}function h(a){return a.startsWith("@")&&"@children"!==a}function i(a,b){if(a.includes(k)){let a=JSON.stringify(b);return"{}"!==a?k+"?"+a:k}return a}function j(a,b){if(!a||0===a.length)return null;let c="children"===b?a[0]:a[a.length-1];return c===l?null:c}let k="__PAGE__",l="__DEFAULT__",m="/_not-found"},615720,a=>{"use strict";var b=a.i(88994),c=a.i(270230),d=a.i(737952),e=a.i(112034),f=a.i(813841);function g(){let[a,g]=(0,f.useState)(null),h=(a,b)=>{navigator.clipboard.writeText(a),g(b),setTimeout(()=>g(null),2e3)};return(0,b.jsxs)("div",{className:"min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden",children:[(0,b.jsx)(c.BackgroundVideos,{}),(0,b.jsx)("div",{className:"fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-[#667eea]/20 via-[#764ba2]/20 to-[#0a0a0f]/40 pointer-events-none",style:{zIndex:1}}),(0,b.jsxs)("div",{className:"relative",style:{zIndex:10},children:[(0,b.jsx)("header",{className:"sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto px-6 py-4 flex justify-between items-center",children:[(0,b.jsxs)(e.default,{href:"/",className:"flex items-center gap-3",children:[(0,b.jsx)(d.LuxbinTokenLogoRotating,{size:40}),(0,b.jsx)("span",{className:"text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent",children:"LUXBIN"})]}),(0,b.jsxs)("nav",{className:"flex gap-6",children:[(0,b.jsx)(e.default,{href:"/",className:"text-gray-300 hover:text-white transition-colors text-sm font-medium",children:"← Home"}),(0,b.jsx)(e.default,{href:"/about",className:"text-gray-300 hover:text-white transition-colors text-sm font-medium",children:"About"}),(0,b.jsx)(e.default,{href:"/mirror",className:"text-gray-300 hover:text-white transition-colors text-sm font-medium",children:"Mirror"}),(0,b.jsx)(e.default,{href:"/api-docs",className:"text-gray-300 hover:text-white transition-colors text-sm font-medium",children:"API Docs"})]})]})}),(0,b.jsx)("section",{className:"px-6 py-20",children:(0,b.jsxs)("div",{className:"max-w-6xl mx-auto text-center",children:[(0,b.jsx)("h1",{className:"text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent",children:"Developer Portal"}),(0,b.jsx)("p",{className:"text-xl text-gray-300 mb-8",children:"Build the future on LUXBIN - The gasless Layer 1 blockchain"}),(0,b.jsxs)("div",{className:"flex gap-4 justify-center flex-wrap",children:[(0,b.jsx)("a",{href:"https://github.com/mermaidnicheboutique-code/luxbin-chain",target:"_blank",className:"px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all",children:"🚀 Clone Repository"}),(0,b.jsx)(e.default,{href:"/api-docs",className:"px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold transition-all",children:"📚 API Reference"})]})]})}),(0,b.jsx)("section",{className:"px-6 py-12",children:(0,b.jsxs)("div",{className:"max-w-6xl mx-auto",children:[(0,b.jsx)("h2",{className:"text-3xl font-bold mb-8",children:"🚀 Quick Start"}),(0,b.jsxs)("div",{className:"grid md:grid-cols-2 gap-6",children:[(0,b.jsxs)("div",{className:"bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8",children:[(0,b.jsx)("h3",{className:"text-2xl font-bold mb-4 text-purple-300",children:"1. Connect to LUXBIN"}),(0,b.jsx)("p",{className:"text-gray-300 mb-4",children:"Connect to the LUXBIN RPC endpoint:"}),(0,b.jsxs)("div",{className:"bg-black/50 rounded-xl p-4 relative",children:[(0,b.jsx)("code",{className:"text-sm text-green-300",children:"ws://localhost:9944"}),(0,b.jsx)("button",{onClick:()=>h("ws://localhost:9944","rpc"),className:"absolute top-2 right-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs",children:"rpc"===a?"✓ Copied":"Copy"})]})]}),(0,b.jsxs)("div",{className:"bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8",children:[(0,b.jsx)("h3",{className:"text-2xl font-bold mb-4 text-purple-300",children:"2. Install SDK"}),(0,b.jsx)("p",{className:"text-gray-300 mb-4",children:"Install Polkadot.js API:"}),(0,b.jsxs)("div",{className:"bg-black/50 rounded-xl p-4 relative",children:[(0,b.jsx)("code",{className:"text-sm text-green-300",children:"npm install @polkadot/api"}),(0,b.jsx)("button",{onClick:()=>h("npm install @polkadot/api","npm"),className:"absolute top-2 right-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs",children:"npm"===a?"✓ Copied":"Copy"})]})]})]})]})}),(0,b.jsx)("section",{className:"px-6 py-12",children:(0,b.jsxs)("div",{className:"max-w-6xl mx-auto",children:[(0,b.jsx)("h2",{className:"text-3xl font-bold mb-8",children:"💻 Code Examples"}),(0,b.jsxs)("div",{className:"bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-6",children:[(0,b.jsx)("h3",{className:"text-2xl font-bold mb-4",children:"Connect with JavaScript"}),(0,b.jsxs)("div",{className:"bg-black/80 rounded-xl p-6 overflow-x-auto relative",children:[(0,b.jsx)("pre",{className:"text-sm text-green-300",children:`const { ApiPromise, WsProvider } = require('@polkadot/api');

// Connect to LUXBIN
const wsProvider = new WsProvider('ws://localhost:9944');
const api = await ApiPromise.create({ provider: wsProvider });

// Get chain info
const chain = await api.rpc.system.chain();
const version = await api.rpc.system.version();

console.log(\`Connected to \${chain} v\${version}\`);

// Transfer LUXBIN tokens (ZERO GAS FEES!)
const transfer = api.tx.balances.transfer(recipientAddress, amount);
await transfer.signAndSend(senderKeyPair);`}),(0,b.jsx)("button",{onClick:()=>h(`const { ApiPromise, WsProvider } = require('@polkadot/api');

const wsProvider = new WsProvider('ws://localhost:9944');
const api = await ApiPromise.create({ provider: wsProvider });

const chain = await api.rpc.system.chain();
const version = await api.rpc.system.version();

console.log(\`Connected to \${chain} v\${version}\`);

const transfer = api.tx.balances.transfer(recipientAddress, amount);
await transfer.signAndSend(senderKeyPair);`,"js"),className:"absolute top-4 right-4 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs",children:"js"===a?"✓ Copied":"Copy"})]})]}),(0,b.jsxs)("div",{className:"bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-6",children:[(0,b.jsx)("h3",{className:"text-2xl font-bold mb-4",children:"Deploy Rust Smart Contract (Pallet)"}),(0,b.jsxs)("div",{className:"bg-black/80 rounded-xl p-6 overflow-x-auto relative",children:[(0,b.jsx)("pre",{className:"text-sm text-orange-300",children:`#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::pallet_prelude::*;
    use frame_system::pallet_prelude::*;

    #[pallet::pallet]
    pub struct Pallet<T>(_);

    #[pallet::config]
    pub trait Config: frame_system::Config {
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
    }

    #[pallet::storage]
    pub type MyStorage<T> = StorageValue<_, u32, ValueQuery>;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        ValueStored { value: u32 },
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        #[pallet::call_index(0)]
        #[pallet::weight(10_000)]
        pub fn store_value(origin: OriginFor<T>, value: u32) -> DispatchResult {
            ensure_signed(origin)?;
            MyStorage::<T>::put(value);
            Self::deposit_event(Event::ValueStored { value });
            Ok(())
        }
    }
}`}),(0,b.jsx)("button",{onClick:()=>h(`#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::pallet_prelude::*;
    use frame_system::pallet_prelude::*;

    #[pallet::pallet]
    pub struct Pallet<T>(_);

    #[pallet::config]
    pub trait Config: frame_system::Config {
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
    }

    #[pallet::storage]
    pub type MyStorage<T> = StorageValue<_, u32, ValueQuery>;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        ValueStored { value: u32 },
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        #[pallet::call_index(0)]
        #[pallet::weight(10_000)]
        pub fn store_value(origin: OriginFor<T>, value: u32) -> DispatchResult {
            ensure_signed(origin)?;
            MyStorage::<T>::put(value);
            Self::deposit_event(Event::ValueStored { value });
            Ok(())
        }
    }
}`,"rust"),className:"absolute top-4 right-4 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs",children:"rust"===a?"✓ Copied":"Copy"})]})]})]})}),(0,b.jsx)("section",{className:"px-6 py-12",children:(0,b.jsxs)("div",{className:"max-w-6xl mx-auto",children:[(0,b.jsx)("h2",{className:"text-3xl font-bold mb-8",children:"🛠️ Development Tools"}),(0,b.jsxs)("div",{className:"grid md:grid-cols-3 gap-6",children:[(0,b.jsxs)("div",{className:"bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",children:[(0,b.jsx)("h3",{className:"text-xl font-bold mb-3 text-purple-300",children:"Polkadot.js Apps"}),(0,b.jsx)("p",{className:"text-gray-300 text-sm mb-4",children:"Web-based block explorer and wallet interface"}),(0,b.jsx)("a",{href:"https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9944",target:"_blank",className:"text-purple-400 hover:text-purple-300 text-sm",children:"Launch Explorer →"})]}),(0,b.jsxs)("div",{className:"bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",children:[(0,b.jsx)("h3",{className:"text-xl font-bold mb-3 text-purple-300",children:"Substrate Docs"}),(0,b.jsx)("p",{className:"text-gray-300 text-sm mb-4",children:"Official Substrate framework documentation"}),(0,b.jsx)("a",{href:"https://docs.substrate.io/",target:"_blank",className:"text-purple-400 hover:text-purple-300 text-sm",children:"View Docs →"})]}),(0,b.jsxs)("div",{className:"bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",children:[(0,b.jsx)("h3",{className:"text-xl font-bold mb-3 text-purple-300",children:"Rust Toolchain"}),(0,b.jsx)("p",{className:"text-gray-300 text-sm mb-4",children:"Install Rust and Substrate dependencies"}),(0,b.jsx)("a",{href:"https://docs.substrate.io/install/",target:"_blank",className:"text-purple-400 hover:text-purple-300 text-sm",children:"Installation Guide →"})]})]})]})}),(0,b.jsx)("section",{className:"px-6 py-12",children:(0,b.jsxs)("div",{className:"max-w-6xl mx-auto",children:[(0,b.jsx)("h2",{className:"text-3xl font-bold mb-8",children:"📝 Build Your First dApp"}),(0,b.jsx)("div",{className:"bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8",children:(0,b.jsxs)("div",{className:"space-y-6",children:[(0,b.jsxs)("div",{className:"flex gap-4",children:[(0,b.jsx)("div",{className:"flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold",children:"1"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-bold mb-2",children:"Clone LUXBIN Chain"}),(0,b.jsx)("code",{className:"text-sm bg-black/50 p-2 rounded block text-green-300",children:"git clone https://github.com/mermaidnicheboutique-code/luxbin-chain.git"})]})]}),(0,b.jsxs)("div",{className:"flex gap-4",children:[(0,b.jsx)("div",{className:"flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold",children:"2"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-bold mb-2",children:"Build the Runtime"}),(0,b.jsx)("code",{className:"text-sm bg-black/50 p-2 rounded block text-green-300",children:"cargo build --release -p solochain-template-runtime"})]})]}),(0,b.jsxs)("div",{className:"flex gap-4",children:[(0,b.jsx)("div",{className:"flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold",children:"3"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-bold mb-2",children:"Create Your Pallet"}),(0,b.jsxs)("p",{className:"text-gray-300 text-sm",children:["Add your custom pallet in ",(0,b.jsx)("code",{className:"bg-black/50 px-2 py-1 rounded",children:"substrate/frame/your-pallet/"})]})]})]}),(0,b.jsxs)("div",{className:"flex gap-4",children:[(0,b.jsx)("div",{className:"flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold",children:"4"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-bold mb-2",children:"Deploy to LUXBIN"}),(0,b.jsxs)("p",{className:"text-gray-300 text-sm",children:["Run the node and interact via Polkadot.js Apps - ",(0,b.jsx)("strong",{children:"ZERO GAS FEES!"})]})]})]})]})})]})}),(0,b.jsx)("section",{className:"px-6 py-12",children:(0,b.jsx)("div",{className:"max-w-6xl mx-auto",children:(0,b.jsxs)("div",{className:"bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center",children:[(0,b.jsx)("h2",{className:"text-3xl font-bold mb-4",children:"Need More Details?"}),(0,b.jsx)("p",{className:"text-xl text-gray-300 mb-8",children:"Check out the complete API documentation for advanced features"}),(0,b.jsx)(e.default,{href:"/api-docs",className:"inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all",children:"📚 View API Documentation"})]})})}),(0,b.jsx)("section",{className:"px-6 py-12",children:(0,b.jsxs)("div",{className:"max-w-6xl mx-auto",children:[(0,b.jsx)("h2",{className:"text-3xl font-bold mb-8 text-center",children:"💬 Get Help"}),(0,b.jsxs)("div",{className:"grid md:grid-cols-3 gap-6",children:[(0,b.jsxs)("div",{className:"bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center",children:[(0,b.jsx)("div",{className:"text-4xl mb-4",children:"💬"}),(0,b.jsx)("h3",{className:"font-bold mb-2",children:"Discord"}),(0,b.jsx)("p",{className:"text-gray-400 text-sm mb-4",children:"Join our developer community"}),(0,b.jsx)("button",{className:"text-purple-400 hover:text-purple-300 text-sm",children:"Coming Soon"})]}),(0,b.jsxs)("div",{className:"bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center",children:[(0,b.jsx)("div",{className:"text-4xl mb-4",children:"📧"}),(0,b.jsx)("h3",{className:"font-bold mb-2",children:"Email Support"}),(0,b.jsx)("p",{className:"text-gray-400 text-sm mb-4",children:"Get technical assistance"}),(0,b.jsx)("a",{href:"mailto:Nicholechristie555@gmail.com",className:"text-purple-400 hover:text-purple-300 text-sm",children:"Contact Us →"})]}),(0,b.jsxs)("div",{className:"bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center",children:[(0,b.jsx)("div",{className:"text-4xl mb-4",children:"🐙"}),(0,b.jsx)("h3",{className:"font-bold mb-2",children:"GitHub"}),(0,b.jsx)("p",{className:"text-gray-400 text-sm mb-4",children:"Report issues and contribute"}),(0,b.jsx)("a",{href:"https://github.com/mermaidnicheboutique-code/luxbin-chain/issues",target:"_blank",className:"text-purple-400 hover:text-purple-300 text-sm",children:"Open Issue →"})]})]})]})})]})]})}a.s(["default",()=>g])}];

//# sourceMappingURL=Desktop_luxbin_chain_db548f99._.js.map