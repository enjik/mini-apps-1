$(document).ready(function() {

  $('#form').submit(function(event) {
      event.preventDefault();
      console.log($('textarea').val());
    $.ajax({
    method: "POST",
    url: 'http://localhost:3000/',
    data: {result: $('textarea').val()},
    success: function(response) {
            console.log(response);
            $('#csv').html(response);
          },
        error: function(response) {
            console.log(response);
          }
        });
  });
});


// $.ajax({
//         type: "POST",
//         url: hb_base_url + "consumer",
//         contentType: "application/json",
//         dataType: "json",
//         data: JSON.stringify({
//             first_name: $("#namec").val(),
//             last_name: $("#surnamec").val(),
//             email: $("#emailc").val(),
//             mobile: $("#numberc").val(),
//             password: $("#passwordc").val()
//         }),
//         success: function(response) {
//             console.log(response);
//         },
//         error: function(response) {
//             console.log(response);
//         }
// });
