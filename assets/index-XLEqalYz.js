(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();const c="race-checklist-state-v1",x=10080*60*1e3,g=[{id:"racewear",title:"レース当日ウェア",items:["当日用ウェア（上・下・靴下）","レースシューズ","帽子","サングラス","アームウォーマー・手袋","レインウェア","ウエストバンド"]},{id:"racekit",title:"大会装備",items:["アスリートビブス","ゼッケン留めピン","記録計測用ランナーズチップ","手荷物預かり用ビニール袋","手荷物確認表","補給アイテム","GPS時計・スマートウォッチ","Tシャツ引換券","大会要項・案内メール"]},{id:"travel",title:"移動・宿泊",items:["練習用ウェア（土曜日走るなら）","着替え（土→日→月）","タオル","洗面用具","充電器","鍵・財布など","常備薬・救急セット","ゴミ袋（濡れたウェア入れ）"]}];function b(a){return a.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g,"").trim().replace(/\s+/g,"-").slice(0,40)||`item-${crypto.randomUUID().slice(0,8)}`}function u(a){return String(a).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function p(){return{categories:g.map(a=>({id:a.id,title:a.title,items:a.items.map(s=>({id:`${a.id}-${b(s)}`,label:s,checked:!1}))})),updatedAt:Date.now()}}function h(a){return!a||Date.now()-a>x}function v(){const a=localStorage.getItem(c);if(!a)return p();try{const s=JSON.parse(a);return!s?.categories||h(s.updatedAt)?(localStorage.removeItem(c),p()):s}catch{return localStorage.removeItem(c),p()}}let i=v();function n(){i.updatedAt=Date.now(),localStorage.setItem(c,JSON.stringify(i))}function w(){const a=i.categories.flatMap(e=>e.items),s=a.filter(e=>e.checked).length;return{total:a.length,checked:s,percentage:a.length?Math.round(s/a.length*100):0}}function m(a,s,e){i={...i,categories:i.categories.map(t=>{if(t.id!==a)return t;const r=t.items.findIndex(f=>f.id===s),o=e==="up"?r-1:r+1;if(r<0||o<0||o>=t.items.length)return t;const l=[...t.items];return[l[r],l[o]]=[l[o],l[r]],{...t,items:l}})},n(),d()}function y(a){i={...i,categories:i.categories.map(s=>({...s,items:s.items.map(e=>e.id===a?{...e,checked:!e.checked}:e)}))},n(),d()}function k(a,s,e){const t=e.trim();t&&(i={...i,categories:i.categories.map(r=>r.id===a?{...r,items:r.items.map(o=>o.id===s?{...o,label:t}:o)}:r)},n(),d())}function $(a,s){const e=s.trim();e&&(i={...i,categories:i.categories.map(t=>t.id===a?{...t,items:[...t.items,{id:`${a}-${b(e)}-${crypto.randomUUID().slice(0,6)}`,label:e,checked:!1}]}:t)},n(),d())}function S(a,s){i={...i,categories:i.categories.map(e=>e.id===a?{...e,items:e.items.filter(t=>t.id!==s)}:e)},n(),d()}function I(){i=p(),n(),d()}function _(){return new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(i.updatedAt+x))}function d(){const a=document.querySelector("#app"),s=w();a.innerHTML=`
    <main class="mx-auto min-h-screen max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <section class="relative overflow-hidden rounded-[1.5rem] border border-white/60 bg-white/75 p-5 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:rounded-[2rem] md:p-8">
        <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.24),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.14),_transparent_28%),linear-gradient(135deg,_rgba(255,251,253,0.96),_rgba(236,253,245,0.92)_42%,_rgba(239,246,255,0.95)_100%)]"></div>
        <div class="pointer-events-none absolute -left-12 top-8 h-36 w-36 rounded-full bg-pink-200/40 blur-3xl"></div>
        <div class="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-sky-200/50 blur-3xl"></div>
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-2xl">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">Hitachi Sakura Road Race</p>
            <h1 class="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              日立さくらロードレース
              <span class="mt-2 block text-xl font-medium text-slate-700 sm:text-3xl">持ち物チェックリスト</span>
            </h1>
            <p class="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              チェック状態と項目編集は、この端末だけに保存されます。最終更新から7日経過すると自動で初期化します。
            </p>
          </div>
          <div class="grid w-full gap-3 sm:grid-cols-3 lg:w-auto">
            <div class="rounded-3xl border border-rose-100 bg-white/80 px-4 py-3 shadow-sm">
              <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Progress</p>
              <p class="mt-2 text-3xl font-semibold text-slate-900">${s.percentage}%</p>
            </div>
            <div class="rounded-3xl border border-sky-100 bg-white/80 px-4 py-3 shadow-sm">
              <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Checked</p>
              <p class="mt-2 text-3xl font-semibold text-slate-900">${s.checked}<span class="ml-1 text-base text-slate-400">/ ${s.total}</span></p>
            </div>
            <div class="rounded-3xl border border-emerald-100 bg-white/80 px-4 py-3 shadow-sm">
              <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Expires</p>
              <p class="mt-2 text-lg font-semibold text-slate-900">${_()}</p>
            </div>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap gap-3">
          <button
            id="reset-all"
            class="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
            type="button"
          >
            すべて初期状態に戻す
          </button>
          <span class="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm text-sky-700">
            保存先: localStorage
          </span>
        </div>
      </section>

      <section class="mt-4 grid gap-4 sm:mt-6 lg:grid-cols-3">
        ${i.categories.map(e=>`
              <article class="rounded-[1.5rem] border border-white/70 bg-white/80 p-4 shadow-[0_18px_50px_rgba(148,163,184,0.18)] backdrop-blur sm:rounded-[1.75rem] sm:p-5">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Category</p>
                    <h2 class="mt-2 text-xl font-semibold text-slate-900">${u(e.title)}</h2>
                  </div>
                  <div class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-500">
                    ${e.items.filter(t=>t.checked).length}/${e.items.length}
                  </div>
                </div>

                <ul class="mt-5 space-y-3">
                  ${e.items.map((t,r)=>`
                        <li class="rounded-2xl border ${t.checked?"border-emerald-200 bg-emerald-50/90":"border-slate-200 bg-white/90"} p-3 transition sm:p-3.5">
                          <div class="flex items-start gap-3">
                            <label class="mt-0.5 inline-flex cursor-pointer items-center">
                              <input
                                class="peer sr-only"
                                data-action="toggle"
                                data-item-id="${t.id}"
                                type="checkbox"
                                ${t.checked?"checked":""}
                              />
                              <span class="flex h-6 w-6 items-center justify-center rounded-full border ${t.checked?"border-emerald-400 bg-emerald-400 text-white":"border-slate-300 bg-white text-transparent"} transition">
                                <svg viewBox="0 0 20 20" class="h-4 w-4 fill-current">
                                  <path d="M7.8 13.2 4.6 10l-1.4 1.4 4.6 4.6L17 6.8l-1.4-1.4z"></path>
                                </svg>
                              </span>
                            </label>
                            <div class="min-w-0 flex-1">
                              <input
                                class="w-full rounded-xl border border-transparent bg-transparent px-2 py-1 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-rose-200 focus:bg-rose-50/60 ${t.checked?"line-through decoration-2 decoration-emerald-500/70 text-slate-400":""}"
                                data-action="rename"
                                data-category-id="${e.id}"
                                data-item-id="${t.id}"
                                value="${u(t.label)}"
                              />
                              <div class="mt-2 flex flex-wrap gap-2">
                                <button class="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40" data-action="move-up" data-category-id="${e.id}" data-item-id="${t.id}" ${r===0?"disabled":""} type="button">上へ</button>
                                <button class="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40" data-action="move-down" data-category-id="${e.id}" data-item-id="${t.id}" ${r===e.items.length-1?"disabled":""} type="button">下へ</button>
                                <button class="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs text-rose-700 transition hover:bg-rose-100" data-action="remove" data-category-id="${e.id}" data-item-id="${t.id}" type="button">削除</button>
                              </div>
                            </div>
                          </div>
                        </li>
                      `).join("")}
                </ul>

                <form class="mt-4 flex flex-col gap-2 sm:flex-row" data-action="add-form" data-category-id="${e.id}">
                  <input
                    class="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-rose-200 focus:bg-rose-50/40"
                    name="item"
                    placeholder="項目を追加"
                    type="text"
                  />
                  <button
                    class="w-full rounded-2xl bg-gradient-to-r from-pink-400 to-sky-400 px-4 py-3 text-sm font-medium text-white transition hover:from-pink-500 hover:to-sky-500 sm:w-auto"
                    type="submit"
                  >
                    追加
                  </button>
                </form>
              </article>
            `).join("")}
      </section>
    </main>
  `,a.querySelector("#reset-all")?.addEventListener("click",I),a.querySelectorAll("[data-action='toggle']").forEach(e=>{e.addEventListener("change",t=>{y(t.currentTarget.dataset.itemId)})}),a.querySelectorAll("[data-action='rename']").forEach(e=>{e.addEventListener("change",t=>{const r=t.currentTarget;k(r.dataset.categoryId,r.dataset.itemId,r.value)})}),a.querySelectorAll("[data-action='move-up']").forEach(e=>{e.addEventListener("click",t=>{const r=t.currentTarget;m(r.dataset.categoryId,r.dataset.itemId,"up")})}),a.querySelectorAll("[data-action='move-down']").forEach(e=>{e.addEventListener("click",t=>{const r=t.currentTarget;m(r.dataset.categoryId,r.dataset.itemId,"down")})}),a.querySelectorAll("[data-action='remove']").forEach(e=>{e.addEventListener("click",t=>{const r=t.currentTarget;S(r.dataset.categoryId,r.dataset.itemId)})}),a.querySelectorAll("[data-action='add-form']").forEach(e=>{e.addEventListener("submit",t=>{t.preventDefault();const r=t.currentTarget,o=new FormData(r);$(r.dataset.categoryId,String(o.get("item")||"")),r.reset()})})}d();
