$("#article_form").submit(function(e) {
  $.ajax({
          type: "POST",
          url: "/api/articles",
          data: $("#article_form").serialize(), // serializes the form's elements.
          success: function(data)
          {
            alert(data);
          },
          error: function(error) {
            alert(error);
          }
   });
});
