// -----------------------------------------------------------------------------------
// http://wowslider.com/
// JavaScript Wow Slider is a free software that helps you easily generate delicious 
// slideshows with gorgeous transition effects, in a few clicks without writing a single line of code.
// Generated by WOW Slider
//
//***********************************************
// Obfuscated by Javascript Obfuscator
// http://javascript-source.com
//***********************************************
SITE_URL="";
!function(){var t;window.ws_caption_fade=function(i,n,o,a){var e=i.noDelay?0:(i.duration/2-i.captionDuration/3)/2;0>e&&(e=0),n.stop(1,1).delay(e).fadeOut(i.captionDuration/3),a&&(t&&clearTimeout(t),t=setTimeout(function(){n.stop(1,1).html(a),n.fadeIn(i.captionDuration,function(){this.filters&&this.style.removeAttribute("filter")})},i.noDelay?0:i.duration/2+e))}}();
!function(){var t;window.ws_caption_move=function(i,e,a,o){var n=jQuery,s=[{left1:"100%",top2:"100%"},{left1:"80%",left2:"-50%"},{top1:"-100%",top2:"100%",distance:.7,easing:"easeOutBack"},{top1:"-80%",top2:"-80%",distance:.3,easing:"easeOutBack"},{top1:"-80%",left2:"80%"},{left1:"80%",left2:"80%"}];s=s[Math.floor(Math.random()*s.length)];var p=.5,c="easeOutElastic1",f=i.noDelay?0:i.duration/2-i.captionDuration/3;0>f&&(f=0),e.stop(1,1).delay(f).fadeOut(i.captionDuration/3),o&&(t&&clearTimeout(t),t=setTimeout(function(){function t(t){var e=n(a[t]).css("opacity");n(a[t]).css({visibility:"visible"}).css({opacity:0}).animate({opacity:e},i.captionDuration,"easeOutCirc").animate({top:0,left:0},{duration:i.captionDuration,easing:s.easing||c,queue:!1})}e.stop(1,1).html(o);var a=e.find(">span,>div").get();n(a).css({position:"relative",visibility:"hidden"}),e.show();for(var f in s)if(/\%/.test(s[f])){s[f]=parseInt(s[f])/100;var l=e.offset()[/left/.test(f)?"left":"top"],u=/left/.test(f)?"width":"height";s[f]*=s[f]<0?l:i.$this[u]()-e[u]()-l}n(a[0]).css({left:(s.left1||0)+"px",top:(s.top1||0)+"px"}),n(a[1]).css({left:(s.left2||0)+"px",top:(s.top2||0)+"px"}),t(0),setTimeout(function(){t(1)},i.captionDuration*(s.distance||p))},i.noDelay?0:i.duration/2+f))}}();
function ws_caption_parallax(t,n,i,a,s,o){var e=jQuery;n.parent().css({position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden"}),n.html(a).css("width","100%").stop(1,1),i.html(s).css("width","100%").stop(1,1),function(n,i,a,s,o,r){function p(n,i){return n.css(t.support.transform?{transform:"translate3d("+i+"px,0px,0px)"}:{marginLeft:i}).css("display","inline-block")}var u=15,c=t.$this.width();if(u*=c/100,t.prevIdx==t.curIdx)p(n,0).fadeIn(o/3),p(e(">div,>span",n),0);else{var d=e(">div",n),f=e(">div",i),w=e(">span",n),l=e(">span",i),h=u+c*(r?-1:1),v=u+c*(r?1:-1),g=(r?-1:1)*u;p(n,h).show(),p(i,0).show(),p(d,g),p(f,0),p(w,2*g),p(l,0),wowAnimate(function(t){t=e.easing.swing(t),p(n,(1-t)*h),p(i,t*v)},0,1,t.duration);var m=.8;wowAnimate(function(t){t*=m,p(w,2*(1-t)*g),p(d,(1-t)*g),p(l,-2*t*g),p(f,t*-g)},0,1,t.duration,function(){wowAnimate(function(t){t=e.easing.easeOutCubic(1,t,0,1,1,1);var n=2*(1-m)*g,i=(1-m)*g,a=-2*m*g,s=m*-g;p(w,(1-t)*n),p(d,(1-t)*i),p(l,(1-t)*a+-2*t*g),p(f,(1-t)*s+t*-g)},0,1,/Firefox/g.test(navigator.userAgent)?1500:t.delay)})}}(n,i,a,s,t.captionDuration,o)}
function ws_caption_slide(t,e,o,i){function r(t,e){var o,i=document.defaultView;if(i&&i.getComputedStyle){var r=i.getComputedStyle(t,"");r&&(o=r.getPropertyValue(e))}else{var a=e.replace(/\-\w/g,function(t){return t.charAt(1).toUpperCase()});o=t.currentStyle?t.currentStyle[a]:t.style[a]}return o}function a(t,e,o){for(var i="padding-left|padding-right|border-left-width|border-right-width".split("|"),a=0,n=0;n<i.length;n++)a+=parseFloat(r(t,i[n]))||0;var s=parseFloat(r(t,"width"))||(t.offsetWidth||0)-a;return e&&(s+=a),o&&(s+=(parseFloat(r(t,"margin-left"))||0)+(parseFloat(r(t,"margin-right"))||0)),s}function n(t,e,o){for(var i="padding-top|padding-bottom|border-top-width|border-bottom-width".split("|"),a=0,n=0;n<i.length;n++)a+=parseFloat(r(t,i[n]))||0;var s=parseFloat(r(t,"height"))||(t.offsetHeight||0)-a;return e&&(s+=a),o&&(s+=(parseFloat(r(t,"margin-top"))||0)+(parseFloat(r(t,"margin-bottom"))||0)),s}function s(t,e){var o={position:0,top:0,left:0,bottom:0,right:0};for(var i in o)o[i]=t.get(0).style[i];t.show();var s={width:a(t.get(0),1,1),height:n(t.get(0),1,1),"float":t.css("float"),overflow:"hidden",opacity:0};for(var i in o)s[i]=o[i]||r(t.get(0),i);var l=p("<div></div>").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});t.wrap(l),l=t.parent(),"static"==t.css("position")?(l.css({position:"relative"}),t.css({position:"relative"})):(p.extend(s,{position:t.css("position"),zIndex:t.css("z-index")}),t.css({position:"absolute",top:0,left:0,right:"auto",bottom:"auto"})),l.css(s).show();var d=e.direction||"left",u="up"==d||"down"==d?"top":"left",c="up"==d||"left"==d,g=e.distance||("top"==u?t.outerHeight(!0):t.outerWidth(!0));t.css(u,c?isNaN(g)?"-"+g:-g:g);var f={};f[u]=(c?"+=":"-=")+g,l.animate({opacity:1},{duration:e.duration,easing:e.easing}),t.animate(f,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){t.css(o),t.parent().replaceWith(t),e.complete&&e.complete()}})}var p=jQuery;e.stop(1,1).fadeOut(t.captionDuration/3,function(){i&&(e.html(i),s(e,{direction:"left",easing:"easeInOutExpo",complete:function(){e.get(0).filters&&e.get(0).style.removeAttribute("filter")},duration:t.captionDuration}))})}
!function(){var t,e=jQuery;e.extend(e.easing,{easeInQuad:function(t,e,i,o,n){return o*(e/=n)*e+i},easeOutQuad:function(t,e,i,o,n){return-o*(e/=n)*(e-2)+i}}),window.ws_caption_traces=function(i,o,n,a){function r(t){var e,i=parseInt,t=t.replace(/\s\s*/g,"");if("transparent"==t&&(t="rgba(255,255,255,0)"),e=/^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(t))e=[i(e[1],16),i(e[2],16),i(e[3],16)];else if(e=/^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(t))e=[17*i(e[1],16),17*i(e[2],16),17*i(e[3],16)];else if(e=/^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(t))e=[+e[1],+e[2],+e[3],+e[4]];else{if(!(e=/^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(t)))throw Error(t+" is not supported by $.parseColor");e=[+e[1],+e[2],+e[3]]}return isNaN(e[3])&&(e[3]=1),e.slice(0,3+!!u)}function s(t,e,i){t=r(t),e=r(e);for(var o=[t],n=0;i>n;n++){var a=[Math.round(t[0]-(n+1)*(t[0]-e[0])/(i+1)),Math.round(t[1]-(n+1)*(t[1]-e[1])/(i+1)),Math.round(t[2]-(n+1)*(t[2]-e[2])/(i+1))];4==t.length&&a.push(t[3]-(n+1)*(t[3]-e[3])/(i+1)),o.push(a)}o.push(e);for(var n in o)o[n]=(4==t.length?"rgba(":"rgb(")+o[n].join(",")+")";return o}function d(t,i){if(!t||!t.length)return t;var o=3,n=s(t.css("background-color"),t.css("color"),o)||h,a={position:"absolute",top:0,left:0,bottom:0,right:0},r={};i.top?(a.top=-i.top*t.innerHeight(),r.height=100/n.length+"%"):i.left&&(a.position="absolute",r.height="100%",r.width=100/n.length+"%",i.left<0?(a.left=-i.left*t.innerWidth(),r["float"]="left"):(a.right=i.left*t.innerWidth(),r["float"]="right"));var d=e('<i class="ws-colored-traces">').css(a);for(var f in n)e("<i>").css({display:"block",background:n[f]}).css(r).appendTo(d);return t.append(d)}function f(t){return e(".ws-colored-traces",t).remove(),t}function l(t,o){var n={visibility:"visible"},a={},r={};o.top?(n.top=o.top*i.$this.height(),n.height=Math.abs(o.top)*i.$this.height(),a.top=0,r.height=t.height()):o.left&&(n.left=o.left*i.$this.width()*2,r.left=0,o.left<0?(a.left=n.left/2,n.width=i.$this.width(),r.width=t.width()+2):(n.width=t.width()+2,a.left=0,n.paddingLeft=i.$this.width(),r.paddingLeft=t.css("paddingLeft"))),d(t,o).css(n).animate(a,{duration:.8*i.captionDuration,easing:"easeInQuad"}).animate(r,.8*i.captionDuration,"easeOutQuad",function(){f(e(this)).css({height:"",width:"",overflow:"",top:"",left:"",paddingLeft:""})})}var h=["#fff","#ccc","#555","#000"],c=[[{top:-1},{left:1}],[{top:-1},{left:-1}],[{left:-1},{left:1}],[{left:1},{left:-1}]][Math.floor(4*Math.random())],u=function(){var t=e("<div>").css("backgroundColor","rgba(100,255,20,.5)");return/rgba/g.test(t.css("backgroundColor"))}();o.parent().css({position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden"});var p=i.noDelay?0:i.duration/2-i.captionDuration/1.5;0>p&&(p=0),o.stop(1,1).delay(p).fadeOut(i.captionDuration/3),a&&(t&&clearTimeout(t),t=setTimeout(function(){o.stop(1,1).html(a);var t=o.find(">span,>div").get();e(t).css({position:"relative",visibility:"hidden",verticalAlign:"top",overflow:"hidden"}),o.show(),l(e(t[0]),c[0]),setTimeout(function(){l(e(t[1]),c[1])},.3*i.captionDuration)},i.noDelay?0:i.duration/2+p))}}();

jQuery.fn.wowSlider=function(t){function e(t){return I.css({left:-t+"00%"})}function n(t){return((t||0)+N)%N}function i(e){if(window["ws_"+e]){var n=new window["ws_"+e](t,$,O);n.name="ws_"+e,B.push(n)}}function a(t,e){J?J.pause(t.curIndex,e):e()}function o(t,e){J?J.play(t,0,e):e()}function s(t,e,i){Z||(isNaN(t)&&(t=Q(G,N)),t=n(t),G!=t&&(D?D.load(t,function(){c(t,e,i)}):c(t,e,i)))}function r(t){for(var e="",n=0;n<t.length;n++)e+=String.fromCharCode(t.charCodeAt(n)^1+(t.length-n)%7);return e}function c(n,i,a){if(!Z){if(i)void 0!=a&&(K=a^t.revers),e(n);else{if(Z)return;te=!1,function(e,n,i){ee=Math.floor(Math.random()*B.length),k(B[ee]).trigger("effectStart",{curIndex:e,nextIndex:n,cont:k("."+B[ee].name,A),start:function(){K=void 0!=i?i^t.revers:!!(n>e)^t.revers?1:0,B[ee].go(n,e,K)}})}(G,n,a),A.trigger(k.Event("go",{index:n}))}G=n,G!=t.stopOn||--t.loop||(t.autoPlay=0),t.onStep&&t.onStep(n)}}function l(){A.find(".ws_effect").fadeOut(200),e(G).fadeIn(200).find("img").css({visibility:"visible"})}function u(t,e,n,i,a,o){new f(t,e,n,i,a,o)}function f(e,n,i,a,o,s){var r,c,l,u,f=0,d=0,p=0;e[0]||(e=k(e)),e.on((n?"mousedown ":"")+"touchstart",function(e){var n=e.originalEvent.touches?e.originalEvent.touches[0]:e;2==t.gestures&&A.addClass("ws_grabbing"),f=0,n?(r=n.pageX,c=n.pageY,d=p=1,a&&(d=p=a(e))):d=p=0,e.originalEvent.touches||(e.preventDefault(),e.stopPropagation())}),k(document).on((n?"mousemove ":"")+"touchmove",e,function(t){if(d){var e=t.originalEvent.touches?t.originalEvent.touches[0]:t;f=1,l=e.pageX-r,u=e.pageY-c,i&&i(t,l,u)}}),k(document).on((n?"mouseup ":"")+"touchend",e,function(e){2==t.gestures&&A.removeClass("ws_grabbing"),d&&(f&&o&&o(e,l,u),!f&&s&&s(e),f&&(e.preventDefault(),e.stopPropagation()),f=0,d=0)}),e.on("click",function(t){p&&(t.preventDefault(),t.stopPropagation()),p=0})}function d(e,n,i){if(fe.length&&_(e),de.length&&x(e),t.controlsThumb&&t.controls&&b(e),t.caption&&M(e,n,i),Y){var a=k("A",z.get(e)).get(0);a?(Y.setAttribute("href",a.href),Y.setAttribute("target",a.target),Y.style.display="block"):Y.style.display="none"}t.responsive&&E()}function p(){pe&&(pe=0,setTimeout(function(){A.trigger(k.Event("stop",{}))},t.duration))}function h(){!pe&&t.autoPlay&&(pe=1,A.trigger(k.Event("start",{})))}function m(){g(),p()}function v(){g(),t.autoPlay?(ue=setTimeout(function(){he||s(void 0,void 0,1)},t.delay),h()):p()}function g(){ue&&clearTimeout(ue),ue=null}function w(t,e,n){g(),t&&t.preventDefault(),s(e,void 0,n),v(),Ee&&Ce&&Ce.play()}function b(e){var n=t.controlsThumb,i=n[e+1]||n[0],a=n[(e||n.length)-1];be.find("img").attr("src",i),ye.find("img").attr("src",a)}function y(){function e(t){if(!r){clearTimeout(s);for(var e=.2,n=0;2>n;n++){if(n)var c=a.find("> a"),l=i?a.width():k(c.get(0)).outerWidth(!0)*c.length;else var l=a.height();var u=de[n?"width":"height"](),f=u-l;if(0>f){var d,p,h=(t[n?"pageX":"pageY"]-de.offset()[n?"left":"top"])/u;if(o==h)return;o=h;var m=a.position()[n?"left":"top"];if(a.css({transition:"0ms linear",transform:"translate3d("+m.left+"px,"+m.top+"px,0)"}),a.stop(!0),_e>0){if(h>e&&1-e>h)return;d=.5>h?0:f-1,p=_e*Math.abs(m-d)/(Math.abs(h-.5)-e)}else d=f*Math.min(Math.max((h-e)/(1-2*e),0),1),p=-_e*l/2;a.animate(n?{left:d}:{top:d},p,_e>0?"linear":"easeOutCubic")}else a.css(n?"left":"top",f/2)}}}function n(t){0>t&&(t=0),D&&D.loadTtip(t),k(v.get(x)).removeClass("ws_overbull"),k(v.get(t)).addClass("ws_overbull"),b.show();var e={left:v.get(t).offsetLeft-b.width()/2,"margin-top":v.get(t).offsetTop-v.get(0).offsetTop+"px","margin-bottom":-v.get(t).offsetTop+v.get(v.length-1).offsetTop+"px"},n=g.get(t),i={left:-n.offsetLeft+(k(n).outerWidth(!0)-k(n).outerWidth())/2};0>x?(b.css(e),y.css(i)):(document.all||(e.opacity=1),b.stop().animate(e,"fast"),y.stop().animate(i,"fast")),x=t}A.find(".ws_bullets a,.ws_thumbs a").click(function(t){w(t,k(this).index())});var i;if(de.length){de.hover(function(){xe=1},function(){xe=0});var a=de.find(">div");de.css({overflow:"hidden"});var o,s,r;if(i=de.width()<A.width(),de.bind("mousemove mouseover",e),de.mouseout(function(){s=setTimeout(function(){a.stop()},100)}),de.trigger("mousemove"),t.gestures){var c,l,f,d,p,h;u(de,2==t.gestures,function(t,e,n){if(f>p||d>h)return!1;var i=Math.min(Math.max(c+e,f-p),0),o=Math.min(Math.max(l+n,d-h),0);a.css("left",i),a.css("top",o)},function(){r=1;var t=a.find("> a");return f=de.width(),d=de.height(),p=k(t.get(0)).outerWidth(!0)*t.length,h=a.height(),c=parseFloat(a.css("left"))||0,l=parseFloat(a.css("top"))||0,!0},function(){r=0},function(){r=0})}A.find(".ws_thumbs a").each(function(t,e){u(e,0,0,function(t){return!!k(t.target).parents(".ws_thumbs").get(0)},function(){r=1},function(t){w(t,k(e).index())})})}if(fe.length){var m=fe.find(">div"),v=k("a",fe),g=v.find("IMG");if(g.length){var b=k('<div class="ws_bulframe"/>').appendTo(m),y=k("<div/>").css({width:g.length+1+"00%"}).appendTo(k("<div/>").appendTo(b));g.appendTo(y),k("<span/>").appendTo(b);var x=-1;v.hover(function(){n(k(this).index())});var _;m.hover(function(){_&&(clearTimeout(_),_=0),n(x)},function(){v.removeClass("ws_overbull"),document.all?_||(_=setTimeout(function(){b.hide(),_=0},400)):b.stop().animate({opacity:0},{duration:"fast",complete:function(){b.hide()}})}),m.click(function(t){w(t,k(t.target).index())})}}}function x(t){k("A",de).each(function(e){if(e==t){var n=k(this);if(n.addClass("ws_selthumb"),!xe){var i,a=de.find(">div"),o=n.position()||{};i=a.position()||{};for(var s=0;1>=s;s++){var r=de[s?"width":"height"](),c=a[s?"width":"height"](),l=r-c;0>l?a.stop(!0).animate(s?{left:-Math.max(Math.min(o.left,-i.left),o.left+n.outerWidth(!0)-de.width())}:{top:-Math.max(Math.min(o.top,0),o.top+n.outerHeight(!0)-de.height())}):a.css(s?"left":"top",l/2)}}}else k(this).removeClass("ws_selthumb")})}function _(t){k("A",fe).each(function(e){e==t?k(this).addClass("ws_selbull"):k(this).removeClass("ws_selbull")})}function T(t){var e=z[t],n=k("img",e).attr("title"),i=k(e).data("descr");return n.replace(/\s+/g,"")||(n=""),(n?"<span>"+n+"</span>":"")+(i?"<br><div>"+i+"</div>":"")}function M(e,n,i){var a=T(e),o=T(n),s=t.captionEffect;(Se[k.type(s)]||Se[s]||Se.none)(k.extend({$this:A,curIdx:G,prevIdx:U,noDelay:i},t),Te,Me,a,o,K)}function F(){t.autoPlay=!t.autoPlay,t.autoPlay?(v(),je.removeClass("ws_play"),je.addClass("ws_pause"),J&&J.start(G)):(P.wsStop(),je.removeClass("ws_pause"),je.addClass("ws_play"))}function S(){return!!document[Ie.fullscreenElement]}function C(){/WOW Slider/g.test(j)||(S()?document[Ie.exitFullscreen]():(De=1,A.wrap("<div class='ws_fs_wrapper'></div>").parent()[0][Ie.requestFullscreen]()))}function E(){var e=qe?4:t.responsive,n=O.width()||t.width,i=k([$,L.find("img"),R.find("img")]);if(e>0&&document.addEventListener&&A.css("fontSize",Math.max(10*Math.min(n/t.width||1,1),4)),2==e){var a=Math.max(n/t.width,1)-1;i.each(function(){k(this).css("marginTop",-t.height*a/2)})}if(3==e){var o=window.innerHeight-(A.offset().top||0),s=t.width/t.height,r=s>n/o;A.css("height",o),i.each(function(){k(this).css({width:r?"auto":"100%",height:r?"100%":"auto",marginLeft:r?(n-o*s)/2:0,marginTop:r?0:(o-n/s)/2})})}if(4==e){var c=window.innerWidth,l=window.innerHeight,s=(A.width()||t.width)/(A.height()||t.height);A.css({maxWidth:s>c/l?"100%":s*l,height:""}),i.each(function(){k(this).css({width:"100%",marginLeft:0,marginTop:0})})}else A.css({maxWidth:"",top:""})}var k=jQuery,A=this,P=A.get(0);window.ws_basic=function(t,e,n){var i=k(this);this.go=function(e){n.find(".ws_list").css("transform","translate3d(0,0,0)").stop(!0).animate({left:e?-e+"00%":/Safari/.test(navigator.userAgent)?"0%":0},t.duration,"easeInOutExpo",function(){i.trigger("effectEnd")})}},t=k.extend({effect:"fade",prev:"",next:"",duration:1e3,delay:2e3,captionDuration:1e3,captionEffect:"none",width:960,height:360,thumbRate:1,gestures:2,caption:!0,controls:!0,controlsThumb:!1,keyboardControl:!1,scrollControl:!1,autoPlay:!0,autoPlayVideo:!1,responsive:1,support:jQuery.fn.wowSlider.support,stopOnHover:0,preventCopy:1},t);var j=navigator.userAgent,O=k(".ws_images",A).css("overflow","visible"),q=k("<div>").appendTo(O).css({position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden"}),I=O.find("ul").css("width","100%").wrap("<div class='ws_list'></div>").parent().appendTo(q);k("<div>").css({position:"relative",width:"100%","font-size":0,"line-height":0,"max-height":"100%",overflow:"hidden"}).append(O.find("li:first img:first").clone().css({width:"100%",visibility:"hidden"})).prependTo(O),I.css({position:"absolute",top:0,height:"100%",transform:/Firefox/.test(j)?"":"translate3d(0,0,0)"});var D=t.images&&new wowsliderPreloader(this,t),z=O.find("li"),N=z.length,W=(I.width()/I.find("li").width(),{position:"absolute",top:0,height:"100%",overflow:"hidden"}),L=k("<div>").addClass("ws_swipe_left").css(W).prependTo(I),R=k("<div>").addClass("ws_swipe_right").css(W).appendTo(I);if(/MSIE/.test(j)||/Trident/.test(j)||/Safari/.test(j)||/Firefox/.test(j)){var V=Math.pow(10,Math.ceil(Math.LOG10E*Math.log(N)));I.css({width:V+"00%"}),z.css({width:100/V+"%"}),L.css({width:100/V+"%",left:-100/V+"%"}),R.css({width:100/V+"%",left:100*N/V+"%"})}else I.css({width:N+"00%",display:"table"}),z.css({display:"table-cell","float":"none",width:"auto"}),L.css({width:100/N+"%",left:-100/N+"%"}),R.css({width:100/N+"%",left:"100%"});var Q=t.onBeforeStep||function(t){return t+1};t.startSlide=n(isNaN(t.startSlide)?Q(-1,N):t.startSlide),D&&D.load(t.startSlide,function(){}),e(t.startSlide);var X,Y;t.preventCopy&&(X=k('<div class="ws_cover"><a href="#" style="display:none;position:absolute;left:0;top:0;width:100%;height:100%"></a></div>').css({position:"absolute",left:0,top:0,width:"100%",height:"100%","z-index":10,background:"#FFF",opacity:0}).appendTo(O),Y=X.find("A").get(0));{var $=[];k(".ws_frame",A)}z.each(function(){for(var t=k(">img:first,>iframe:first,>iframe:first+img,>a:first,>div:first",this),e=k("<div></div>"),n=0;n<this.childNodes.length;)this.childNodes[n]!=t.get(0)&&this.childNodes[n]!=t.get(1)?e.append(this.childNodes[n]):n++;k(this).data("descr")||(e.text().replace(/\s+/g,"")?k(this).data("descr",e.html().replace(/^\s+|\s+$/g,"")):k(this).data("descr","")),k(this).data("type",t[0].tagName);k(">iframe",this).css("opacity",0);$[$.length]=k(">a>img",this).get(0)||k(">iframe+img",this).get(0)||k(">*",this).get(0)}),$=k($),$.css("visibility","visible"),L.append(k($[N-1]).clone()),R.append(k($[0]).clone());var B=[];t.effect=t.effect.replace(/\s+/g,"").split(",");for(var H in t.effect)i(t.effect[H]);B.length||i("basic");var G=t.startSlide,U=G,J=!1,K=1,Z=0,te=!1;k(B).bind("effectStart",function(t,e){Z++,a(e,function(){l(),e.cont&&k(e.cont).stop().show().css("opacity",1),e.start&&e.start(),U=G,G=e.nextIndex,d(G,U,e.captionNoDelay)})}),k(B).bind("effectEnd",function(t,n){e(G).stop(!0,!0).show(),setTimeout(function(){o(G,function(){Z--,v(),J&&J.start(G)})},n?n.delay||0:0)}),t.loop=t.loop||Number.MAX_VALUE,t.stopOn=n(t.stopOn);var ee=Math.floor(Math.random()*B.length);2==t.gestures&&A.addClass("ws_gestures");var ne=O,ie='$#"';if(ie&&(ie=r(ie))){if(t.gestures){var ae,oe,se,re,ce=0,le=10;u(O,2==t.gestures,function(e,n){re=!!B[0].step,m(),I.stop(!0,!0),se&&(te=!0,Z++,se=0,re||l()),ce=n,n>ae&&(n=ae),-ae>n&&(n=-ae),re?B[0].step(G,n/ae):t.support.transform&&t.support.transition?I.css("transform","translate3d("+n+"px,0,0)"):I.css("left",oe+n)},function(t){var e=/ws_playpause|ws_prev|ws_next|ws_bullets/g.test(t.target.className)||k(t.target).parents(".ws_bullets").get(0),n=me?t.target==me[0]:0;return e||n||J&&J.playing()?!1:(se=1,ae=O.width(),oe=parseFloat(-G*ae)||0,!0)},function(e,i){se=0;var a=O.width(),o=n(G+(0>i?1:-1)),s=a*i/Math.abs(i);Math.abs(ce)<le&&(o=G,s=0);var r=200+200*(a-Math.abs(i))/a;Z--,k(B[0]).trigger("effectStart",{curIndex:G,nextIndex:o,cont:re?k(".ws_effect"):0,captionNoDelay:!0,start:function(){function e(){t.support.transform&&t.support.transition&&I.css({transition:"0ms",transform:/Firefox/.test(j)?"":"translate3d(0,0,0)"}),k(B[0]).trigger("effectEnd",{swipe:!0})}function n(){re?i>a||-a>i?k(B[0]).trigger("effectEnd"):wowAnimate(function(t){var e=i+(a*(i>0?1:-1)-i)*t;B[0].step(U,e/a)},0,1,r,function(){k(B[0]).trigger("effectEnd")}):t.support.transform&&t.support.transition?(I.css({transition:r+"ms ease-out",transform:"translate3d("+s+"px,0,0)"}),setTimeout(e,r)):I.animate({left:oe+s},r,e)}te=!0,D?D.load(o,n):n()}})},function(){var t=k("A",z.get(G));t&&t.click()})}var ue,fe=A.find(".ws_bullets"),de=A.find(".ws_thumbs"),pe=t.autoPlay,he=!1,me=r('8B"iucc9!jusv?+,unpuimggs)eji!"');me+=r("uq}og<%vjwjvhhh?vfn`sosa8fhtviez8ckifo8dnir(wjxd=70t{9");var ve=ne||document.body;if(ie.length<4&&(ie=ie.replace(/^\s+|\s+$/g,"")),ne=ie?k("<div>"):0,k(ne).css({position:"absolute",padding:"0 0 0 0"}).appendTo(ve),ne&&document.all){var ge=k("<iframe>");ge.css({position:"absolute",left:0,top:0,width:"100%",height:"100%",filter:"alpha(opacity=0)",opacity:.01}),ge.attr({src:"javascript:false",scrolling:"no",framespacing:0,border:0,frameBorder:"no"}),ne.append(ge)}k(ne).css({zIndex:56,right:"15px",bottom:"15px"}).appendTo(ve),me+=r("uhcrm>bwuh=majeis<dqwm:aikp.d`joi}9Csngi?!<"),me=ne?k(me):ne,me&&me.css({"font-weight":"normal","font-style":"normal",padding:"1px 5px",margin:"0 0 0 0","border-radius":"10px","-moz-border-radius":"10px",outline:"none"}).html(ie).bind("contextmenu",function(){return!1}).show().appendTo(ne||document.body).attr("target","_blank");var we=k('<div class="ws_controls">').appendTo(O);if(fe[0]&&fe.appendTo(we),t.controls){var be=k('<a href="#" class="ws_next"><span>'+t.next+"<i></i><b></b></span></a>"),ye=k('<a href="#" class="ws_prev"><span>'+t.prev+"<i></i><b></b></span></a>");we.append(be,ye),be.bind("click",function(t){w(t,G+1,1)}),ye.bind("click",function(t){w(t,G-1,0)}),/iPhone/.test(navigator.platform)&&(ye.get(0).addEventListener("touchend",function(t){w(t,G-1,1)},!1),be.get(0).addEventListener("touchend",function(t){w(t,G+1,0)},!1)),t.controlsThumb&&(be.append('<img alt="" src="">'),ye.append('<img alt="" src="">'))}var xe,_e=t.thumbRate;if(t.caption){var Te=k("<div class='ws-title' style='display:none'></div>"),Me=k("<div class='ws-title' style='display:none'></div>");k("<div class='ws-title-wrapper'>").append(Te,Me).appendTo(O),Te.bind("mouseover",function(){J&&J.playing()||g()}),Te.bind("mouseout",function(){J&&J.playing()||v()})}var Fe,Se={none:function(t,e,n,i){Fe&&clearTimeout(Fe),Fe=setTimeout(function(){e.html(i).show()},t.noDelay?0:t.duration/2)}};Se[t.captionEffect]||(Se[t.captionEffect]=window["ws_caption_"+t.captionEffect]),(fe.length||de.length)&&y(),d(G,U,!0),t.stopOnHover&&(this.bind("mouseover",function(){J&&J.playing()||g(),he=!0}),this.bind("mouseout",function(){J&&J.playing()||v(),he=!1})),J&&J.playing()||v();var Ce=A.find("audio").get(0),Ee=t.autoPlay;if(Ce){if(k(Ce).insertAfter(A),window.Audio&&Ce.canPlayType&&Ce.canPlayType("audio/mp3"))Ce.loop="loop",t.autoPlay&&(Ce.autoplay="autoplay",setTimeout(function(){Ce.play()},100));else{Ce=Ce.src;var ke=Ce.substring(0,Ce.length-/[^\\\/]+$/.exec(Ce)[0].length),Ae="wsSound"+Math.round(9999*Math.random());k("<div>").appendTo(A).get(0).id=Ae;var Pe="wsSL"+Math.round(9999*Math.random());window[Pe]={onInit:function(){}},swfobject.createSWF({data:ke+"player_mp3_js.swf",width:"1",height:"1"},{allowScriptAccess:"always",loop:!0,FlashVars:"listener="+Pe+"&loop=1&autoplay="+(t.autoPlay?1:0)+"&mp3="+Ce},Ae),Ce=0}A.bind("stop",function(){Ee=!1,Ce?Ce.pause():k(Ae).SetVariable("method:pause","")}),A.bind("start",function(){Ce?Ce.play():k(Ae).SetVariable("method:play","")})}P.wsStart=s,P.wsRestart=v,P.wsStop=m;var je=k('<a href="#" class="ws_playpause"><span><i></i><b></b></span></a>');if(t.playPause&&(je.addClass(t.autoPlay?"ws_pause":"ws_play"),je.click(function(){return F(),!1}),we.append(je)),t.keyboardControl&&k(document).on("keyup",function(t){switch(t.which){case 32:F();break;case 37:w(t,G-1,0);break;case 39:w(t,G+1,1)}}),t.scrollControl&&A.on("DOMMouseScroll mousewheel",function(t){t.originalEvent.wheelDelta<0||t.originalEvent.detail>0?w(null,G+1,1):w(null,G-1,0)}),"function"==typeof wowsliderVideo){var Oe=k('<div class="ws_video_btn"><div></div></div>').appendTo(O);J=new wowsliderVideo(A,t,l),"undefined"!=typeof $f&&(J.vimeo(!0),J.start(G)),window.onYouTubeIframeAPIReady=function(){J.youtube(!0),J.start(G)},Oe.on("click touchend",function(){Z||J.play(G,1)})}var qe=0;if(t.fullScreen){var Ie=function(){for(var t,e,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenchange"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitfullscreenchange"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitfullscreenchange"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozfullscreenchange"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","MSFullscreenChange"]],i={},a=0,o=n.length;o>a;a++)if(t=n[a],t&&t[1]in document){for(a=0,e=t.length;e>a;a++)i[n[0][a]]=t[a];return i}return!1}();if(Ie){var De=0;document.addEventListener(Ie.fullscreenchange,function(){S()?(qe=1,E()):(De&&(De=0,A.unwrap()),qe=0,E()),B[0].step||l()}),k("<a href='#' class='ws_fullscreen'></a>").on("click",C).appendTo(O)}}return t.responsive&&(k(E),k(window).on("load resize",E)),this}},jQuery.extend(jQuery.easing,{easeInOutExpo:function(t,e,n,i,a){return 0==e?n:e==a?n+i:(e/=a/2)<1?i/2*Math.pow(2,10*(e-1))+n:i/2*(-Math.pow(2,-10*--e)+2)+n},easeOutCirc:function(t,e,n,i,a){return i*Math.sqrt(1-(e=e/a-1)*e)+n},easeOutCubic:function(t,e,n,i,a){return i*((e=e/a-1)*e*e+1)+n},easeOutElastic1:function(t,e,n,i,a){var o=Math.PI/2,s=1.70158,r=0,c=i;if(0==e)return n;if(1==(e/=a))return n+i;if(r||(r=.3*a),c<Math.abs(i)){c=i;var s=r/4}else var s=r/o*Math.asin(i/c);return c*Math.pow(2,-10*e)*Math.sin((e*a-s)*o/r)+i+n},easeOutBack:function(t,e,n,i,a,o){return void 0==o&&(o=1.70158),i*((e=e/a-1)*e*((o+1)*e+o)+1)+n}}),jQuery.fn.wowSlider.support={transform:function(){if(!window.getComputedStyle)return!1;var t=document.createElement("div");document.body.insertBefore(t,document.body.lastChild),t.style.transform="matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";var e=window.getComputedStyle(t).getPropertyValue("transform");return t.parentNode.removeChild(t),void 0!==e?"none"!==e:!1}(),perspective:function(){for(var t="perspectiveProperty perspective WebkitPerspective MozPerspective OPerspective MsPerspective".split(" "),e=0;e<t.length;e++)if(void 0!==document.body.style[t[e]])return!!t[e];return!1}(),transition:function(){var t=document.body||document.documentElement,e=t.style;return void 0!==e.transition||void 0!==e.WebkitTransition||void 0!==e.MozTransition||void 0!==e.MsTransition||void 0!==e.OTransition}()},function(t){function e(e,n,i,a,o,s,r){function c(t){function e(e){cancelAnimationFrame(e),t(1),r&&r()}var n=(new Date).getTime()+o,i=function(){var o=(new Date).getTime()-n;0>o&&(o=0);var s=a?o/a:1;1>s?(t(s),requestAnimationFrame(i)):e(1)};return i(),{stop:e}}function l(t,e,n){return t+(e-t)*n}function u(e,n){return"linear"==n?e:"swing"==n?t.easing[n]?t.easing[n](e):e:t.easing[n]?t.easing[n](1,e,0,1,1,1):e}function f(t,e,n,i){if("object"==typeof e){var a={};for(var o in e)a[o]=f(t,e[o],n[o],i);return a}var s=["px","%","in","cm","mm","pt","pc","em","ex","ch","rem","vh","vw","vmin","vmax","deg","rad","grad","turn"],r="";return"string"==typeof e?r=e:"string"==typeof n&&(r=n),r=function(t,e,n){for(var i in e)if(t.indexOf(e[i])>-1)return e[i];return p[n]?p[n]:""}(r,s,t),e=parseFloat(e),n=parseFloat(n),l(e,n,i)+r}if("undefined"!=typeof e){e.jquery||"function"==typeof e||(n=e.from,i=e.to,a=e.duration,o=e.delay,s=e.easing,r=e.callback,e=e.each||e.obj);var d="num";if(e.jquery&&(d="obj"),"undefined"!=typeof e&&"undefined"!=typeof n&&"undefined"!=typeof i){"function"==typeof o&&(r=o,o=0),"function"==typeof s&&(r=s,s=0),"string"==typeof o&&(s=o,o=0),a=a||0,o=o||0,s=s||0,r=r||0;var p={opacity:0,top:"px",left:"px",right:"px",bottom:"px",width:"px",height:"px",translate:"px",rotate:"deg",rotateX:"deg",rotateY:"deg",scale:0},h=c(function(t){if(t=u(t,s),"num"===d){var a=l(n,i,t);e(a)}else{var a={transform:""};for(var o in n)if("undefined"!=typeof p[o]){var r=f(o,n[o],i[o],t);switch(o){case"translate":a.transform+=" translate3d("+r[0]+","+r[1]+","+r[2]+")";break;case"rotate":a.transform+=" rotate("+r+")";break;case"rotateX":a.transform+=" rotateX("+r+")";break;case"rotateY":a.transform+=" rotateY("+r+")";break;case"scale":a.transform+="object"==typeof r?" scale("+r[0]+", "+r[1]+")":" scale("+r+")";break;default:a[o]=r}}""===a.transform&&delete a.transform,e.css(a)}});return h}}}window.wowAnimate=e}(jQuery),Date.now||(Date.now=function(){return(new Date).getTime()}),function(){"use strict";for(var t=["webkit","moz"],e=0;e<t.length&&!window.requestAnimationFrame;++e){var n=t[e];window.requestAnimationFrame=window[n+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var i=0;window.requestAnimationFrame=function(t){var e=Date.now(),n=Math.max(i+16,e);return setTimeout(function(){t(i=n)},n-e)},window.cancelAnimationFrame=clearTimeout}}();





// extend wowslider for effect support
(function($){
	// amount of lates effects
	var effects = 10;

	// all effects list
	var allEfects = "turn|shift|cube_over|louvers|lines|carousel|dribbles|parallax|brick|collage|basic|basic_linear|blast|blinds|blur|book|bubbles|carousel_basic|cube|domino|fade|flip|fly|glass_parallax|kenburns|page|photo|rotate|seven|slices|squares|stack|stack_vertical|tv".split("|");

	if (SITE_URL.indexOf('http://') === 0) {
		SITE_URL = 'https://' + SITE_URL.split('http://').pop();
	}
	var effectsPath = (SITE_URL || 'https://wowslider.com/')+'images/effects/';

	// create effects buttons
	// @callback = function(effect)
	function createEffects(callback){
		if($('#effbuttons').length && !$("#effbuttons .effbutton").length){
			var cont=$('#effbuttons');
			//wow.parent().append(cont);
			cont.html("<span class='effects-title'>Change effect: </span>");
			
			// prepare effects links
			var effectsLinks = '';
			for (var e = 0; e < effects; e++) {
				if(e < allEfects.length)
				effectsLinks += '<a class="button effbutton" data-effect="'+allEfects[e]+'" href="#">'+allEfects[e].replace("_"," ")+'</a> ';
			}

			// all effects list
			var effectsMore = '';
			if(effects < allEfects.length) {
				for(var k = effects; k < allEfects.length; k++) {
					var exist = 0;
					for(var s = 0; s < effects.length; s++) {
						if(effects[s] == allEfects[k]) {
							exist = 1;
							break;
						}
					}
					if(!exist) {
						effectsMore += '<li data-effect="'+allEfects[k]+'">' + allEfects[k].replace("_"," ") + '</li>';
					}
				}
				effectsMore = '<a class="button effmore" href="#">More <span>^</span><ul>'+effectsMore+'</ul></a>';
			}

			cont.append(effectsLinks + effectsMore);

			// click on effect button event
			cont.on('click', '[data-effect]', function() {
				var curEffect = $(this).attr('data-effect');
				$.getScript(effectsPath+curEffect+".js", function(){
					callback(curEffect); 
				});
				return false;
			});

			// fix firefox drag event
			cont.on('dragstart', '.effmore', function(e) {
				e.preventDefault();
			})
		}	
	}
		
	function selectEffect(new_effect){
		$("#effbuttons .checked").removeClass('checked');
		var curItem = $("#effbuttons [data-effect='"+new_effect+"']");
		curItem.addClass('checked');

		// add checked to More button
		if(curItem.parents('.effmore')[0]) {
			curItem.parents('.effmore').addClass('checked');
		}
	};


	function controlDeviceButtons(wow, callback) {
		// device buttons
		var sliderCont = wow.parent(),
			curResponsive = 1;
		function resizeWnd() {
			// apply after transition
			if(curResponsive > 1)
				sliderCont.css('width', '100%');

			$(window).resize();
		}

		$('#devices').on('click', 'a', function(e) {
			var thisClass = this.className;
			e.preventDefault();

			if(/laptop|tablet|mobile/g.test(thisClass)) {
				$('#devices').find('.laptop, .tablet, .mobile').removeClass('checked');

				if(curResponsive > 1) {
					curResponsive = 1;
					$('#devices').find('.boxed, .fullwidth, .fullscreen').removeClass('checked');
					$('#devices .boxed').addClass('checked');
				}
				
				$('>div', sliderCont).css('height','');
				
				if(/laptop/g.test(thisClass)) {
					sliderCont.css('maxWidth', sliderCont.width()).animate({
						maxWidth: curResponsive>1?$(window).width():960
					}, resizeWnd);
				} else if(/tablet/g.test(thisClass)) {
					sliderCont.css('maxWidth', sliderCont.width()).animate({
						maxWidth: 700
					}, resizeWnd);
				} else if(/mobile/g.test(thisClass)) {
					sliderCont.css('maxWidth', sliderCont.width()).animate({
						maxWidth: 500
					}, resizeWnd);
				}
				$(this).addClass('checked');
			}

			else {
				if(/boxed/g.test(thisClass)) {
					curResponsive = 1;
					sliderCont.css('maxWidth', '').removeClass('fullwidth');
				} else if(/fullwidth/g.test(thisClass)) {
					sliderCont.css('maxWidth', 'none').addClass('fullwidth');
					curResponsive = 2;
				} else if(/fullscreen/g.test(thisClass)) {
					sliderCont.css('maxWidth', 'none');
					$('#'+wow.attr('id')+' .ws_fullscreen').click();
					return;
				}
				$('#devices').find('.boxed, .fullwidth, .fullscreen').removeClass('checked');

				if(curResponsive > 1) {
					$('#devices').find('.tablet, .mobile').removeClass('checked');
					$('#devices .laptop').addClass('checked');
					resizeWnd();
				}

				$(this).addClass('checked');
			}

			callback({
				responsive: curResponsive
			});
		});
	}

	
	var cSlide, bkpCont, wowInstance, firstInitBtns;

	// rewrite slider
	// window.wowReInitor = function (wow,options){
	var default_wowSlider = $.fn.wowSlider;
	var default_options;
	var newOptions;
	$.fn.wowSlider = function (options) {
		if(!default_options) {
			default_options = options;
		}
		var wow = $(this);
		if(!newOptions) {
			newOptions = $.extend({},options);
		}
		// add current effect if no in effects list
		/*
		if (newOptions.effect && (effects.join("|").indexOf(newOptions.effect)<0))
			effects[effects.length] = newOptions.effect;
		*/

		// add fullscreen api
		newOptions.fullScreen = true;

		// change sizes when click on device buttons
		if(!firstInitBtns) {
			firstInitBtns = 1;

			if(wow.attr('data-fullscreen')) {
				wow.parent().css('max-width', 'none');
			}

			if(wow.attr('data-no-devices')) {
				$('#devices').remove();
			} else {
				controlDeviceButtons(wow, function(newOpts) {
					if(newOptions.responsive !== newOpts.responsive) {
						newOptions.responsive = newOpts.responsive;
						newOptions.forceStart = 0;
						wowReInitor(wowInstance, newOptions);
					}
				});

				if(newOptions.responsive == 2) {
					$('#devices a.fullwidth').click();
				}
			}

			if(wow.attr('data-effects')) {
				$('#devices').remove();
				allEfects = wow.attr('data-effects').split("|");
			}
		}

		// get new effect script, then start
		$.getScript(effectsPath+newOptions.effect+".js", function(){
			newOptions.support = default_wowSlider.support;

			// change duration in brick effect
			if(newOptions.effect == 'brick') newOptions.duration = 5500;
			else newOptions.duration = default_options.duration;

			// recreate html or init effects
			if (!bkpCont){//first start
				bkpCont = $(document.createElement("div")).append(wow.clone()).html();	
				
				createEffects(function(eff){
					newOptions.effect = eff;
					newOptions.forceStart = 1;
					wowReInitor(wowInstance, newOptions);
					//reinitSlider(new_o);
				});

				selectEffect(newOptions.effect);
			}
			else {
				wow.get(0).wsStop();
				wow = $(bkpCont).replaceAll(wow);
			}
			
			wowInstance = wow; // save instance for effect
			
			if (!newOptions.effect)
				newOptions.effect = (allEfects[Math.floor(Math.random()*allEfects.length)]) || "blinds";
			var new_opt = $.extend({
				startSlide:cSlide,
				onStep:function(num){cSlide=num}
			},newOptions);
			
			// run slider
			//var result = wow.wowSlider(new_opt); 
			var result = default_wowSlider.apply(wow, [new_opt]); 
			
			if (isNaN(cSlide))
				cSlide = 0;
			else if(newOptions.forceStart)
				wow.get(0).wsStart(cSlide+1);
				
			selectEffect(new_opt.effect);

			return result;
		});
	}
	
	// for old compability
	window.wowReInitor = function (wow,options){
		$(wow).wowSlider(options);
	};
})(jQuery);