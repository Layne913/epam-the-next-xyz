$(function(){
  console.log("Hello");
  $.ajax({
    method: "GET",
    url: "/api/articles",
    success: function(data) {
      setPage(data);
    },
    error: function(error) {
      alert("Error");
    }
  })
});

// $('.place_img').mouseover(function() {
//   $('.article_img p').css("visibility","visible");
// });

function setPage(data) {
  var blocks = $(".col-md-4");
  var index = 0;
  $.makeArray(blocks).forEach(function(block){
    var image = $.makeArray($(block).find( "img" ))[0];
    var image_name =  $.makeArray($(block).find( "p" ))[0];
    var image_summary = $.makeArray($(block).find( ".image_summary" ))[0];
    image.src = data[index].image;
    image_summary.innerHTML = data[index].summary;
    image_name.innerHTML = data[index].title;
    //set page hover
    $(image).mouseover(function() {
      $(image_name).css("visibility","visible");
    });

    $(image).mouseout(function() {
      $(image_name).css("visibility","hidden");
    })

    index++;
  });
}



