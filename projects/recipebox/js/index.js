var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Draft = Draft,
    Editor = _Draft.Editor,
    EditorState = _Draft.EditorState,
    RichUtils = _Draft.RichUtils,
    ContentState = _Draft.ContentState;

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

function key(arr) {
  return new Date().getTime() + "";
}

function DraftJSToJSON(obj) {
  var a = _extends({}, obj);
  //console.log(a)
  if (_typeof(a.name) === "object") {
    a.name = a.name.getCurrentContent().getPlainText();
  }
  a.items = a.items.map(function (x) {
    return x.getCurrentContent().getPlainText();
  });
  a.collapsed = false;
  return a;
}

function toDraftJS(str) {
  return EditorState.createWithContent(ContentState.createFromText(str));
}

function JSONToDraft(obj) {
  var a = obj;
  a.name = toDraftJS(a.name);
  a.items = a.items.map(function (x) {
    return toDraftJS(x);
  });
  return a;
}

function createEmptyWithFocus() {
  //https://github.com/facebook/draft-js/issues/657
  var empty = EditorState.createEmpty();
  return EditorState.moveFocusToEnd(empty);
}

function getEmoji() {
  var a = [["🍇", "Grapes"], ["🍈", "Melon"], ["🍉", "Watermelon"], ["🍊", "Tangerine"], ["🍋", "Lemon"], ["🍌", "Banana"], ["🍍", "Pineapple"], ["🍎", "Red Apple"], ["🍏", "Green Apple"], ["🍐", "Pear"], ["🍑", "Peach"], ["🍒", "Cherries"], ["🍓", "Strawberry"], ["🥝", "Kiwi Fruit"], ["🍅", "Tomato"], ["🥥", "Coconut"], ["🥑", "Avocado"], ["🍆", "Eggplant"], ["🥔", "Potato"], ["🥕", "Carrot"], ["🌽", "Ear of Corn"], ["🌶", "Hot Pepper"], ["🥒", "Cucumber"], ["🥦", "Broccoli"], ["🍄", "Mushroom"], ["🥜", "Peanuts"], ["🌰", "Chestnut"], ["🍞", "Bread"], ["🥖", "Baguette"], ["🧀", "Cheese"], ["🍖", "Meat on Bone"], ["🍗", "Poultry Leg"], ["🥩", "Cut of Meat"], ["🥓", "Bacon"], ["🥫", "Canned Food"], ["🍤", "Shrimp"], ["🍫", "Chocolate Bar"], ["🍬", "Candy"], ["🍯", "Honey"], ["🥛", "Glass of Milk"]];

  return a[Math.floor(Math.random() * a.length)];
}

var Content = function (_React$Component) {
  _inherits(Content, _React$Component);

  function Content(props) {
    _classCallCheck(this, Content);

    var _this = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

    _this.determine = _this.determine.bind(_this);
    return _this;
  }

  _createClass(Content, [{
    key: "determine",
    value: function determine() {
      if (this.props.collapsed === true) {
        return "content";
      }

      return "content visible";
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: this.determine() },
        this.props.children
      );
    }
  }]);

  return Content;
}(React.Component);

var Item = function (_React$Component2) {
  _inherits(Item, _React$Component2);

  function Item(props) {
    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));
  }

  _createClass(Item, [{
    key: "sendData",
    value: function sendData(editorState) {
      this.props.changeHandler(editorState, this.props.id);
    }
  }, {
    key: "deleteItself",
    value: function deleteItself() {
      this.props.changeHandler("del", this.props.id);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "i" },
        React.createElement(Editor, {
          editorState: this.props.editorState,
          onChange: this.sendData.bind(this)
        }),
        React.createElement(
          "div",
          { className: "delItem", onClick: this.deleteItself.bind(this) },
          React.createElement("i", { className: "fa fa-times-circle", "aria-hidden": "true" })
        )
      );
    }
  }]);

  return Item;
}(React.Component);

