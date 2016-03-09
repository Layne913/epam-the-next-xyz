$(function() {
  $.ajax({
    method: "GET",
    url: "/api/sites",
    success: function(data) {

    },
    error: function(error) {
      alert("Error");
    }
  })
});