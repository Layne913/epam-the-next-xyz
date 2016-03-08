//$(function(){
  $("#article_form").submit(function(e) {
      e.preventDefault(); // avoid to execute the actual submit of the form.

      console.log("send post request article form");
      $.ajax({
             type: "POST",
             url: "/api/articles",
             data: $("#article_form").serialize(), // serializes the form's elements.
             success: function(data)
             {
                 alert(JSON.stringify(data)); // show response from the php script.
             },
             error: function(error) {
                 alert(error);
             }
           });

  });
//})
// $(function() {
//   $.ajax({
//     method: "GET",
//     url: "/api/sites",
//     success: function(data) {
//       alert("successful in loading data");
//     },
//     error: function(error) {
//       alert("Error");
//     }
//   })
// });