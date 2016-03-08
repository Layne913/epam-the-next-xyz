$(function() {
  $.ajax({
    method: "GET",
    url: "/api/sites",
    success: function(data) {
      alert("successful in loading data");
    },
    error: function(error) {
      alert("Error");
    }
  })
});