(function ($) {
    window.Com = {
        'Ar': {
            'Timer': {'index':0}
        },
        'Browser' : {
            AddEventListener: !!window.addEventListener,
            Touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
            Prefix: '',
            TransitionEnd: 'transitionend',
            Transitions: (function(temp) {
                var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
                for ( var i in props )
                    if (temp.style[ props[i] ] !== undefined) {
                        switch ( props[i] ) {
                            case 'WebkitTransition':
                                Prefix = '-webkit-';
                                TransitionEnd = 'webkitTransitionEnd';
                                break;
                            case 'MozTransition':
                                Prefix = '-moz-';
                                break;
                            case 'OTransition':
                                Prefix = '-o-';
                                TransitionEnd = 'oTransitionEnd';
                                break;
                            case 'msTransition':
                                Prefix = '-ms-';
                                TransitionEnd = 'msTransitionEnd';
                                break;
                        }
                        return true;
                    }
                return false;
            })(document.createElement('swipe'))
        },
        'Func': {
            /** setTimeout을 전역으로 등록 */
            callReserv: function(fn_def, time_ms) {
                with(window.Com){
                    var timerKey = Ar.Timer.index+1;  // timerKey는 closure로서 동작해야한다
                    Ar.Timer.index += 1;
                    Ar.Timer[timerKey] = {};
                    Ar.Timer[timerKey].exFunc = fn_def;
                    Ar.Timer[timerKey].hashFunc = setTimeout(function(){Func.callRun(timerKey)}, time_ms);
                    Ar.Timer[timerKey].isRun = false;
                }
            },
            /** callReserv에서 등록된 함수를 실행하고 clearTimeout 실행 */
            callRun: function(func_key) {
                with(window.Com){
                    clearTimeout(Ar.Timer[func_key].hashFunc);
                    console.log(func_key + ' >> ' + Func.getUnixtime());
                    Ar.Timer[func_key].exFunc();
                    Ar.Timer[func_key].isRun = true;
                }
            },

            /** 유닉스 시간을 리턴 */
            getUnixtime:function() {
                var d = new Date();
                return (d.getTime() / 1000);
            },
            /** json 데이타와 함께 html 랜더링 */
            renderingHtml: function(class_name, clone_name, data_json, bind_Elm, is_more, ar_order) {


                function makeHtml(k,v) {
                    var tplType = v['type']||k;
                    var cloneHead = $('.' + class_name + clone_name + '.'+tplType);
                    var container = [];

                    if (is_more && !!v['page'] && (parseInt(v.page)>1)){
                        container = $('.' + class_name + '.' + k + ':visible:not(.hide)');
                    }

                    if ( container.length == 0 ) {
                        container = cloneHead.clone();
                        container.addClass(k);
                        container.insertBefore(bind_Elm);

                        container.find('.hide').each(function (node_i) {
                            $(this).hide();
                        });
                    }
                    container.removeClass('hide');

                    $.each(v, function(g_k, g_v) {
                        if ( g_k == 'list' ) {

                            $.each(v.list, function(l_k, l_v){
                                var mode = l_v['mode']||'node';
                                var nodeElm = container.find('.hide.tpl-'+mode);
                                if ( nodeElm.length==0 ) {
                                    nodeElm = cloneHead.find('.tpl-'+mode).eq(0).clone();
                                    if ( !!v['adding'] &&  v['adding'] == 'after')
                                        nodeElm.insertAfter(container.find('.tpl-'+mode).eq(container.find('.tpl-'+mode).length-1));
                                    else
                                        nodeElm.insertBefore(container.find('.tpl-'+mode).eq(0));
                                }

                                nodeElm.removeClass('hide');
                                nodeElm.show();

                                function dynamicBind(elm_node) {
                                    var jElm=$(elm_node),
                                        classVar = jElm.attr('class'),
                                        dynamicCode;

                                    if ( !!classVar && classVar.length > 0) {
                                        var matchResult = classVar.match(/d#-[^\#]+\#/);
                                        if ( !!matchResult && matchResult.length > 0 ) {
                                            dynamicCode = matchResult[0];
                                        }
                                    }

                                    if ( !!dynamicCode ) {
                                        dynamicCode = dynamicCode.substring(3, dynamicCode.length-1);


                                        $.each(dynamicCode.split('_'), function(dn_i, dn_str) {
                                            var elmInfo = dn_str.split('-');
                                            var key = elmInfo.shift();
                                            var act = elmInfo.join('-');

                                            if ( !!l_v[key] ) {
                                                jElm.removeClass('hide');
                                                jElm.show();
                                                if ( jElm.hasClass('bindPrev') ) {
                                                    jElm.prev().removeClass('hide');
                                                    jElm.prev().show();
                                                }
                                                else if ( jElm.hasClass('bindParentPrev') ) {
                                                    jElm.parent().prev().removeClass('hide');
                                                    jElm.parent().prev().show();
                                                }

                                            }

                                            if ( key == 'alterCls' ) {
                                                var clsInfo = act.split('-');
                                                jElm.removeClass(clsInfo[0]);
                                                jElm.removeClass(clsInfo[1]);
                                                jElm.addClass(act.split('-')[(l_k % 2)]);
                                            }
                                            else if ( key == 'alterAddCls' ) {
                                                var clsInfo = act.split('-');
                                                var clsName = clsInfo[0];
                                                var clsAlter = parseInt(clsInfo[1]);
                                                jElm.addClass(clsName + (l_k % clsAlter));
                                            }
                                            else if ( key == 'alterClsP' ) {
                                                var clsInfo = act.split('-');
                                                nodeElm.removeClass(clsInfo[0]);
                                                nodeElm.removeClass(clsInfo[1]);
                                                nodeElm.addClass(act.split('-')[(l_k % 2)]);
                                            }
                                            else if ( key == 'addSeq' ) {
                                                jElm.attr(act, jElm.attr(act)+(l_k+1));
                                            }
                                            else if ( key == 'seq' ) {
                                                jElm.attr(act, l_k+1);
                                            }
                                            else if ( key == 'idx' ) {
                                                jElm.attr(act, ''+l_k+'');
                                            }
                                            else if ( key == 'clsfix' ) {
                                                jElm.addClass(act);
                                            }
                                            else if ( key == 'rmCls' ) {
                                                jElm.removeClass(act);
                                            }
                                            else if ( key == 'addCls' ) {
                                                jElm.addClass(act);
                                            }

                                            else {
                                                if ( !!l_v[key] ) {
                                                    switch ( act ) {
                                                        case 'eq-not-rm':
                                                            if ( !jElm.hasClass(l_v[key]) ) {
                                                                jElm.remove();
                                                            }
                                                        case 'rmCls':
                                                            jElm.removeClass(l_v[key]);
                                                            break;
                                                        case 'cls':
                                                            jElm.addClass(l_v[key]);
                                                            break;
                                                        case 'text':
                                                            jElm.text(l_v[key]);
                                                            break;
                                                        case 'btnIcon':
                                                            jElm.append(' <img src='+l_v[key] +'>' );
                                                            break;
                                                        case 'html':
                                                            if ( key == 'count' ) {
                                                                jElm.html(jElm.html()+' <span>('+l_v[key] + ')</span>');
                                                            }
                                                            else {
                                                                jElm.html(l_v[key]);
                                                            }
                                                            break;
                                                        case 'alter':
                                                            break;
                                                        case 'style-width':
                                                            jElm.css('width',l_v[key]);
                                                            break;
                                                        case 'texts':
                                                            jElm.text(l_v[key].join(' | '));
                                                            break;
                                                        case 'showNAwards':
                                                            if ( !!l_v[key] && l_v[key].length > 0 ) {
                                                                jElm.text('Awards (' + l_v[key].length + ')');
                                                                /*
                                                                 jElm.find('.title').text('Awards (' + l_v[key].length + ')');
                                                                 if ( jElm.find('a').length > 0)
                                                                 jElm.find('a').data('list',l_v[key]);
                                                                 */
                                                            }
                                                            break;
                                                        case 'child':
                                                            $.each(l_v[key], function(d_k, d_v) {
                                                                var chNode = jElm.children().eq(d_k);
                                                                if (!chNode || chNode.length == 0 ) {
                                                                    chNode = jElm.children().eq(0).clone();
                                                                    chNode.appendTo(jElm);
                                                                }
                                                                chNode.removeClass('hide');
                                                                chNode.show();

                                                                switch ( key ) {
                                                                    case 'availColor':
                                                                        $.each(d_v, function(dc_k, dc_v) {
                                                                            chNode.css('background', dc_k);
                                                                            //chNode.addClass(dc_k.toLowerCase());
                                                                            chNode.find('a').attr('href',dc_v);
                                                                        });
                                                                        break;
                                                                    case 'availSize':
                                                                        $.each(d_v, function(dc_k, dc_v) {
                                                                            chNode.find('a').attr('href',dc_v);
                                                                            chNode.find('a').text(dc_k);
                                                                        });
                                                                        break;
                                                                    case 'awardsList':
                                                                        chNode.find('img').attr('src',d_v.imgSrc);
                                                                        break;
                                                                }
                                                            });
                                                            break;
                                                        case 'data-product':
                                                        case 'data-media':
                                                            $.each(l_v[key], function(d_k, d_v) {
                                                                jElm.attr((act + '-'+d_k),d_v);
                                                            });
                                                            break;
                                                        case 'hrefn':
                                                            if ( !l_v['bindFn'] )
                                                                jElm.attr('href', l_v[key]);
                                                            else
                                                                jElm.attr('href', ('javascript:' +l_v['bindFn']+ '(\''+l_v[key]+'\');'));

                                                            break;
                                                        default:

                                                            if ( key == 'seq' ) {
                                                                jElm.attr(act, l_k+1);
                                                            }
                                                            else if ( key == 'idx' ) {
                                                                jElm.attr(act, ''+l_k+'');
                                                            }
                                                            else
                                                                jElm.attr(act, l_v[key]);

                                                            break;
                                                    }
                                                }
                                            }
                                        });
                                    }
                                }


                                nodeElm.find('[class*=d#-]').each(function(i) {
                                    dynamicBind($(this));
                                });

                                dynamicBind(nodeElm);

                            });
                        }
                        else {
                            /*
                             switch ( g_k ) {
                             case 'moreCount':
                             container.find('[class*=g#-moreCount-text#]').text(v.moreCount);
                             container.find('[class*=g#-moreCount-showNcount#]').removeClass('hide')
                             case 'dispTitle':
                             container.find('[class*=g#-dispTitle-text#]').html(g_v + (!v.count ? '' : (' <span>(' + v.count + ')</span>')));
                             case 'type':
                             default:
                             break;
                             }
                             */
                        }
                    });

                    container.find('[class*=g#-]').each(function(i) {
                        var jGrp = $(this),
                            groupCode = jGrp.attr('class').match(/g#-[^\#]+\#/)[0];

                        if ( !!groupCode ) {
                            groupCode = groupCode.substring(3, groupCode.length-1);
                            var treatHide = false;
                            $.each(groupCode.split('_'), function(gn_i, gn_str) {
                                //
                                var elmInfo = gn_str.split('-');
                                var key = elmInfo.shift();
                                var act = elmInfo.join('-');

                                if ( !!v[key] ) {
                                    if ( !treatHide ) {
                                        jGrp.removeClass('hide');
                                        jGrp.show();
                                    }
                                    if ( jGrp.hasClass('bindPrev') ) {
                                        jGrp.prev().removeClass('hide');
                                        jGrp.prev().show();
                                    }
                                }


                                if ( typeof(v[key])!='undefined' ) {
                                    switch ( act ) {
                                        case 'text':
                                            jGrp.text(v[key]);
                                            break;
                                        case 'html':
                                            if ( key == 'count' ) {
                                                jGrp.html(jGrp.html()+ ' <span>('+v[key] + ')</span>');
                                            }
                                            else {
                                                jElm.html(v[key]);
                                            }
                                            break;
                                        case 'showNcount':
                                            if ( parseInt(v[key]) > 0 ) {
                                                jGrp.removeClass('hide').show();
                                                var page = v['page'];
                                                if ( !!page && (parseInt(page) > 1) && jGrp.attr('data-alternate-over') && jGrp.attr('data-alternate-org')) {
                                                    jGrp.html(jGrp.html().replace(jGrp.attr('data-alternate-org'), jGrp.attr('data-alternate-over')));
                                                    jGrp.find('.icon-link-play').addClass('hide');
                                                }
                                            }
                                            else {
                                                jGrp.addClass('hide').hide();
                                                treatHide = true;
                                            }
                                            break;
                                        case 'replace':
                                            if ( key == 'moreCount' ) {
                                                var moreHtml = jGrp.html();
                                                jGrp.html(moreHtml.replace(/\(\s*\d+\s*\)/, '(' + v[key] + ')'));
                                                /*
                                                if ( moreHtml.indexOf(v['dispTitle']) == -1 ) {
                                                    jGrp.html(moreHtml.replace(/\(\s*\d+\s*\)/, v['dispTitle'] + ' ' + jGrp.attr('data-result-text') + ' (' + v[key] + ')'));
                                                }
                                                else {
                                                    jGrp.html(moreHtml.replace(/\(\s*\d+\s*\)/, '(' + v[key] + ')'));
                                                }*/
                                            }
                                            else{
                                                jGrp.html(jGrp.html().replace(/\(\s*\d+\s*\)/, '(' + v[key] + ')'));
                                            }
                                            break;
                                        default:
                                            jGrp.attr(act, v[key]);
                                            break;
                                    }
                                }
                                //
                            });
                        }
                    });

                    if ( k == 'video' ) {
                        if ( $('.BrightcoveExperience').length > 0 ) {
                            brightcove.createExperiences();
                        }
                        if ( $('.youtube-player').length > 0 ) {
                            ss.YoutubePlayer.init();
                        }

                    }
                    window.InstResponsive.bindImages(container);
                }

                if ( !!ar_order && ar_order.length > 0 ) {
                    for ( var i=0; i < ar_order.length; i++ ) {
                        if ( !!data_json[ar_order[i]] ) {
                            makeHtml(ar_order[i], data_json[ar_order[i]]);
                        }
                    }
                }
                else {
                    $.each(data_json, function(k,v){
                        makeHtml(k,v);
                    });
                }
            },
            /** css3 transition */
            transition: function() {
                var container = arguments[0];
                var options = arguments[1] || {};
                var type = options.type || 'margin-left';
                var speed = options.speed || '1';
                var opt = options.opt || 'linear';
                var dist = options.dist || '';
                var numDist = parseInt(dist);
                var fnTransitionEnd = options.fnEnd || (function(){});
                var forceBit = options.forceBit || 0;

                if ( !(container instanceof jQuery) )
                    container = $(container);

                container.each(function(idx){
                    var events = $._data(this, "events");
                    if ( !(events && events['transitionend']) ) {
                        this.style.setProperty(Com.Browser.Prefix + "transition", type+" "+speed+"s "+opt);
                        $(this).on(Com.Browser.TransitionEnd, fnTransitionEnd);
                    }
                    else {
                        if ( (forceBit & 1)==1 ) {
                            this.style.setProperty(Com.Browser.Prefix + "transition", type+" "+speed+"s "+opt);
                        }
                        if ( (forceBit & 2)==2 ) {
                            $(this).unbind(Com.Browser.TransitionEnd);
                        }
                        if ( (forceBit & 4)==4 ) {
                            $(this).on(Com.Browser.TransitionEnd, fnTransitionEnd);
                        }
                    }

                    if ( !isNaN(numDist) ) {
                        dist = parseInt(this.style.getPropertyValue(type))+numDist;
                        if (isNaN(dist))
                            dist = numDist;
                    }
                    this.style.setProperty(type, dist+"px");

                });
            }
        }
    }
}(jQuery));

/* set unify product container */
function SetUnifyProduct() {
  var maxHeroHeight = 0;
  var maxColHeight = 0;
  var maxDescriptionHeight = 0;
  var maxPriceHeight = 0;
  var maxBtnHeight = 0;
  var maxWrapperHeight = 0;
  var addDescriptionHeight = 0;
  var wW = $(window).width();
  var isFilterPage = $('.ss_samsung div').hasClass('new_filter') ? true : false;

  $('.unify-set .product-container .inner').css('height', '100%');
  $('.unify-set .product-container .product-description').css('height', 'auto');
  $('.unify-set .product-container .buy-module').css('height', 'auto');

  if(isFilterPage) {
    $('.unify-set .new-arrival .product-container .buy-module').css('position','absolute');
    $('.unify-set .pill-tabs').each(function() {
      var pilltabs = this;
      var wrapper = $(pilltabs).find('.product-container .inner');
      wrapper.each(function(i) {
        var module_wrapper = this;
        // max hero height
        if($(module_wrapper).find('.product-hero').outerHeight(true) > maxHeroHeight) {
          maxHeroHeight = $(module_wrapper).find('.product-hero').outerHeight(true);
        }

        // max description height
        if($(module_wrapper).find('.product-description').outerHeight(true) > maxDescriptionHeight) {
          maxDescriptionHeight = $(module_wrapper).find('.product-description').outerHeight(true);
        }

        // max price height
        if($(module_wrapper).find('.buy-module .product-price').outerHeight(true) > maxPriceHeight) {
          maxPriceHeight = $(module_wrapper).find('.buy-module .product-price').outerHeight(true);
        }

        // max button height
        if($(module_wrapper).find('.buy-module .etc-btnList').outerHeight(true) > maxBtnHeight) {
          maxBtnHeight = $(module_wrapper).find('.buy-module .etc-btnList').outerHeight(true);
        }
      });
      maxWrapperHeight = maxHeroHeight + maxDescriptionHeight + maxPriceHeight + maxBtnHeight;
      $(pilltabs).find('.product-description').css('height', maxDescriptionHeight);
      $(pilltabs).find('.buy-module').css('height', maxPriceHeight + maxBtnHeight);
      $(pilltabs).find('.product-container').css('height', maxWrapperHeight);
    });

  } else {
    $('.unify-set .product-container .inner').each(function (i) {

      // max hero height
      if($(this).find('.product-hero').outerHeight(true) > maxHeroHeight) {
        maxHeroHeight = $(this).find('.product-hero').outerHeight(true);
      }

      // max description height
      if($(this).find('.product-description').outerHeight(true) > maxDescriptionHeight) {
        maxDescriptionHeight = $(this).find('.product-description').outerHeight(true);
      }

      // max price height
      if($(this).find('.buy-module .product-price').outerHeight(true) > maxPriceHeight) {
        maxPriceHeight = $(this).find('.buy-module .product-price').outerHeight(true);
      }

      // max button height
      if($(this).find('.buy-module .etc-btnList').outerHeight(true) > maxBtnHeight) {
        maxBtnHeight = $(this).find('.buy-module .etc-btnList').outerHeight(true);
      }

    });

    maxWrapperHeight = maxHeroHeight + maxDescriptionHeight + maxPriceHeight + maxBtnHeight;

    $('.unify-set .product-container .product-description').css('height', maxDescriptionHeight);
    $('.unify-set .product-container .buy-module').css('height', maxPriceHeight + maxBtnHeight);

    maxWrapperHeight = maxWrapperHeight + 20;
    $('.unify-set .product-container').css('height', maxWrapperHeight);
    $('.unify-set .sam-module').css('height', maxWrapperHeight);

  }
}

/* multi line clamp */
! function(t, e) {
  function n(t, e, n) {
    var r = t.children(), o = !1;
    t.empty();
    for (var i = 0, d = r.length; d > i; i++) {
      var l = r.eq(i);
      if (t.append(l), n && t.append(n), a(t, e)) { l.remove(), o = !0; break }
      n && n.detach()
    }
    return o
  }

  function r(e, n, i, d, l) {
    var s = !1, c = "a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style", u = "script, .lineClamp-keep";
    return e.contents().detach().each(function() {
      var h = this, f = t(h);
      if ("undefined" == typeof h) return !0;
      if (f.is(u)) e.append(f);
      else {
        if (s) return !0;
        e.append(f), !l || f.is(d.after) || f.find(d.after).length || e[e.is(c) ? "after" : "append"](l), a(i, d) && (s = 3 == h.nodeType ? o(f, n, i, d, l) : r(f, n, i, d, l), s || (f.detach(), s = !0)), s || l && l.detach()
      }
    }), n.addClass("ss-truncated"), s
  }

  function o(e, n, r, o, d) {
    var c = e[0];
    if (!c) return !1;
    var h = s(c), f = -1 !== h.indexOf(" ") ? " " : "　", p = "letter" == o.wrap ? "" : f, g = h.split(p), v = -1, w = -1, b = 0, y = g.length - 1;
    for (o.fallbackToLetter && 0 == b && 0 == y && (p = "", g = h.split(p), y = g.length - 1); y >= b && (0 != b || 0 != y);) {
      var m = Math.floor((b + y) / 2);
      if (m == w) break;
      w = m, l(c, g.slice(0, w + 1).join(p) + o.ellipsis), r.children().each(function() {
        t(this).toggle().toggle()
      }), a(r, o) ? (y = w, o.fallbackToLetter && 0 == b && 0 == y && (p = "", g = g[0].split(p), v = -1, w = -1, b = 0, y = g.length - 1)) : (v = w, b = w)
    }
    if (-1 == v || 1 == g.length && 0 == g[0].length) {
      var x = e.parent();
      e.detach();
      var T = d && d.closest(x).length ? d.length : 0;
      x.contents().length > T ? c = u(x.contents().eq(-1 - T), n) : (c = u(x, n, !0), T || x.detach()), c && (h = i(s(c), o), l(c, h), T && d && t(c).parent().append(d))
    } else h = i(g.slice(0, v + 1).join(p), o), l(c, h);
    return !0
  }

  function a(t, e) { return t.innerHeight() > e.maxHeight }

  function i(e, n) {
    for (; t.inArray(e.slice(-1), n.lastCharacter.remove) > -1;) e = e.slice(0, -1);
    return t.inArray(e.slice(-1), n.lastCharacter.noEllipsis) < 0 && (e += n.ellipsis), e
  }

  function d(t) { return { width: t.innerWidth(), height: t.innerHeight() } }
  function l(t, e) { t.innerText ? t.innerText = e : t.nodeValue ? t.nodeValue = e : t.textContent && (t.textContent = e) }
  function s(t) { return t.innerText ? t.innerText : t.nodeValue ? t.nodeValue : t.textContent ? t.textContent : "" }
  function c(t) { do t = t.previousSibling; while (t && 1 !== t.nodeType && 3 !== t.nodeType); return t }

  function u(e, n, r) {
    var o, a = e && e[0];
    if (a) {
      if (!r) { if (3 === a.nodeType) return a; if (t.trim(e.text())) return u(e.contents().last(), n) }
      for (o = c(a); !o;) { if (e = e.parent(), e.is(n) || !e.length) return !1; o = c(e[0]) }
      if (o) return u(t(o), n)
    }
    return !1
  }

  function h(e, n) { return e ? "string" == typeof e ? (e = t(e, n), e.length ? e : !1) : e.jquery ? e : !1 : !1 }

  function f(t) {
    for (var e = t.innerHeight(), n = ["paddingTop", "paddingBottom"], r = 0, o = n.length; o > r; r++) { var a = parseInt(t.css(n[r]), 10); isNaN(a) && (a = 0), e -= a }
    return e
  }
  if (!t.fn.ssLineClamp) {
    t.fn.ssLineClamp = function(e) {
      if (0 == this.length) return t.fn.ssLineClamp.debug('No element found for "' + this.selector + '".'), this;
      if (this.length > 1) return this.each(function() { t(this).ssLineClamp(e) });
      var o = this;
      o.data("ssLineClamp") && o.trigger("destroy.dot"), o.data("ssLineClamp-style", o.attr("style") || ""), o.css("word-wrap", "break-word"), "nowrap" === o.css("white-space") && o.css("white-space", "normal"), o.bind_events = function() {
        return o.bind("update.dot", function(e, d) {
          switch (o.removeClass("ss-truncated"), e.preventDefault(), e.stopPropagation(), typeof l.height) {
            case "number": l.maxHeight = l.height; break;
            case "function": l.maxHeight = l.height.call(o[0]); break;
            default: l.maxHeight = f(o)
          }
          l.maxHeight += l.tolerance, "undefined" != typeof d && (("string" == typeof d || "nodeType" in d && 1 === d.nodeType) && (d = t("<div />").append(d).contents()), d instanceof t && (i = d)), g = o.wrapInner('<div class="ssLineClamp" />').children(), g.contents().detach().end().append(i.clone(!0)).find("br").replaceWith("  <br />  ").end().css({
            height: "auto", width: "auto", border: "none", padding: 0, margin: 0
          });
          var c = !1, u = !1;
          return s.afterElement && (c = s.afterElement.clone(!0), c.show(), s.afterElement.detach()), a(g, l) && (u = "children" == l.wrap ? n(g, l, c) : r(g, o, g, l, c)), g.replaceWith(g.contents()), g = null, t.isFunction(l.callback) && l.callback.call(o[0], u, i), s.isTruncated = u, u
        }).bind("isTruncated.dot", function(t, e) {
          return t.preventDefault(), t.stopPropagation(), "function" == typeof e && e.call(o[0], s.isTruncated), s.isTruncated
        }).bind("originalContent.dot", function(t, e) {
          return t.preventDefault(), t.stopPropagation(), "function" == typeof e && e.call(o[0], i), i
        }).bind("destroy.dot", function(t) {
          t.preventDefault(), t.stopPropagation(), o.unwatch().unbind_events().contents().detach().end().append(i).attr("style", o.data("ssLineClamp-style") || "").data("ssLineClamp", !1)
        }), o
      }, o.unbind_events = function() {
        return o.unbind(".dot"), o
      }, o.watch = function() {
        if (o.unwatch(), "window" == l.watch) {
          var e = t(window), n = e.width(), r = e.height();
          e.bind("resize.dot" + s.dotId, function() {
            n == e.width() && r == e.height() && l.windowResizeFix || (n = e.width(), r = e.height(), u && clearInterval(u), u = setTimeout(function() { o.trigger("update.dot") }, 100))
          })
        } else c = d(o), u = setInterval(function() {
          if (o.is(":visible")) { var t = d(o); (c.width != t.width || c.height != t.height) && (o.trigger("update.dot"), c = t) }
        }, 500);
        return o
      }, o.unwatch = function() {
        return t(window).unbind("resize.dot" + s.dotId), u && clearInterval(u), o
      };
      var i = o.contents(),
        l = t.extend(!0, {}, t.fn.ssLineClamp.defaults, e), s = {}, c = {}, u = null, g = null;
      return l.lastCharacter.remove instanceof Array || (l.lastCharacter.remove = t.fn.ssLineClamp.defaultArrays.lastCharacter.remove), l.lastCharacter.noEllipsis instanceof Array || (l.lastCharacter.noEllipsis = t.fn.ssLineClamp.defaultArrays.lastCharacter.noEllipsis), s.afterElement = h(l.after, o), s.isTruncated = !1, s.dotId = p++, o.data("ssLineClamp", !0).bind_events().trigger("update.dot"), l.watch && o.watch(), o
    }, t.fn.ssLineClamp.defaults = {
      ellipsis: "...", wrap: "word", fallbackToLetter: !0, lastCharacter: {}, tolerance: 0, callback: null, after: null, height: null, watch: !1, windowResizeFix: !0
    }, t.fn.ssLineClamp.defaultArrays = {
      lastCharacter: { remove: [" ", "　", ",", ";", ".", "!", "?"], noEllipsis: [] }
    }, t.fn.ssLineClamp.debug = function() {};
    var p = 1, g = t.fn.html;
    t.fn.html = function(n) { return n != e && !t.isFunction(n) && this.data("ssLineClamp") ? this.trigger("update", [n]) : g.apply(this, arguments) };
    var v = t.fn.text;
    t.fn.text = function(n) { return n != e && !t.isFunction(n) && this.data("ssLineClamp") ? (n = t("<div />").text(n).html(), this.trigger("update", [n])) : v.apply(this, arguments) }
  }
}(jQuery);

function ssClamp(el, limit) {
  $(el).ssLineClamp({watch:true});
}

$(document).ready(function(){
  SetUnifyProduct();
  $('.product-description .bullets li').ssLineClamp({watch:true}); // new filter page usp
  $('#resultBar .rst_text').ssLineClamp({watch:true});             // filter result bar
});
$(window).resize(function () {
  SetUnifyProduct();
});
