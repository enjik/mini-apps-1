$(document).ready(function() {
  $('#form').submit(function(event) {
    $.ajax({
    method: "POST",
    url: "http://localhost:3000",
    dataType: "json",
    success: function(response) {
            console.log(response);
          },
        error: function(response) {
            console.log(response);
          }
        });

    event.preventDefault();
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
