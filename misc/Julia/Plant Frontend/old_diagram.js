        var diagram_var = '';
        var diagram_col = '';

        if ($("#temp_button").prop("checked")==true){
              var diagram_var = 'temperature';
              var diagram_col = 'red';
        }


        if ($("#elec_button").prop("checked")==true){
            var diagram_var = 'electrical_power';
            var diagram_col = 'blue';
        }

        if ($("#temp_button").prop("checked")==true & $("#elec_button").prop("checked")==true){
              var both = true;
              alert("wfwe");
        }

        var margin = {top: 20, right: 10, bottom: 30, left: 100},
            width = 990 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.time.scale()
            .range([0, width]);

        var y0 = d3.scale.linear().range([height, 0]);

        var y1 = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxisLeft = d3.svg.axis()
            .scale(y0)
            .orient("left");

        var yAxisRight = d3.svg.axis()
            .scale(y1)
            .orient("right");

        var line = d3.svg.line()
            .x(function(d) { return x(d['timestamp']); })
            .y(function(d) { return y1(d['temperature']); });

        var valueline2 = d3.svg.line()
            .x(function(d) { return x(d['timestamp']); })
            .y(function(d) { return y1(d['electrical_power']);});

        var gas_line = d3.svg.line()
            .x(function(d) { return x(d['timestamp']); })
            .y(function(d) { return y0(d['sensor_id']); });



;



function showDiagram(){


        if ($("#temp_button").prop("checked")==true){
              var diagram_var = 'temperature';
              var diagram_col = 'red';
        }


        if ($("#elec_button").prop("checked")==true){
            var diagram_var = 'electrical_power';
            var diagram_col = 'blue';
        }

     

        var margin = {top: 20, right: 20, bottom: 30, left: 80},
            width = 990 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.time.scale()
            .range([0, width]);

        var y0 = d3.scale.linear().range([height, 0]);

        var y1 = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxisLeft = d3.svg.axis()
            .scale(y0)
            .orient("left");

        var yAxisRight = d3.svg.axis()
            .scale(y1)
            .orient("right");

        var line = d3.svg.line()
            .x(function(d) { return x(d['timestamp']); })
            .y(function(d) { return y1(d['temperature']); });

        var valueline2 = d3.svg.line()
            .x(function(d) { return x(d['timestamp']); })
            .y(function(d) { return y1(d['electrical_power']);});

        var gas_line = d3.svg.line()
            .x(function(d) { return x(d['timestamp']); })
            .y(function(d) { return y0(d['sensor_id']); });


        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



        d3.json(base_url_get+"device/1/entries/limit/50", function(error, data) {
              data= data.results;
              data.forEach(function(d) {d['timestamp'] = new Date(d['timestamp']*1000);});

              x.domain(d3.extent(data, function(d) { return d['timestamp']; }));
              y0.domain([0, d3.max(data, function(d) { return Math.max(d['sensor_id']); })]); 
              
              if ($("#temp_button").prop("checked")==true && $("#elec_button").prop("checked")==true){
                  y1.domain([0, d3.max(data, function(d){ return Math.max(d['electrical_power']);})]); //todo
              }
              else 
              {
                   y1.domain([0, d3.max(data, function(d) { return Math.max(d[diagram_var]); })]); 
              }


              svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

              svg.append("g")
              .attr("class", "y axis")
              .call(yAxisLeft)
              .style("fill", "green")
              .call(yAxisLeft);

              svg.append("g")
              .attr("class", "y axis")
              .call(yAxisRight)
              .attr("transform", "translate(" + width + " ,0)")
              .style("fill", diagram_col)
              .call(yAxisRight);


              svg.append("text")
                  //.attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("gasAmount");

              svg.append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("transform", "translate(" + width + " ,0)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text(diagram_var);

               svg.append("path")      // Add the elec_power_line path.
                .attr("id", "gas")
                .attr("class", "line")
                .style("stroke", "green")
                .attr("d", gas_line(data))
                ;

              if ($("#temp_button").prop("checked")==true){   
                  svg.append("path")
                      .attr("id", "temp")
                      .attr("class", "line")
                      .style("stroke", "red")
                      .attr("d", line(data))
                      ;
              }

               if ($("#elec_button").prop("checked")==true){
                svg.append("path")      // Add the valueline2 path.
                    .attr("id", "elek")
                    .attr("class", "line")
                    .style("stroke", "blue")
                    .attr("d", valueline2(data))
                    ;
              }
            
        
        }); 

  
  } //end ShowDiagram
   

  function updateData() {

            if ($("#temp_button").prop("checked")==true){
                  var diagram_var = 'temperature';
                  var diagram_col = 'red';
            }


            if ($("#elec_button").prop("checked")==true){
                var diagram_var = 'electrical_power';
                var diagram_col = 'blue';
            }


          if (!$("#update_button").prop("checked"))
             return;

          var line = d3.svg.line()
            .x(function(d) { return x(d['timestamp']); })
            .y(function(d) { return y1(d['temperature']); });

          var valueline2 = d3.svg.line()
            .x(function(d) { return x(d['timestamp']); })
            .y(function(d) { return y1(d['electrical_power']); });

          var gas_line = d3.svg.line()
            .x(function(d) { return x(d['timestamp']); })
            .y(function(d) { return y0(d['sensor_id']); });

          d3.json(base_url_get +"device/1/entries/limit/50", function(error, data) {
              data= data.results;
              data.forEach(function(d) { d['timestamp'] = new Date(d['timestamp']*1000);});
                  // Scale the range of the data again 
              x.domain(d3.extent(data, function(d) { return d['timestamp']; }));
              y0.domain([0, d3.max(data, function(d) { return Math.max(d['sensor_id']); })]); 

              if ($("#temp_button").prop("checked")==true && $("#elec_button").prop("checked")==true){
                  y1.domain([0, d3.max(data, function(d){ return Math.max(d['electrical_power']);})]); //todo
              }
              else 
              {
                   y1.domain([0, d3.max(data, function(d) { return Math.max(d[diagram_var]); })]); 
              }


                  // Select the section we want to apply our changes to
              var svg = d3.select("body").transition();

          // Make the changes
           if ($("#temp_button").prop("checked")==true){
              svg.select("#temp")   // change the line
                  .duration(250)
                  .style("stroke", "red")
                  .attr("d", line(data));
                  

            }
            if ($("#elec_button").prop("checked")==true){
              svg.select("#elek")   // change the line
                  .duration(250)
                  .attr("d", valueline2(data))
                  .style("stroke", diagram_col);
            }

             
              svg.select("#gas")   // change the line
                  .duration(250)
                  .attr("d", gas_line(data))
                  .style("stroke", "green");
            
                
              svg.select(".x.axis") // change the x axis
                  .duration(250)
                  .call(xAxis);

              svg.select(".y.axis") // change the y axis
                  .duration(250)
                  .call(yAxisLeft);

              svg.select(".y.axis") // change the y axis
                  .duration(250)
                  .call(yAxisRight);

          });
  }