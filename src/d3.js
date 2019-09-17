import * as d3 from "d3/d3";

const options = {
    width: 600,
    height: 600
}
export default {
    draw(nodes, links, vue) {
        var svg = d3
            .select("#d3")
            .append("svg")
            .attr("width", options.width)
            .attr("height", options.height);

        var force = d3.layout
            .force()
            .nodes(d3.values(nodes))
            .links(links)
            .size([options.width, options.height])
            .linkDistance(90)
            .charge(-300)
            .on("tick", tick)
            .start();

        svg
            .append("defs")
            .selectAll("marker")
            .data(force.nodes())
            .enter()
            .append("marker")
            .attr("id", function (d) {
                return d.id;
            })
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", -1.5)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");

        var circle = svg
            .append("g")
            .selectAll("circle")
            .data(force.nodes())
            .enter()
            .append("circle")
            .attr("r", 20)
            .on("click", (d) => {
                vue.$emit('onCircleClick', d.id);
            })

        var path = svg
            .append("g")
            .selectAll("path")
            .data(force.links())
            .enter()
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("class", function (d) {
                return "link";
            })
            .attr("marker-end", function (d) {
                if (d.source.id != d.target.id) {
                    return "url(#" + d.target.id + ")";
                }
            });

        var text = svg
            .append("g")
            .selectAll("text")
            .data(force.nodes())
            .enter()
            .append("text")
            .attr("x", 8)
            .attr("y", ".31em")
            .text(function (d) {
                return d.name;
            });

        function tick() {
            path.attr("d", linkArc);
            circle.attr("transform", transform);
            text.attr("transform", transform);
        }

        function linkArc(d) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target
                .x + "," + d
                .target
                .y;
        }

        function transform(d) {
            return "translate(" + d.x + "," + d.y + ")";
        }
    }
}