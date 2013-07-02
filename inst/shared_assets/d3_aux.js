// Generated by CoffeeScript 1.4.0
(function() {
  var my_light_red;

  my_light_red = "#b90000";

  this.append_main = function(opts) {
    var main, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
    if (opts == null) {
      opts = {};
    }
    if ((_ref = opts.element) == null) {
      opts.element = "svg:svg";
    }
    if ((_ref1 = opts.selector) == null) {
      opts.selector = "body";
    }
    if ((_ref2 = opts.background) == null) {
      opts.background = "#fff";
    }
    if ((_ref3 = opts.width) == null) {
      opts.width = 200;
    }
    if ((_ref4 = opts.height) == null) {
      opts.height = 200;
    }
    if ((_ref5 = opts.margin) == null) {
      opts.margin = 10;
    }
    main = d3.select(opts.selector).append(opts.element).attr({
      "width": opts.width,
      "height": opts.height
    }).style({
      'background': opts.background,
      'margin': opts.margin
    });
    if (opts.id) {
      main.attr("id", opts.id);
    }
    if (opts["class"]) {
      main.attr("class", opts["class"]);
    }
    main.width = opts.width;
    main.height = opts.height;
    main.svg = opts.selector;
    return main;
  };

  this.new_plot = function(opts) {
    var key, plot, value, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
    if (opts == null) {
      opts = {};
    }
    if ((_ref = opts.padding) == null) {
      opts.padding = {
        top: 20,
        right: 150,
        bottom: 30,
        left: 50
      };
    }
    opts.total_padding = d3.max([opts.padding.left + opts.padding.right, opts.padding.top + opts.padding.bottom]);
    if ((_ref1 = opts.width) == null) {
      opts.width = 400;
    }
    if ((_ref2 = opts.height) == null) {
      opts.height = 400;
    }
    opts.width = opts.width - opts.total_padding;
    opts.height = opts.height - opts.total_padding;
    if ((_ref3 = opts.background) == null) {
      opts.background = "#fff";
    }
    if ((_ref4 = opts.zoom) == null) {
      opts.zoom = true;
    }
    if ((_ref5 = opts.ordinal_scale_padding) == null) {
      opts.ordinal_scale_padding = 1;
    }
    if ((_ref6 = opts.linear_scale_padding) == null) {
      opts.linear_scale_padding = 40;
    }
    plot = append_main({
      id: opts.id,
      width: opts.width + opts.total_padding,
      height: opts.height + opts.total_padding,
      background: opts.background,
      margin: 20
    }).append("svg:g").attr("transform", "translate(" + opts.padding.left + "," + opts.padding.top + ")");
    for (key in opts) {
      value = opts[key];
      plot[key] = value;
    }
    plot.get_scale_types = function() {
      plot.scale_types = {};
      plot.scale_types.x = get_scale_type(plot, "x");
      return plot.scale_types.y = get_scale_type(plot, "y");
    };
    plot.get_scale_limits = function() {
      plot.scale_limits = {};
      plot.scale_limits.x = plot.xlim;
      return plot.scale_limits.y = plot.ylim;
    };
    plot.get_scale_domains = function() {
      plot.scale_domains = {};
      plot.scale_domains.x = get_scale_domain(plot, "x");
      return plot.scale_domains.y = get_scale_domain(plot, "y");
    };
    plot.get_scale_ranges = function() {
      plot.scale_ranges = {};
      plot.scale_ranges.x = [0, plot.width];
      return plot.scale_ranges.y = [plot.height, 0];
    };
    plot.get_scales = function() {
      plot.get_scale_types();
      plot.get_scale_limits();
      plot.get_scale_domains();
      plot.get_scale_ranges();
      plot.scales = {};
      plot.scales.x = get_scale(plot, "x");
      return plot.scales.y = get_scale(plot, "y");
    };
    plot.get_jitters = function() {
      plot.jitters = {};
      plot.jitters.x = get_jitter(plot, "x");
      return plot.jitters.y = get_jitter(plot, "y");
    };
    plot.add_title = function() {
      plot.append("text").text(plot.title).attr({
        "class": "title",
        "text-anchor": "middle",
        "x": plot.width / 2,
        "y": -plot.padding.top / 2
      });
      return plot;
    };
    plot.add_box = function() {
      plot.append("path").attr({
        "d": "M0,0L" + plot.width + ",0L" + plot.width + "," + plot.height
      }).style({
        "stroke": "black",
        "stroke-width": "2px",
        "shape-rendering": "crispEdges",
        "fill": "none"
      });
      return plot;
    };
    plot.add_axes = function() {
      plot.axes = {};
      plot.add_x_axis();
      plot.add_y_axis();
      return plot;
    };
    plot.add_x_axis = function() {
      var _ref7;
      if ((_ref7 = plot.orientation_x) == null) {
        plot.orientation_x = "bottom";
      }
      plot.axes.x = d3.svg.axis().scale(plot.scales.x).orient(plot.orientation_x);
      plot.append("g").attr("class", "x axis").attr("transform", "translate(0, " + plot.height + ")").call(plot.axes.x);
      plot.selectAll(".x.axis line, .x.axis path").style({
        "fill": "none",
        "stroke": "black",
        "shape-rendering": "crispEdges",
        "stroke-width": 2
      });
      plot.add_x_axis_label(plot.xlab);
      return plot;
    };
    plot.add_y_axis = function() {
      var _ref7;
      if ((_ref7 = plot.orientation_y) == null) {
        plot.orientation_y = "left";
      }
      plot.axes.y = d3.svg.axis().scale(plot.scales.y).orient(plot.orientation_y);
      plot.append("g").attr("class", "y axis").call(plot.axes.y);
      plot.selectAll(".y.axis line, .y.axis path").style({
        "fill": "none",
        "stroke": "black",
        "shape-rendering": "crispEdges",
        "stroke-width": 2
      });
      plot.add_y_axis_label(plot.ylab);
      return plot;
    };
    plot.add_x_axis_label = function(text) {
      plot.append("text").text(text).attr({
        "class": "x label",
        "text-anchor": "middle",
        "x": plot.width - plot.width / 2,
        "y": plot.height + plot.padding.bottom / 2,
        "dy": "2em"
      });
      return plot;
    };
    plot.add_y_axis_label = function(text) {
      plot.append("text").text(text).attr({
        "class": "y label",
        "text-anchor": "middle",
        "x": 0 - (plot.height / 2),
        "y": -plot.padding.left + 5,
        "dy": "1em",
        "transform": "rotate(-90)"
      });
      return plot;
    };
    if (plot.box === true) {
      plot.add_box();
    }
    plot.add_title();
    plot.get_scales();
    if (plot.scale_types.x === "ordinal" || plot.scale_types.y === "ordinal") {
      plot.zoom = false;
    }
    plot.get_jitters();
    plot.add_axes();
    return plot;
  };

  this.get_scale_type = function(plot, scale_name) {
    var scale_type;
    if (type(plot.data_ranges[scale_name][0]) === "number") {
      scale_type = "linear";
    } else {
      scale_type = "ordinal";
    }
    return scale_type;
  };

  this.get_scale_domain = function(plot, scale_name) {
    var domain;
    if (plot.scale_types[scale_name] === "linear") {
      if (plot.scale_limits[scale_name] != null) {
        domain = plot.scale_limits[scale_name];
      } else {
        domain = plot.data_ranges[scale_name];
      }
    } else {
      domain = plot.categorical_domains[scale_name];
    }
    return domain;
  };

  this.get_scale = function(plot, scale_name) {
    var scale;
    if (plot.scale_types[scale_name] === "linear") {
      scale = d3.scale.linear().domain(plot.scale_domains[scale_name]).range(plot.scale_ranges[scale_name]);
      scale = add_scale_padding(scale, plot.linear_scale_padding);
    } else {
      scale = d3.scale.ordinal().domain(plot.scale_domains[scale_name]).rangePoints(plot.scale_ranges[scale_name], plot.ordinal_scale_padding);
    }
    return scale;
  };

  this.get_jitter = function(plot, scale_name) {
    var band_width, jitter;
    if (plot.scale_types[scale_name] === "ordinal") {
      band_width = d3.extent(plot.scale_ranges[scale_name])[1] / plot.scales[scale_name].domain().length;
      jitter = function() {
        return band_width * plot.jitter * random();
      };
    } else {
      jitter = function() {
        return 0;
      };
    }
    return jitter;
  };

  this.add_scale_padding = function(scale, padding) {
    var domain_with_padding, range;
    range = scale.range();
    if (range[0] > range[1]) {
      padding *= -1;
    }
    domain_with_padding = [range[0] - padding, range[1] + padding].map(scale.invert);
    scale.domain(domain_with_padding);
    return scale;
  };

  this.random = function() {
    return (Math.random() * 2) - 1;
  };

  this.parent_of = function(child) {
    return d3.select(child).node().parentNode;
  };

  this.format_property = function(x) {
    var decimal_format;
    decimal_format = d3.format(".2f");
    if (type(x) === "number" && x % 1 !== 0) {
      return decimal_format(x);
    } else {
      return x;
    }
  };

  this.type = function(obj) {
    var classToType, myClass, name, _i, _len, _ref;
    if (obj === void 0 || obj === null) {
      return String(obj);
    }
    classToType = new Object;
    _ref = "Boolean Number String Function Array Date RegExp".split(" ");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      classToType["[object " + name + "]"] = name.toLowerCase();
    }
    myClass = Object.prototype.toString.call(obj);
    if (myClass in classToType) {
      return classToType[myClass];
    }
    return "object";
  };

  this.append_container = function(opts) {
    var container, _ref, _ref1;
    if (opts == null) {
      opts = {};
    }
    if ((_ref = opts.selector) == null) {
      opts.selector = "body";
    }
    if ((_ref1 = opts["class"]) == null) {
      opts["class"] = "container";
    }
    container = d3.select(opts.selector).append('div').attr("class", opts["class"]).style("overflow", "hidden");
    return container;
  };

  this.append_div = function(container, opts) {
    var div, _ref, _ref1;
    if (opts == null) {
      opts = {};
    }
    if ((_ref = opts.background) == null) {
      opts.background = my_light_red;
    }
    if ((_ref1 = opts.margin) == null) {
      opts.margin = 10;
    }
    div = d3.select(container.node()).append('div').style('background', opts.background).style('margin', opts.margin).style("float", "left");
    if (opts.id) {
      div.attr("id", opts.id);
    }
    if (opts["class"]) {
      div.attr("class", opts["class"]);
    }
    return div;
  };

}).call(this);
