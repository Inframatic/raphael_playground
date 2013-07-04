Raphael.fn.connection = function (obj1, obj2, line, bg) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
        p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
        {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
        {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
        {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
        {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
        {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#000";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[9] || 10}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2
        };
    }
};

//create shapes and holders. Execution
var el;
window.onload = function () {
    var labels = ["shit", "fuck", "kurwa"],
        data = [];
            
    var dragger = function () {
        this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
        this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
        this.animate({"fill-opacity": .2}, 500);
    },
        move = function (dx, dy) {
            var att = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
            this.attr(att);
            for (var i = connections.length; i--;) {
                r.connection(connections[i]);
            }
            // r.safari();
        },
        up = function () {
            this.animate({"fill-opacity": .9}, 500);
        },
        r = Raphael("holder", 1000, 430),
        connections = [],
        shapes = [  r.ellipse(690, 300, 30, 20),
                    r.rect(590, 280, 60, 40, 10),
                    r.rect(490, 180, 60, 40, 2),
                    // r.circle(320, 240, 60).animate({fill: "#223fa3", stroke: "#000", "stroke-width": 80, "stroke-opacity": 0.5}, 2000),
                    r.ellipse(350, 300, 70, 70),
                    r.ellipse(250,250,100,150)
                ];
    for (var i = 0, ii = shapes.length; i < ii; i++) {
        var color = Raphael.getColor();
        shapes[i].attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 1, cursor: "move"});
        // shapes[i].drag(move, dragger, up); //undo this to prevent movement
    }

// STORAGE FOR CURRENT ABILITY FUNCTIONS (empty)
var projectile = {};
// projectile.p_ae = r.path(r.ellipse(690, 300, 30, 20));
var current = null;
for (var skill in projectile) { //state in aus
    projectile[skill].color = Raphael.getColor();
    (function (st, skill) {
        st[0].style.cursor = "pointer";
        st[0].onmouseover = function () {
            current && projectile[current].animate({fill: "#00065b", stroke: "#00065b"}, 500) && (document.getElementById(current).style.display = "");
            st.animate({fill: st.color, stroke: "#ccc"}, 500);
            st.toFront();
            r.safari();
            document.getElementById("p_ae").style.display = "block";
            current = skill;
        };
        st[0].onmouseover = function () {
            st.animate({fill: "#d031a6", stroke: "#d031a6"}, 500);
            st.toFront();
            r.safari();
        };
        if (skill == "primaryprojectile") {
            st[0].onmouseover();
        }
    })(projectile[skill], skill);
}
    circle = r.ellipse(590,230, 30, 20) //creates circle
    circle.attr({"stroke": "none",
            fill: "#fff"});
    

    hoverArea = r.circle(590,280, 30, 20) //creates area of hover
    hoverArea.attr({stroke: "none",
        fill: "#f00",
        "fill-opacity": .5});
    circle.hover(function () { //the actual hover function
        circle.attr({"stroke": "#fff",
        fill: "#228219"});
        $("#holder").append("<p>MouseOver</p>");
        },
        function () {
            circle.attr({"stroke": "none",
                fill: "#fff"});
            
        }
    );

    shapes[1].click(function () {
    this.cx = this.cx || 300;
    this.animate({cx: this.cx, "stroke-width": this.cx / 100, fill: this.cx - 100 ? "hsb(0, .75, .75)" : "#000", "fill-opacity": +!!(this.cx - 100)}, 1000);
    this.cx = this.cx == 300 ? 100 : 300;
    });
    connections.push(r.connection(shapes[0], shapes[1], "#5b5359", "#5b5359"));
    connections.push(r.connection(shapes[1], shapes[2], "#5b5359", "#5b5359"));
    connections.push(r.connection(shapes[1], shapes[3], "#5b5359", "#5b5359"));
    connections.push(r.connection(shapes[1], shapes[4], "#5b5359", "#5b5359"));
    shapes[1].click(function(event) {
    shapes[1].attr({fill: "blue"});

});
};

