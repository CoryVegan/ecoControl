

var base_url_get = "http://172.16.19.114/data/"; //pi

//var base_url_get = "http://172.16.22.247:8000/api/"

//var base_url_get = "http://141.89.75.185/api/"

var base_url_get = "http://www.hpi.uni-potsdam.de/hirschfeld/bachelorprojects/2013H1/api/" // VM IP


$(document).ready(function(){

 
  setInterval("updateData()", 60 * 1000);   
  console.log('bla');  






   $("#diagram_button").click(function(event) {

     showDiagram();
  });


  

});
