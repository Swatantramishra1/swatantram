jQuery(document).ready(function($) {
  "use strict";


  //Contact
  $('form.contactForm').submit(function() {
    var name,email,subject,message;
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();

    Email.send({
      Host: "smtp.gmail.com",
      Username: "swatantram1992@gmail.com",
      Password: "SenseHq@123",
      To: document.getElementById("email").value,
      From: "contact@swatantram.com",
      Subject: document.getElementById("name").value + "--" + document.getElementById("subject").value,
      Body: document.getElementById("message").value,
    })
      .then(function (message) {
        document.getElementById("email").value="";
        document.getElementById("subject").value="";
        document.getElementById("name").value="";
        document.getElementById("message").value="";
        Toastify({
          text: "Email sent successfully",
          duration: 6000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "gray",
            borderRadius: "4px"
          },
          onClick: function(){} // Callback after click
        }).showToast();
      });

    // var action = $(this).attr('action');
    // if( ! action ) {
    //   action = 'contactform/contactform.php';
    // }
    // $.ajax({
    //   type: "POST",
    //   url: action,
    //   data: str,
    //   success: function(msg) {
    //     // alert(msg);
    //     if (msg == 'OK') {
    //       $("#sendmessage").addClass("show");
    //       $("#errormessage").removeClass("show");
    //       $('.contactForm').find("input, textarea").val("");
    //     } else {
    //       $("#sendmessage").removeClass("show");
    //       $("#errormessage").addClass("show");
    //       $('#errormessage').html(msg);
    //     }

    //   }
    // });
    return false;
  });

});
