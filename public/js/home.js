$(function(){
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


function setPage(data) {

  var blocks = $(".col-md-4");
  var index = 0;
  $.makeArray(blocks).forEach(function(block){
    var image = $.makeArray($(block).find( "img" ))[0];
    var image_name =  $.makeArray($(block).find( "p" ))[0];
    var image_summary = $.makeArray($(block).find( ".image_summary" ))[0];
    var  image_id = data[index]._id;
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

    $(image).click(function() {
      sendIdRequest(image_id);
    })
    index++;
  });
}

function sendIdRequest(id) {
    $.ajax({
    method: "GET",
    url: "/api/articles/"+ id,
    success: function(data) {
      console.log(JSON.stringigy(data) + " got Responses");
    },
    error: function(error) {
      alert("Error");
    }
  })
}


