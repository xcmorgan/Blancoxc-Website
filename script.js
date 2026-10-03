(function(){
  var KEY="blanco_cookie_consent",bar=document.getElementById("cookie"),get=function(){try{return localStorage.getItem(KEY)}catch(e){return null}};
  function set(v){try{localStorage.setItem(KEY,v)}catch(e){}bar.classList.remove("show")}
  if(!get())bar.classList.add("show");
  document.getElementById("accept").onclick=function(){set("all")};
  document.getElementById("decline").onclick=function(){set("essential")};
  var d=document.getElementById("privacy");
  document.querySelectorAll("[data-privacy]").forEach(function(b){b.onclick=function(){d.showModal()}});
  document.getElementById("close").onclick=function(){d.close()};
  document.getElementById("manage").onclick=function(){try{localStorage.removeItem(KEY)}catch(e){}bar.classList.add("show")};
})();
