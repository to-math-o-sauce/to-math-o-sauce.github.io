var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// taken from https://www.w3schools.com/xml/tryit.asp?filename=tryxml_httprequest

function fetchData(obj, link, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(obj, this.responseText);
        }
    };
    xhttp.open("GET", link, true);
    xhttp.send();
}

function MyRow(props) {
    return React.createElement(
        'tr',
        { className: 'MyRow' },
        React.createElement(
            'td',
            { className: 'pos' },
            props.pos
        ),
        React.createElement(
            'td',
            { className: 'name' },
            React.createElement(
                'a',
                { href: 'https://www.freecodecamp.org/' + props.name },
                React.createElement('img', { src: props.pic }),
                React.createElement(
                    'div',
                    null,
                    props.name
                )
            )
        ),
        React.createElement(
            'td',
            { className: 'last' },
            props.last
        ),
        React.createElement(
            'td',
            { className: 'all' },
            props.all
        )
    );
}

function toArr(b, prop) {
    var c = b.slice(1, -1);
    if (typeof c === 'string') {
        return c.split(/,(?={)/).map(function (x) {
            return JSON.parse(x);
        }).sort(function (x, y) {
            return y[prop] - x[prop];
        });
    }
    return '';
}

var MyTable = function (_React$Component) {
    _inherits(MyTable, _React$Component);

    function MyTable(props) {
        _classCallCheck(this, MyTable);

        var _this = _possibleConstructorReturn(this, (MyTable.__proto__ || Object.getPrototypeOf(MyTable)).call(this, props));

        _this.state = {
            alltime: { data: '' },
            last100: { data: '' },
            stati: [true, false],
            show: 10,
            active: false,
            display: []
        };
        _this.showMore = _this.showMore.bind(_this);
        _this.past = _this.past.bind(_this);
        _this.all = _this.all.bind(_this);
        return _this;
    }

    _createClass(MyTable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            fetchData(this, 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime', function (obj, info) {
                obj.setState({ alltime: toArr(info, 'alltime') });
            });
            fetchData(this, 'https://fcctop100.herokuapp.com/api/fccusers/top/recent', function (obj, info) {
                obj.setState({ active: true, display: toArr(info, 'recent'), last100: toArr(info, 'recent') });
            });
        }
    }, {
        key: 'genRows',
        value: function genRows() {
            return this.state.display.slice(0, this.state.show).map(function (user, i) {
                return React.createElement(MyRow, { key: i, pos: i + 1, pic: user.img, name: user.username, last: user.recent, all: user.alltime });
            });
        }
    }, {
        key: 'showMore',
        value: function showMore() {
            console.log(this.state.show);
            if (this.state.show < 100 && this.state.active === true) {
                this.setState({ show: this.state.show + 10 });
            }
        }
    }, {
        key: 'past',
        value: function past() {
            this.setState({ display: this.state.last100, stati: [true, false] });
        }
    }, {
        key: 'all',
        value: function all() {
            this.setState({ display: this.state.alltime, stati: [false, true] });
        }
    }, {
        key: 'handleBg',
        value: function handleBg(i) {
            if (this.state.stati[i] === true) {
                return { backgroundColor: '#007E00' };
            } else {
                return { backgroundColor: '#006400' };
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { id: 'container' },
                React.createElement(
                    'div',
                    { id: 'title' },
                    'FreeCodeCamp leaderboard'
                ),
                React.createElement(
                    'table',
                    null,
                    React.createElement(
                        'tbody',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                '#'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Camper Name'
                            ),
                            React.createElement(
                                'th',
                                { id: 'past', onClick: this.past, style: this.handleBg(0) },
                                'Points in past 30 days'
                            ),
                            React.createElement(
                                'th',
                                { id: 'all', onClick: this.all, style: this.handleBg(1) },
                                'All time points'
                            )
                        ),
                        this.genRows()
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'showmore', onClick: function onClick() {
                            return _this2.showMore();
                        } },
                    'Show More'
                )
            );
        }
    }]);

    return MyTable;
}(React.Component);

ReactDOM.render(React.createElement(MyTable, null), document.getElementById('app'));