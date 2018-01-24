var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _React = React,
    Component = _React.Component;


function genStatus() {
  return Math.random() > 0.3 ? 0 : 1;
}

function genBoard(xgrid, ygrid, callback) {
  //https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-an-array-based-on-suppl
  return [].concat(_toConsumableArray(Array(ygrid).keys())).map(function (x, i) {
    return [].concat(_toConsumableArray(Array(xgrid).keys())).map(function (x, j) {
      return callback(j, i);
    });
  });
}

function genBoard2(xgrid, ygrid) {
  //https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-an-array-based-on-suppl
  return [].concat(_toConsumableArray(Array(ygrid).keys())).map(function () {
    return [].concat(_toConsumableArray(Array(xgrid).keys()));
  });
}

function mod(n, m) {
  //https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
  return (n % m + m) % m;
}

function Row(props) {
  return React.createElement(
    "tr",
    { "class": "row" },
    props.children
  );
}

var Cell = function (_Component) {
  _inherits(Cell, _Component);

  function Cell(props) {
    _classCallCheck(this, Cell);

    return _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this, props));
  }

  _createClass(Cell, [{
    key: "determine",
    value: function determine() {
      this.props.update(this.props.x, this.props.y);
    }
  }, {
    key: "colorin",
    value: function colorin(n) {
      if (n === 0) {
        return "dead";
      } else if (n === 1) {
        return "new";
      }

      return "old";
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "td",
        null,
        React.createElement("div", {
          onDragEnter: this.determine.bind(this),
          onClick: this.determine.bind(this),
          className: this.colorin(this.props.state)
        })
      );
    }
  }]);

  return Cell;
}(Component);

