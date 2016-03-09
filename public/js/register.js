$("#user_register_form").submit(function(e) {
  $.ajax({
          type: "POST",
          url: "/users",
          data: $("#user_register_form").serialize(), // serializes the form's elements.
          success: function(data)
          {
          },
          error: function(error) {
            alert(error);
          }
   });
});