var MyList = function (_React$Component3) {
  _inherits(MyList, _React$Component3);

  function MyList(props) {
    _classCallCheck(this, MyList);

    //console.log(this.props);
    var _this3 = _possibleConstructorReturn(this, (MyList.__proto__ || Object.getPrototypeOf(MyList)).call(this, props));

    _this3.state = {
      editorState: EditorState.createEmpty(),
      emoji: getEmoji()
    };
    _this3.onChange = _this3.onChange.bind(_this3);
    _this3.input = _this3.input.bind(_this3);
    _this3.handleReturn = _this3.handleReturn.bind(_this3);
    _this3.hide = _this3.hide.bind(_this3);
    _this3.deleteItself = _this3.deleteItself.bind(_this3);
    //onListChange
    return _this3;
  }

  _createClass(MyList, [{
    key: "changeHandler",
    value: function changeHandler(data, key) {
      this.props.PchangeHandler(data, this.props.id, key);
    }
  }, {
    key: "onChange",
    value: function onChange(data) {
      this.props.onListChange(data, this.props.id, "name");
    }
  }, {
    key: "input",
    value: function input(editorState) {
      this.setState({ editorState: editorState });
    }
  }, {
    key: "handleReturn",
    value: function handleReturn() {
      var editorState = this.state.editorState;

      var currentText = editorState.getCurrentContent().getPlainText().trim();
      if (currentText !== "") {
        var items = this.props.items;
        items.push(toDraftJS(currentText));
        //console.log(items)
        this.props.updateList(items, this.props.id);
        this.setState({ editorState: createEmptyWithFocus() });
      }
      return "handled";
    }
  }, {
    key: "hide",
    value: function hide() {
      //console.log(this.props.id + " collapsed");
      this.props.onListChange(!this.props.collapsed, this.props.id, "collapsed");
    }
  }, {
    key: "deleteItself",
    value: function deleteItself() {
      this.props.updateList("del", this.props.id);
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this4 = this;

      return React.createElement(
        "div",
        null,
        this.props.items.map(function (x, i) {
          return React.createElement(Item, {
            key: i,
            id: i,
            changeHandler: _this4.changeHandler.bind(_this4),
            editorState: x
          });
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      var emoji = this.state.emoji;

      var placeHolder = "E.g: " + emoji[1] + " " + emoji[0];

      return React.createElement(
        "div",
        { className: "list" },
        React.createElement(
          "div",
          { className: "listBar" },
          React.createElement(
            "div",
            { className: "delList", onClick: this.deleteItself },
            React.createElement("i", { className: "fa fa-times-circle", "aria-hidden": "true" })
          ),
          React.createElement(Editor, {
            editorState: this.props.editorState,
            onChange: this.onChange,
            placeholder: "Untitled"
          }),
          React.createElement(
            "div",
            { className: "collapse", onClick: this.hide },
            React.createElement("i", { className: "fa fa-sort", "aria-hidden": "true" })
          )
        ),
        React.createElement(
          Content,
          { collapsed: this.props.collapsed },
          this.renderItems(),
          React.createElement(
            "div",
            { className: "input" },
            React.createElement(Editor, {
              editorState: this.state.editorState,
              onChange: this.input,
              placeholder: placeHolder,
              handleReturn: this.handleReturn
            })
          )
        )
      );
    }
  }]);

  return MyList;
}(React.Component);

var Container = function (_React$Component4) {
  _inherits(Container, _React$Component4);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this5 = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this5.state = {
      lists: localStorage.getItem("local") === null ? [JSONToDraft({
        name: "Cake",
        items: ["milk", "sugar", "baking powder"],
        collapsed: false,
        key: key()
      })] : JSON.parse(localStorage.getItem("local")).map(function (x) {
        return JSONToDraft(x);
      })
    };
    _this5.PchangeHandler = _this5.PchangeHandler.bind(_this5);
    _this5.onListChange = _this5.onListChange.bind(_this5);
    _this5.addList = _this5.addList.bind(_this5);
    _this5.collapse = _this5.collapse.bind(_this5);
    _this5.updateList = _this5.updateList.bind(_this5);
    return _this5;
  }

  _createClass(Container, [{
    key: "PchangeHandler",
    value: function PchangeHandler(data, list, key) {
      var myList = this.state.lists;
      //console.log(data);
      if (data === "del") {
        myList[list].items[key] = "";
        myList[list].items = myList[list].items.filter(function (x) {
          return x !== "";
        });
      } else {
        myList[list].items[key] = data;
      }
      var local = myList.map(function (x) {
        return DraftJSToJSON(x);
      });
      //console.log(local)

      localStorage.setItem("local", JSON.stringify(local));
      this.setState({ lists: myList });
    }
  }, {
    key: "onListChange",
    value: function onListChange(editorState, id, prop) {
      var myList = this.state.lists;
      myList[id][prop] = editorState;
      //console.log(myList[id][prop]);
      var local = myList.map(function (x) {
        return DraftJSToJSON(x);
      });
      localStorage.setItem("local", JSON.stringify(local));
      this.setState({ lists: myList });
    }
  }, {
    key: "addList",
    value: function addList(event) {
      event.preventDefault();
      var myList = this.state.lists;
      myList.push({
        name: EditorState.createEmpty(),
        items: [],
        collapsed: false,
        key: key()
      });
      var local = myList.map(function (x) {
        return DraftJSToJSON(x);
      });
      localStorage.setItem("local", JSON.stringify(local));
      this.setState({ lists: myList });
    }
  }, {
    key: "updateList",
    value: function updateList(list, key) {
      var myList = this.state.lists;
      if (list === "del") {
        myList[key] = "";
        myList = myList.filter(function (x) {
          return x !== "";
        });
      } else {
        myList[key].items = list;
      }
      var local = myList.map(function (x) {
        return DraftJSToJSON(x);
      });
      localStorage.setItem("local", JSON.stringify(local));
      this.setState({ lists: myList });
    }
  }, {
    key: "collapse",
    value: function collapse() {
      var myList = this.state.lists;
      myList = myList.map(function (x) {
        var a = x;
        a.collapsed = true;
        return a;
      });
      this.setState({ lists: myList });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return React.createElement(
        "div",
        { id: "container" },
        React.createElement(
          "div",
          { id: "bar" },
          React.createElement(
            "div",
            { id: "appName" },
            "Recipe Box"
          ),
          React.createElement(
            "div",
            { id: "add", onClick: this.addList },
            "Add Recipe"
          ),
          React.createElement(
            "div",
            { id: "collapse", onClick: this.collapse },
            "Collapse All"
          )
        ),
        React.createElement(
          "div",
          { id: "list" },
          React.createElement(
            ReactCSSTransitionGroup,
            {
              transitionName: "example",
              transitionLeaveTimeout: 300,
              transitionEnterTimeout: 300
            },
            this.state.lists.map(function (x, i) {
              return React.createElement(MyList, {
                key: x.key,
                id: i,
                items: x.items,
                editorState: x.name,
                PchangeHandler: _this6.PchangeHandler,
                onListChange: _this6.onListChange,
                updateList: _this6.updateList,
                collapsed: x.collapsed
              });
            })
          )
        )
      );
    }
  }]);

  return Container;
}(React.Component);

ReactDOM.render(React.createElement(Container, null), document.getElementById("app"));