var Container = function (_Component2) {
  _inherits(Container, _Component2);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this2 = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this2.state = {
      m: {
        xgrid: 70,
        ygrid: 50
      },
      board: [],
      pause: false,
      counter: 0,
      interval: function interval() {
        return null;
      },
      sizes: [{ xgrid: 50, ygrid: 30, class: "small" }, { xgrid: 70, ygrid: 50, class: "medium" }, { xgrid: 100, ygrid: 80, class: "big" }],
      speed: [{ n: "Slow", v: 190 }, { n: "Medium", v: 120 }, { n: "Fast", v: 50 }],
      boardsize: "medium",
      extraSettings: [2, 3, 3]
    };
    _this2.update = _this2.update.bind(_this2);
    _this2.process = _this2.process.bind(_this2);
    _this2.handleSelect = _this2.handleSelect.bind(_this2);
    return _this2;
  }

  _createClass(Container, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        m: this.state.m,
        board: genBoard(this.state.m.xgrid, this.state.m.ygrid, genStatus),
        pause: false
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var interval = setInterval(this.test.bind(this), this.state.speed[1].v);
      this.setState({ interval: interval });
    }
  }, {
    key: "test",
    value: function test() {
      if (this.state.pause !== true) {
        this.setState({
          m: this.state.m,
          board: this.process(this.state.board),
          pause: this.state.pause,
          counter: this.state.counter + 1
        });
      }
    }
  }, {
    key: "update",
    value: function update(x, y) {
      var _state = this.state,
          board = _state.board,
          pause = _state.pause,
          m = _state.m;

      if (board[y][x] === 0) {
        board[y][x] = 1;
      } else {
        board[y][x] = 0;
      }

      this.setState({
        m: m,
        board: board,
        pause: pause
      });
    }
  }, {
    key: "process",
    value: function process(arr) {
      var y = arr.length;
      var x = arr[0].length;
      var arr2 = genBoard2(x, y);

      for (var i = 0; i < y; i++) {
        for (var j = 0; j < x; j++) {
          var vi = [i, i + 1, i - 1].map(function (k) {
            return mod(k, y);
          });
          var vj = [j, j + 1, j - 1].map(function (k) {
            return mod(k, x);
          });

          var val = [arr[vi[0]][vj[1]], arr[vi[0]][vj[2]], arr[vi[1]][vj[0]], arr[vi[1]][vj[1]], arr[vi[1]][vj[2]], arr[vi[2]][vj[0]], arr[vi[2]][vj[1]], arr[vi[2]][vj[2]]].map(function (x) {
            return x === 2 ? 1 : x;
          }).reduce(function (x, y) {
            return x + y;
          });

          if (arr[i][j] === 0) {
            if (val === this.state.extraSettings[2]) {
              arr2[i][j] = 1;
            } else {
              arr2[i][j] = 0;
            }
          } else {
            if (val < this.state.extraSettings[0] || val > this.state.extraSettings[1]) {
              arr2[i][j] = 0;
            } else {
              arr2[i][j] = 2;
            }
          }
        }
      }

      return arr2;
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(n) {
      return function (e) {
        var s = this.state.extraSettings;
        s[n] = Number(e.target.value);
        this.setState({ extraSettings: s });
      }.bind(this);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _state2 = this.state,
          m = _state2.m,
          pause = _state2.pause,
          board = _state2.board,
          counter = _state2.counter,
          interval = _state2.interval,
          sizes = _state2.sizes,
          speed = _state2.speed;


      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { id: "top" },
          React.createElement(
            "div",
            { id: "title" },
            "John Conway's Game of Life"
          ),
          React.createElement(
            "div",
            { id: "bar" },
            React.createElement(
              "div",
              {
                className: "ctrl",
                onClick: function onClick() {
                  return _this3.setState({
                    pause: !pause
                  });
                }
              },
              pause ? "Play" : "Pause"
            ),
            React.createElement(
              "div",
              {
                className: "ctrl",
                onClick: function onClick() {
                  return _this3.setState({
                    board: _this3.process(board),
                    pause: true,
                    counter: counter + 1
                  });
                }
              },
              "Next"
            ),
            React.createElement(
              "div",
              {
                className: "ctrl",
                onClick: function onClick() {
                  return _this3.setState({
                    board: genBoard(m.xgrid, m.ygrid, function () {
                      return 0;
                    }),
                    pause: true,
                    counter: 0
                  });
                }
              },
              "Clear"
            ),
            React.createElement(
              "div",
              {
                className: "ctrl",
                onClick: function onClick() {
                  return _this3.setState({
                    board: genBoard(m.xgrid, m.ygrid, genStatus),
                    pause: true,
                    counter: 0
                  });
                }
              },
              "Reset"
            ),
            React.createElement(
              "div",
              { className: "option" },
              React.createElement(
                "div",
                null,
                "Speed"
              ),
              React.createElement(
                "div",
                { className: "list hidden" },
                speed.map(function (x) {
                  return React.createElement(
                    "div",
                    {
                      onClick: function () {
                        clearInterval(this.state.interval);
                        this.setState({
                          interval: setInterval(this.test.bind(this), x.v)
                        });
                      }.bind(_this3)
                    },
                    x.n
                  );
                })
              ),
              React.createElement("div", { className: "list hidden" })
            ),
            React.createElement(
              "div",
              { className: "option" },
              React.createElement(
                "div",
                null,
                "Board Size"
              ),
              React.createElement(
                "div",
                { className: "list hidden" },
                sizes.map(function (x) {
                  return React.createElement(
                    "div",
                    {
                      onClick: function onClick() {
                        return _this3.setState({
                          m: x,
                          board: genBoard(x.xgrid, x.ygrid, genStatus),
                          pause: true,
                          boardsize: x.class
                        });
                      }
                    },
                    x.xgrid + " x " + x.ygrid
                  );
                })
              )
            )
          ),
          React.createElement(
            "div",
            { id: "more" },
            React.createElement(
              "table",
              { className: this.state.boardsize },
              board.map(function (y, i) {
                return React.createElement(
                  Row,
                  null,
                  y.map(function (x, j) {
                    return React.createElement(Cell, { y: i, x: j, update: _this3.update, state: x });
                  })
                );
              })
            ),
            React.createElement(
              "div",
              { id: "l" },
              React.createElement(
                "div",
                null,
                "Generations:",
                " " + counter,
                " "
              )
            )
          )
        ),
        React.createElement(
          "div",
          { id: "about" },
          React.createElement(
            "h1",
            null,
            "According to",
            " ",
            React.createElement(
              "a",
              {
                href: "https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life",
                target: "_blank"
              },
              "Wikipedia"
            )
          ),
          React.createElement(
            "p",
            null,
            "The universe of the Game of Life is an infinite two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead, or \"populated\" or \"unpopulated\". Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "Any live cell with fewer than",
              " ",
              React.createElement(
                "select",
                {
                  value: this.state.extraSettings[0] + "",
                  onChange: this.handleSelect(0)
                },
                " ",
                [].concat(_toConsumableArray(Array(10).keys())).map(function (x) {
                  return React.createElement(
                    "option",
                    { value: x + "" },
                    x
                  );
                })
              ),
              " ",
              "live neighbours dies, as if caused by underpopulation."
            ),
            React.createElement(
              "li",
              null,
              "Any live cell with two or three live neighbours lives on to the next generation."
            ),
            React.createElement(
              "li",
              null,
              "Any live cell with more than",
              " ",
              React.createElement(
                "select",
                {
                  value: this.state.extraSettings[1] + "",
                  onChange: this.handleSelect(1)
                },
                " ",
                [].concat(_toConsumableArray(Array(10).keys())).map(function (x) {
                  return React.createElement(
                    "option",
                    { value: x + "" },
                    x
                  );
                })
              ),
              " ",
              "live neighbours dies, as if by overpopulation."
            ),
            React.createElement(
              "li",
              null,
              "Any dead cell with exactly",
              " ",
              React.createElement(
                "select",
                {
                  value: this.state.extraSettings[2] + "",
                  onChange: this.handleSelect(2)
                },
                " ",
                [].concat(_toConsumableArray(Array(10).keys())).map(function (x) {
                  return React.createElement(
                    "option",
                    { value: x + "" },
                    x
                  );
                })
              ),
              " ",
              "live neighbours becomes a live cell, as if by reproduction."
            )
          ),
          React.createElement(
            "h4",
            null,
            "Ptsss... you can play with the rules"
          )
        )
      );
    }
  }]);

  return Container;
}(Component);

ReactDOM.render(React.createElement(Container, null), document.getElementById("app"));