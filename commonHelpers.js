import{a as w,i as f,S as u}from"./assets/vendor-5401a4b0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();async function p(s,t,i){return(await w.get(s,{params:{key:"42558235-d544995829d65acb68be95adf",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:15}})).data}const g=document.querySelector(".img-list");function h(s){const t=s.map(({largeImageURL:i,webformatURL:r,tags:e,likes:o,views:a,comments:L,downloads:v})=>`<li class="image-item">
    <a href="${i}">
                <img class="image" src="${r}" alt="${e}"/>
                <div class="image-info">
                    <p class="info"><b>Likes</b> ${o}</p>
                    <p class="info"><b>Views</b> ${a}</p>
                    <p class="info"><b>Comments</b> ${L}</p>
                    <p class="info"><b>Downloads</b> ${v}</p>
                </div>
            </a>
    </li>`).join("");return g.insertAdjacentHTML("beforeend",t)}let n=1,l,y;const m=document.querySelector(".image-search-form"),c=document.querySelector(".load-item"),d=document.querySelector(".load-button"),b="https://pixabay.com/api/";function S(){let t=document.querySelector(".img-list").getBoundingClientRect();if(t.height>0){let i=t.height;window.scrollBy({top:i,behavior:"smooth"})}}m.addEventListener("submit",async s=>{if(s.preventDefault(),g.innerHTML=null,l=s.currentTarget.input.value.trim(),l===""){f.show({title:"Error",titleColor:"#ffffff",message:"Write key word to search images",messageColor:"#ffffff",backgroundColor:"#EF4040",position:"topRight",close:!1});return}c.classList.add("loader"),d.classList.remove("hide");const t=await p(b,l,n);y=t.totalHits,t.hits.length===0&&(d.classList.add("hide"),f.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#ffffff",backgroundColor:"#EF4040",position:"topRight"})),c.classList.remove("loader"),h(t.hits),new u(".image-item a",{animationSpeed:300,captionsData:"alt",captionDelay:1e3,overlayOpacity:.5}).refresh(),m.reset()});d.addEventListener("click",async()=>{n++,c.classList.add("loader");const s=await p(b,l,n);c.classList.remove("loader"),h(s.hits),S(),new u(".image-item a",{animationSpeed:300,captionsData:"alt",captionDelay:1e3,overlayOpacity:.5}).refresh(),(n-1)*15>=y&&(d.classList.add("hide"),f.show({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"blue",messageColor:"#ffffff",timeout:1e3,position:"bottomRight",maxWidth:420}))});
//# sourceMappingURL=commonHelpers.js.map
