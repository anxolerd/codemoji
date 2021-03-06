;(function (window, Cryptoloji, $, undefined) {
  'use strict'
  
  //
  // jQuery document ready bootstrap
  //
  $(document).ready(function () {

    FastClick.attach(document.body);

    // remove main loader
    TweenLite.to($('#mainLoader'), .8, {opacity: 0})
    TweenLite.to($('#mainLoader'), 0, {display: "none", delay: .8})

    if ('ontouchstart' in window) {
      $('body').addClass('touch')
    }else{
      $('body').addClass('mouse')
    }

    //
    // Storage initialization
    //
    Cryptoloji.storage.init()

    // 
    // fix height
    // 
    Cryptoloji.UI.fixHeight() // this is required for android keyboard behaviour
    
    // 
    // on rotation/resize
    //
    Cryptoloji.UI.handleOrientationChanges()
    
    //
    // behavior help button
    //
    Cryptoloji.UI.loadLogicHelpButton('encryption')
    Cryptoloji.UI.loadLogicHelpButton('decryption')

    //
    // Key modal setup
    //    

    // this delay postpone a bit the emoji download flow 
    // this way the browser think the webpage has been loaded (hiding its spinner)
    setTimeout(function(){
      if (!Cryptoloji.mq.matches) {
        Cryptoloji.UI.KeyModal('#key-modal')
          .fill(EmojiList)
          .addClickHandler('#encryption_key_modal_open')
          .addClickHandler('#decryption_key_modal_open')
      } else {
        Cryptoloji.UI.KeyPanel('#encryption_keypanel')
          .fill(EmojiList)
        Cryptoloji.UI.KeyPanel('#decryption_keypanel')
          .fill(EmojiList)
      }
    }, 2000)

    //
    // handle header show/hide
    //
    Cryptoloji.UI.handleHeader()
    Cryptoloji.UI.handleFooter()

    //
    // StateMan bootstrap
    //
    Cryptoloji.stateman.start()
    // go to welcome if no state is active
    if (Cryptoloji.stateman.current.name === ''){
      Cryptoloji.stateman.go('welcome')
    }
      
    //Cryptoloji.stateman.on('begin', function (event) { console.log('begin ', event) })
    //Cryptoloji.stateman.on('end', function (phase) { console.log('end ', phase) })
    Cryptoloji.stateman.on('notfound', function () {
      Cryptoloji.stateman.go('404')
    })

    //
    // track any stage change in gAnalytics
    //
    if(Cryptoloji.stateman.current){
      ga('send', 'pageview', Cryptoloji.stateman.current.name);
    }
    Cryptoloji.stateman.on('begin', function (e) {
      ga('send', 'pageview', e.path);
    })

    $('[track]').on('click', function(){
      var t = $(this).attr('track')
      var parts = t.split('__')
      ga('send', 'event', parts[0], parts[1]);
    })

    Cryptoloji.stateman.on('decrypt:wrong-key', function(){
      ga('send', 'event', 'decrypt', 'wrong-key');
    })
    Cryptoloji.stateman.on('decrypt:right-key', function(){
      ga('send', 'event', 'decrypt', 'right-key');
    })
    Cryptoloji.stateman.on('encrypt:key', function(key){
      if(key){
        ga('send', 'event', 'encrypt', 'key');
      }else{
        ga('send', 'event', 'encrypt', 'key_first');
      }
      
    })
    Cryptoloji.stateman.on('encrypt:key_soon', function(){
      ga('send', 'event', 'encrypt', 'key_soon');
    })

  })

})(window, window.Cryptoloji, jQuery); 
