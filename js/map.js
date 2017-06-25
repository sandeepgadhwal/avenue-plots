var ZoningDict = ["Business", "Commercial / Mixed-Use", "Manufacturing", "Residential", 
                      "Planned Development", "Planned Manufacturing District", "Downtown Mixed-Use",
                      "Downtown Core", "Downtown Residential", "Downtown Service", 
                      "Transportation","Parks and Open Space"];

var ZoningTable = {};

$(window).resize(function () {
  var h = $(window).height(),
    offsetTop = 120; // Calculate the top offset

  $('#mapCanvas').css('height', (h - offsetTop));
}).resize();

$(function() {
  $('label.checkbox.inline').popover({
    delay: { show: 300, hide: 100 }
  });

  // populate zoning table from CSV
  $.when($.get("/resources/import/zonedata.csv")).then(
    function(data){
      $.each($.csv.toObjects(data), function(i, row){
        ZoningTable[row['zonedist']] = row;
      });
      //console.log(ZoningTable);
    });


  CartoDbLib.initialize();
  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('search_address'));

 // $(':checkbox').click(function(){
 //   CartoDbLib.doSearch();
//  });

  $('#btnSearch').click(function(){
    CartoDbLib.doSearch();
  });

  $('#findMe').click(function(){
    CartoDbLib.findMe();
    return false;
  });

  $('#reset').click(function(){
    $.address.parameter('address','');
    $.address.parameter('radius','');
    $.address.parameter('id','');
    CartoDbLib.initialize();
    return false;
  });

  $("#search_address").keydown(function(e){
      var key =  e.keyCode ? e.keyCode : e.which;
      if(key == 13) {
          $('#btnSearch').click();
          return false;
      }
  });

  $('.simcopter').click(function(e){
    console.log('simcopter!');
    return false;
  });

  $('.yay-link').click(function(e){
    var location = $(this).attr('href');
    setTimeout(
      function(){
        window.location = location;
      },3000)
    e.preventDefault();
  });

  if ($.cookie("show-welcome") != "read") {
    $('#a_info_accordion').click();
    $.cookie("show-welcome", "read", { expires: 7 });
  }

  $('#close_info').click(function(){
    $('#a_info_accordion').click();
  });

  $('.zones label').popover({trigger: "hover", placement: "top"})

});

