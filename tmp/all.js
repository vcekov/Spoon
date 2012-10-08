// lib/handlebars/base.js

/*jshint eqnull:true*/
this.Handlebars = {};

(function(Handlebars) {

Handlebars.VERSION = "1.0.rc.1";

Handlebars.helpers  = {};
Handlebars.partials = {};

Handlebars.registerHelper = function(name, fn, inverse) {
  if(inverse) { fn.not = inverse; }
  this.helpers[name] = fn;
};

Handlebars.registerPartial = function(name, str) {
  this.partials[name] = str;
};

Handlebars.registerHelper('helperMissing', function(arg) {
  if(arguments.length === 2) {
    return undefined;
  } else {
    throw new Error("Could not find property '" + arg + "'");
  }
});

var toString = Object.prototype.toString, functionType = "[object Function]";

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  var inverse = options.inverse || function() {}, fn = options.fn;


  var ret = "";
  var type = toString.call(context);

  if(type === functionType) { context = context.call(this); }

  if(context === true) {
    return fn(this);
  } else if(context === false || context == null) {
    return inverse(this);
  } else if(type === "[object Array]") {
    if(context.length > 0) {
      return Handlebars.helpers.each(context, options);
    } else {
      return inverse(this);
    }
  } else {
    return fn(context);
  }
});

Handlebars.K = function() {};

Handlebars.createFrame = Object.create || function(object) {
  Handlebars.K.prototype = object;
  var obj = new Handlebars.K();
  Handlebars.K.prototype = null;
  return obj;
};

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "", data;

  if (options.data) {
    data = Handlebars.createFrame(options.data);
  }

  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      if (data) { data.index = i; }
      ret = ret + fn(context[i], { data: data });
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});

Handlebars.registerHelper('if', function(context, options) {
  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if(!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('unless', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  options.fn = inverse;
  options.inverse = fn;

  return Handlebars.helpers['if'].call(this, context, options);
});

Handlebars.registerHelper('with', function(context, options) {
  return options.fn(context);
});

Handlebars.registerHelper('log', function(context) {
  Handlebars.log(context);
});

}(this.Handlebars));
;
// lib/handlebars/compiler/parser.js
/* Jison generated parser */
var handlebars = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"program":4,"EOF":5,"statements":6,"simpleInverse":7,"statement":8,"openInverse":9,"closeBlock":10,"openBlock":11,"mustache":12,"partial":13,"CONTENT":14,"COMMENT":15,"OPEN_BLOCK":16,"inMustache":17,"CLOSE":18,"OPEN_INVERSE":19,"OPEN_ENDBLOCK":20,"path":21,"OPEN":22,"OPEN_UNESCAPED":23,"OPEN_PARTIAL":24,"params":25,"hash":26,"DATA":27,"param":28,"STRING":29,"INTEGER":30,"BOOLEAN":31,"hashSegments":32,"hashSegment":33,"ID":34,"EQUALS":35,"pathSegments":36,"SEP":37,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"OPEN_PARTIAL",27:"DATA",29:"STRING",30:"INTEGER",31:"BOOLEAN",34:"ID",35:"EQUALS",37:"SEP"},
productions_: [0,[3,2],[4,3],[4,1],[4,0],[6,1],[6,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,3],[13,4],[7,2],[17,3],[17,2],[17,2],[17,1],[17,1],[25,2],[25,1],[28,1],[28,1],[28,1],[28,1],[28,1],[26,1],[32,2],[32,1],[33,3],[33,3],[33,3],[33,3],[33,3],[21,1],[36,3],[36,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2: this.$ = new yy.ProgramNode($$[$0-2], $$[$0]); 
break;
case 3: this.$ = new yy.ProgramNode($$[$0]); 
break;
case 4: this.$ = new yy.ProgramNode([]); 
break;
case 5: this.$ = [$$[$0]]; 
break;
case 6: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 7: this.$ = new yy.BlockNode($$[$0-2], $$[$0-1].inverse, $$[$0-1], $$[$0]); 
break;
case 8: this.$ = new yy.BlockNode($$[$0-2], $$[$0-1], $$[$0-1].inverse, $$[$0]); 
break;
case 9: this.$ = $$[$0]; 
break;
case 10: this.$ = $$[$0]; 
break;
case 11: this.$ = new yy.ContentNode($$[$0]); 
break;
case 12: this.$ = new yy.CommentNode($$[$0]); 
break;
case 13: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1]); 
break;
case 14: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1]); 
break;
case 15: this.$ = $$[$0-1]; 
break;
case 16: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1]); 
break;
case 17: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], true); 
break;
case 18: this.$ = new yy.PartialNode($$[$0-1]); 
break;
case 19: this.$ = new yy.PartialNode($$[$0-2], $$[$0-1]); 
break;
case 20: 
break;
case 21: this.$ = [[$$[$0-2]].concat($$[$0-1]), $$[$0]]; 
break;
case 22: this.$ = [[$$[$0-1]].concat($$[$0]), null]; 
break;
case 23: this.$ = [[$$[$0-1]], $$[$0]]; 
break;
case 24: this.$ = [[$$[$0]], null]; 
break;
case 25: this.$ = [[new yy.DataNode($$[$0])], null]; 
break;
case 26: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 27: this.$ = [$$[$0]]; 
break;
case 28: this.$ = $$[$0]; 
break;
case 29: this.$ = new yy.StringNode($$[$0]); 
break;
case 30: this.$ = new yy.IntegerNode($$[$0]); 
break;
case 31: this.$ = new yy.BooleanNode($$[$0]); 
break;
case 32: this.$ = new yy.DataNode($$[$0]); 
break;
case 33: this.$ = new yy.HashNode($$[$0]); 
break;
case 34: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 35: this.$ = [$$[$0]]; 
break;
case 36: this.$ = [$$[$0-2], $$[$0]]; 
break;
case 37: this.$ = [$$[$0-2], new yy.StringNode($$[$0])]; 
break;
case 38: this.$ = [$$[$0-2], new yy.IntegerNode($$[$0])]; 
break;
case 39: this.$ = [$$[$0-2], new yy.BooleanNode($$[$0])]; 
break;
case 40: this.$ = [$$[$0-2], new yy.DataNode($$[$0])]; 
break;
case 41: this.$ = new yy.IdNode($$[$0]); 
break;
case 42: $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 43: this.$ = [$$[$0]]; 
break;
}
},
table: [{3:1,4:2,5:[2,4],6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],24:[1,15]},{1:[3]},{5:[1,16]},{5:[2,3],7:17,8:18,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,19],20:[2,3],22:[1,13],23:[1,14],24:[1,15]},{5:[2,5],14:[2,5],15:[2,5],16:[2,5],19:[2,5],20:[2,5],22:[2,5],23:[2,5],24:[2,5]},{4:20,6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],24:[1,15]},{4:21,6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],24:[1,15]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],24:[2,9]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],24:[2,10]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],24:[2,11]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],24:[2,12]},{17:22,21:23,27:[1,24],34:[1,26],36:25},{17:27,21:23,27:[1,24],34:[1,26],36:25},{17:28,21:23,27:[1,24],34:[1,26],36:25},{17:29,21:23,27:[1,24],34:[1,26],36:25},{21:30,34:[1,26],36:25},{1:[2,1]},{6:31,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],24:[1,15]},{5:[2,6],14:[2,6],15:[2,6],16:[2,6],19:[2,6],20:[2,6],22:[2,6],23:[2,6],24:[2,6]},{17:22,18:[1,32],21:23,27:[1,24],34:[1,26],36:25},{10:33,20:[1,34]},{10:35,20:[1,34]},{18:[1,36]},{18:[2,24],21:41,25:37,26:38,27:[1,45],28:39,29:[1,42],30:[1,43],31:[1,44],32:40,33:46,34:[1,47],36:25},{18:[2,25]},{18:[2,41],27:[2,41],29:[2,41],30:[2,41],31:[2,41],34:[2,41],37:[1,48]},{18:[2,43],27:[2,43],29:[2,43],30:[2,43],31:[2,43],34:[2,43],37:[2,43]},{18:[1,49]},{18:[1,50]},{18:[1,51]},{18:[1,52],21:53,34:[1,26],36:25},{5:[2,2],8:18,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,2],22:[1,13],23:[1,14],24:[1,15]},{14:[2,20],15:[2,20],16:[2,20],19:[2,20],22:[2,20],23:[2,20],24:[2,20]},{5:[2,7],14:[2,7],15:[2,7],16:[2,7],19:[2,7],20:[2,7],22:[2,7],23:[2,7],24:[2,7]},{21:54,34:[1,26],36:25},{5:[2,8],14:[2,8],15:[2,8],16:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],24:[2,8]},{14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],24:[2,14]},{18:[2,22],21:41,26:55,27:[1,45],28:56,29:[1,42],30:[1,43],31:[1,44],32:40,33:46,34:[1,47],36:25},{18:[2,23]},{18:[2,27],27:[2,27],29:[2,27],30:[2,27],31:[2,27],34:[2,27]},{18:[2,33],33:57,34:[1,58]},{18:[2,28],27:[2,28],29:[2,28],30:[2,28],31:[2,28],34:[2,28]},{18:[2,29],27:[2,29],29:[2,29],30:[2,29],31:[2,29],34:[2,29]},{18:[2,30],27:[2,30],29:[2,30],30:[2,30],31:[2,30],34:[2,30]},{18:[2,31],27:[2,31],29:[2,31],30:[2,31],31:[2,31],34:[2,31]},{18:[2,32],27:[2,32],29:[2,32],30:[2,32],31:[2,32],34:[2,32]},{18:[2,35],34:[2,35]},{18:[2,43],27:[2,43],29:[2,43],30:[2,43],31:[2,43],34:[2,43],35:[1,59],37:[2,43]},{34:[1,60]},{14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],24:[2,13]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],24:[2,16]},{5:[2,17],14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],24:[2,17]},{5:[2,18],14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],24:[2,18]},{18:[1,61]},{18:[1,62]},{18:[2,21]},{18:[2,26],27:[2,26],29:[2,26],30:[2,26],31:[2,26],34:[2,26]},{18:[2,34],34:[2,34]},{35:[1,59]},{21:63,27:[1,67],29:[1,64],30:[1,65],31:[1,66],34:[1,26],36:25},{18:[2,42],27:[2,42],29:[2,42],30:[2,42],31:[2,42],34:[2,42],37:[2,42]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],24:[2,19]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],24:[2,15]},{18:[2,36],34:[2,36]},{18:[2,37],34:[2,37]},{18:[2,38],34:[2,38]},{18:[2,39],34:[2,39]},{18:[2,40],34:[2,40]}],
defaultActions: {16:[2,1],24:[2,25],38:[2,23],55:[2,21]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:
                                   if(yy_.yytext.slice(-1) !== "\\") this.begin("mu");
                                   if(yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0,yy_.yyleng-1), this.begin("emu");
                                   if(yy_.yytext) return 14;
                                 
break;
case 1: return 14; 
break;
case 2:
                                   if(yy_.yytext.slice(-1) !== "\\") this.popState();
                                   if(yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0,yy_.yyleng-1);
                                   return 14;
                                 
break;
case 3: return 24; 
break;
case 4: return 16; 
break;
case 5: return 20; 
break;
case 6: return 19; 
break;
case 7: return 19; 
break;
case 8: return 23; 
break;
case 9: return 23; 
break;
case 10: yy_.yytext = yy_.yytext.substr(3,yy_.yyleng-5); this.popState(); return 15; 
break;
case 11: return 22; 
break;
case 12: return 35; 
break;
case 13: return 34; 
break;
case 14: return 34; 
break;
case 15: return 37; 
break;
case 16: /*ignore whitespace*/ 
break;
case 17: this.popState(); return 18; 
break;
case 18: this.popState(); return 18; 
break;
case 19: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\"/g,'"'); return 29; 
break;
case 20: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\"/g,'"'); return 29; 
break;
case 21: yy_.yytext = yy_.yytext.substr(1); return 27; 
break;
case 22: return 31; 
break;
case 23: return 31; 
break;
case 24: return 30; 
break;
case 25: return 34; 
break;
case 26: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2); return 34; 
break;
case 27: return 'INVALID'; 
break;
case 28: return 5; 
break;
}
};
lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|$)))/,/^(?:\{\{>)/,/^(?:\{\{#)/,/^(?:\{\{\/)/,/^(?:\{\{\^)/,/^(?:\{\{\s*else\b)/,/^(?:\{\{\{)/,/^(?:\{\{&)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{)/,/^(?:=)/,/^(?:\.(?=[} ]))/,/^(?:\.\.)/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}\}\})/,/^(?:\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@[a-zA-Z]+)/,/^(?:true(?=[}\s]))/,/^(?:false(?=[}\s]))/,/^(?:[0-9]+(?=[}\s]))/,/^(?:[a-zA-Z0-9_$-]+(?=[=}\s\/.]))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
lexer.conditions = {"mu":{"rules":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],"inclusive":false},"emu":{"rules":[2],"inclusive":false},"INITIAL":{"rules":[0,1,28],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = handlebars;
exports.Parser = handlebars.Parser;
exports.parse = function () { return handlebars.parse.apply(handlebars, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    var source, cwd;
    if (typeof process !== 'undefined') {
        source = require('fs').readFileSync(require('path').resolve(args[1]), "utf8");
    } else {
        source = require("file").path(require("file").cwd()).join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
};
;
// lib/handlebars/compiler/base.js
Handlebars.Parser = handlebars;

Handlebars.parse = function(string) {
  Handlebars.Parser.yy = Handlebars.AST;
  return Handlebars.Parser.parse(string);
};

Handlebars.print = function(ast) {
  return new Handlebars.PrintVisitor().accept(ast);
};

Handlebars.logger = {
  DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3,

  // override in the host environment
  log: function(level, str) {}
};

Handlebars.log = function(level, str) { Handlebars.logger.log(level, str); };
;
// lib/handlebars/compiler/ast.js
(function() {

  Handlebars.AST = {};

  Handlebars.AST.ProgramNode = function(statements, inverse) {
    this.type = "program";
    this.statements = statements;
    if(inverse) { this.inverse = new Handlebars.AST.ProgramNode(inverse); }
  };

  Handlebars.AST.MustacheNode = function(rawParams, hash, unescaped) {
    this.type = "mustache";
    this.escaped = !unescaped;
    this.hash = hash;

    var id = this.id = rawParams[0];
    var params = this.params = rawParams.slice(1);

    // a mustache is an eligible helper if:
    // * its id is simple (a single part, not `this` or `..`)
    var eligibleHelper = this.eligibleHelper = id.isSimple;

    // a mustache is definitely a helper if:
    // * it is an eligible helper, and
    // * it has at least one parameter or hash segment
    this.isHelper = eligibleHelper && (params.length || hash);

    // if a mustache is an eligible helper but not a definite
    // helper, it is ambiguous, and will be resolved in a later
    // pass or at runtime.
  };

  Handlebars.AST.PartialNode = function(id, context) {
    this.type    = "partial";

    // TODO: disallow complex IDs

    this.id      = id;
    this.context = context;
  };

  var verifyMatch = function(open, close) {
    if(open.original !== close.original) {
      throw new Handlebars.Exception(open.original + " doesn't match " + close.original);
    }
  };

  Handlebars.AST.BlockNode = function(mustache, program, inverse, close) {
    verifyMatch(mustache.id, close);
    this.type = "block";
    this.mustache = mustache;
    this.program  = program;
    this.inverse  = inverse;

    if (this.inverse && !this.program) {
      this.isInverse = true;
    }
  };

  Handlebars.AST.ContentNode = function(string) {
    this.type = "content";
    this.string = string;
  };

  Handlebars.AST.HashNode = function(pairs) {
    this.type = "hash";
    this.pairs = pairs;
  };

  Handlebars.AST.IdNode = function(parts) {
    this.type = "ID";
    this.original = parts.join(".");

    var dig = [], depth = 0;

    for(var i=0,l=parts.length; i<l; i++) {
      var part = parts[i];

      if(part === "..") { depth++; }
      else if(part === "." || part === "this") { this.isScoped = true; }
      else { dig.push(part); }
    }

    this.parts    = dig;
    this.string   = dig.join('.');
    this.depth    = depth;

    // an ID is simple if it only has one part, and that part is not
    // `..` or `this`.
    this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;
  };

  Handlebars.AST.DataNode = function(id) {
    this.type = "DATA";
    this.id = id;
  };

  Handlebars.AST.StringNode = function(string) {
    this.type = "STRING";
    this.string = string;
  };

  Handlebars.AST.IntegerNode = function(integer) {
    this.type = "INTEGER";
    this.integer = integer;
  };

  Handlebars.AST.BooleanNode = function(bool) {
    this.type = "BOOLEAN";
    this.bool = bool;
  };

  Handlebars.AST.CommentNode = function(comment) {
    this.type = "comment";
    this.comment = comment;
  };

})();;
// lib/handlebars/utils.js
Handlebars.Exception = function(message) {
  var tmp = Error.prototype.constructor.apply(this, arguments);

  for (var p in tmp) {
    if (tmp.hasOwnProperty(p)) { this[p] = tmp[p]; }
  }

  this.message = tmp.message;
};
Handlebars.Exception.prototype = new Error();

// Build out our basic SafeString type
Handlebars.SafeString = function(string) {
  this.string = string;
};
Handlebars.SafeString.prototype.toString = function() {
  return this.string.toString();
};

(function() {
  var escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /[&<>"'`]/g;
  var possible = /[&<>"'`]/;

  var escapeChar = function(chr) {
    return escape[chr] || "&amp;";
  };

  Handlebars.Utils = {
    escapeExpression: function(string) {
      // don't escape SafeStrings, since they're already safe
      if (string instanceof Handlebars.SafeString) {
        return string.toString();
      } else if (string == null || string === false) {
        return "";
      }

      if(!possible.test(string)) { return string; }
      return string.replace(badChars, escapeChar);
    },

    isEmpty: function(value) {
      if (typeof value === "undefined") {
        return true;
      } else if (value === null) {
        return true;
      } else if (value === false) {
        return true;
      } else if(Object.prototype.toString.call(value) === "[object Array]" && value.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  };
})();;
// lib/handlebars/compiler/compiler.js

/*jshint eqnull:true*/
Handlebars.Compiler = function() {};
Handlebars.JavaScriptCompiler = function() {};

(function(Compiler, JavaScriptCompiler) {
  // the foundHelper register will disambiguate helper lookup from finding a
  // function in a context. This is necessary for mustache compatibility, which
  // requires that context functions in blocks are evaluated by blockHelperMissing,
  // and then proceed as if the resulting value was provided to blockHelperMissing.

  Compiler.prototype = {
    compiler: Compiler,

    disassemble: function() {
      var opcodes = this.opcodes, opcode, out = [], params, param;

      for (var i=0, l=opcodes.length; i<l; i++) {
        opcode = opcodes[i];

        if (opcode.opcode === 'DECLARE') {
          out.push("DECLARE " + opcode.name + "=" + opcode.value);
        } else {
          params = [];
          for (var j=0; j<opcode.args.length; j++) {
            param = opcode.args[j];
            if (typeof param === "string") {
              param = "\"" + param.replace("\n", "\\n") + "\"";
            }
            params.push(param);
          }
          out.push(opcode.opcode + " " + params.join(" "));
        }
      }

      return out.join("\n");
    },

    guid: 0,

    compile: function(program, options) {
      this.children = [];
      this.depths = {list: []};
      this.options = options;

      // These changes will propagate to the other compiler components
      var knownHelpers = this.options.knownHelpers;
      this.options.knownHelpers = {
        'helperMissing': true,
        'blockHelperMissing': true,
        'each': true,
        'if': true,
        'unless': true,
        'with': true,
        'log': true
      };
      if (knownHelpers) {
        for (var name in knownHelpers) {
          this.options.knownHelpers[name] = knownHelpers[name];
        }
      }

      return this.program(program);
    },

    accept: function(node) {
      return this[node.type](node);
    },

    program: function(program) {
      var statements = program.statements, statement;
      this.opcodes = [];

      for(var i=0, l=statements.length; i<l; i++) {
        statement = statements[i];
        this[statement.type](statement);
      }
      this.isSimple = l === 1;

      this.depths.list = this.depths.list.sort(function(a, b) {
        return a - b;
      });

      return this;
    },

    compileProgram: function(program) {
      var result = new this.compiler().compile(program, this.options);
      var guid = this.guid++, depth;

      this.usePartial = this.usePartial || result.usePartial;

      this.children[guid] = result;

      for(var i=0, l=result.depths.list.length; i<l; i++) {
        depth = result.depths.list[i];

        if(depth < 2) { continue; }
        else { this.addDepth(depth - 1); }
      }

      return guid;
    },

    block: function(block) {
      var mustache = block.mustache,
          program = block.program,
          inverse = block.inverse;

      if (program) {
        program = this.compileProgram(program);
      }

      if (inverse) {
        inverse = this.compileProgram(inverse);
      }

      var type = this.classifyMustache(mustache);

      if (type === "helper") {
        this.helperMustache(mustache, program, inverse);
      } else if (type === "simple") {
        this.simpleMustache(mustache);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('pushLiteral', '{}');
        this.opcode('blockValue');
      } else {
        this.ambiguousMustache(mustache, program, inverse);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('pushLiteral', '{}');
        this.opcode('ambiguousBlockValue');
      }

      this.opcode('append');
    },

    hash: function(hash) {
      var pairs = hash.pairs, pair, val;

      this.opcode('push', '{}');

      for(var i=0, l=pairs.length; i<l; i++) {
        pair = pairs[i];
        val  = pair[1];

        this.accept(val);
        this.opcode('assignToHash', pair[0]);
      }
    },

    partial: function(partial) {
      var id = partial.id;
      this.usePartial = true;

      if(partial.context) {
        this.ID(partial.context);
      } else {
        this.opcode('push', 'depth0');
      }

      this.opcode('invokePartial', id.original);
      this.opcode('append');
    },

    content: function(content) {
      this.opcode('appendContent', content.string);
    },

    mustache: function(mustache) {
      var options = this.options;
      var type = this.classifyMustache(mustache);

      if (type === "simple") {
        this.simpleMustache(mustache);
      } else if (type === "helper") {
        this.helperMustache(mustache);
      } else {
        this.ambiguousMustache(mustache);
      }

      if(mustache.escaped && !options.noEscape) {
        this.opcode('appendEscaped');
      } else {
        this.opcode('append');
      }
    },

    ambiguousMustache: function(mustache, program, inverse) {
      var id = mustache.id, name = id.parts[0];

      this.opcode('getContext', id.depth);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      this.opcode('invokeAmbiguous', name);
    },

    simpleMustache: function(mustache, program, inverse) {
      var id = mustache.id;

      if (id.type === 'DATA') {
        this.DATA(id);
      } else if (id.parts.length) {
        this.ID(id);
      } else {
        // Simplified ID for `this`
        this.addDepth(id.depth);
        this.opcode('getContext', id.depth);
        this.opcode('pushContext');
      }

      this.opcode('resolvePossibleLambda');
    },

    helperMustache: function(mustache, program, inverse) {
      var params = this.setupFullMustacheParams(mustache, program, inverse),
          name = mustache.id.parts[0];

      if (this.options.knownHelpers[name]) {
        this.opcode('invokeKnownHelper', params.length, name);
      } else if (this.knownHelpersOnly) {
        throw new Error("You specified knownHelpersOnly, but used the unknown helper " + name);
      } else {
        this.opcode('invokeHelper', params.length, name);
      }
    },

    ID: function(id) {
      this.addDepth(id.depth);
      this.opcode('getContext', id.depth);

      var name = id.parts[0];
      if (!name) {
        this.opcode('pushContext');
      } else {
        this.opcode('lookupOnContext', id.parts[0]);
      }

      for(var i=1, l=id.parts.length; i<l; i++) {
        this.opcode('lookup', id.parts[i]);
      }
    },

    DATA: function(data) {
      this.options.data = true;
      this.opcode('lookupData', data.id);
    },

    STRING: function(string) {
      this.opcode('pushString', string.string);
    },

    INTEGER: function(integer) {
      this.opcode('pushLiteral', integer.integer);
    },

    BOOLEAN: function(bool) {
      this.opcode('pushLiteral', bool.bool);
    },

    comment: function() {},

    // HELPERS
    opcode: function(name) {
      this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
    },

    declare: function(name, value) {
      this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
    },

    addDepth: function(depth) {
      if(isNaN(depth)) { throw new Error("EWOT"); }
      if(depth === 0) { return; }

      if(!this.depths[depth]) {
        this.depths[depth] = true;
        this.depths.list.push(depth);
      }
    },

    classifyMustache: function(mustache) {
      var isHelper   = mustache.isHelper;
      var isEligible = mustache.eligibleHelper;
      var options    = this.options;

      // if ambiguous, we can possibly resolve the ambiguity now
      if (isEligible && !isHelper) {
        var name = mustache.id.parts[0];

        if (options.knownHelpers[name]) {
          isHelper = true;
        } else if (options.knownHelpersOnly) {
          isEligible = false;
        }
      }

      if (isHelper) { return "helper"; }
      else if (isEligible) { return "ambiguous"; }
      else { return "simple"; }
    },

    pushParams: function(params) {
      var i = params.length, param;

      while(i--) {
        param = params[i];

        if(this.options.stringParams) {
          if(param.depth) {
            this.addDepth(param.depth);
          }

          this.opcode('getContext', param.depth || 0);
          this.opcode('pushStringParam', param.string);
        } else {
          this[param.type](param);
        }
      }
    },

    setupMustacheParams: function(mustache) {
      var params = mustache.params;
      this.pushParams(params);

      if(mustache.hash) {
        this.hash(mustache.hash);
      } else {
        this.opcode('pushLiteral', '{}');
      }

      return params;
    },

    // this will replace setupMustacheParams when we're done
    setupFullMustacheParams: function(mustache, program, inverse) {
      var params = mustache.params;
      this.pushParams(params);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      if(mustache.hash) {
        this.hash(mustache.hash);
      } else {
        this.opcode('pushLiteral', '{}');
      }

      return params;
    }
  };

  var Literal = function(value) {
    this.value = value;
  };

  JavaScriptCompiler.prototype = {
    // PUBLIC API: You can override these methods in a subclass to provide
    // alternative compiled forms for name lookup and buffering semantics
    nameLookup: function(parent, name, type) {
      if (/^[0-9]+$/.test(name)) {
        return parent + "[" + name + "]";
      } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
        return parent + "." + name;
      }
      else {
        return parent + "['" + name + "']";
      }
    },

    appendToBuffer: function(string) {
      if (this.environment.isSimple) {
        return "return " + string + ";";
      } else {
        return "buffer += " + string + ";";
      }
    },

    initializeBuffer: function() {
      return this.quotedString("");
    },

    namespace: "Handlebars",
    // END PUBLIC API

    compile: function(environment, options, context, asObject) {
      this.environment = environment;
      this.options = options || {};

      Handlebars.log(Handlebars.logger.DEBUG, this.environment.disassemble() + "\n\n");

      this.name = this.environment.name;
      this.isChild = !!context;
      this.context = context || {
        programs: [],
        aliases: { }
      };

      this.preamble();

      this.stackSlot = 0;
      this.stackVars = [];
      this.registers = { list: [] };
      this.compileStack = [];

      this.compileChildren(environment, options);

      var opcodes = environment.opcodes, opcode;

      this.i = 0;

      for(l=opcodes.length; this.i<l; this.i++) {
        opcode = opcodes[this.i];

        if(opcode.opcode === 'DECLARE') {
          this[opcode.name] = opcode.value;
        } else {
          this[opcode.opcode].apply(this, opcode.args);
        }
      }

      return this.createFunctionContext(asObject);
    },

    nextOpcode: function() {
      var opcodes = this.environment.opcodes, opcode = opcodes[this.i + 1];
      return opcodes[this.i + 1];
    },

    eat: function(opcode) {
      this.i = this.i + 1;
    },

    preamble: function() {
      var out = [];

      if (!this.isChild) {
        var namespace = this.namespace;
        var copies = "helpers = helpers || " + namespace + ".helpers;";
        if (this.environment.usePartial) { copies = copies + " partials = partials || " + namespace + ".partials;"; }
        if (this.options.data) { copies = copies + " data = data || {};"; }
        out.push(copies);
      } else {
        out.push('');
      }

      if (!this.environment.isSimple) {
        out.push(", buffer = " + this.initializeBuffer());
      } else {
        out.push("");
      }

      // track the last context pushed into place to allow skipping the
      // getContext opcode when it would be a noop
      this.lastContext = 0;
      this.source = out;
    },

    createFunctionContext: function(asObject) {
      var locals = this.stackVars.concat(this.registers.list);

      if(locals.length > 0) {
        this.source[1] = this.source[1] + ", " + locals.join(", ");
      }

      // Generate minimizer alias mappings
      if (!this.isChild) {
        var aliases = [];
        for (var alias in this.context.aliases) {
          this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
        }
      }

      if (this.source[1]) {
        this.source[1] = "var " + this.source[1].substring(2) + ";";
      }

      // Merge children
      if (!this.isChild) {
        this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
      }

      if (!this.environment.isSimple) {
        this.source.push("return buffer;");
      }

      var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

      for(var i=0, l=this.environment.depths.list.length; i<l; i++) {
        params.push("depth" + this.environment.depths.list[i]);
      }

      if (asObject) {
        params.push(this.source.join("\n  "));

        return Function.apply(this, params);
      } else {
        var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + this.source.join("\n  ") + '}';
        Handlebars.log(Handlebars.logger.DEBUG, functionSource + "\n\n");
        return functionSource;
      }
    },

    // [blockValue]
    //
    // On stack, before: hash, inverse, program, value
    // On stack, after: return value of blockHelperMissing
    //
    // The purpose of this opcode is to take a block of the form
    // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
    // replace it on the stack with the result of properly
    // invoking blockHelperMissing.
    blockValue: function() {
      this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      var params = ["depth0"];
      this.setupParams(0, params);

      this.replaceStack(function(current) {
        params.splice(1, 0, current);
        return current + " = blockHelperMissing.call(" + params.join(", ") + ")";
      });
    },

    // [ambiguousBlockValue]
    //
    // On stack, before: hash, inverse, program, value
    // Compiler value, before: lastHelper=value of last found helper, if any
    // On stack, after, if no lastHelper: same as [blockValue]
    // On stack, after, if lastHelper: value
    ambiguousBlockValue: function() {
      this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      var params = ["depth0"];
      this.setupParams(0, params);

      var current = this.topStack();
      params.splice(1, 0, current);

      this.source.push("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
    },

    // [appendContent]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Appends the string value of `content` to the current buffer
    appendContent: function(content) {
      this.source.push(this.appendToBuffer(this.quotedString(content)));
    },

    // [append]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Coerces `value` to a String and appends it to the current buffer.
    //
    // If `value` is truthy, or 0, it is coerced into a string and appended
    // Otherwise, the empty string is appended
    append: function() {
      var local = this.popStack();
      this.source.push("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
      if (this.environment.isSimple) {
        this.source.push("else { " + this.appendToBuffer("''") + " }");
      }
    },

    // [appendEscaped]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Escape `value` and append it to the buffer
    appendEscaped: function() {
      var opcode = this.nextOpcode(), extra = "";
      this.context.aliases.escapeExpression = 'this.escapeExpression';

      if(opcode && opcode.opcode === 'appendContent') {
        extra = " + " + this.quotedString(opcode.args[0]);
        this.eat(opcode);
      }

      this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")" + extra));
    },

    // [getContext]
    //
    // On stack, before: ...
    // On stack, after: ...
    // Compiler value, after: lastContext=depth
    //
    // Set the value of the `lastContext` compiler value to the depth
    getContext: function(depth) {
      if(this.lastContext !== depth) {
        this.lastContext = depth;
      }
    },

    // [lookupOnContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext[name], ...
    //
    // Looks up the value of `name` on the current context and pushes
    // it onto the stack.
    lookupOnContext: function(name) {
      this.pushStack(this.nameLookup('depth' + this.lastContext, name, 'context'));
    },

    // [pushContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext, ...
    //
    // Pushes the value of the current context onto the stack.
    pushContext: function() {
      this.pushStackLiteral('depth' + this.lastContext);
    },

    // [resolvePossibleLambda]
    //
    // On stack, before: value, ...
    // On stack, after: resolved value, ...
    //
    // If the `value` is a lambda, replace it on the stack by
    // the return value of the lambda
    resolvePossibleLambda: function() {
      this.context.aliases.functionType = '"function"';

      this.replaceStack(function(current) {
        return "typeof " + current + " === functionType ? " + current + "() : " + current;
      });
    },

    // [lookup]
    //
    // On stack, before: value, ...
    // On stack, after: value[name], ...
    //
    // Replace the value on the stack with the result of looking
    // up `name` on `value`
    lookup: function(name) {
      this.replaceStack(function(current) {
        return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
      });
    },

    // [lookupData]
    //
    // On stack, before: ...
    // On stack, after: data[id], ...
    //
    // Push the result of looking up `id` on the current data
    lookupData: function(id) {
      this.pushStack(this.nameLookup('data', id, 'data'));
    },

    // [pushStringParam]
    //
    // On stack, before: ...
    // On stack, after: string, currentContext, ...
    //
    // This opcode is designed for use in string mode, which
    // provides the string value of a parameter along with its
    // depth rather than resolving it immediately.
    pushStringParam: function(string) {
      this.pushStackLiteral('depth' + this.lastContext);
      this.pushString(string);
    },

    // [pushString]
    //
    // On stack, before: ...
    // On stack, after: quotedString(string), ...
    //
    // Push a quoted version of `string` onto the stack
    pushString: function(string) {
      this.pushStackLiteral(this.quotedString(string));
    },

    // [push]
    //
    // On stack, before: ...
    // On stack, after: expr, ...
    //
    // Push an expression onto the stack
    push: function(expr) {
      this.pushStack(expr);
    },

    // [pushLiteral]
    //
    // On stack, before: ...
    // On stack, after: value, ...
    //
    // Pushes a value onto the stack. This operation prevents
    // the compiler from creating a temporary variable to hold
    // it.
    pushLiteral: function(value) {
      this.pushStackLiteral(value);
    },

    // [pushProgram]
    //
    // On stack, before: ...
    // On stack, after: program(guid), ...
    //
    // Push a program expression onto the stack. This takes
    // a compile-time guid and converts it into a runtime-accessible
    // expression.
    pushProgram: function(guid) {
      if (guid != null) {
        this.pushStackLiteral(this.programExpression(guid));
      } else {
        this.pushStackLiteral(null);
      }
    },

    // [invokeHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // Pops off the helper's parameters, invokes the helper,
    // and pushes the helper's return value onto the stack.
    //
    // If the helper is not found, `helperMissing` is called.
    invokeHelper: function(paramSize, name) {
      this.context.aliases.helperMissing = 'helpers.helperMissing';

      var helper = this.lastHelper = this.setupHelper(paramSize, name);
      this.register('foundHelper', helper.name);

      this.pushStack("foundHelper ? foundHelper.call(" +
        helper.callParams + ") " + ": helperMissing.call(" +
        helper.helperMissingParams + ")");
    },

    // [invokeKnownHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // This operation is used when the helper is known to exist,
    // so a `helperMissing` fallback is not required.
    invokeKnownHelper: function(paramSize, name) {
      var helper = this.setupHelper(paramSize, name);
      this.pushStack(helper.name + ".call(" + helper.callParams + ")");
    },

    // [invokeAmbiguous]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of disambiguation
    //
    // This operation is used when an expression like `{{foo}}`
    // is provided, but we don't know at compile-time whether it
    // is a helper or a path.
    //
    // This operation emits more code than the other options,
    // and can be avoided by passing the `knownHelpers` and
    // `knownHelpersOnly` flags at compile-time.
    invokeAmbiguous: function(name) {
      this.context.aliases.functionType = '"function"';

      this.pushStackLiteral('{}');
      var helper = this.setupHelper(0, name);

      var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');
      this.register('foundHelper', helperName);

      var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
      var nextStack = this.nextStack();

      this.source.push('if (foundHelper) { ' + nextStack + ' = foundHelper.call(' + helper.callParams + '); }');
      this.source.push('else { ' + nextStack + ' = ' + nonHelper + '; ' + nextStack + ' = typeof ' + nextStack + ' === functionType ? ' + nextStack + '() : ' + nextStack + '; }');
    },

    // [invokePartial]
    //
    // On stack, before: context, ...
    // On stack after: result of partial invocation
    //
    // This operation pops off a context, invokes a partial with that context,
    // and pushes the result of the invocation back.
    invokePartial: function(name) {
      var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];

      if (this.options.data) {
        params.push("data");
      }

      this.context.aliases.self = "this";
      this.pushStack("self.invokePartial(" + params.join(", ") + ");");
    },

    // [assignToHash]
    //
    // On stack, before: value, hash, ...
    // On stack, after: hash, ...
    //
    // Pops a value and hash off the stack, assigns `hash[key] = value`
    // and pushes the hash back onto the stack.
    assignToHash: function(key) {
      var value = this.popStack();
      var hash = this.topStack();

      this.source.push(hash + "['" + key + "'] = " + value + ";");
    },

    // HELPERS

    compiler: JavaScriptCompiler,

    compileChildren: function(environment, options) {
      var children = environment.children, child, compiler;

      for(var i=0, l=children.length; i<l; i++) {
        child = children[i];
        compiler = new this.compiler();

        this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
        var index = this.context.programs.length;
        child.index = index;
        child.name = 'program' + index;
        this.context.programs[index] = compiler.compile(child, options, this.context);
      }
    },

    programExpression: function(guid) {
      this.context.aliases.self = "this";

      if(guid == null) {
        return "self.noop";
      }

      var child = this.environment.children[guid],
          depths = child.depths.list, depth;

      var programParams = [child.index, child.name, "data"];

      for(var i=0, l = depths.length; i<l; i++) {
        depth = depths[i];

        if(depth === 1) { programParams.push("depth0"); }
        else { programParams.push("depth" + (depth - 1)); }
      }

      if(depths.length === 0) {
        return "self.program(" + programParams.join(", ") + ")";
      } else {
        programParams.shift();
        return "self.programWithDepth(" + programParams.join(", ") + ")";
      }
    },

    register: function(name, val) {
      this.useRegister(name);
      this.source.push(name + " = " + val + ";");
    },

    useRegister: function(name) {
      if(!this.registers[name]) {
        this.registers[name] = true;
        this.registers.list.push(name);
      }
    },

    pushStackLiteral: function(item) {
      this.compileStack.push(new Literal(item));
      return item;
    },

    pushStack: function(item) {
      this.source.push(this.incrStack() + " = " + item + ";");
      this.compileStack.push("stack" + this.stackSlot);
      return "stack" + this.stackSlot;
    },

    replaceStack: function(callback) {
      var item = callback.call(this, this.topStack());

      this.source.push(this.topStack() + " = " + item + ";");
      return "stack" + this.stackSlot;
    },

    nextStack: function(skipCompileStack) {
      var name = this.incrStack();
      this.compileStack.push("stack" + this.stackSlot);
      return name;
    },

    incrStack: function() {
      this.stackSlot++;
      if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
      return "stack" + this.stackSlot;
    },

    popStack: function() {
      var item = this.compileStack.pop();

      if (item instanceof Literal) {
        return item.value;
      } else {
        this.stackSlot--;
        return item;
      }
    },

    topStack: function() {
      var item = this.compileStack[this.compileStack.length - 1];

      if (item instanceof Literal) {
        return item.value;
      } else {
        return item;
      }
    },

    quotedString: function(str) {
      return '"' + str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r') + '"';
    },

    setupHelper: function(paramSize, name) {
      var params = [];
      this.setupParams(paramSize, params);
      var foundHelper = this.nameLookup('helpers', name, 'helper');

      return {
        params: params,
        name: foundHelper,
        callParams: ["depth0"].concat(params).join(", "),
        helperMissingParams: ["depth0", this.quotedString(name)].concat(params).join(", ")
      };
    },

    // the params and contexts arguments are passed in arrays
    // to fill in
    setupParams: function(paramSize, params) {
      var options = [], contexts = [], param, inverse, program;

      options.push("hash:" + this.popStack());

      inverse = this.popStack();
      program = this.popStack();

      // Avoid setting fn and inverse if neither are set. This allows
      // helpers to do a check for `if (options.fn)`
      if (program || inverse) {
        if (!program) {
          this.context.aliases.self = "this";
          program = "self.noop";
        }

        if (!inverse) {
         this.context.aliases.self = "this";
          inverse = "self.noop";
        }

        options.push("inverse:" + inverse);
        options.push("fn:" + program);
      }

      for(var i=0; i<paramSize; i++) {
        param = this.popStack();
        params.push(param);

        if(this.options.stringParams) {
          contexts.push(this.popStack());
        }
      }

      if (this.options.stringParams) {
        options.push("contexts:[" + contexts.join(",") + "]");
      }

      if(this.options.data) {
        options.push("data:data");
      }

      params.push("{" + options.join(",") + "}");
      return params.join(", ");
    }
  };

  var reservedWords = (
    "break else new var" +
    " case finally return void" +
    " catch for switch while" +
    " continue function this with" +
    " default if throw" +
    " delete in try" +
    " do instanceof typeof" +
    " abstract enum int short" +
    " boolean export interface static" +
    " byte extends long super" +
    " char final native synchronized" +
    " class float package throws" +
    " const goto private transient" +
    " debugger implements protected volatile" +
    " double import public let yield"
  ).split(" ");

  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

  for(var i=0, l=reservedWords.length; i<l; i++) {
    compilerWords[reservedWords[i]] = true;
  }

  JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
    if(!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(name)) {
      return true;
    }
    return false;
  };

})(Handlebars.Compiler, Handlebars.JavaScriptCompiler);

Handlebars.precompile = function(string, options) {
  options = options || {};

  var ast = Handlebars.parse(string);
  var environment = new Handlebars.Compiler().compile(ast, options);
  return new Handlebars.JavaScriptCompiler().compile(environment, options);
};

Handlebars.compile = function(string, options) {
  options = options || {};

  var compiled;
  function compile() {
    var ast = Handlebars.parse(string);
    var environment = new Handlebars.Compiler().compile(ast, options);
    var templateSpec = new Handlebars.JavaScriptCompiler().compile(environment, options, undefined, true);
    return Handlebars.template(templateSpec);
  }

  // Template is only compiled on first use and cached after that point.
  return function(context, options) {
    if (!compiled) {
      compiled = compile();
    }
    return compiled.call(this, context, options);
  };
};
;
// lib/handlebars/runtime.js
Handlebars.VM = {
  template: function(templateSpec) {
    // Just add water
    var container = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          return Handlebars.VM.program(fn, data);
        } else if(programWrapper) {
          return programWrapper;
        } else {
          programWrapper = this.programs[i] = Handlebars.VM.program(fn);
          return programWrapper;
        }
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop
    };

    return function(context, options) {
      options = options || {};
      return templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);
    };
  },

  programWithDepth: function(fn, data, $depth) {
    var args = Array.prototype.slice.call(arguments, 2);

    return function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
  },
  program: function(fn, data) {
    return function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
  },
  noop: function() { return ""; },
  invokePartial: function(partial, name, context, helpers, partials, data) {
    var options = { helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Handlebars.Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    } else if (!Handlebars.compile) {
      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    } else {
      partials[name] = Handlebars.compile(partial, {data: data !== undefined});
      return partials[name](context, options);
    }
  }
};

Handlebars.template = Handlebars.VM.template;
;








;(function(){"undefined"==typeof Ember&&(Ember={}),"undefined"!=typeof window&&(window.Em=window.Ember=Em=Ember),Ember.isNamespace=!0,Ember.toString=function(){return"Ember"},Ember.VERSION="1.0.pre",Ember.ENV=Ember.ENV||("undefined"==typeof ENV?{}:ENV),Ember.config=Ember.config||{},Ember.EXTEND_PROTOTYPES=Ember.ENV.EXTEND_PROTOTYPES!==!1,Ember.LOG_STACKTRACE_ON_DEPRECATION=Ember.ENV.LOG_STACKTRACE_ON_DEPRECATION!==!1,Ember.SHIM_ES5=Ember.ENV.SHIM_ES5===!1?!1:Ember.EXTEND_PROTOTYPES,Ember.CP_DEFAULT_CACHEABLE=Ember.ENV.CP_DEFAULT_CACHEABLE!==!1,Ember.VIEW_PRESERVES_CONTEXT=Ember.ENV.VIEW_PRESERVES_CONTEXT!==!1,Ember.K=function(){return this},"undefined"==typeof Ember.assert&&(Ember.assert=Ember.K),"undefined"==typeof Ember.warn&&(Ember.warn=Ember.K),"undefined"==typeof Ember.deprecate&&(Ember.deprecate=Ember.K),"undefined"==typeof Ember.deprecateFunc&&(Ember.deprecateFunc=function(a,b){return b}),"undefined"==typeof ember_assert&&(window.ember_assert=Ember.K),"undefined"==typeof ember_warn&&(window.ember_warn=Ember.K),"undefined"==typeof ember_deprecate&&(window.ember_deprecate=Ember.K),"undefined"==typeof ember_deprecateFunc&&(window.ember_deprecateFunc=function(a,b){return b}),Ember.Logger=window.console||{log:Ember.K,warn:Ember.K,error:Ember.K,info:Ember.K,debug:Ember.K}})(),function(){var a=function(a){return a&&Function.prototype.toString.call(a).indexOf("[native code]")>-1},b=a(Array.prototype.map)?Array.prototype.map:function(a){if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;var d=new Array(c),e=arguments[1];for(var f=0;f<c;f++)f in b&&(d[f]=a.call(e,b[f],f,b));return d},c=a(Array.prototype.forEach)?Array.prototype.forEach:function(a){if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;var d=arguments[1];for(var e=0;e<c;e++)e in b&&a.call(d,b[e],e,b)},d=a(Array.prototype.indexOf)?Array.prototype.indexOf:function(a,b){b===null||b===undefined?b=0:b<0&&(b=Math.max(0,this.length+b));for(var c=b,d=this.length;c<d;c++)if(this[c]===a)return c;return-1};Ember.ArrayPolyfills={map:b,forEach:c,indexOf:d};var e=Ember.EnumerableUtils={map:function(a,c,d){return a.map?a.map.call(a,c,d):b.call(a,c,d)},forEach:function(a,b,d){return a.forEach?a.forEach.call(a,b,d):c.call(a,b,d)},indexOf:function(a,b,c){return a.indexOf?a.indexOf.call(a,b,c):d.call(a,b,c)},indexesOf:function(a,b){return b===undefined?[]:e.map(b,function(b){return e.indexOf(a,b)})},removeObject:function(a,b){var c=e.indexOf(a,b);c!==-1&&a.splice(c,1)}};Ember.SHIM_ES5&&(Array.prototype.map||(Array.prototype.map=b),Array.prototype.forEach||(Array.prototype.forEach=c),Array.prototype.indexOf||(Array.prototype.indexOf=d))}(),function(){var a=Ember.platform={};Ember.create=Object.create;if(!Ember.create){var b=function(){};Ember.create=function(a,c){b.prototype=a,a=new b;if(c){b.prototype=a;for(var d in c)b.prototype[d]=c[d].value;a=new b}return b.prototype=null,a},Ember.create.isSimulated=!0}var c=Object.defineProperty,d,e;if(c)try{c({},"a",{get:function(){}})}catch(f){c=null}c&&(d=function(){var a={};return c(a,"a",{configurable:!0,enumerable:!0,get:function(){},set:function(){}}),c(a,"a",{configurable:!0,enumerable:!0,writable:!0,value:!0}),a.a===!0}(),e=function(){try{return c(document.createElement("div"),"definePropertyOnDOM",{}),!0}catch(a){}return!1}(),d?e||(c=function(a,b,c){var d;return typeof Node=="object"?d=a instanceof Node:d=typeof a=="object"&&typeof a.nodeType=="number"&&typeof a.nodeName=="string",d?a[b]=c.value:Object.defineProperty(a,b,c)}):c=null),a.defineProperty=c,a.hasPropertyAccessors=!0,a.defineProperty||(a.hasPropertyAccessors=!1,a.defineProperty=function(a,b,c){c.get||(a[b]=c.value)},a.defineProperty.isSimulated=!0),Ember.ENV.MANDATORY_SETTER&&!a.hasPropertyAccessors&&(Ember.ENV.MANDATORY_SETTER=!1)}(),function(){function m(a){this.descs={},this.watching={},this.cache={},this.source=a}function n(a,b){return!!a&&typeof a[b]=="function"}var a=Ember.platform.defineProperty,b=Ember.create,c="__ember"+ +(new Date),d=0,e=[],f={},g=Ember.ENV.MANDATORY_SETTER;Ember.GUID_KEY=c;var h={writable:!1,configurable:!1,enumerable:!1,value:null};Ember.generateGuid=function(e,f){f||(f="ember");var g=f+d++;return e&&(h.value=g,a(e,c,h)),g},Ember.guidFor=function(g){if(g===undefined)return"(undefined)";if(g===null)return"(null)";var i,j,k=typeof g;switch(k){case"number":return j=e[g],j||(j=e[g]="nu"+g),j;case"string":return j=f[g],j||(j=f[g]="st"+d++),j;case"boolean":return g?"(true)":"(false)";default:if(g[c])return g[c];if(g===Object)return"(Object)";if(g===Array)return"(Array)";return j="ember"+d++,h.value=j,a(g,c,h),j}};var i={writable:!0,configurable:!1,enumerable:!1,value:null},j=Ember.GUID_KEY+"_meta";Ember.META_KEY=j;var k={descs:{},watching:{}};g&&(k.values={}),Ember.EMPTY_META=k,Object.freeze&&Object.freeze(k);var l=Ember.platform.defineProperty.isSimulated;l&&(m.prototype.__preventPlainObject__=!0),Ember.meta=function(d,e){var f=d[j];return e===!1?f||k:(f?f.source!==d&&(l||a(d,j,i),f=b(f),f.descs=b(f.descs),f.watching=b(f.watching),f.cache={},f.source=d,g&&(f.values=b(f.values)),d[j]=f):(l||a(d,j,i),f=new m(d),g&&(f.values={}),d[j]=f,f.descs.constructor=null),f)},Ember.getMeta=function(b,c){var d=Ember.meta(b,!1);return d[c]},Ember.setMeta=function(b,c,d){var e=Ember.meta(b,!0);return e[c]=d,d},Ember.metaPath=function(c,d,e){var f=Ember.meta(c,e),g,h;for(var i=0,j=d.length;i<j;i++){g=d[i],h=f[g];if(!h){if(!e)return undefined;h=f[g]={__ember_source__:c}}else if(h.__ember_source__!==c){if(!e)return undefined;h=f[g]=b(h),h.__ember_source__=c}f=h}return h},Ember.wrap=function(a,b){function c(){}var d=function(){var d,e=this._super;return this._super=b||c,d=a.apply(this,arguments),this._super=e,d};return d.base=a,d},Ember.isArray=function(a){return!a||a.setInterval?!1:Array.isArray&&Array.isArray(a)?!0:Ember.Array&&Ember.Array.detect(a)?!0:a.length!==undefined&&"object"==typeof a?!0:!1},Ember.makeArray=function(a){return a===null||a===undefined?[]:Ember.isArray(a)?a:[a]},Ember.canInvoke=n,Ember.tryInvoke=function(a,b,c){if(n(a,b))return a[b].apply(a,c)}}(),function(){var a=Ember.guidFor,b=Ember.ArrayPolyfills.indexOf,c=function(a){var b={};for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b},d=function(a,b){var d=a.keys.copy(),e=c(a.values);return b.keys=d,b.values=e,b},e=Ember.OrderedSet=function(){this.clear()};e.create=function(){return new e},e.prototype={clear:function(){this.presenceSet={},this.list=[]},add:function(b){var c=a(b),d=this.presenceSet,e=this.list;if(c in d)return;d[c]=!0,e.push(b)},remove:function(c){var d=a(c),e=this.presenceSet,f=this.list;delete e[d];var g=b.call(f,c);g>-1&&f.splice(g,1)},isEmpty:function(){return this.list.length===0},forEach:function(a,b){var c=this.list.slice();for(var d=0,e=c.length;d<e;d++)a.call(b,c[d])},toArray:function(){return this.list.slice()},copy:function(){var a=new e;return a.presenceSet=c(this.presenceSet),a.list=this.list.slice(),a}};var f=Ember.Map=function(){this.keys=Ember.OrderedSet.create(),this.values={}};f.create=function(){return new f},f.prototype={get:function(b){var c=this.values,d=a(b);return c[d]},set:function(b,c){var d=this.keys,e=this.values,f=a(b);d.add(b),e[f]=c},remove:function(b){var c=this.keys,d=this.values,e=a(b),f;return d.hasOwnProperty(e)?(c.remove(b),f=d[e],delete d[e],!0):!1},has:function(b){var c=this.values,d=a(b);return c.hasOwnProperty(d)},forEach:function(b,c){var d=this.keys,e=this.values;d.forEach(function(d){var f=a(d);b.call(c,d,e[f])})},copy:function(){return d(this,new f)}};var g=Ember.MapWithDefault=function(a){f.call(this),this.defaultValue=a.defaultValue};g.create=function(a){return a?new g(a):new f},g.prototype=Ember.create(f.prototype),g.prototype.get=function(a){var b=this.has(a);if(b)return f.prototype.get.call(this,a);var c=this.defaultValue(a);return this.set(a,c),c},g.prototype.copy=function(){return d(this,new g({defaultValue:this.defaultValue}))}}(),function(){function i(a){return a.match(h)[0]}function j(a,c){var d=g.test(c),e=!d&&f.test(c),h;if(!a||e)a=window;d&&(c=c.slice(5)),a===window&&(h=i(c),a=b(a,h),c=c.slice(h.length+1));if(!c||c.length===0)throw new Error("Invalid Path");return[a,c]}function k(a,c){var d,e,f,h,i;if(a===null&&c.indexOf(".")===-1)return b(window,c);d=g.test(c);if(!a||d)f=j(a,c),a=f[0],c=f[1],f.length=0;e=c.split("."),i=e.length;for(h=0;a&&h<i;h++){a=b(a,e[h],!0);if(a&&a.isDestroyed)return undefined}return a}function l(a,b,d,e){var f;f=b.slice(b.lastIndexOf(".")+1),b=b.slice(0,b.length-(f.length+1)),b!=="this"&&(a=k(a,b));if(!f||f.length===0)throw new Error("You passed an empty path");if(!a){if(e)return;throw new Error("Object in path "+b+" could not be found or was destroyed.")}return c(a,f,d)}var a=Ember.META_KEY,b,c,d=Ember.ENV.MANDATORY_SETTER,e=/^([A-Z$]|([0-9][A-Z$]))/,f=/^([A-Z$]|([0-9][A-Z$])).*[\.\*]/,g=/^this[\.\*]/,h=/^([^\.\*]+)/;b=function(c,e){if(e==="")return c;!e&&"string"==typeof c&&(e=c,c=null);if(!c||e.indexOf(".")!==-1)return k(c,e);var f=c[a],g=f&&f.descs[e],h;return g?g.get(c,e):(d&&f&&f.watching[e]>0?h=f.values[e]:h=c[e],h!==undefined||"object"!=typeof c||e in c||"function"!=typeof c.unknownProperty?h:c.unknownProperty(e))},c=function(c,e,f,g){typeof c=="string"&&(f=e,e=c,c=null);if(!c||e.indexOf(".")!==-1)return l(c,e,f,g);var h=c[a],i=h&&h.descs[e],j,k;return i?i.set(c,e,f):(j="object"==typeof c&&!(e in c),j&&"function"==typeof c.setUnknownProperty?c.setUnknownProperty(e,f):h&&h.watching[e]>0?(d?k=h.values[e]:k=c[e],f!==k&&(Ember.propertyWillChange(c,e),d?k!==undefined||e in c?h.values[e]=f:Ember.defineProperty(c,e,null,f):c[e]=f,Ember.propertyDidChange(c,e))):c[e]=f),f},Ember.normalizeTuple=function(a,b){return j(a,b)},Ember.getWithDefault=function(a,c,d){var e=b(a,c);return e===undefined?d:e},Ember.get=b,Ember.getPath=Ember.deprecateFunc("getPath is deprecated since get now supports paths",Ember.get),Ember.set=c,Ember.setPath=Ember.deprecateFunc("setPath is deprecated since set now supports paths",Ember.set),Ember.trySet=function(a,b,d){return c(a,b,d,!0)},Ember.trySetPath=Ember.deprecateFunc("trySetPath has been renamed to trySet",Ember.trySet),Ember.isGlobalPath=function(a){return e.test(a)},Ember.config.overrideAccessors&&(Ember.config.overrideAccessors(),b=Ember.get,c=Ember.set)}(),function(){var a=Ember.GUID_KEY,b=Ember.META_KEY,c=Ember.EMPTY_META,d=Ember.meta,e=Ember.create,f=Ember.platform.defineProperty,g=Ember.ENV.MANDATORY_SETTER,h=Ember.Descriptor=function(){};Ember.defineProperty=function(a,c,e,h,i){var j,k,l,m;return i||(i=d(a)),j=i.descs,k=i.descs[c],l=i.watching[c]>0,k instanceof Ember.Descriptor&&k.teardown(a,c),e instanceof Ember.Descriptor?(m=e,j[c]=e,g&&l?f(a,c,{configurable:!0,enumerable:!0,writable:!0,value:undefined}):a[c]=undefined,e.setup(a,c)):(j[c]=undefined,e==null?(m=h,g&&l?(i.values[c]=h,f(a,c,{configurable:!0,enumerable:!0,set:function(){},get:function(){var a=this[b];return a&&a.values[c]}})):a[c]=h):(m=e,f(a,c,e))),l&&Ember.overrideChains(a,c,i),a.didDefineProperty&&a.didDefineProperty(a,c,m),this}}(),function(){function j(a,b,c,e){d&&!e?h.push(a,b,c):Ember.sendEvent(a,b,[a,c])}function k(){i.clear(),h.flush()}function l(b){return b+a}function m(a){return a+b}var a=":change",b=":before",c=Ember.guidFor,d=0,e=[].slice,f=function(){this.targetSet={}};f.prototype.add=function(a,b){var c=this.targetSet,d=Ember.guidFor(a),e=c[d];return e||(c[d]=e={}),e[b]?!1:e[b]=!0},f.prototype.clear=function(){this.targetSet={}};var g=function(){this.targetSet={},this.queue=[]};g.prototype.push=function(a,b,c){var d=this.targetSet,e=this.queue,f=Ember.guidFor(a),g=d[f],h;g||(d[f]=g={}),h=g[b],h===undefined?g[b]=e.push(Ember.deferEvent(a,b,[a,c]))-1:e[h]=Ember.deferEvent(a,b,[a,c])},g.prototype.flush=function(){var a=this.queue;this.queue=[],this.targetSet={};for(var b=0,c=a.length;b<c;++b)a[b]()};var h=new g,i=new f;Ember.beginPropertyChanges=function(){return d++,this},Ember.endPropertyChanges=function(){d--,d<=0&&k()},Ember.changeProperties=function(a,b){Ember.beginPropertyChanges();try{a.call(b)}finally{Ember.endPropertyChanges()}},Ember.setProperties=function(a,b){return Ember.changeProperties(function(){for(var c in b)b.hasOwnProperty(c)&&Ember.set(a,c,b[c])}),a},Ember.addObserver=function(a,b,c,d){return Ember.addListener(a,l(b),c,d),Ember.watch(a,b),this},Ember.observersFor=function(a,b){return Ember.listenersFor(a,l(b))},Ember.removeObserver=function(a,b,c,d){return Ember.unwatch(a,b),Ember.removeListener(a,l(b),c,d),this},Ember.addBeforeObserver=function(a,b,c,d){return Ember.addListener(a,m(b),c,d),Ember.watch(a,b),this},Ember._suspendBeforeObserver=function(a,b,c,d,e){return Ember._suspendListener(a,m(b),c,d,e)},Ember._suspendObserver=function(a,b,c,d,e){return Ember._suspendListener(a,l(b),c,d,e)},Ember.beforeObserversFor=function(a,b){return Ember.listenersFor(a,m(b))},Ember.removeBeforeObserver=function(a,b,c,d){return Ember.unwatch(a,b),Ember.removeListener(a,m(b),c,d),this},Ember.notifyObservers=function(a,b){if(a.isDestroying)return;j(a,l(b),b)},Ember.notifyBeforeObservers=function(a,b){if(a.isDestroying)return;var c,e,f=!1;if(d){if(!i.add(a,b))return;f=!0}j(a,m(b),b,f)}}(),function(){function n(a){return a.match(j)[0]}function o(a){return a==="*"||!k.test(a)}function q(b,c,d,e,f){var g=a(c);e[g]||(e[g]={});if(e[g][d])return;e[g][d]=!0;var h=f.deps;h=h&&h[d];if(h)for(var i in h){if(p[i])continue;b(c,i)}}function t(a,b,c){if(a.isDestroying)return;var d=r,e=!d;e&&(d=r={}),q(G,a,b,d,c),e&&(r=null)}function u(a,b,c){if(a.isDestroying)return;var d=s,e=!d;e&&(d=s={}),q(H,a,b,d,c),e&&(s=null)}function v(c,d,e){if(!c||"object"!=typeof c)return;var f=b(c),g=f.chainWatchers;if(!g||g.__emberproto__!==c)g=f.chainWatchers={__emberproto__:c};g[d]||(g[d]={}),g[d][a(e)]=e,Ember.watch(c,d)}function w(c,d,e){if(!c||"object"!=typeof c)return;var f=b(c,!1),g=f.chainWatchers;if(!g||g.__emberproto__!==c)return;g[d]&&delete g[d][a(e)],Ember.unwatch(c,d)}function y(){if(x.length===0)return;var a=x;x=[],i.call(a,function(a){a[0].add(a[1])})}function z(a){return b(a,!1).proto===a}function C(a){var c=b(a),d=c.chains;return d?d.value()!==a&&(d=c.chains=d.copy(a)):d=c.chains=new A(null,null,a),d}function D(a,b,c,d,e){var f=b.chainWatchers;if(!f||f.__emberproto__!==a)return;f=f[c];if(!f)return;for(var g in f){if(!f.hasOwnProperty(g))continue;f[g][d](e)}}function E(a,b,c){D(a,c,b,"willChange")}function F(a,b,c){D(a,c,b,"didChange")}function G(a,c,d){var e=b(a,!1),f=e.watching[c]>0||c==="length",g=e.proto,h=e.descs[c];if(!f)return;if(g===a)return;h&&h.willChange&&h.willChange(a,c),t(a,c,e),E(a,c,e),Ember.notifyBeforeObservers(a,c)}function H(a,c){var d=b(a,!1),e=d.watching[c]>0||c==="length",f=d.proto,g=d.descs[c];if(f===a)return;g&&g.didChange&&g.didChange(a,c);if(!e&&c!=="length")return;u(a,c,d),F(a,c,d),Ember.notifyObservers(a,c)}var a=Ember.guidFor,b=Ember.meta,c=Ember.get,d=Ember.set,e=Ember.normalizeTuple,f=Ember.GUID_KEY,g=Ember.META_KEY,h=Ember.notifyObservers,i=Ember.ArrayPolyfills.forEach,j=/^([^\.\*]+)/,k=/[\.\*]/,l=Ember.ENV.MANDATORY_SETTER,m=Ember.platform.defineProperty,p={__emberproto__:!0},r,s,x=[],A=function(a,b,c,d){var e;this._parent=a,this._key=b,this._watching=c===undefined,this._value=c,this._separator=d||".",this._paths={},this._watching&&(this._object=a.value(),this._object&&v(this._object,this._key,this)),this._parent&&this._parent._key==="@each"&&this.value()},B=A.prototype;B.value=function(){if(this._value===undefined&&this._watching){var a=this._parent.value();this._value=a&&!z(a)?c(a,this._key):undefined}return this._value},B.destroy=function(){if(this._watching){var a=this._object;a&&w(a,this._key,this),this._watching=!1}},B.copy=function(a){var b=new A(null,null,a,this._separator),c=this._paths,d;for(d in c){if(c[d]<=0)continue;b.add(d)}return b},B.add=function(a){var b,c,d,f,g,h;h=this._paths,h[a]=(h[a]||0)+1,b=this.value(),c=e(b,a);if(c[0]&&c[0]===b)a=c[1],d=n(a),a=a.slice(d.length+1);else{if(!c[0]){x.push([this,a]),c.length=0;return}f=c[0],d=a.slice(0,0-(c[1].length+1)),g=a.slice(d.length,d.length+1),a=c[1]}c.length=0,this.chain(d,a,f,g)},B.remove=function(a){var b,c,d,f,g;g=this._paths,g[a]>0&&g[a]--,b=this.value(),c=e(b,a),c[0]===b?(a=c[1],d=n(a),a=a.slice(d.length+1)):(f=c[0],d=a.slice(0,0-(c[1].length+1)),a=c[1]),c.length=0,this.unchain(d,a)},B.count=0,B.chain=function(a,b,c,d){var e=this._chains,f;e||(e=this._chains={}),f=e[a],f||(f=e[a]=new A(this,a,c,d)),f.count++,b&&b.length>0&&(a=n(b),b=b.slice(a.length+1),f.chain(a,b))},B.unchain=function(a,b){var c=this._chains,d=c[a];b&&b.length>1&&(a=n(b),b=b.slice(a.length+1),d.unchain(a,b)),d.count--,d.count<=0&&(delete c[d._key],d.destroy())},B.willChange=function(){var a=this._chains;if(a)for(var b in a){if(!a.hasOwnProperty(b))continue;a[b].willChange()}this._parent&&this._parent.chainWillChange(this,this._key,1)},B.chainWillChange=function(a,b,c){this._key&&(b=this._key+this._separator+b),this._parent?this._parent.chainWillChange(this,b,c+1):(c>1&&Ember.propertyWillChange(this.value(),b),b="this."+b,this._paths[b]>0&&Ember.propertyWillChange(this.value(),b))},B.chainDidChange=function(a,b,c){this._key&&(b=this._key+this._separator+b),this._parent?this._parent.chainDidChange(this,b,c+1):(c>1&&Ember.propertyDidChange(this.value(),b),b="this."+b,this._paths[b]>0&&Ember.propertyDidChange(this.value(),b))},B.didChange=function(a){if(this._watching){var b=this._parent.value();b!==this._object&&(w(this._object,this._key,this),this._object=b,v(b,this._key,this)),this._value=undefined,this._parent&&this._parent._key==="@each"&&this.value()}var c=this._chains;if(c)for(var d in c){if(!c.hasOwnProperty(d))continue;c[d].didChange(a)}if(a)return;this._parent&&this._parent.chainDidChange(this,this._key,1)},Ember.overrideChains=function(a,b,c){D(a,c,b,"didChange",!0)},Ember.watch=function(a,c){if(c==="length"&&Ember.typeOf(a)==="array")return this;var d=b(a),e=d.watching,f;return e[c]?e[c]=(e[c]||0)+1:(e[c]=1,o(c)?(f=d.descs[c],f&&f.willWatch&&f.willWatch(a,c),"function"==typeof a.willWatchProperty&&a.willWatchProperty(c),l&&c in a&&(d.values[c]=a[c],m(a,c,{configurable:!0,enumerable:!0,set:function(){},get:function(){var a=this[g];return a&&a.values[c]}}))):C(a).add(c)),this},Ember.isWatching=function(b,c){var d=b[g];return(d&&d.watching[c])>0},Ember.watch.flushPending=y,Ember.unwatch=function(a,c){if(c==="length"&&Ember.typeOf(a)==="array")return this;var d=b(a),e=d.watching,f;return e[c]===1?(e[c]=0,o(c)?(f=d.descs[c],f&&f.didUnwatch&&f.didUnwatch(a,c),"function"==typeof a.didUnwatchProperty&&a.didUnwatchProperty(c),l&&c in a&&(m(a,c,{configurable:!0,enumerable:!0,writable:!0,value:d.values[c]}),delete d.values[c])):C(a).remove(c)):e[c]>1&&e[c]--,this},Ember.rewatch=function(a){var c=b(a,!1),d=c.chains;return f in a&&!a.hasOwnProperty(f)&&Ember.generateGuid(a,"ember"),d&&d.value()!==a&&(c.chains=d.copy(a)),this},Ember.finishChains=function(a){var c=b(a,!1),d=c.chains;d&&(d.value()!==a&&(c.chains=d=d.copy(a)),d.didChange(!0))},Ember.propertyWillChange=G,Ember.propertyDidChange=H;var I=[];Ember.destroy=function(a){var b=a[g],c,d,e,f;if(b){a[g]=null,c=b.chains;if(c){I.push(c);while(I.length>0){c=I.pop(),d=c._chains;if(d)for(e in d)d.hasOwnProperty(e)&&I.push(d[e]);c._watching&&(f=c._object,f&&w(f,c._key,c))}}}}}(),function(){function i(a,b,c){var d=b[c];return d?d.__emberproto__!==a&&(d=b[c]=e(d),d.__emberproto__=a):d=b[c]={__emberproto__:a},d}function j(a,b){var c=b.deps;return c?c.__emberproto__!==a&&(c=b.deps=e(c),c.__emberproto__=a):c=b.deps={__emberproto__:a},c}function k(a,b,c,d){var e=a._dependentKeys,f,h,k,l,m;if(!e)return;f=j(b,d);for(h=0,k=e.length;h<k;h++)l=e[h],m=i(b,f,l),m[c]=(m[c]||0)+1,g(b,l)}function l(a,b,c,d){var e=a._dependentKeys,f,g,k,l,m;if(!e)return;f=j(b,d);for(g=0,k=e.length;g<k;g++)l=e[g],m=i(b,f,l),m[c]=(m[c]||0)-1,h(b,l)}function m(a,b){this.func=a,this._cacheable=b&&b.cacheable!==undefined?b.cacheable:Ember.CP_DEFAULT_CACHEABLE,this._dependentKeys=b&&b.dependentKeys}var a=Ember.get,b=Ember.meta,c=Ember.guidFor,d=[].slice,e=Ember.create,f=Ember.META_KEY,g=Ember.watch,h=Ember.unwatch;Ember.ComputedProperty=m,m.prototype=new Ember.Descriptor;var n=m.prototype;n.cacheable=function(a){return this._cacheable=a!==!1,this},n.volatile=function(){return this.cacheable(!1)},n.property=function(){var a=[];for(var b=0,c=arguments.length;b<c;b++)a.push(arguments[b]);return this._dependentKeys=a,this},n.meta=function(a){return arguments.length===0?this._meta||{}:(this._meta=a,this)},n.willWatch=function(a,b){var c=a[f];b in c.cache||k(this,a,b,c)},n.didUnwatch=function(a,b){var c=a[f];b in c.cache||l(this,a,b,c)},n.didChange=function(a,c){if(this._cacheable&&this._suspended!==a){var d=b(a);c in d.cache&&(delete d.cache[c],d.watching[c]||l(this,a,c,d))}},n.get=function(a,c){var d,e,f;if(this._cacheable){f=b(a),e=f.cache;if(c in e)return e[c];d=e[c]=this.func.call(a,c),f.watching[c]||k(this,a,c,f)}else d=this.func.call(a,c);return d},n.set=function(a,c,d){var e=this._cacheable,f=b(a,e),g=f.watching[c],h=this._suspended,i,j;return this._suspended=a,g&&Ember.propertyWillChange(a,c),e&&c in f.cache&&(delete f.cache[c],i=!0),j=this.func.call(a,c,d),e&&(!g&&!i&&k(this,a,c,f),f.cache[c]=j),g&&Ember.propertyDidChange(a,c),this._suspended=h,j},n.setup=function(a,c){var d=a[f];d&&d.watching[c]&&k(this,a,c,b(a))},n.teardown=function(a,c){var d=b(a);return(d.watching[c]||c in d.cache)&&l(this,a,c,d),this._cacheable&&delete d.cache[c],null},Ember.computed=function(a){var b;arguments.length>1&&(b=d.call(arguments,0,-1),a=d.call(arguments,-1)[0]);var c=new m(a);return b&&c.property.apply(c,b),c},Ember.cacheFor=function(c,d){var e=b(c,!1).cache;if(e&&d in e)return e[d]},Ember.computed.not=function(b){return Ember.computed(b,function(c){return!a(this,b)}).cacheable()},Ember.computed.empty=function(b){return Ember.computed(b,function(c){var d=a(this,b);return d===undefined||d===null||d===""||Ember.isArray(d)&&a(d,"length")===0}).cacheable()},Ember.computed.bool=function(b){return Ember.computed(b,function(c){return!!a(this,b)}).cacheable()}}(),function(){function f(a,b,e,f){return c(a,["listeners",b,d(e)],f)}function g(a,c){var d=b(a,!1).listeners;return d?d[c]||!1:!1}function i(a,b,c,d){var e=g(a,b);if(!e)return!1;for(var f in e){if(h[f])continue;var i=e[f];if(i)for(var j in i){if(h[j])continue;var k=i[j];if(k&&c(k,d,a)===!0)return!0}}return!1}function j(a,b,c){var d=a.method,e=a.target;e||(e=c),"string"==typeof d&&(d=e[d]),b?d.apply(e,b):d.apply(e)}function k(a,b,c,e){!e&&"function"==typeof c&&(e=c,c=null);var g=f(a,b,c,!0),h=d(e);g[h]||(g[h]={target:c,method:e}),"function"==typeof a.didAddListener&&a.didAddListener(b,c,e)}function l(a,b,c,e){!e&&"function"==typeof c&&(e=c,c=null);var g=f(a,b,c,!0),h=d(e);g&&g[h]&&(g[h]=null),"function"==typeof a.didRemoveListener&&a.didRemoveListener(b,c,e)}function m(a,b,c,e,g){!e&&"function"==typeof c&&(e=c,c=null);var h=f(a,b,c,!0),i=d(e),j=h&&h[i];h[i]=null;try{return g.call(c)}finally{h[i]=j}}function n(a){var c=b(a,!1).listeners,d=[];if(c)for(var e in c)!h[e]&&c[e]&&d.push(e);return d}function o(a,b,c){return a!==Ember&&"function"==typeof a.sendEvent&&a.sendEvent(b,c),i(a,b,j,c),!0}function p(a,b,c){var d=[];return i(a,b,function(a){d.push(a)}),function(){if(a.isDestroyed)return;a!==Ember&&"function"==typeof a.sendEvent&&a.sendEvent(b,c);for(var e=0,f=d.length;e<f;++e)j(d[e],c,a)}}function q(a,b){if(i(a,b,function(){return!0}))return!0;var d=c(a,["listeners"],!0);return d[b]=null,!1}function r(a,b){var c=[];return i(a,b,function(a){c.push([a.target,a.method])}),c}var a=Ember.create,b=Ember.meta,c=Ember.metaPath,d=Ember.guidFor,e=[].slice,h={__ember_source__:!0};Ember.addListener=k,Ember.removeListener=l,Ember._suspendListener=m,Ember.sendEvent=o,Ember.hasListeners=q,Ember.watchedEvents=n,Ember.listenersFor=r,Ember.deferEvent=p}(),function(){function c(b,c,d,e){c===undefined&&(c=b,b=undefined),"string"==typeof c&&(c=b[c]),d&&e>0&&(d=d.length>e?a.call(d,e):null);if("function"!=typeof Ember.onerror)return c.apply(b||this,d||[]);try{return c.apply(b||this,d||[])}catch(f){Ember.onerror(f)}}function h(){g=null,f.currentRunLoop&&f.end()}function k(){j=null;var a=+(new Date),b=-1;for(var d in i){if(!i.hasOwnProperty(d))continue;var e=i[d];if(e&&e.expires)if(a>=e.expires)delete i[d],c(e.target,e.method,e.args,2);else if(b<0||e.expires<b)b=e.expires}b>0&&(j=setTimeout(k,b- +(new Date)))}function l(a,b){b[this.tguid]&&delete b[this.tguid][this.mguid],i[a]&&c(this.target,this.method,this.args,2),delete i[a]}function n(){m=null;for(var a in i){if(!i.hasOwnProperty(a))continue;var b=i[a];b.next&&(delete i[a],c(b.target,b.method,b.args,2))}}var a=[].slice,b=Ember.ArrayPolyfills.forEach,d,e=function(a){this._prev=a||null,this.onceTimers={}};e.prototype={end:function(){this.flush()},prev:function(){return this._prev},schedule:function(b,c,d){var e=this._queues,f;e||(e=this._queues={}),f=e[b],f||(f=e[b]=[]);var g=arguments.length>3?a.call(arguments,3):null;return f.push({target:c,method:d,args:g}),this},flush:function(a){function j(a){c(a.target,a.method,a.args)}var e,f,g,h,i;if(!this._queues)return this;Ember.watch.flushPending();if(a)while(this._queues&&(h=this._queues[a])){this._queues[a]=null;if(a==="sync"){i=Ember.LOG_BINDINGS,i&&Ember.Logger.log("Begin: Flush Sync Queue"),Ember.beginPropertyChanges();try{b.call(h,j)}finally{Ember.endPropertyChanges()}i&&Ember.Logger.log("End: Flush Sync Queue")}else b.call(h,j)}else{e=Ember.run.queues,g=e.length,f=0;a:while(f<g){a=e[f],h=this._queues&&this._queues[a],delete this._queues[a];if(h)if(a==="sync"){i=Ember.LOG_BINDINGS,i&&Ember.Logger.log("Begin: Flush Sync Queue"),Ember.beginPropertyChanges();try{b.call(h,j)}finally{Ember.endPropertyChanges()}i&&Ember.Logger.log("End: Flush Sync Queue")}else b.call(h,j);for(var k=0;k<=f;k++)if(this._queues&&this._queues[e[k]]){f=k;continue a}f++}}return d=null,this}},Ember.RunLoop=e,Ember.run=function(a,b){var d,e;f.begin();try{if(a||b)d=c(a,b,arguments,2)}finally{f.end()}return d};var f=Ember.run;Ember.run.begin=function(){f.currentRunLoop=new e(f.currentRunLoop)},Ember.run.end=function(){try{f.currentRunLoop.end()}finally{f.currentRunLoop=f.currentRunLoop.prev()}},Ember.run.queues=["sync","actions","destroy","timers"],Ember.run.schedule=function(a,b,c){var d=f.autorun();d.schedule.apply(d,arguments)};var g;Ember.run.hasScheduledTimers=function(){return!!(g||j||m)},Ember.run.cancelTimers=function(){g&&(clearTimeout(g),g=null),j&&(clearTimeout(j),j=null),m&&(clearTimeout(m),m=null),i={}},Ember.run.autorun=function(){return f.currentRunLoop||(f.begin(),g||(g=setTimeout(h,1))),f.currentRunLoop},Ember.run.sync=function(){f.autorun(),f.currentRunLoop.flush("sync")};var i={},j;Ember.run.later=function(b,c){var d,e,g,h,j;return arguments.length===2&&"function"==typeof b?(j=c,c=b,b=undefined,d=[b,c]):(d=a.call(arguments),j=d.pop()),e=+(new Date)+j,g={target:b,method:c,expires:e,args:d},h=Ember.guidFor(g),i[h]=g,f.once(i,k),h},Ember.run.once=function(b,c){var d=Ember.guidFor(b),e=Ember.guidFor(c),g=f.autorun().onceTimers,h=g[d]&&g[d][e],j;return h&&i[h]?i[h].args=a.call(arguments):(j={target:b,method:c,args:a.call(arguments),tguid:d,mguid:e},h=Ember.guidFor(j),i[h]=j,g[d]||(g[d]={}),g[d][e]=h,f.schedule("actions",j,l,h,g)),h};var m;Ember.run.next=function(b,c){var d,e={target:b,method:c,args:a.call(arguments),next:!0};return d=Ember.guidFor(e),i[d]=e,m||(m=setTimeout(n,1)),d},Ember.run.cancel=function(a){delete i[a]}}(),function(){function e(b,c){return a(d(c)?window:b,c)}function g(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])}Ember.LOG_BINDINGS=!!Ember.ENV.LOG_BINDINGS;var a=Ember.get,b=Ember.set,c=Ember.guidFor,d=Ember.isGlobalPath,f=function(a,b){this._direction="fwd",this._from=b,this._to=a,this._directionMap=Ember.Map.create()};f.prototype={copy:function(){var a=new f(this._to,this._from);return this._oneWay&&(a._oneWay=!0),a},from:function(a){return this._from=a,this},to:function(a){return this._to=a,this},oneWay:function(){return this._oneWay=!0,this},toString:function(){var a=this._oneWay?"[oneWay]":"";return"Ember.Binding<"+c(this)+">("+this._from+" -> "+this._to+")"+a},connect:function(a){var b=this._from,c=this._to;return Ember.trySet(a,c,e(a,b)),Ember.addObserver(a,b,this,this.fromDidChange),this._oneWay||Ember.addObserver(a,c,this,this.toDidChange),this._readyToSync=!0,this},disconnect:function(a){var b=!this._oneWay;return Ember.removeObserver(a,this._from,this,this.fromDidChange),b&&Ember.removeObserver(a,this._to,this,this.toDidChange),this._readyToSync=!1,this},fromDidChange:function(a){this._scheduleSync(a,"fwd")},toDidChange:function(a){this._scheduleSync(a,"back")},_scheduleSync:function(a,b){var c=this._directionMap,d=c.get(a);d||(Ember.run.schedule("sync",this,this._sync,a),c.set(a,b)),d==="back"&&b==="fwd"&&c.set(a,"fwd")},_sync:function(b){var c=Ember.LOG_BINDINGS;if(b.isDestroyed||!this._readyToSync)return;var d=this._directionMap,f=d.get(b),g=this._from,h=this._to;d.remove(b);if(f==="fwd"){var i=e(b,this._from);c&&Ember.Logger.log(" ",this.toString(),"->",i,b),this._oneWay?Ember.trySet(b,h,i):Ember._suspendObserver(b,h,this,this.toDidChange,function(){Ember.trySet(b,h,i)})}else if(f==="back"){var j=a(b,this._to);c&&Ember.Logger.log(" ",this.toString(),"<-",j,b),Ember._suspendObserver(b,g,this,this.fromDidChange,function(){Ember.trySet(Ember.isGlobalPath(g)?window:b,g,j)})}}},g(f,{from:function(){var a=this,b=new a;return b.from.apply(b,arguments)},to:function(){var a=this,b=new a;return b.to.apply(b,arguments)},oneWay:function(a,b){var c=this,d=new c(null,a);return d.oneWay(b)}}),Ember.Binding=f,Ember.bind=function(a,b,c){return(new Ember.Binding(b,c)).connect(a)},Ember.oneWay=function(a,b,c){return(new Ember.Binding(b,c)).oneWay().connect(a)}}(),function(){function o(a){var b=Ember.meta(a,!0),c=b.mixins;return c?c.__emberproto__!==a&&(c=b.mixins=l(c),c.__emberproto__=a):c=b.mixins={__emberproto__:a},c}function p(b,c){return c&&c.length>0&&(b.mixins=f.call(c,function(b){if(b instanceof a)return b;var c=new a;return c.properties=b,c})),b}function q(a){return"function"==typeof a&&a.isMethod!==!1&&a!==Boolean&&a!==Object&&a!==Number&&a!==Array&&a!==Date&&a!==String}function r(c,d,e,f,i){function v(a){delete e[a],delete f[a]}var j=c.length,k,l,m,o,p,s,t,u;for(k=0;k<j;k++){l=c[k];if(l instanceof a){m=n(l);if(d[m])continue;d[m]=l,o=l.properties}else o=l;if(o){u=f.concatenatedProperties||i.concatenatedProperties,o.concatenatedProperties&&(u=u?u.concat(o.concatenatedProperties):o.concatenatedProperties);for(s in o){if(!o.hasOwnProperty(s))continue;p=o[s];if(p instanceof Ember.Descriptor){if(p===b&&e[s])continue;e[s]=p,f[s]=undefined}else{if(q(p)){t=e[s]===undefined&&f[s],t||(t=i[s]),"function"!=typeof t&&(t=null);if(t){var w=p.__ember_observes__,x=p.__ember_observesBefore__;p=Ember.wrap(p,t),p.__ember_observes__=w,p.__ember_observesBefore__=x}}else if(u&&g.call(u,s)>=0||s==="concatenatedProperties"){var y=f[s]||i[s];p=y?y.concat(p):Ember.makeArray(p)}e[s]=undefined,f[s]=p}}o.hasOwnProperty("toString")&&(i.toString=o.toString)}else l.mixins&&(r(l.mixins,d,e,f,i),l._without&&h.call(l._without,v))}}function s(a){var b=Ember.meta(a),c=b.required;if(!c||c.__emberproto__!==a)c=b.required=c?l(c):{__ember_count__:0},c.__emberproto__=a;return c}function u(a,b,c,d){if(t.test(b)){var e=d.bindings;e?e.__emberproto__!==a&&(e=d.bindings=l(d.bindings),e.__emberproto__=a):e=d.bindings={__emberproto__:a},e[b]=c}}function v(a,b){var c=b.bindings,d,e,f;if(c){for(d in c)e=d!=="__emberproto__"&&c[d],e&&(f=d.slice(0,-7),e instanceof Ember.Binding?(e=e.copy(),e.to(f)):e=new Ember.Binding(f,e),e.connect(a),a[d]=e);b.bindings={__emberproto__:a}}}function w(a,b){return v(a,b||Ember.meta(a)),a}function x(a,d,e){var f={},g={},h=Ember.meta(a),i=h.required,j,l,n,p,q,t,v;r(d,o(a),f,g,a);for(j in g){if(j==="contructor")continue;if(!g.hasOwnProperty(j))continue;n=f[j],l=g[j];if(n===b)j in a||(i=s(a),i.__ember_count__++,i[j]=!0);else{while(n&&n instanceof c){var x=n.methodName;f[x]||g[x]?(l=g[x],n=f[x]):h.descs[x]?(n=h.descs[x],l=undefined):(n=undefined,l=a[x])}if(n===undefined&&l===undefined)continue;p=a[j];if("function"==typeof p)if(q=p.__ember_observesBefore__){t=q.length;for(v=0;v<t;v++)Ember.removeBeforeObserver(a,q[v],null,j)}else if(q=p.__ember_observes__){t=q.length;for(v=0;v<t;v++)Ember.removeObserver(a,q[v],null,j)}u(a,j,l,h),m(a,j,n,l,h);if("function"==typeof l)if(q=l.__ember_observesBefore__){t=q.length;for(v=0;v<t;v++)Ember.addBeforeObserver(a,q[v],null,j)}else if(q=l.__ember_observes__){t=q.length;for(v=0;v<t;v++)Ember.addObserver(a,q[v],null,j)}i&&i[j]&&(i=s(a),i.__ember_count__--,i[j]=!1)}}e||w(a,h);if(!e&&i&&i.__ember_count__>0){var y=[];for(j in i){if(k[j])continue;y.push(j)}}return a
}function z(a,b,c){var d=n(a);if(c[d])return!1;c[d]=!0;if(a===b)return!0;var e=a.mixins,f=e?e.length:0;while(--f>=0)if(z(e[f],b,c))return!0;return!1}function A(a,b,c){if(c[n(b)])return;c[n(b)]=!0;if(b.properties){var d=b.properties;for(var e in d)d.hasOwnProperty(e)&&(a[e]=!0)}else b.mixins&&h.call(b.mixins,function(b){A(a,b,c)})}function D(a,b,c){var e=a.length;for(var f in b){if(!b.hasOwnProperty||!b.hasOwnProperty(f))continue;var g=b[f];a[e]=f;if(g&&g.toString===d)g[B]=a.join(".");else if(g&&C(g,"isNamespace")){if(c[n(g)])continue;c[n(g)]=!0,D(a,g,c)}}a.length=e}function E(){var a=Ember.Namespace,b,c;if(a.PROCESSED)return;for(var d in window){if(d==="globalStorage"&&window.StorageList&&window.globalStorage instanceof window.StorageList)continue;if(window.hasOwnProperty&&!window.hasOwnProperty(d))continue;try{b=window[d],c=b&&C(b,"isNamespace")}catch(e){continue}c&&(b[B]=d)}}var a,b,c,d,e,f=Ember.ArrayPolyfills.map,g=Ember.ArrayPolyfills.indexOf,h=Ember.ArrayPolyfills.forEach,i=[].slice,j={},k={__emberproto__:!0,__ember_count__:!0},l=Ember.create,m=Ember.defineProperty,n=Ember.guidFor,t=Ember.IS_BINDING=/^.+Binding$/;Ember.mixin=function(a){var b=i.call(arguments,1);return x(a,b,!1),a},Ember.Mixin=function(){return p(this,arguments)},a=Ember.Mixin,a._apply=x,a.applyPartial=function(a){var b=i.call(arguments,1);return x(a,b,!0)},a.finishPartial=w,a.create=function(){d.processed=!1;var a=this;return p(new a,arguments)};var y=a.prototype;y.reopen=function(){var b,c;this.properties?(b=a.create(),b.properties=this.properties,delete this.properties,this.mixins=[b]):this.mixins||(this.mixins=[]);var d=arguments.length,e=this.mixins,f;for(f=0;f<d;f++)b=arguments[f],b instanceof a?e.push(b):(c=a.create(),c.properties=b,e.push(c));return this},y.apply=function(a){return x(a,[this],!1)},y.applyPartial=function(a){return x(a,[this],!0)},y.detect=function(b){if(!b)return!1;if(b instanceof a)return z(b,this,{});var c=Ember.meta(b,!1).mixins;return c?!!c[n(this)]:!1},y.without=function(){var b=new a(this);return b._without=i.call(arguments),b},y.keys=function(){var a={},b={},c=[];A(a,this,b);for(var d in a)a.hasOwnProperty(d)&&c.push(d);return c};var B=Ember.GUID_KEY+"_name",C=Ember.get;Ember.identifyNamespaces=E,e=function(a){var b=a.superclass;if(b)return b[B]?b[B]:e(b);return},d=function(){var a=Ember.Namespace,b;if(a&&!this[B]&&!d.processed){a.PROCESSED||(E(),a.PROCESSED=!0),d.processed=!0;var c=a.NAMESPACES;for(var f=0,g=c.length;f<g;f++)b=c[f],D([b.toString()],b,{})}if(this[B])return this[B];var h=e(this);return h?"(subclass of "+h+")":"(unknown mixin)"},y.toString=d,a.mixins=function(a){var b=[],c=Ember.meta(a,!1).mixins,d,e;if(c)for(d in c){if(k[d])continue;e=c[d],e.properties||b.push(c[d])}return b},b=new Ember.Descriptor,b.toString=function(){return"(Required Property)"},Ember.required=function(){return b},c=function(a){this.methodName=a},c.prototype=new Ember.Descriptor,Ember.alias=function(a){return new c(a)},Ember.observer=function(a){var b=i.call(arguments,1);return a.__ember_observes__=b,a},Ember.immediateObserver=function(){for(var a=0,b=arguments.length;a<b;a++)var c=arguments[a];return Ember.observer.apply(this,arguments)},Ember.beforeObserver=function(a){var b=i.call(arguments,1);return a.__ember_observesBefore__=b,a}}(),function(){}(),function(){}(),function(){function e(b,c,d,f){var g,h,i;if("object"!=typeof b||b===null)return b;if(c&&(h=a(d,b))>=0)return f[h];if(Ember.typeOf(b)==="array"){g=b.slice();if(c){h=g.length;while(--h>=0)g[h]=e(g[h],c,d,f)}}else if(Ember.Copyable&&Ember.Copyable.detect(b))g=b.copy(c,d,f);else{g={};for(i in b){if(!b.hasOwnProperty(i))continue;g[i]=c?e(b[i],c,d,f):b[i]}}return c&&(d.push(b),f.push(g)),g}var a=Ember.EnumerableUtils.indexOf,b={},c="Boolean Number String Function Array Date RegExp Object".split(" ");Ember.ArrayPolyfills.forEach.call(c,function(a){b["[object "+a+"]"]=a.toLowerCase()});var d=Object.prototype.toString;Ember.typeOf=function(a){var c;return c=a===null||a===undefined?String(a):b[d.call(a)]||"object",c==="function"?Ember.Object&&Ember.Object.detect(a)&&(c="class"):c==="object"&&(a instanceof Error?c="error":Ember.Object&&a instanceof Ember.Object?c="instance":c="object"),c},Ember.none=function(a){return a===null||a===undefined},Ember.empty=function(a){return a===null||a===undefined||a.length===0&&typeof a!="function"},Ember.compare=function f(a,b){if(a===b)return 0;var c=Ember.typeOf(a),d=Ember.typeOf(b),e=Ember.Comparable;if(e){if(c==="instance"&&e.detect(a.constructor))return a.constructor.compare(a,b);if(d==="instance"&&e.detect(b.constructor))return 1-b.constructor.compare(b,a)}var g=Ember.ORDER_DEFINITION_MAPPING;if(!g){var h=Ember.ORDER_DEFINITION;g=Ember.ORDER_DEFINITION_MAPPING={};var i,j;for(i=0,j=h.length;i<j;++i)g[h[i]]=i;delete Ember.ORDER_DEFINITION}var k=g[c],l=g[d];if(k<l)return-1;if(k>l)return 1;switch(c){case"boolean":case"number":if(a<b)return-1;if(a>b)return 1;return 0;case"string":var m=a.localeCompare(b);if(m<0)return-1;if(m>0)return 1;return 0;case"array":var n=a.length,o=b.length,p=Math.min(n,o),q=0,r=0;while(q===0&&r<p)q=f(a[r],b[r]),r++;if(q!==0)return q;if(n<o)return-1;if(n>o)return 1;return 0;case"instance":if(Ember.Comparable&&Ember.Comparable.detect(a))return a.compare(a,b);return 0;case"date":var s=a.getTime(),t=b.getTime();if(s<t)return-1;if(s>t)return 1;return 0;default:return 0}},Ember.copy=function(a,b){return"object"!=typeof a||a===null?a:Ember.Copyable&&Ember.Copyable.detect(a)?a.copy(b):e(a,b,b?[]:null,b?[]:null)},Ember.inspect=function(a){var b,c=[];for(var d in a)if(a.hasOwnProperty(d)){b=a[d];if(b==="toString")continue;Ember.typeOf(b)==="function"&&(b="function() { ... }"),c.push(d+": "+b)}return"{"+c.join(" , ")+"}"},Ember.isEqual=function(a,b){return a&&"function"==typeof a.isEqual?a.isEqual(b):a===b},Ember.ORDER_DEFINITION=Ember.ENV.ORDER_DEFINITION||["undefined","null","boolean","number","string","array","object","instance","function","class","date"],Ember.keys=Object.keys,Ember.keys||(Ember.keys=function(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b}),Ember.Error=function(){var a=Error.prototype.constructor.apply(this,arguments);for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);this.message=a.message},Ember.Error.prototype=Ember.create(Error.prototype)}(),function(){var a=/[ _]/g,b={},c=/([a-z])([A-Z])/g,d=/(\-|_|\s)+(.)?/g,e=/([a-z\d])([A-Z]+)/g,f=/\-|\s+/g;Ember.STRINGS={},Ember.String={fmt:function(a,b){var c=0;return a.replace(/%@([0-9]+)?/g,function(a,d){return d=d?parseInt(d,0)-1:c++,a=b[d],(a===null?"(null)":a===undefined?"":a).toString()})},loc:function(a,b){return a=Ember.STRINGS[a]||a,Ember.String.fmt(a,b)},w:function(a){return a.split(/\s+/)},decamelize:function(a){return a.replace(c,"$1_$2").toLowerCase()},dasherize:function(c){var d=b,e=d[c];return e?e:(e=Ember.String.decamelize(c).replace(a,"-"),d[c]=e,e)},camelize:function(a){return a.replace(d,function(a,b,c){return c?c.toUpperCase():""})},classify:function(a){var b=Ember.String.camelize(a);return b.charAt(0).toUpperCase()+b.substr(1)},underscore:function(a){return a.replace(e,"$1_$2").replace(f,"_").toLowerCase()}}}(),function(){var a=Ember.String.fmt,b=Ember.String.w,c=Ember.String.loc,d=Ember.String.camelize,e=Ember.String.decamelize,f=Ember.String.dasherize,g=Ember.String.underscore;Ember.EXTEND_PROTOTYPES&&(String.prototype.fmt=function(){return a(this,arguments)},String.prototype.w=function(){return b(this)},String.prototype.loc=function(){return c(this,arguments)},String.prototype.camelize=function(){return d(this)},String.prototype.decamelize=function(){return e(this)},String.prototype.dasherize=function(){return f(this)},String.prototype.underscore=function(){return g(this)})}(),function(){var a=Array.prototype.slice;Ember.EXTEND_PROTOTYPES&&(Function.prototype.property=function(){var a=Ember.computed(this);return a.property.apply(a,arguments)},Function.prototype.observes=function(){return this.__ember_observes__=a.call(arguments),this},Function.prototype.observesBefore=function(){return this.__ember_observesBefore__=a.call(arguments),this})}(),function(){}(),function(){function f(){return e.length===0?{}:e.pop()}function g(a){return e.push(a),null}function h(b,c){function e(e){var f=a(e,b);return d?c===f:!!f}var d=arguments.length===2;return e}var a=Ember.get,b=Ember.set,c=Array.prototype.slice,d=Ember.EnumerableUtils.indexOf,e=[];Ember.Enumerable=Ember.Mixin.create({isEnumerable:!0,nextObject:Ember.required(Function),firstObject:Ember.computed(function(){if(a(this,"length")===0)return undefined;var b=f(),c;return c=this.nextObject(0,null,b),g(b),c}).property("[]").cacheable(),lastObject:Ember.computed(function(){var b=a(this,"length");if(b===0)return undefined;var c=f(),d=0,e,h=null;do h=e,e=this.nextObject(d++,h,c);while(e!==undefined);return g(c),h}).property("[]").cacheable(),contains:function(a){return this.find(function(b){return b===a})!==undefined},forEach:function(b,c){if(typeof b!="function")throw new TypeError;var d=a(this,"length"),e=null,h=f();c===undefined&&(c=null);for(var i=0;i<d;i++){var j=this.nextObject(i,e,h);b.call(c,j,i,this),e=j}return e=null,h=g(h),this},getEach:function(a){return this.mapProperty(a)},setEach:function(a,c){return this.forEach(function(d){b(d,a,c)})},map:function(a,b){var c=[];return this.forEach(function(d,e,f){c[e]=a.call(b,d,e,f)}),c},mapProperty:function(b){return this.map(function(c){return a(c,b)})},filter:function(a,b){var c=[];return this.forEach(function(d,e,f){a.call(b,d,e,f)&&c.push(d)}),c},filterProperty:function(a,b){return this.filter(h.apply(this,arguments))},find:function(b,c){var d=a(this,"length");c===undefined&&(c=null);var e=null,h,i=!1,j,k=f();for(var l=0;l<d&&!i;l++){h=this.nextObject(l,e,k);if(i=b.call(c,h,l,this))j=h;e=h}return h=e=null,k=g(k),j},findProperty:function(a,b){return this.find(h.apply(this,arguments))},every:function(a,b){return!this.find(function(c,d,e){return!a.call(b,c,d,e)})},everyProperty:function(a,b){return this.every(h.apply(this,arguments))},some:function(a,b){return!!this.find(function(c,d,e){return!!a.call(b,c,d,e)})},someProperty:function(a,b){return this.some(h.apply(this,arguments))},reduce:function(a,b,c){if(typeof a!="function")throw new TypeError;var d=b;return this.forEach(function(b,e){d=a.call(null,d,b,e,this,c)},this),d},invoke:function(a){var b,d=[];return arguments.length>1&&(b=c.call(arguments,1)),this.forEach(function(c,e){var f=c&&c[a];"function"==typeof f&&(d[e]=b?f.apply(c,b):f.call(c))},this),d},toArray:function(){var a=[];return this.forEach(function(b,c){a[c]=b}),a},compact:function(){return this.without(null)},without:function(a){if(!this.contains(a))return this;var b=[];return this.forEach(function(c){c!==a&&(b[b.length]=c)}),b},uniq:function(){var a=[];return this.forEach(function(b){d(a,b)<0&&a.push(b)}),a},"[]":Ember.computed(function(a,b){return this}).property().cacheable(),addEnumerableObserver:function(b,c){var d=c&&c.willChange||"enumerableWillChange",e=c&&c.didChange||"enumerableDidChange",f=a(this,"hasEnumerableObservers");return f||Ember.propertyWillChange(this,"hasEnumerableObservers"),Ember.addListener(this,"@enumerable:before",b,d),Ember.addListener(this,"@enumerable:change",b,e),f||Ember.propertyDidChange(this,"hasEnumerableObservers"),this},removeEnumerableObserver:function(b,c){var d=c&&c.willChange||"enumerableWillChange",e=c&&c.didChange||"enumerableDidChange",f=a(this,"hasEnumerableObservers");return f&&Ember.propertyWillChange(this,"hasEnumerableObservers"),Ember.removeListener(this,"@enumerable:before",b,d),Ember.removeListener(this,"@enumerable:change",b,e),f&&Ember.propertyDidChange(this,"hasEnumerableObservers"),this},hasEnumerableObservers:Ember.computed(function(){return Ember.hasListeners(this,"@enumerable:change")||Ember.hasListeners(this,"@enumerable:before")}).property().cacheable(),enumerableContentWillChange:function(b,c){var d,e,f;return"number"==typeof b?d=b:b?d=a(b,"length"):d=b=-1,"number"==typeof c?e=c:c?e=a(c,"length"):e=c=-1,f=e<0||d<0||e-d!==0,b===-1&&(b=null),c===-1&&(c=null),Ember.propertyWillChange(this,"[]"),f&&Ember.propertyWillChange(this,"length"),Ember.sendEvent(this,"@enumerable:before",[this,b,c]),this},enumerableContentDidChange:function(b,c){var d=this.propertyDidChange,e,f,g;return"number"==typeof b?e=b:b?e=a(b,"length"):e=b=-1,"number"==typeof c?f=c:c?f=a(c,"length"):f=c=-1,g=f<0||e<0||f-e!==0,b===-1&&(b=null),c===-1&&(c=null),Ember.sendEvent(this,"@enumerable:change",[this,b,c]),g&&Ember.propertyDidChange(this,"length"),Ember.propertyDidChange(this,"[]"),this}})}(),function(){function f(a){return a===null||a===undefined}var a=Ember.get,b=Ember.set,c=Ember.meta,d=Ember.EnumerableUtils.map,e=Ember.cacheFor;Ember.Array=Ember.Mixin.create(Ember.Enumerable,{isSCArray:!0,length:Ember.required(),objectAt:function(b){return b<0||b>=a(this,"length")?undefined:a(this,b)},objectsAt:function(a){var b=this;return d(a,function(a){return b.objectAt(a)})},nextObject:function(a){return this.objectAt(a)},"[]":Ember.computed(function(b,c){return c!==undefined&&this.replace(0,a(this,"length"),c),this}).property().cacheable(),firstObject:Ember.computed(function(){return this.objectAt(0)}).property().cacheable(),lastObject:Ember.computed(function(){return this.objectAt(a(this,"length")-1)}).property().cacheable(),contains:function(a){return this.indexOf(a)>=0},slice:function(b,c){var d=[],e=a(this,"length");f(b)&&(b=0);if(f(c)||c>e)c=e;while(b<c)d[d.length]=this.objectAt(b++);return d},indexOf:function(b,c){var d,e=a(this,"length");c===undefined&&(c=0),c<0&&(c+=e);for(d=c;d<e;d++)if(this.objectAt(d,!0)===b)return d;return-1},lastIndexOf:function(b,c){var d,e=a(this,"length");if(c===undefined||c>=e)c=e-1;c<0&&(c+=e);for(d=c;d>=0;d--)if(this.objectAt(d)===b)return d;return-1},addArrayObserver:function(b,c){var d=c&&c.willChange||"arrayWillChange",e=c&&c.didChange||"arrayDidChange",f=a(this,"hasArrayObservers");return f||Ember.propertyWillChange(this,"hasArrayObservers"),Ember.addListener(this,"@array:before",b,d),Ember.addListener(this,"@array:change",b,e),f||Ember.propertyDidChange(this,"hasArrayObservers"),this},removeArrayObserver:function(b,c){var d=c&&c.willChange||"arrayWillChange",e=c&&c.didChange||"arrayDidChange",f=a(this,"hasArrayObservers");return f&&Ember.propertyWillChange(this,"hasArrayObservers"),Ember.removeListener(this,"@array:before",b,d),Ember.removeListener(this,"@array:change",b,e),f&&Ember.propertyDidChange(this,"hasArrayObservers"),this},hasArrayObservers:Ember.computed(function(){return Ember.hasListeners(this,"@array:change")||Ember.hasListeners(this,"@array:before")}).property().cacheable(),arrayContentWillChange:function(b,c,d){b===undefined?(b=0,c=d=-1):(c===undefined&&(c=-1),d===undefined&&(d=-1)),Ember.isWatching(this,"@each")&&a(this,"@each"),Ember.sendEvent(this,"@array:before",[this,b,c,d]);var e,f;if(b>=0&&c>=0&&a(this,"hasEnumerableObservers")){e=[],f=b+c;for(var g=b;g<f;g++)e.push(this.objectAt(g))}else e=c;return this.enumerableContentWillChange(e,d),this},arrayContentDidChange:function(b,c,d){b===undefined?(b=0,c=d=-1):(c===undefined&&(c=-1),d===undefined&&(d=-1));var f,g;if(b>=0&&d>=0&&a(this,"hasEnumerableObservers")){f=[],g=b+d;for(var h=b;h<g;h++)f.push(this.objectAt(h))}else f=d;this.enumerableContentDidChange(c,f),Ember.sendEvent(this,"@array:change",[this,b,c,d]);var i=a(this,"length"),j=e(this,"firstObject"),k=e(this,"lastObject");return this.objectAt(0)!==j&&(Ember.propertyWillChange(this,"firstObject"),Ember.propertyDidChange(this,"firstObject")),this.objectAt(i-1)!==k&&(Ember.propertyWillChange(this,"lastObject"),Ember.propertyDidChange(this,"lastObject")),this},"@each":Ember.computed(function(){return this.__each||(this.__each=new Ember.EachProxy(this)),this.__each}).property().cacheable()})}(),function(){Ember.Comparable=Ember.Mixin.create({isComparable:!0,compare:Ember.required(Function)})}(),function(){var a=Ember.get,b=Ember.set;Ember.Copyable=Ember.Mixin.create({copy:Ember.required(Function),frozenCopy:function(){if(Ember.Freezable&&Ember.Freezable.detect(this))return a(this,"isFrozen")?this:this.copy().freeze();throw new Error(Ember.String.fmt("%@ does not support freezing",[this]))}})}(),function(){var a=Ember.get,b=Ember.set;Ember.Freezable=Ember.Mixin.create({isFrozen:!1,freeze:function(){return a(this,"isFrozen")?this:(b(this,"isFrozen",!0),this)}}),Ember.FROZEN_ERROR="Frozen object cannot be modified."}(),function(){var a=Ember.EnumerableUtils.forEach;Ember.MutableEnumerable=Ember.Mixin.create(Ember.Enumerable,{addObject:Ember.required(Function),addObjects:function(b){return Ember.beginPropertyChanges(this),a(b,function(a){this.addObject(a)},this),Ember.endPropertyChanges(this),this},removeObject:Ember.required(Function),removeObjects:function(b){return Ember.beginPropertyChanges(this),a(b,function(a){this.removeObject(a)},this),Ember.endPropertyChanges(this),this}})}(),function(){var a="Index out of range",b=[],c=Ember.get,d=Ember.set,e=Ember.EnumerableUtils.forEach;Ember.MutableArray=Ember.Mixin.create(Ember.Array,Ember.MutableEnumerable,{replace:Ember.required(),clear:function(){var a=c(this,"length");return a===0?this:(this.replace(0,a,b),this)},insertAt:function(b,d){if(b>c(this,"length"))throw new Error(a);return this.replace(b,0,[d]),this},removeAt:function(d,e){var f=0;if("number"==typeof d){if(d<0||d>=c(this,"length"))throw new Error(a);e===undefined&&(e=1),this.replace(d,e,b)}return this},pushObject:function(a){return this.insertAt(c(this,"length"),a),a},pushObjects:function(a){return this.replace(c(this,"length"),0,a),this},popObject:function(){var a=c(this,"length");if(a===0)return null;var b=this.objectAt(a-1);return this.removeAt(a-1,1),b},shiftObject:function(){if(c(this,"length")===0)return null;var a=this.objectAt(0);return this.removeAt(0),a},unshiftObject:function(a){return this.insertAt(0,a),a},unshiftObjects:function(a){return this.replace(0,0,a),this},reverseObjects:function(){var a=c(this,"length");if(a===0)return this;var b=this.toArray().reverse();return this.replace(0,a,b),this},removeObject:function(a){var b=c(this,"length")||0;while(--b>=0){var d=this.objectAt(b);d===a&&this.removeAt(b)}return this},addObject:function(a){return this.contains(a)||this.pushObject(a),this}})}(),function(){var a=Ember.get,b=Ember.set,c=Ember.defineProperty;Ember.Observable=Ember.Mixin.create({isObserverable:!0,get:function(b){return a(this,b)},getProperties:function(){var b={},c=arguments;arguments.length===1&&Ember.typeOf(arguments[0])==="array"&&(c=arguments[0]);for(var d=0;d<c.length;d++)b[c[d]]=a(this,c[d]);return b},set:function(a,c){return b(this,a,c),this},setProperties:function(a){return Ember.setProperties(this,a)},beginPropertyChanges:function(){return Ember.beginPropertyChanges(),this},endPropertyChanges:function(){return Ember.endPropertyChanges(),this},propertyWillChange:function(a){return Ember.propertyWillChange(this,a),this},propertyDidChange:function(a){return Ember.propertyDidChange(this,a),this},notifyPropertyChange:function(a){return this.propertyWillChange(a),this.propertyDidChange(a),this},addBeforeObserver:function(a,b,c){Ember.addBeforeObserver(this,a,b,c)},addObserver:function(a,b,c){Ember.addObserver(this,a,b,c)},removeObserver:function(a,b,c){Ember.removeObserver(this,a,b,c)},hasObserverFor:function(a){return Ember.hasListeners(this,a+":change")},unknownProperty:function(a){return undefined},setUnknownProperty:function(a,d){c(this,a),b(this,a,d)},getPath:function(a){return this.get(a)},setPath:function(a,b){return this.set(a,b)},getWithDefault:function(a,b){return Ember.getWithDefault(this,a,b)},incrementProperty:function(c,d){return d||(d=1),b(this,c,(a(this,c)||0)+d),a(this,c)},decrementProperty:function(c,d){return d||(d=1),b(this,c,(a(this,c)||0)-d),a(this,c)},toggleProperty:function(c){return b(this,c,!a(this,c)),a(this,c)},cacheFor:function(a){return Ember.cacheFor(this,a)},observersForKey:function(a){return Ember.observersFor(this,a)}})}(),function(){var a=Ember.get,b=Ember.set;Ember.TargetActionSupport=Ember.Mixin.create({target:null,action:null,targetObject:Ember.computed(function(){var b=a(this,"target");if(Ember.typeOf(b)==="string"){var c=a(this,b);return c===undefined&&(c=a(window,b)),c}return b}).property("target").cacheable(),triggerAction:function(){var b=a(this,"action"),c=a(this,"targetObject");if(c&&b){var d;return typeof c.send=="function"?d=c.send(b,this):(typeof b=="string"&&(b=c[b]),d=b.call(c,this)),d!==!1&&(d=!0),d}return!1}})}(),function(){Ember.Evented=Ember.Mixin.create({on:function(a,b,c){Ember.addListener(this,a,b,c)},one:function(a,b,c){c||(c=b,b=null);var d=this,e=function(){Ember.removeListener(d,a,b,e),"string"==typeof c&&(c=this[c]),c.apply(this,arguments)};this.on(a,b,e)},trigger:function(a){var b=[],c,d;for(c=1,d=arguments.length;c<d;c++)b.push(arguments[c]);Ember.sendEvent(this,a,b)},fire:function(a){this.trigger.apply(this,arguments)},off:function(a,b,c){Ember.removeListener(this,a,b,c)},has:function(a){return Ember.hasListeners(this,a)}})}(),function(){}(),function(){function m(){var b=!1,c,d=function(){b||d.proto();var a=Ember.meta(this);a.proto=this,c&&(this.reopen.apply(this,c),c=null),e(this,Ember.GUID_KEY,l),e(this,"_super",l),j(this,a),delete a.proto,i(this),this.init.apply(this,arguments)};return d.toString=a,d.willReopen=function(){b&&(d.PrototypeMixin=Ember.Mixin.create(d.PrototypeMixin)),b=!1},d._initMixins=function(a){c=a},d.proto=function(){var a=d.superclass;return a&&a.proto(),b||(b=!0,d.PrototypeMixin.applyPartial(d.prototype),h(d.prototype)),this.prototype},d}var a=Ember.Mixin.prototype.toString,b=Ember.set,c=Ember.get,d=Ember.create,e=Ember.platform.defineProperty,f=Array.prototype.slice,g=Ember.meta,h=Ember.rewatch,i=Ember.finishChains,j=Ember.Mixin.finishPartial,k=Ember.Mixin.prototype.reopen,l={configurable:!0,writable:!0,enumerable:!1,value:undefined},n=m();n.PrototypeMixin=Ember.Mixin.create({reopen:function(){return Ember.Mixin._apply(this,arguments,!0),this},isInstance:!0,init:function(){},isDestroyed:!1,isDestroying:!1,destroy:function(){if(this.isDestroying)return;return this.isDestroying=!0,this.willDestroy&&this.willDestroy(),b(this,"isDestroyed",!0),Ember.run.schedule("destroy",this,this._scheduledDestroy),this},_scheduledDestroy:function(){Ember.destroy(this),this.didDestroy&&this.didDestroy()},bind:function(a,b){return b instanceof Ember.Binding||(b=Ember.Binding.from(b)),b.to(a).connect(this),b},toString:function(){return"<"+this.constructor.toString()+":"+Ember.guidFor(this)+">"}}),Ember.config.overridePrototypeMixin&&Ember.config.overridePrototypeMixin(n.PrototypeMixin),n.__super__=null;var o=Ember.Mixin.create({ClassMixin:Ember.required(),PrototypeMixin:Ember.required(),isClass:!0,isMethod:!1,extend:function(){var a=m(),b;return a.ClassMixin=Ember.Mixin.create(this.ClassMixin),a.PrototypeMixin=Ember.Mixin.create(this.PrototypeMixin),a.ClassMixin.ownerConstructor=a,a.PrototypeMixin.ownerConstructor=a,k.apply(a.PrototypeMixin,arguments),a.superclass=this,a.__super__=this.prototype,b=a.prototype=d(this.prototype),b.constructor=a,Ember.generateGuid(b,"ember"),g(b).proto=b,a.ClassMixin.apply(a),a},create:function(){var a=this;return arguments.length>0&&this._initMixins(arguments),new a},reopen:function(){return this.willReopen(),k.apply(this.PrototypeMixin,arguments),this},reopenClass:function(){return k.apply(this.ClassMixin,arguments),Ember.Mixin._apply(this,arguments,!1),this},detect:function(a){if("function"!=typeof a)return!1;while(a){if(a===this)return!0;a=a.superclass}return!1},detectInstance:function(a){return a instanceof this},metaForProperty:function(a){var b=g(this.proto(),!1).descs[a];return b._meta||{}},eachComputedProperty:function(a,b){var c=this.proto(),d=g(c).descs,e={},f;for(var h in d)f=d[h],f instanceof Ember.ComputedProperty&&a.call(b||this,h,f._meta||e)}});Ember.config.overrideClassMixin&&Ember.config.overrideClassMixin(o),n.ClassMixin=o,o.apply(n),Ember.CoreObject=n}(),function(){var a=Ember.get,b=Ember.set,c=Ember.guidFor,d=Ember.none;Ember.Set=Ember.CoreObject.extend(Ember.MutableEnumerable,Ember.Copyable,Ember.Freezable,{length:0,clear:function(){if(this.isFrozen)throw new Error(Ember.FROZEN_ERROR);var d=a(this,"length");if(d===0)return this;var e;this.enumerableContentWillChange(d,0),Ember.propertyWillChange(this,"firstObject"),Ember.propertyWillChange(this,"lastObject");for(var f=0;f<d;f++)e=c(this[f]),delete this[e],delete this[f];return b(this,"length",0),Ember.propertyDidChange(this,"firstObject"),Ember.propertyDidChange(this,"lastObject"),this.enumerableContentDidChange(d,0),this},isEqual:function(b){if(!Ember.Enumerable.detect(b))return!1;var c=a(this,"length");if(a(b,"length")!==c)return!1;while(--c>=0)if(!b.contains(this[c]))return!1;return!0},add:Ember.alias("addObject"),remove:Ember.alias("removeObject"),pop:function(){if(a(this,"isFrozen"))throw new Error(Ember.FROZEN_ERROR);var b=this.length>0?this[this.length-1]:null;return this.remove(b),b},push:Ember.alias("addObject"),shift:Ember.alias("pop"),unshift:Ember.alias("push"),addEach:Ember.alias("addObjects"),removeEach:Ember.alias("removeObjects"),init:function(a){this._super(),a&&this.addObjects(a)},nextObject:function(a){return this[a]},firstObject:Ember.computed(function(){return this.length>0?this[0]:undefined}).property().cacheable(),lastObject:Ember.computed(function(){return this.length>0?this[this.length-1]:undefined}).property().cacheable(),addObject:function(e){if(a(this,"isFrozen"))throw new Error(Ember.FROZEN_ERROR);if(d(e))return this;var f=c(e),g=this[f],h=a(this,"length"),i;return g>=0&&g<h&&this[g]===e?this:(i=[e],this.enumerableContentWillChange(null,i),Ember.propertyWillChange(this,"lastObject"),h=a(this,"length"),this[f]=h,this[h]=e,b(this,"length",h+1),Ember.propertyDidChange(this,"lastObject"),this.enumerableContentDidChange(null,i),this)},removeObject:function(e){if(a(this,"isFrozen"))throw new Error(Ember.FROZEN_ERROR);if(d(e))return this;var f=c(e),g=this[f],h=a(this,"length"),i=g===0,j=g===h-1,k,l;return g>=0&&g<h&&this[g]===e&&(l=[e],this.enumerableContentWillChange(l,null),i&&Ember.propertyWillChange(this,"firstObject"),j&&Ember.propertyWillChange(this,"lastObject"),g<h-1&&(k=this[h-1],this[g]=k,this[c(k)]=g),delete this[f],delete this[h-1],b(this,"length",h-1),i&&Ember.propertyDidChange(this,"firstObject"),j&&Ember.propertyDidChange(this,"lastObject"),this.enumerableContentDidChange(l,null)),this},contains:function(a){return this[c(a)]>=0},copy:function(){var d=this.constructor,e=new d,f=a(this,"length");b(e,"length",f);while(--f>=0)e[f]=this[f],e[c(this[f])]=f;return e},toString:function(){var a=this.length,b,c=[];for(b=0;b<a;b++)c[b]=this[b];return"Ember.Set<%@>".fmt(c.join(","))}})}(),function(){Ember.Object=Ember.CoreObject.extend(Ember.Observable)}(),function(){var a=Ember.ArrayPolyfills.indexOf;Ember.Namespace=Ember.Object.extend({isNamespace:!0,init:function(){Ember.Namespace.NAMESPACES.push(this),Ember.Namespace.PROCESSED=!1},toString:function(){return Ember.identifyNamespaces(),this[Ember.GUID_KEY+"_name"]},destroy:function(){var b=Ember.Namespace.NAMESPACES;window[this.toString()]=undefined,b.splice(a.call(b,this),1),this._super()}}),Ember.Namespace.NAMESPACES=[Ember],Ember.Namespace.PROCESSED=!1}(),function(){Ember.Application=Ember.Namespace.extend()}(),function(){var a=Ember.get,b=Ember.set;Ember.ArrayProxy=Ember.Object.extend(Ember.MutableArray,{content:null,arrangedContent:Ember.computed("content",function(){return a(this,"content")}).cacheable(),objectAtContent:function(b){return a(this,"arrangedContent").objectAt(b)},replaceContent:function(b,c,d){a(this,"arrangedContent").replace(b,c,d)},_contentWillChange:Ember.beforeObserver(function(){var b=a(this,"content");b&&b.removeArrayObserver(this,{willChange:"contentArrayWillChange",didChange:"contentArrayDidChange"})},"content"),contentArrayWillChange:Ember.K,contentArrayDidChange:Ember.K,_contentDidChange:Ember.observer(function(){var b=a(this,"content"),c=b?a(b,"length"):0;b&&b.addArrayObserver(this,{willChange:"contentArrayWillChange",didChange:"contentArrayDidChange"})},"content"),_arrangedContentWillChange:Ember.beforeObserver(function(){var b=a(this,"arrangedContent"),c=b?a(b,"length"):0;this.arrangedContentArrayWillChange(this,0,c,undefined),b&&b.removeArrayObserver(this,{willChange:"arrangedContentArrayWillChange",didChange:"arrangedContentArrayDidChange"})},"arrangedContent"),_arrangedContentDidChange:Ember.observer(function(){var b=a(this,"arrangedContent"),c=b?a(b,"length"):0;b&&b.addArrayObserver(this,{willChange:"arrangedContentArrayWillChange",didChange:"arrangedContentArrayDidChange"}),this.arrangedContentArrayDidChange(this,0,undefined,c)},"arrangedContent"),objectAt:function(b){return a(this,"content")&&this.objectAtContent(b)},length:Ember.computed(function(){var b=a(this,"arrangedContent");return b?a(b,"length"):0}).property().cacheable(),replace:function(b,c,d){return a(this,"content")&&this.replaceContent(b,c,d),this},arrangedContentArrayWillChange:function(a,b,c,d){this.arrayContentWillChange(b,c,d)},arrangedContentArrayDidChange:function(a,b,c,d){this.arrayContentDidChange(b,c,d)},init:function(){this._super(),this._contentWillChange(),this._contentDidChange(),this._arrangedContentWillChange(),this._arrangedContentDidChange()}})}(),function(){function j(a,b){var c=b.slice(8);if(c in this)return;h(this,c)}function k(a,b){var c=b.slice(8);if(c in this)return;i(this,c)}var a=Ember.get,b=Ember.set,c=Ember.String.fmt,d=Ember.addBeforeObserver,e=Ember.addObserver,f=Ember.removeBeforeObserver,g=Ember.removeObserver,h=Ember.propertyWillChange,i=Ember.propertyDidChange;Ember.ObjectProxy=Ember.Object.extend({content:null,_contentDidChange:Ember.observer(function(){},"content"),willWatchProperty:function(a){var b="content."+a;d(this,b,null,j),e(this,b,null,k)},didUnwatchProperty:function(a){var b="content."+a;f(this,b,null,j),g(this,b,null,k)},unknownProperty:function(b){var c=a(this,"content");if(c)return a(c,b)},setUnknownProperty:function(c,d){var e=a(this,"content");return b(e,c,d)}})}(),function(){function g(a,b,d,e,f){var g=d._objects,h;g||(g=d._objects={});while(--f>=e){var i=a.objectAt(f);i&&(Ember.addBeforeObserver(i,b,d,"contentKeyWillChange"),Ember.addObserver(i,b,d,"contentKeyDidChange"),h=c(i),g[h]||(g[h]=[]),g[h].push(f))}}function h(a,b,d,e,f){var g=d._objects;g||(g=d._objects={});var h,i;while(--f>=e){var j=a.objectAt(f);j&&(Ember.removeBeforeObserver(j,b,d,"contentKeyWillChange"),Ember.removeObserver(j,b,d,"contentKeyDidChange"),i=c(j),h=g[i],h[h.indexOf(f)]=null)}}var a=Ember.set,b=Ember.get,c=Ember.guidFor,d=Ember.EnumerableUtils.forEach,e=Ember.Object.extend(Ember.Array,{init:function(a,b,c){this._super(),this._keyName=b,this._owner=c,this._content=a},objectAt:function(a){var c=this._content.objectAt(a);return c&&b(c,this._keyName)},length:Ember.computed(function(){var a=this._content;return a?b(a,"length"):0}).property().cacheable()}),f=/^.+:(before|change)$/;Ember.EachProxy=Ember.Object.extend({init:function(a){this._super(),this._content=a,a.addArrayObserver(this),d(Ember.watchedEvents(this),function(a){this.didAddListener(a)},this)},unknownProperty:function(a,b){var c;return c=new e(this._content,a,this),Ember.defineProperty(this,a,null,c),this.beginObservingContentKey(a),c},arrayWillChange:function(a,b,c,d){var e=this._keys,f,g,i;i=c>0?b+c:-1,Ember.beginPropertyChanges(this);for(f in e){if(!e.hasOwnProperty(f))continue;i>0&&h(a,f,this,b,i),Ember.propertyWillChange(this,f)}Ember.propertyWillChange(this._content,"@each"),Ember.endPropertyChanges(this)},arrayDidChange:function(a,b,c,d){var e=this._keys,f,h,i;i=d>0?b+d:-1,Ember.beginPropertyChanges(this);for(f in e){if(!e.hasOwnProperty(f))continue;i>0&&g(a,f,this,b,i),Ember.propertyDidChange(this,f)}Ember.propertyDidChange(this._content,"@each"),Ember.endPropertyChanges(this)},didAddListener:function(a){f.test(a)&&this.beginObservingContentKey(a.slice(0,-7))},didRemoveListener:function(a){f.test(a)&&this.stopObservingContentKey(a.slice(0,-7))},beginObservingContentKey:function(a){var c=this._keys;c||(c=this._keys={});if(!c[a]){c[a]=1;var d=this._content,e=b(d,"length");g(d,a,this,0,e)}else c[a]++},stopObservingContentKey:function(a){var c=this._keys;if(c&&c[a]>0&&--c[a]<=0){var d=this._content,e=b(d,"length");h(d,a,this,0,e)}},contentKeyWillChange:function(a,b){Ember.propertyWillChange(this,b)},contentKeyDidChange:function(a,b){Ember.propertyDidChange(this,b)}})}(),function(){var a=Ember.get,b=Ember.set,c=Ember.Mixin.create(Ember.MutableArray,Ember.Observable,Ember.Copyable,{get:function(a){return a==="length"?this.length:"number"==typeof a?this[a]:this._super(a)},objectAt:function(a){return this[a]},replace:function(b,c,d){if(this.isFrozen)throw Ember.FROZEN_ERROR;var e=
d?a(d,"length"):0;this.arrayContentWillChange(b,c,e);if(!d||d.length===0)this.splice(b,c);else{var f=[b,c].concat(d);this.splice.apply(this,f)}return this.arrayContentDidChange(b,c,e),this},unknownProperty:function(a,b){var c;return b!==undefined&&c===undefined&&(c=this[a]=b),c},indexOf:function(a,b){var c,d=this.length;b===undefined?b=0:b=b<0?Math.ceil(b):Math.floor(b),b<0&&(b+=d);for(c=b;c<d;c++)if(this[c]===a)return c;return-1},lastIndexOf:function(a,b){var c,d=this.length;b===undefined?b=d-1:b=b<0?Math.ceil(b):Math.floor(b),b<0&&(b+=d);for(c=b;c>=0;c--)if(this[c]===a)return c;return-1},copy:function(){return this.slice()}}),d=["length"];Ember.EnumerableUtils.forEach(c.keys(),function(a){Array.prototype[a]&&d.push(a)}),d.length>0&&(c=c.without.apply(c,d)),Ember.NativeArray=c,Ember.A=function(a){return a===undefined&&(a=[]),Ember.NativeArray.apply(a)},Ember.NativeArray.activate=function(){c.apply(Array.prototype),Ember.A=function(a){return a||[]}},Ember.EXTEND_PROTOTYPES&&Ember.NativeArray.activate()}(),function(){var a=Ember.get,b=Ember.set;Ember._PromiseChain=Ember.Object.extend({promises:null,failureCallback:Ember.K,successCallback:Ember.K,abortCallback:Ember.K,promiseSuccessCallback:Ember.K,runNextPromise:function(){if(a(this,"isDestroyed"))return;var b=a(this,"promises").shiftObject();if(b){var c=a(b,"promise")||b,d=this,e=function(){d.promiseSuccessCallback.call(this,b,arguments),d.runNextPromise()},f=a(d,"failureCallback");c.then(e,f)}else this.successCallback()},start:function(){return this.runNextPromise(),this},abort:function(){this.abortCallback(),this.destroy()},init:function(){b(this,"promises",Ember.A(a(this,"promises"))),this._super()}})}(),function(){var a={},b={};Ember.onLoad=function(c,d){var e;a[c]=a[c]||Ember.A(),a[c].pushObject(d),(e=b[c])&&d(e)},Ember.runLoadHooks=function(c,d){var e;b[c]=d,(e=a[c])&&a[c].forEach(function(a){a(d)})}}(),function(){}(),function(){Ember.ControllerMixin=Ember.Mixin.create({target:null,store:null}),Ember.Controller=Ember.Object.extend(Ember.ControllerMixin)}(),function(){var a=Ember.get,b=Ember.set,c=Ember.EnumerableUtils.forEach;Ember.SortableMixin=Ember.Mixin.create(Ember.MutableEnumerable,{sortProperties:null,sortAscending:!0,addObject:function(b){var c=a(this,"content");c.pushObject(b)},removeObject:function(b){var c=a(this,"content");c.removeObject(b)},orderBy:function(b,d){var e=0,f=a(this,"sortProperties"),g=a(this,"sortAscending");return c(f,function(c){e===0&&(e=Ember.compare(a(b,c),a(d,c)),e!==0&&!g&&(e=-1*e))}),e},destroy:function(){var b=a(this,"content"),d=a(this,"sortProperties");return b&&d&&c(b,function(a){c(d,function(b){Ember.removeObserver(a,b,this,"contentItemSortPropertyDidChange")},this)},this),this._super()},isSorted:Ember.computed("sortProperties",function(){return!!a(this,"sortProperties")}),arrangedContent:Ember.computed("content","sortProperties.@each",function(b,d){var e=a(this,"content"),f=a(this,"isSorted"),g=a(this,"sortProperties"),h=this;return e&&f?(e=e.slice(),e.sort(function(a,b){return h.orderBy(a,b)}),c(e,function(a){c(g,function(b){Ember.addObserver(a,b,this,"contentItemSortPropertyDidChange")},this)},this),Ember.A(e)):e}).cacheable(),_contentWillChange:Ember.beforeObserver(function(){var b=a(this,"content"),d=a(this,"sortProperties");b&&d&&c(b,function(a){c(d,function(b){Ember.removeObserver(a,b,this,"contentItemSortPropertyDidChange")},this)},this),this._super()},"content"),sortAscendingWillChange:Ember.beforeObserver(function(){this._lastSortAscending=a(this,"sortAscending")},"sortAscending"),sortAscendingDidChange:Ember.observer(function(){if(a(this,"sortAscending")!==this._lastSortAscending){var b=a(this,"arrangedContent");b.reverseObjects()}},"sortAscending"),contentArrayWillChange:function(b,d,e,f){var g=a(this,"isSorted");if(g){var h=a(this,"arrangedContent"),i=b.slice(d,d+e),j=a(this,"sortProperties");c(i,function(a){h.removeObject(a),c(j,function(b){Ember.removeObserver(a,b,this,"contentItemSortPropertyDidChange")},this)})}return this._super(b,d,e,f)},contentArrayDidChange:function(b,d,e,f){var g=a(this,"isSorted"),h=a(this,"sortProperties");if(g){var i=b.slice(d,d+f),j=a(this,"arrangedContent");c(i,function(a){this.insertItemSorted(a),c(h,function(b){Ember.addObserver(a,b,this,"contentItemSortPropertyDidChange")},this)},this)}return this._super(b,d,e,f)},insertItemSorted:function(b){var c=a(this,"arrangedContent"),d=a(c,"length"),e=this._binarySearch(b,0,d);c.insertAt(e,b)},contentItemSortPropertyDidChange:function(b){var c=a(this,"arrangedContent"),d=c.indexOf(b);c.removeObject(b),this.insertItemSorted(b)},_binarySearch:function(b,c,d){var e,f,g,h;return c===d?c:(h=a(this,"arrangedContent"),e=c+Math.floor((d-c)/2),f=h.objectAt(e),g=this.orderBy(f,b),g<0?this._binarySearch(b,e+1,d):g>0?this._binarySearch(b,c,e):e)}})}(),function(){var a=Ember.get,b=Ember.set;Ember.ArrayController=Ember.ArrayProxy.extend(Ember.ControllerMixin,Ember.SortableMixin)}(),function(){Ember.ObjectController=Ember.ObjectProxy.extend(Ember.ControllerMixin)}(),function(){}(),function(){}(),function(){var a=Ember.get,b=Ember.set;Ember.Application=Ember.Namespace.extend({rootElement:"body",eventDispatcher:null,customEvents:null,init:function(){var c,d=a(this,"rootElement");this._super(),c=Ember.EventDispatcher.create({rootElement:d}),b(this,"eventDispatcher",c);if(Ember.$.isReady)Ember.run.once(this,this.didBecomeReady);else{var e=this;Ember.$(document).ready(function(){Ember.run.once(e,e.didBecomeReady)})}},initialize:function(c){var d=Ember.A(Ember.keys(this)),e=a(this.constructor,"injections"),f=this,g,h;!c&&Ember.Router.detect(f.Router)&&(c=f.Router.create(),this._createdRouter=c),c&&(b(this,"router",c),b(c,"namespace",this)),Ember.runLoadHooks("application",this),e.forEach(function(a){d.forEach(function(b){a[1](f,c,b)})}),c&&c instanceof Ember.Router&&this.startRouting(c)},didBecomeReady:function(){var b=a(this,"eventDispatcher"),c=a(this,"customEvents");b.setup(c),this.ready()},startRouting:function(b){var c=a(b,"location"),d=a(this,"rootElement"),e=a(b,"applicationController"),f=this.ApplicationView.create({controller:e});this._createdApplicationView=f,f.appendTo(d),b.route(c.getURL()),c.onUpdateURL(function(a){b.route(a)})},ready:Ember.K,willDestroy:function(){a(this,"eventDispatcher").destroy(),this._createdRouter&&this._createdRouter.destroy(),this._createdApplicationView&&this._createdApplicationView.destroy()},registerInjection:function(a){this.constructor.registerInjection(a)}}),Ember.Application.reopenClass({concatenatedProperties:["injections"],injections:Ember.A(),registerInjection:function(b){var c=a(this,"injections"),d=b.before,e=b.name,f=b.injection,g;d?(g=c.find(function(a){if(a[0]===d)return!0}),g=c.indexOf(g)):g=a(c,"length"),c.splice(g,0,[e,f])}}),Ember.Application.registerInjection({name:"controllers",injection:function(a,b,c){if(!/^[A-Z].*Controller$/.test(c))return;var d=c.charAt(0).toLowerCase()+c.substr(1),e=a[c].create();b.set(d,e),e.setProperties({target:b,controllers:b,namespace:a})}})}(),function(){var a=Ember.get,b=Ember.set;Ember.Location={create:function(a){var b=a&&a.implementation,c=this.implementations[b];return c.create.apply(c,arguments)},registerImplementation:function(a,b){this.implementations[a]=b},implementations:{}}}(),function(){var a=Ember.get,b=Ember.set;Ember.HashLocation=Ember.Object.extend({init:function(){b(this,"location",a(this,"location")||window.location)},getURL:function(){return a(this,"location").hash.substr(1)},setURL:function(c){a(this,"location").hash=c,b(this,"lastSetURL",c)},onUpdateURL:function(c){var d=this,e=Ember.guidFor(this);Ember.$(window).bind("hashchange.ember-location-"+e,function(){var e=location.hash.substr(1);if(a(d,"lastSetURL")===e)return;b(d,"lastSetURL",null),c(location.hash.substr(1))})},formatURL:function(a){return"#"+a},willDestroy:function(){var a=Ember.guidFor(this);Ember.$(window).unbind("hashchange.ember-location-"+a)}}),Ember.Location.registerImplementation("hash",Ember.HashLocation)}(),function(){var a=Ember.get,b=Ember.set;Ember.HistoryLocation=Ember.Object.extend({init:function(){b(this,"location",a(this,"location")||window.location),b(this,"_initialURL",a(this,"location").pathname)},rootURL:"/",_initialURL:null,getURL:function(){return a(this,"location").pathname},setURL:function(b){var c=window.history.state,d=a(this,"_initialURL");b=this.formatPath(b),(d!==b&&!c||c&&c.path!==b)&&window.history.pushState({path:b},null,b)},onUpdateURL:function(a){var b=Ember.guidFor(this);Ember.$(window).bind("popstate.ember-location-"+b,function(b){a(location.pathname)})},formatPath:function(b){var c=a(this,"rootURL");return b!==""&&(c=c.replace(/\/$/,"")),c+b},formatURL:function(a){return a},willDestroy:function(){var a=Ember.guidFor(this);Ember.$(window).unbind("popstate.ember-location-"+a)}}),Ember.Location.registerImplementation("history",Ember.HistoryLocation)}(),function(){var a=Ember.get,b=Ember.set;Ember.NoneLocation=Ember.Object.extend({path:"",getURL:function(){return a(this,"path")},setURL:function(a){b(this,"path",a)},onUpdateURL:function(a){},formatURL:function(a){return a}}),Ember.Location.registerImplementation("none",Ember.NoneLocation)}(),function(){}(),function(){}(),function(){Ember.$=window.jQuery}(),function(){var a=Ember.String.w("dragstart drag dragenter dragleave dragover drop dragend");Ember.EnumerableUtils.forEach(a,function(a){Ember.$.event.fixHooks[a]={props:["dataTransfer"]}})}(),function(){var a=Ember.get,b=Ember.set,c=Ember.ArrayPolyfills.indexOf,d=function(){this.seen={},this.list=[]};d.prototype={add:function(a){if(a in this.seen)return;this.seen[a]=!0,this.list.push(a)},toDOM:function(){return this.list.join(" ")}},Ember.RenderBuffer=function(a){return new Ember._RenderBuffer(a)},Ember._RenderBuffer=function(a){this.elementTag=a,this.childBuffers=[]},Ember._RenderBuffer.prototype={elementClasses:null,elementId:null,elementAttributes:null,elementTag:null,elementStyle:null,parentBuffer:null,push:function(a){return this.childBuffers.push(String(a)),this},addClass:function(a){var b=this.elementClasses=this.elementClasses||new d;return this.elementClasses.add(a),this},id:function(a){return this.elementId=a,this},attr:function(a,b){var c=this.elementAttributes=this.elementAttributes||{};return arguments.length===1?c[a]:(c[a]=b,this)},removeAttr:function(a){var b=this.elementAttributes;return b&&delete b[a],this},style:function(a,b){var c=this.elementStyle=this.elementStyle||{};return this.elementStyle[a]=b,this},newBuffer:function(a,b,c,d){var e=new Ember._RenderBuffer(a);return e.parentBuffer=b,d&&Ember.$.extend(e,d),c&&c.call(this,e),e},replaceWithBuffer:function(a){var b=this.parentBuffer;if(!b)return;var d=b.childBuffers,e=c.call(d,this);a?d.splice(e,1,a):d.splice(e,1)},begin:function(a){return this.newBuffer(a,this,function(a){this.childBuffers.push(a)})},prepend:function(a){return this.newBuffer(a,this,function(a){this.childBuffers.splice(0,0,a)})},replaceWith:function(a){var b=this.parentBuffer;return this.newBuffer(a,b,function(a){this.replaceWithBuffer(a)})},insertAfter:function(b){var d=a(this,"parentBuffer");return this.newBuffer(b,d,function(a){var b=d.childBuffers,e=c.call(b,this);b.splice(e+1,0,a)})},end:function(){var a=this.parentBuffer;return a||this},remove:function(){this.replaceWithBuffer(null)},element:function(){return Ember.$(this.string())[0]},string:function(){var a="",b=this.elementTag,c;if(b){var d=this.elementId,e=this.elementClasses,f=this.elementAttributes,g=this.elementStyle,h="",i;c=["<"+b],d&&c.push('id="'+this._escapeAttribute(d)+'"'),e&&c.push('class="'+this._escapeAttribute(e.toDOM())+'"');if(g){for(i in g)g.hasOwnProperty(i)&&(h+=i+":"+this._escapeAttribute(g[i])+";");c.push('style="'+h+'"')}if(f)for(i in f)f.hasOwnProperty(i)&&c.push(i+'="'+this._escapeAttribute(f[i])+'"');c=c.join(" ")+">"}var j=this.childBuffers;return Ember.ArrayPolyfills.forEach.call(j,function(b){var c=typeof b=="string";a+=c?b:b.string()}),b?c+a+"</"+b+">":a},_escapeAttribute:function(a){var b={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},c=/&(?!\w+;)|[<>"'`]/g,d=/[&<>"'`]/,e=function(a){return b[a]||"&amp;"},f=a.toString();return d.test(f)?f.replace(c,e):f}}}(),function(){var a=Ember.get,b=Ember.set,c=Ember.String.fmt;Ember.EventDispatcher=Ember.Object.extend({rootElement:"body",setup:function(b){var c,d={touchstart:"touchStart",touchmove:"touchMove",touchend:"touchEnd",touchcancel:"touchCancel",keydown:"keyDown",keyup:"keyUp",keypress:"keyPress",mousedown:"mouseDown",mouseup:"mouseUp",contextmenu:"contextMenu",click:"click",dblclick:"doubleClick",mousemove:"mouseMove",focusin:"focusIn",focusout:"focusOut",mouseenter:"mouseEnter",mouseleave:"mouseLeave",submit:"submit",input:"input",change:"change",dragstart:"dragStart",drag:"drag",dragenter:"dragEnter",dragleave:"dragLeave",dragover:"dragOver",drop:"drop",dragend:"dragEnd"};Ember.$.extend(d,b||{});var e=Ember.$(a(this,"rootElement"));e.addClass("ember-application");for(c in d)d.hasOwnProperty(c)&&this.setupHandler(e,c,d[c])},setupHandler:function(a,b,c){var d=this;a.delegate(".ember-view",b+".ember",function(a,b){var e=Ember.View.views[this.id],f=!0,g=null;return g=d._findNearestEventManager(e,c),g&&g!==b?f=d._dispatchEvent(g,a,c,e):e?f=d._bubbleEvent(e,a,c):a.stopPropagation(),f}),a.delegate("[data-ember-action]",b+".ember",function(a){var b=Ember.$(a.currentTarget).attr("data-ember-action"),d=Ember.Handlebars.ActionHelper.registeredActions[b],e=d.handler;if(d.eventName===c)return e(a)})},_findNearestEventManager:function(b,c){var d=null;while(b){d=a(b,"eventManager");if(d&&d[c])break;b=a(b,"parentView")}return d},_dispatchEvent:function(a,b,c,d){var e=!0,f=a[c];return Ember.typeOf(f)==="function"?(e=f.call(a,b,d),b.stopPropagation()):e=this._bubbleEvent(d,b,c),e},_bubbleEvent:function(a,b,c){return Ember.run(function(){return a.handleEvent(c,b)})},destroy:function(){var b=a(this,"rootElement");return Ember.$(b).undelegate(".ember").removeClass("ember-application"),this._super()}})}(),function(){var a=Ember.run.queues;a.splice(Ember.$.inArray("actions",a)+1,0,"render")}(),function(){var a=Ember.get,b=Ember.set;Ember.ControllerMixin.reopen({target:null,controllers:null,namespace:null,view:null,connectOutlet:function(c,d){var e,f,g,h,i;Ember.typeOf(d)==="string"&&(e=c,c=d,d=arguments[2]),arguments.length===1?Ember.typeOf(c)==="object"&&(i=c,e=i.outletName,c=i.name,f=i.viewClass,h=i.controller,d=i.context):i={},e=e||"view";if(c){var j=a(this,"namespace"),k=a(this,"controllers"),l=c.charAt(0).toUpperCase()+c.substr(1)+"View";f=a(j,l),h=a(k,c+"Controller")}return h&&d&&h.set("content",d),g=f.create(),h&&b(g,"controller",h),b(this,e,g),g},connectControllers:function(){var c=a(this,"controllers"),d=Array.prototype.slice.apply(arguments),e;for(var f=0,g=d.length;f<g;f++)e=d[f]+"Controller",b(this,e,a(c,e))}})}(),function(){}(),function(){var a=Ember.get,b=Ember.set,c=Ember.addObserver,d=Ember.meta,e=Ember.String.fmt,f=[].slice,g=Ember.EnumerableUtils.forEach,h=Ember.computed(function(){var b=this._childViews,c=Ember.A();return g(b,function(b){b.isVirtual?c.pushObjects(a(b,"childViews")):c.push(b)}),c}).property().cacheable(),i=Ember.VIEW_PRESERVES_CONTEXT;Ember.TEMPLATES={};var j={preRender:{},inBuffer:{},hasElement:{},inDOM:{},destroyed:{}};Ember.View=Ember.Object.extend(Ember.Evented,{concatenatedProperties:["classNames","classNameBindings","attributeBindings"],isView:!0,templateName:null,layoutName:null,templates:Ember.TEMPLATES,template:Ember.computed(function(b,c){if(c!==undefined)return c;var d=a(this,"templateName"),e=this.templateForName(d,"template");return e||a(this,"defaultTemplate")}).property("templateName").cacheable(),controller:Ember.computed(function(b,c){var d;return arguments.length===2?c:(d=a(this,"parentView"),d?a(d,"controller"):null)}).property().cacheable(),layout:Ember.computed(function(b,c){if(arguments.length===2)return c;var d=a(this,"layoutName"),e=this.templateForName(d,"layout");return e||a(this,"defaultLayout")}).property("layoutName").cacheable(),templateForName:function(b,c){if(!b)return;var d=a(this,"templates"),f=a(d,b);if(!f)throw new Ember.Error(e('%@ - Unable to find %@ "%@".',[this,c,b]));return f},context:Ember.computed(function(c,d){return arguments.length===2?(b(this,"_context",d),d):a(this,"_context")}).cacheable(),_context:Ember.computed(function(b,c){var d,e,f;if(arguments.length===2)return c;if(i){if(e=a(this,"controller"))return e;d=a(this,"_parentView");if(d)return a(d,"_context")}return this}).cacheable(),_displayPropertyDidChange:Ember.observer(function(){this.rerender()},"context","controller"),parentView:Ember.computed(function(){var b=a(this,"_parentView");return b&&b.isVirtual?a(b,"parentView"):b}).property("_parentView").volatile(),_parentView:null,concreteView:Ember.computed(function(){return this.isVirtual?a(this,"parentView"):this}).property("_parentView").volatile(),isVisible:!0,childViews:h,_childViews:[],_childViewsWillChange:Ember.beforeObserver(function(){if(this.isVirtual){var b=a(this,"parentView");b&&Ember.propertyWillChange(b,"childViews")}},"childViews"),_childViewsDidChange:Ember.observer(function(){if(this.isVirtual){var b=a(this,"parentView");b&&Ember.propertyDidChange(b,"childViews")}},"childViews"),nearestInstanceOf:function(b){var c=a(this,"parentView");while(c){if(c instanceof b)return c;c=a(c,"parentView")}},nearestWithProperty:function(b){var c=a(this,"parentView");while(c){if(b in c)return c;c=a(c,"parentView")}},nearestChildOf:function(b){var c=a(this,"parentView");while(c){if(a(c,"parentView")instanceof b)return c;c=a(c,"parentView")}},collectionView:Ember.computed(function(){return this.nearestInstanceOf(Ember.CollectionView)}).cacheable(),itemView:Ember.computed(function(){return this.nearestChildOf(Ember.CollectionView)}).cacheable(),contentView:Ember.computed(function(){return this.nearestWithProperty("content")}).cacheable(),_parentViewDidChange:Ember.observer(function(){if(this.isDestroying)return;this.invokeRecursively(function(a){a.propertyDidChange("collectionView"),a.propertyDidChange("itemView"),a.propertyDidChange("contentView")}),a(this,"parentView.controller")&&!a(this,"controller")&&this.notifyPropertyChange("controller")},"_parentView"),_controllerDidChange:Ember.observer(function(){if(this.isDestroying)return;this.forEachChildView(function(a){a.propertyDidChange("controller")})},"controller"),cloneKeywords:function(){var c=a(this,"templateData"),d=c?Ember.copy(c.keywords):{};return b(d,"view",a(this,"concreteView")),b(d,"controller",a(this,"controller")),d},render:function(b){var c=a(this,"layout")||a(this,"template");if(c){var d=a(this,"_context"),e=this.cloneKeywords(),f={view:this,buffer:b,isRenderData:!0,keywords:e},g=c(d,{data:f});g!==undefined&&b.push(g)}},invokeForState:function(a){var b=this.state,c,d;if(d=j[b][a])return c=f.call(arguments),c[0]=this,d.apply(this,c);var e=this,g=e.states,h;while(g){h=g[b];while(h){d=h[a];if(d)return j[b][a]=d,c=f.call(arguments,1),c.unshift(this),d.apply(this,c);h=h.parentState}g=g.parent}},rerender:function(){return this.invokeForState("rerender")},clearRenderedChildren:function(){var a=this.lengthBeforeRender,b=this.lengthAfterRender,c=this._childViews;for(var d=b-1;d>=a;d--)c[d]&&c[d].destroy()},_applyClassNameBindings:function(){var b=a(this,"classNameBindings"),d=a(this,"classNames"),e,f,h;if(!b)return;g(b,function(a){var b,g=function(){f=this._classStringForProperty(a),e=this.$(),b&&(e.removeClass(b),d.removeObject(b)),f?(e.addClass(f),b=f):b=null};h=this._classStringForProperty(a),h&&(d.push(h),b=h);var i=Ember.View._parsePropertyPath(a);c(this,i.path,g)},this)},_applyAttributeBindings:function(b){var d=a(this,"attributeBindings"),e,f,h;if(!d)return;g(d,function(d){var g=d.split(":"),h=g[0],i=g[1]||h,j=function(){f=this.$();if(!f)return;e=a(this,h),Ember.View.applyAttributeBindings(f,i,e)};c(this,h,j),e=a(this,h),Ember.View.applyAttributeBindings(b,i,e)},this)},_classStringForProperty:function(b){var c=Ember.View._parsePropertyPath(b),d=c.path,e=a(this,d);return e===undefined&&Ember.isGlobalPath(d)&&(e=a(window,d)),Ember.View._classStringForValue(d,e,c.className,c.falsyClassName)},element:Ember.computed(function(a,b){return b!==undefined?this.invokeForState("setElement",b):this.invokeForState("getElement")}).property("_parentView").cacheable(),$:function(a){return this.invokeForState("$",a)},mutateChildViews:function(a){var b=this._childViews,c=b.length,d;while(--c>=0)d=b[c],a.call(this,d,c);return this},forEachChildView:function(a){var b=this._childViews;if(!b)return this;var c=b.length,d,e;for(e=0;e<c;e++)d=b[e],a.call(this,d);return this},appendTo:function(a){return this._insertElementLater(function(){this.$().appendTo(a)}),this},replaceIn:function(a){return this._insertElementLater(function(){Ember.$(a).empty(),this.$().appendTo(a)}),this},_insertElementLater:function(a){this._lastInsert=Ember.guidFor(a),Ember.run.schedule("render",this,this.invokeForState,"insertElement",a)},append:function(){return this.appendTo(document.body)},remove:function(){this.destroyElement(),this.invokeRecursively(function(a){a.clearRenderedChildren()})},elementId:Ember.computed(function(a,b){return b!==undefined?b:Ember.guidFor(this)}).cacheable(),_elementIdDidChange:Ember.beforeObserver(function(){throw"Changing a view's elementId after creation is not allowed."},"elementId"),findElementInParentElement:function(b){var c="#"+a(this,"elementId");return Ember.$(c)[0]||Ember.$(c,b)[0]},renderBuffer:function(b){b=b||a(this,"tagName");if(b===null||b===undefined)b="div";return Ember.RenderBuffer(b)},createElement:function(){if(a(this,"element"))return this;var c=this.renderToBuffer();return b(this,"element",c.element()),this},willInsertElement:Ember.K,didInsertElement:Ember.K,willRerender:Ember.K,invokeRecursively:function(a){a.call(this,this),this.forEachChildView(function(b){b.invokeRecursively(a)})},invalidateRecursively:function(a){this.forEachChildView(function(b){b.propertyDidChange(a)})},_notifyWillInsertElement:function(){this.invokeRecursively(function(a){a.trigger("willInsertElement")})},_notifyDidInsertElement:function(){this.invokeRecursively(function(a){a.trigger("didInsertElement")})},_notifyWillRerender:function(){this.invokeRecursively(function(a){a.trigger("willRerender")})},destroyElement:function(){return this.invokeForState("destroyElement")},willDestroyElement:function(){},_notifyWillDestroyElement:function(){this.invokeRecursively(function(a){a.trigger("willDestroyElement")})},_elementWillChange:Ember.beforeObserver(function(){this.forEachChildView(function(a){Ember.propertyWillChange(a,"element")})},"element"),_elementDidChange:Ember.observer(function(){this.forEachChildView(function(a){Ember.propertyDidChange(a,"element")})},"element"),parentViewDidChange:Ember.K,renderToBuffer:function(b,c){var d;Ember.run.sync(),c=c||"begin";if(b){var e=a(this,"tagName");if(e===null||e===undefined)e="div";d=b[c](e)}else d=this.renderBuffer();return this.buffer=d,this.transitionTo("inBuffer",!1),this.lengthBeforeRender=this._childViews.length,this.beforeRender(d),this.render(d),this.afterRender(d),this.lengthAfterRender=this._childViews.length,d},beforeRender:function(a){this.applyAttributesToBuffer(a)},afterRender:Ember.K,applyAttributesToBuffer:function(b){this._applyClassNameBindings(),this._applyAttributeBindings(b),g(a(this,"classNames"),function(a){b.addClass(a)}),b.id(a(this,"elementId"));var c=a(this,"ariaRole");c&&b.attr("role",c),a(this,"isVisible")===!1&&b.style("display","none")},tagName:null,ariaRole:null,classNames:["ember-view"],classNameBindings:[],attributeBindings:[],state:"preRender",init:function(){this._super(),this.isVirtual||(Ember.View.views[a(this,"elementId")]=this),this._childViews=this._childViews.slice(),this.classNameBindings=Ember.A(this.classNameBindings.slice()),this.classNames=Ember.A(this.classNames.slice());var c=a(this,"viewController");c&&(c=a(c),c&&b(c,"view",this))},appendChild:function(a,b){return this.invokeForState("appendChild",a,b)},removeChild:function(a){if(this.isDestroying)return;b(a,"_parentView",null);var c=this._childViews;return Ember.EnumerableUtils.removeObject(c,a),this.propertyDidChange("childViews"),this},removeAllChildren:function(){return this.mutateChildViews(function(a){this.removeChild(a)})},destroyAllChildren:function(){return this.mutateChildViews(function(a){a.destroy()})},removeFromParent:function(){var b=a(this,"_parentView");return this.remove(),b&&b.removeChild(this),this},willDestroy:function(){var c=this._childViews,d=a(this,"_parentView"),e;this.removedFromDOM||this.destroyElement();if(this.viewName){var f=a(this,"parentView");f&&b(f,this.viewName,null)}d&&d.removeChild(this),this.state="destroyed",e=c.length;for(var g=e-1;g>=0;g--)c[g].removedFromDOM=!0,c[g].destroy();this.isVirtual||delete Ember.View.views[a(this,"elementId")]},createChildView:function(c,d){return Ember.View.detect(c)?(d=d||{},d._parentView=this,d.templateData=d.templateData||a(this,"templateData"),c=c.create(d),c.viewName&&b(a(this,"concreteView"),c.viewName,c)):(a(c,"templateData")||b(c,"templateData",a(this,"templateData")),b(c,"_parentView",this)),c},becameVisible:Ember.K,becameHidden:Ember.K,_isVisibleDidChange:Ember.observer(function(){var b=this.$();if(!b)return;var c=a(this,"isVisible");b.toggle(c);if(this._isAncestorHidden())return;c?this._notifyBecameVisible():this._notifyBecameHidden()},"isVisible"),_notifyBecameVisible:function(){this.trigger("becameVisible"),this.forEachChildView(function(b){var c=a(b,"isVisible");(c||c===null)&&b._notifyBecameVisible()})},_notifyBecameHidden:function(){this.trigger("becameHidden"),this.forEachChildView(function(b){var c=a(b,"isVisible");(c||c===null)&&b._notifyBecameHidden()})},_isAncestorHidden:function(){var b=a(this,"parentView");while(b){if(a(b,"isVisible")===!1)return!0;b=a(b,"parentView")}return!1},clearBuffer:function(){this.invokeRecursively(function(a){this.buffer=null})},transitionTo:function(a,b){this.state=a,b!==!1&&this.forEachChildView(function(b){b.transitionTo(a)})},trigger:function(a){this._super.apply(this,arguments);var b=this[a];if(b){var c=[],d,e;for(d=1,e=arguments.length;d<e;d++)c.push(arguments[d]);return b.apply(this,c)}},has:function(a){return Ember.typeOf(this[a])==="function"||this._super(a)},handleEvent:function(a,b){return this.invokeForState("handleEvent",a,b)}});var k={prepend:function(a,b){b._insertElementLater(function(){var c=a.$();c.prepend(b.$())})},after:function(a,b){b._insertElementLater(function(){var c=a.$();c.after(b.$())})},replace:function(c){var d=a(c,"element");b(c,"element",null),c._insertElementLater(function(){Ember.$(d).replaceWith(a(c,"element"))})},remove:function(c){var d=a(c,"element");b(c,"element",null),c._lastInsert=null,Ember.$(d).remove()},empty:function(a){a.$().empty()}};Ember.View.reopen({states:Ember.View.states,domManager:k}),Ember.View.reopenClass({_parsePropertyPath:function(a){var b=a.split(/:/),c=b[0],d="",e,f;return b.length>1&&(e=b[1],b.length===3&&(f=b[2]),d=":"+e,f&&(d+=":"+f)),{path:c,classNames:d,className:e===""?undefined:e,falsyClassName:f}},_classStringForValue:function(a,b,c,d){if(!!b&&c)return c;if(b===!0){if(b===!0&&!c&&d)return null;var e=a.split(".");return Ember.String.dasherize(e[e.length-1])}return b===!1&&d?d:b!==!1&&b!==undefined&&b!==null?b:null}}),Ember.View.views={},Ember.View.childViewsProperty=h,Ember.View.applyAttributeBindings=function(a,b,c){var d=Ember.typeOf(c),e=a.attr(b);(d==="string"||d==="number"&&!isNaN(c))&&c!==e?a.attr(b,c):c&&d==="boolean"?a.attr(b,b):c||a.removeAttr(b)}}(),function(){var a=Ember.get,b=Ember.set;Ember.View.states={_default:{appendChild:function(){throw"You can't use appendChild outside of the rendering process"},$:function(){return undefined},getElement:function(){return null},handleEvent:function(){return!0},destroyElement:function(a){return b(a,"element",null),a._lastInsert=null,a}}},Ember.View.reopen({states:Ember.View.states})}(),function(){Ember.View.states.preRender={parentState:Ember.View.states._default,insertElement:function(a,b){if(a._lastInsert!==Ember.guidFor(b))return;a.createElement(),a._notifyWillInsertElement(),b.call(a),a.transitionTo("inDOM"),a._notifyDidInsertElement()},empty:Ember.K,setElement:function(a,b){return b!==null&&a.transitionTo("hasElement"),b}}}(),function(){var a=Ember.get,b=Ember.set,c=Ember.meta;Ember.View.states.inBuffer={parentState:Ember.View.states._default,$:function(a,b){return a.rerender(),Ember.$()},rerender:function(a){a._notifyWillRerender(),a.clearRenderedChildren(),a.renderToBuffer(a.buffer,"replaceWith")},appendChild:function(a,b,c){var d=a.buffer;return b=this.createChildView(b,c),a._childViews.push(b),b.renderToBuffer(d),a.propertyDidChange("childViews"),b},destroyElement:function(a){return a.clearBuffer(),a._notifyWillDestroyElement(),a.transitionTo("preRender"),a},empty:function(){},insertElement:function(){throw"You can't insert an element that has already been rendered"},setElement:function(a,b){return b===null?a.transitionTo("preRender"):(a.clearBuffer(),a.transitionTo("hasElement")),b}}}(),function(){var a=Ember.get,b=Ember.set,c=Ember.meta;Ember.View.states.hasElement={parentState:Ember.View.states._default,$:function(b,c){var d=a(b,"element");return c?Ember.$(c,d):Ember.$(d)},getElement:function(b){var c=a(b,"parentView");return c&&(c=a(c,"element")),c?b.findElementInParentElement(c):Ember.$("#"+a(b,"elementId"))[0]},setElement:function(a,b){if(b!==null)throw"You cannot set an element to a non-null value when the element is already in the DOM.";return a.transitionTo("preRender"),b},rerender:function(a){return a._notifyWillRerender(),a.clearRenderedChildren(),a.domManager.replace(a),a},destroyElement:function(a){return a._notifyWillDestroyElement(),a.domManager.remove(a),a},empty:function(a){var b=a._childViews,c,d;if(b){c=b.length;for(d=0;d<c;d++)b[d]._notifyWillDestroyElement()}a.domManager.empty(a)},handleEvent:function(a,b,c){return a.has(b)?a.trigger(b,c):!0}},Ember.View.states.inDOM={parentState:Ember.View.states.hasElement,insertElement:function(a,b){if(a._lastInsert!==Ember.guidFor(b))return;throw"You can't insert an element into the DOM that has already been inserted"}}}(),function(){var a="You can't call %@ on a destroyed view",b=Ember.String.fmt;Ember.View.states.destroyed={parentState:Ember.View.states._default,appendChild:function(){throw b(a,["appendChild"])},rerender:function(){throw b(a,["rerender"])},destroyElement:function(){throw b(a,["destroyElement"])},empty:function(){throw b(a,["empty"])},setElement:function(){throw b(a,["set('element', ...)"])},insertElement:Ember.K}}(),function(){}(),function(){var a=Ember.get,b=Ember.set,c=Ember.meta,d=Ember.EnumerableUtils.forEach,e=Ember.computed(function(){return a(this,"_childViews")}).property("_childViews").cacheable();Ember.ContainerView=Ember.View.extend({init:function(){this._super();var c=a(this,"childViews");Ember.defineProperty(this,"childViews",e);var f=this._childViews;d(c,function(c,d){var e;"string"==typeof c?(e=a(this,c),e=this.createChildView(e),b(this,c,e)):e=this.createChildView(c),f[d]=e},this);var g=a(this,"currentView");g&&f.push(this.createChildView(g)),Ember.A(f),a(this,"childViews").addArrayObserver(this,{willChange:"childViewsWillChange",didChange:"childViewsDidChange"})},render:function(a){this.forEachChildView(function(b){b.renderToBuffer(a)})},willDestroy:function(){a(this,"childViews").removeArrayObserver(this,{willChange:"childViewsWillChange",didChange:"childViewsDidChange"}),this._super()},childViewsWillChange:function(a,b,c){if(c===0)return;var d=a.slice(b,b+c);this.initializeViews(d,null,null),this.invokeForState("childViewsWillChange",a,b,c)},childViewsDidChange:function(b,c,d,e){var f=a(b,"length");if(e===0)return;var g=b.slice(c,c+e);this.initializeViews(g,this,a(this,"templateData")),this.invokeForState("childViewsDidChange",b,c,e)},initializeViews:function(c,e,f){d(c,function(c){b(c,"_parentView",e),a(c,"templateData")||b(c,"templateData",f)})},_scheduleInsertion:function(a,b){b?b.domManager.after(b,a):this.domManager.prepend(this,a)},currentView:null,_currentViewWillChange:Ember.beforeObserver(function(){var b=a(this,"childViews"),c=a(this,"currentView");c&&(b.removeObject(c),c.destroy())},"currentView"),_currentViewDidChange:Ember.observer(function(){var b=a(this,"childViews"),c=a(this,"currentView");c&&b.pushObject(c)},"currentView")}),Ember.ContainerView.states={parent:Ember.View.states,inBuffer:{childViewsDidChange:function(a,b,c,d){var e=a.buffer,f,g,h,i;c===0?(i=b[c],f=c+1,i.renderToBuffer(e,"prepend")):(i=b[c-1],f=c);for(var j=f;j<c+d;j++)g=i,i=b[j],h=g.buffer,i.renderToBuffer(h,"insertAfter")}},hasElement:{childViewsWillChange:function(a,b,c,d){for(var e=c;e<c+d;e++)b[e].remove()},childViewsDidChange
:function(a,b,c,d){var e=c===0?null:b[c-1];for(var f=c;f<c+d;f++)a=b[f],this._scheduleInsertion(a,e),e=a}}},Ember.ContainerView.states.inDOM={parentState:Ember.ContainerView.states.hasElement},Ember.ContainerView.reopen({states:Ember.ContainerView.states})}(),function(){var a=Ember.get,b=Ember.set,c=Ember.String.fmt;Ember.CollectionView=Ember.ContainerView.extend({content:null,emptyViewClass:Ember.View,emptyView:null,itemViewClass:Ember.View,init:function(){var a=this._super();return this._contentDidChange(),a},_contentWillChange:Ember.beforeObserver(function(){var b=this.get("content");b&&b.removeArrayObserver(this);var c=b?a(b,"length"):0;this.arrayWillChange(b,0,c)},"content"),_contentDidChange:Ember.observer(function(){var b=a(this,"content");b&&b.addArrayObserver(this);var c=b?a(b,"length"):0;this.arrayDidChange(b,0,null,c)},"content"),willDestroy:function(){var b=a(this,"content");b&&b.removeArrayObserver(this),this._super()},arrayWillChange:function(b,c,d){var e=a(this,"emptyView");e&&e instanceof Ember.View&&e.removeFromParent();var f=a(this,"childViews"),g,h,i;i=a(f,"length");var j=d===i;j&&this.invokeForState("empty");for(h=c+d-1;h>=c;h--)g=f[h],j&&(g.removedFromDOM=!0),g.destroy()},arrayDidChange:function(c,d,e,f){var g=a(this,"itemViewClass"),h=a(this,"childViews"),i=[],j,k,l,m,n;"string"==typeof g&&(g=a(g)),m=c?a(c,"length"):0;if(m)for(l=d;l<d+f;l++)k=c.objectAt(l),j=this.createChildView(g,{content:k,contentIndex:l}),i.push(j);else{var o=a(this,"emptyView");if(!o)return;o=this.createChildView(o),i.push(o),b(this,"emptyView",o)}h.replace(d,0,i)},createChildView:function(c,d){c=this._super(c,d);var e=a(c,"tagName"),f=e===null||e===undefined?Ember.CollectionView.CONTAINER_MAP[a(this,"tagName")]:e;return b(c,"tagName",f),c}}),Ember.CollectionView.CONTAINER_MAP={ul:"li",ol:"li",table:"tr",thead:"tr",tbody:"tr",tfoot:"tr",tr:"td",select:"option"}}(),function(){}(),function(){}(),function(){var a=Ember.get,b=Ember.set;Ember.State=Ember.Object.extend(Ember.Evented,{isState:!0,parentState:null,start:null,name:null,path:Ember.computed(function(){var b=a(this,"parentState.path"),c=a(this,"name");return b&&(c=b+"."+c),c}).property().cacheable(),trigger:function(a){this[a]&&this[a].apply(this,[].slice.call(arguments,1)),this._super.apply(this,arguments)},init:function(){var c=a(this,"states"),d;b(this,"childStates",Ember.A()),b(this,"eventTransitions",a(this,"eventTransitions")||{});var e,f,g;if(!c){c={};for(e in this){if(e==="constructor")continue;if(f=this[e]){if(g=f.transitionTarget)this.eventTransitions[e]=g;this.setupChild(c,e,f)}}b(this,"states",c)}else for(e in c)this.setupChild(c,e,c[e]);b(this,"pathsCache",{}),b(this,"pathsCacheNoContext",{})},setupChild:function(c,d,e){if(!e)return!1;e.isState?b(e,"name",d):Ember.State.detect(e)&&(e=e.create({name:d})),e.isState&&(b(e,"parentState",this),a(this,"childStates").pushObject(e),c[d]=e)},lookupEventTransition:function(a){var b,c=this;while(c&&!b)b=c.eventTransitions[a],c=c.get("parentState");return b},isLeaf:Ember.computed(function(){return!a(this,"childStates").length}).cacheable(),hasContext:!0,setup:Ember.K,enter:Ember.K,exit:Ember.K});var c=Ember.$&&Ember.$.Event;Ember.State.reopenClass({transitionTo:function(a){var b=function(b,d){if(c&&d instanceof c){if(!d.hasOwnProperty("context"))return b.transitionTo(a);d=d.context}b.transitionTo(a,d)};return b.transitionTarget=a,b}})}(),function(){var a=Ember.get,b=Ember.set,c=Ember.String.fmt,d=Ember.ArrayPolyfills.forEach,e=function(a){this.enterStates=a.enterStates.slice(),this.exitStates=a.exitStates.slice(),this.resolveState=a.resolveState,this.finalState=a.enterStates[a.enterStates.length-1]||a.resolveState};e.prototype={normalize:function(a,b){return this.matchContextsToStates(b),this.addInitialStates(),this.removeUnchangedContexts(a),this},matchContextsToStates:function(b){var c=this.enterStates.length-1,d=[],e,f;while(b.length>0){if(c>=0)e=this.enterStates[c--];else{if(this.enterStates.length){e=a(this.enterStates[0],"parentState");if(!e)throw"Cannot match all contexts to states"}else e=this.resolveState;this.enterStates.unshift(e),this.exitStates.unshift(e)}a(e,"hasContext")?f=b.pop():f=null,d.unshift(f)}this.contexts=d},addInitialStates:function(){var b=this.finalState,c;for(;;){c=a(b,"initialState")||"start",b=a(b,"states."+c);if(!b)break;this.finalState=b,this.enterStates.push(b),this.contexts.push(undefined)}},removeUnchangedContexts:function(a){while(this.enterStates.length>0){if(this.enterStates[0]!==this.exitStates[0])break;if(this.enterStates.length===this.contexts.length){if(a.getStateMeta(this.enterStates[0],"context")!==this.contexts[0])break;this.contexts.shift()}this.resolveState=this.enterStates.shift(),this.exitStates.shift()}}},Ember.StateManager=Ember.State.extend({init:function(){this._super(),b(this,"stateMeta",Ember.Map.create());var c=a(this,"initialState");!c&&a(this,"states.start")&&(c="start"),c&&this.transitionTo(c)},stateMetaFor:function(b){var c=a(this,"stateMeta"),d=c.get(b);return d||(d={},c.set(b,d)),d},setStateMeta:function(a,c,d){return b(this.stateMetaFor(a),c,d)},getStateMeta:function(b,c){return a(this.stateMetaFor(b),c)},currentState:null,transitionEvent:"setup",errorOnUnhandledEvent:!0,send:function(b,c){return this.sendRecursively(b,a(this,"currentState"),c)},sendRecursively:function(b,d,e){var f=this.enableLogging,g=d[b];if(typeof g=="function")return f&&Ember.Logger.log(c("STATEMANAGER: Sending event '%@' to state %@.",[b,a(d,"path")])),g.call(d,this,e);var h=a(d,"parentState");if(h)return this.sendRecursively(b,h,e);if(a(this,"errorOnUnhandledEvent"))throw new Ember.Error(this.toString()+" could not respond to event "+b+" in state "+a(this,"currentState.path")+".")},getStateByPath:function(b,c){var d=c.split("."),e=b;for(var f=0,g=d.length;f<g;f++){e=a(a(e,"states"),d[f]);if(!e)break}return e},findStateByPath:function(b,c){var d;while(!d&&b)d=this.getStateByPath(b,c),b=a(b,"parentState");return d},findStatesByPath:function(b,c){if(!c||c==="")return undefined;var d=c.split("."),e=[];for(var f=0,g=d.length;f<g;f++){var h=a(b,"states");if(!h)return undefined;var i=a(h,d[f]);if(!i)return undefined;b=i,e.push(i)}return e},goToState:function(){return this.transitionTo.apply(this,arguments)},transitionTo:function(b,c){if(Ember.empty(b))return;var d=c?Array.prototype.slice.call(arguments,1):[],f=a(this,"currentState")||this,g=this.contextFreeTransition(f,b),h=(new e(g)).normalize(this,d);this.enterState(h),this.triggerSetupContext(h)},contextFreeTransition:function(b,c){var d=b.pathsCache[c];if(d)return d;var e=this.findStatesByPath(b,c),f=[],g=b;while(g&&!e){f.unshift(g),g=a(g,"parentState");if(!g){e=this.findStatesByPath(this,c);if(!e)return}e=this.findStatesByPath(g,c)}while(e.length>0&&e[0]===f[0])g=e.shift(),f.shift();var h=b.pathsCache[c]={exitStates:f,enterStates:e,resolveState:g};return h},triggerSetupContext:function(b){var c=b.contexts,e=b.enterStates.length-c.length,f=b.enterStates,g=a(this,"transitionEvent");d.call(f,function(a,b){a.trigger(g,this,c[b-e])},this)},getState:function(b){var c=a(this,b),d=a(this,"parentState");if(c)return c;if(d)return d.getState(b)},enterState:function(c){var e=this.enableLogging,f=c.exitStates.slice(0).reverse();d.call(f,function(a){a.trigger("exit",this)},this),d.call(c.enterStates,function(b){e&&Ember.Logger.log("STATEMANAGER: Entering "+a(b,"path")),b.trigger("enter",this)},this),b(this,"currentState",c.finalState)}})}(),function(){}(),function(){var a=Ember.get;Ember._ResolvedState=Ember.Object.extend({manager:null,state:null,match:null,object:Ember.computed(function(b,c){if(arguments.length===2)return this._object=c,c;if(this._object)return this._object;var d=a(this,"state"),e=a(this,"match"),f=a(this,"manager");return d.deserialize(f,e.hash)}).property(),hasPromise:Ember.computed(function(){return Ember.canInvoke(a(this,"object"),"then")}).property("object"),promise:Ember.computed(function(){var b=a(this,"object");return Ember.canInvoke(b,"then")?b:{then:function(a){a(b)}}}).property("object"),transition:function(){var b=a(this,"manager"),c=a(this,"state.path"),d=a(this,"object");b.transitionTo(c,d)}})}(),function(){var a=Ember.get,b=function(a){var b=a.toString(),c=b.split("."),d=c[c.length-1];return Ember.String.underscore(d)+"_id"},c=function(a,b){for(var c in b){if(!b.hasOwnProperty(c))continue;if(a.hasOwnProperty(c))continue;a[c]=b[c]}};Ember.Routable=Ember.Mixin.create({init:function(){var b;this.on("connectOutlets",this,this.stashContext);if(b=a(this,"redirectsTo"))this.connectOutlets=function(a){a.transitionTo(b)};var c=a(this,"route");c===""&&(c="/"),this._super()},stashContext:function(b,c){var d=this.serialize(b,c);b.setStateMeta(this,"context",c),b.setStateMeta(this,"serialized",d),a(this,"isRoutable")&&!a(b,"isRouting")&&this.updateRoute(b,a(b,"location"))},updateRoute:function(b,c){if(a(this,"isLeafRoute")){var d=this.absoluteRoute(b);c.setURL(d)}},absoluteRoute:function(b,d){var e=a(this,"parentState"),f="",g;a(e,"isRoutable")&&(f=e.absoluteRoute(b,d));var h=a(this,"routeMatcher"),i=b.getStateMeta(this,"serialized");return d=d||{},c(d,i),g=h&&h.generate(d),g&&(f=f+"/"+g),f},isRoutable:Ember.computed(function(){return typeof a(this,"route")=="string"}).cacheable(),isLeafRoute:Ember.computed(function(){return a(this,"isLeaf")?!0:!a(this,"childStates").findProperty("isRoutable")}).cacheable(),routeMatcher:Ember.computed(function(){var b=a(this,"route");if(b)return Ember._RouteMatcher.create({route:b})}).cacheable(),hasContext:Ember.computed(function(){var b=a(this,"routeMatcher");if(b)return b.identifiers.length>0}).cacheable(),modelClass:Ember.computed(function(){var b=a(this,"modelType");return typeof b=="string"?Ember.get(window,b):b}).cacheable(),modelClassFor:function(b){var c,d,e,f,g;if(c=a(this,"modelClass"))return c;if(!b)return;d=a(this,"routeMatcher");if(!d)return;e=d.identifiers;if(e.length!==2)return;f=e[1].match(/^(.*)_id$/);if(!f)return;return g=Ember.String.classify(f[1]),a(b,g)},deserialize:function(c,d){var e,f,g;return(e=this.modelClassFor(a(c,"namespace")))?e.find(d[b(e)]):d},serialize:function(c,d){var e,f,g,h,i;if(Ember.empty(d))return"";if(e=this.modelClassFor(a(c,"namespace")))h=b(e),i=a(d,"id"),d={},d[h]=i;return d},resolvePath:function(b,c){if(a(this,"isLeafRoute"))return Ember.A();var d=a(this,"childStates"),e;d=Ember.A(d.filterProperty("isRoutable")),d=d.sort(function(b,c){var d=a(b,"routeMatcher.identifiers.length"),e=a(c,"routeMatcher.identifiers.length"),f=a(b,"route"),g=a(c,"route");return f.indexOf(g)===0?-1:g.indexOf(f)===0?1:d!==e?d-e:a(c,"route.length")-a(b,"route.length")});var f=d.find(function(b){var d=a(b,"routeMatcher");if(e=d.match(c))return!0}),g=Ember._ResolvedState.create({manager:b,state:f,match:e}),h=f.resolvePath(b,e.remaining);return Ember.A([g]).pushObjects(h)},routePath:function(b,c){function f(){d.forEach(function(a){a.transition()})}if(a(this,"isLeafRoute"))return;var d=this.resolvePath(b,c),e=d.some(function(b){return a(b,"hasPromise")});e?(b.transitionTo("loading"),b.handleStatePromises(d,f)):f()},unroutePath:function(b,c){var d=a(this,"parentState");if(d===b)return;c=c.replace(/^(?=[^\/])/,"/");var e=this.absoluteRoute(b),f=a(this,"route");if(f!=="/"){var g=c.indexOf(e),h=c.charAt(e.length);if(g===0&&(h==="/"||h===""))return}b.enterState({exitStates:[this],enterStates:[],finalState:d}),b.send("unroutePath",c)},connectOutlets:Ember.K,navigateAway:Ember.K})}(),function(){Ember.Route=Ember.State.extend(Ember.Routable)}(),function(){var a=function(a){return a.replace(/[\-\[\]{}()*+?.,\\\^\$|#\s]/g,"\\$&")};Ember._RouteMatcher=Ember.Object.extend({state:null,init:function(){var b=this.route,c=[],d=1,e;b.charAt(0)==="/"&&(b=this.route=b.substr(1)),e=a(b);var f=e.replace(/:([a-z_]+)(?=$|\/)/gi,function(a,b){return c[d++]=b,"([^/]+)"});this.identifiers=c,this.regex=new RegExp("^/?"+f)},match:function(a){var b=a.match(this.regex);if(b){var c=this.identifiers,d={};for(var e=1,f=c.length;e<f;e++)d[c[e]]=b[e];return{remaining:a.substr(b[0].length),hash:c.length>0?d:null}}},generate:function(a){var b=this.identifiers,c=this.route,d;for(var e=1,f=b.length;e<f;e++)d=b[e],c=c.replace(new RegExp(":"+d),a[d]);return c}})}(),function(){var a=Ember.get,b=Ember.set,c=function(a,b){for(var c in b){if(!b.hasOwnProperty(c))continue;if(a.hasOwnProperty(c))continue;a[c]=b[c]}};Ember.Router=Ember.StateManager.extend({initialState:"root",location:"hash",rootURL:"/",transitionEvent:"connectOutlets",transitionTo:function(){this.abortRoutingPromises(),this._super.apply(this,arguments)},route:function(c){this.abortRoutingPromises(),b(this,"isRouting",!0);var d;try{c=c.replace(/^(?=[^\/])/,"/"),this.send("navigateAway"),this.send("unroutePath",c),d=a(this,"currentState");while(d&&!d.get("isRoutable"))d=a(d,"parentState");var e=d?d.absoluteRoute(this):"",f=c.substr(e.length);this.send("routePath",f)}finally{b(this,"isRouting",!1)}d=a(this,"currentState");while(d&&!d.get("isRoutable"))d=a(d,"parentState");d&&d.updateRoute(this,a(this,"location"))},urlFor:function(b,c){var d=a(this,"currentState")||this,e=this.findStateByPath(d,b),f=a(this,"location"),g=e.absoluteRoute(this,c);return f.formatURL(g)},urlForEvent:function(b){var c=Array.prototype.slice.call(arguments,1),d=a(this,"currentState"),e=d.lookupEventTransition(b),f=this.findStateByPath(d,e),g=this.serializeRecursively(f,c,{});return this.urlFor(e,g)},serializeRecursively:function(b,d,e){var f,g=a(b,"hasContext")?d.pop():null;return c(e,b.serialize(this,g)),f=b.get("parentState"),f&&f instanceof Ember.Route?this.serializeRecursively(f,d,e):e},abortRoutingPromises:function(){this._routingPromises&&(this._routingPromises.abort(),this._routingPromises=null)},handleStatePromises:function(a,c){this.abortRoutingPromises(),this.set("isLocked",!0);var d=this;this._routingPromises=Ember._PromiseChain.create({promises:a.slice(),successCallback:function(){d.set("isLocked",!1),c()},failureCallback:function(){throw"Unable to load object"},promiseSuccessCallback:function(a,c){b(a,"object",c[0])},abortCallback:function(){d.set("isLocked",!1)}}).start()},init:function(){this._super();var c=a(this,"location"),d=a(this,"rootURL");"string"==typeof c&&b(this,"location",Ember.Location.create({implementation:c,rootURL:d}))},willDestroy:function(){a(this,"location").destroy()}})}(),function(){}(),function(){var a=Ember.get;Ember.StateManager.reopen({currentView:Ember.computed(function(){var b=a(this,"currentState"),c;while(b){if(a(b,"isViewState")){c=a(b,"view");if(c)return c}b=a(b,"parentState")}return null}).property("currentState").cacheable()})}(),function(){var a=Ember.get,b=Ember.set;Ember.ViewState=Ember.State.extend({isViewState:!0,init:function(){return this._super()},enter:function(c){var d=a(this,"view"),e,f;d&&(Ember.View.detect(d)&&(d=d.create(),b(this,"view",d)),e=c.get("rootView"),e?(f=a(e,"childViews"),f.pushObject(d)):(e=c.get("rootElement")||"body",d.appendTo(e)))},exit:function(b){var c=a(this,"view");c&&(a(c,"parentView")?c.removeFromParent():c.remove())}})}(),function(){}(),function(){(function(a){var b=function(){},c=0,d=a.document,e="createRange"in d&&typeof Range!="undefined"&&Range.prototype.createContextualFragment,f=function(){var a=d.createElement("div");return a.innerHTML="<div></div>",a.firstChild.innerHTML="<script></script>",a.firstChild.innerHTML===""}(),g=function(a){var d;this instanceof g?d=this:d=new b,d.innerHTML=a;var e="metamorph-"+c++;return d.start=e+"-start",d.end=e+"-end",d};b.prototype=g.prototype;var h,i,j,k,l,m,n,o,p;k=function(){return this.startTag()+this.innerHTML+this.endTag()},o=function(){return"<script id='"+this.start+"' type='text/x-placeholder'></script>"},p=function(){return"<script id='"+this.end+"' type='text/x-placeholder'></script>"};if(e)h=function(a,b){var c=d.createRange(),e=d.getElementById(a.start),f=d.getElementById(a.end);return b?(c.setStartBefore(e),c.setEndAfter(f)):(c.setStartAfter(e),c.setEndBefore(f)),c},i=function(a,b){var c=h(this,b);c.deleteContents();var d=c.createContextualFragment(a);c.insertNode(d)},j=function(){var a=h(this,!0);a.deleteContents()},l=function(a){var b=d.createRange();b.setStart(a),b.collapse(!1);var c=b.createContextualFragment(this.outerHTML());a.appendChild(c)},m=function(a){var b=d.createRange(),c=d.getElementById(this.end);b.setStartAfter(c),b.setEndAfter(c);var e=b.createContextualFragment(a);b.insertNode(e)},n=function(a){var b=d.createRange(),c=d.getElementById(this.start);b.setStartAfter(c),b.setEndAfter(c);var e=b.createContextualFragment(a);b.insertNode(e)};else{var q={select:[1,"<select multiple='multiple'>","</select>"],fieldset:[1,"<fieldset>","</fieldset>"],table:[1,"<table>","</table>"],tbody:[2,"<table><tbody>","</tbody></table>"],tr:[3,"<table><tbody><tr>","</tr></tbody></table>"],colgroup:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],map:[1,"<map>","</map>"],_default:[0,"",""]},r=function(a,b){var c=q[a.tagName.toLowerCase()]||q._default,e=c[0],g=c[1],h=c[2];f&&(b="&shy;"+b);var i=d.createElement("div");i.innerHTML=g+b+h;for(var j=0;j<=e;j++)i=i.firstChild;if(f){var k=i;while(k.nodeType===1&&!k.nodeName)k=k.firstChild;k.nodeType===3&&k.nodeValue.charAt(0)==="Â­"&&(k.nodeValue=k.nodeValue.slice(1))}return i},s=function(a){while(a.parentNode.tagName==="")a=a.parentNode;return a},t=function(a,b){a.parentNode!==b.parentNode&&b.parentNode.insertBefore(a,b.parentNode.firstChild)};i=function(a,b){var c=s(d.getElementById(this.start)),e=d.getElementById(this.end),f=e.parentNode,g,h,i;t(c,e),g=c.nextSibling;while(g){h=g.nextSibling,i=g===e;if(i){if(!b)break;e=g.nextSibling}g.parentNode.removeChild(g);if(i)break;g=h}g=r(c.parentNode,a);while(g)h=g.nextSibling,f.insertBefore(g,e),g=h},j=function(){var a=s(d.getElementById(this.start)),b=d.getElementById(this.end);this.html(""),a.parentNode.removeChild(a),b.parentNode.removeChild(b)},l=function(a){var b=r(a,this.outerHTML());while(b)nextSibling=b.nextSibling,a.appendChild(b),b=nextSibling},m=function(a){var b=d.getElementById(this.end),c=b.nextSibling,e=b.parentNode,f,g;g=r(e,a);while(g)f=g.nextSibling,e.insertBefore(g,c),g=f},n=function(a){var b=d.getElementById(this.start),c=b.parentNode,e,f;f=r(c,a);var g=b.nextSibling;while(f)e=f.nextSibling,c.insertBefore(f,g),f=e}}g.prototype.html=function(a){this.checkRemoved();if(a===undefined)return this.innerHTML;i.call(this,a),this.innerHTML=a},g.prototype.replaceWith=function(a){this.checkRemoved(),i.call(this,a,!0)},g.prototype.remove=j,g.prototype.outerHTML=k,g.prototype.appendTo=l,g.prototype.after=m,g.prototype.prepend=n,g.prototype.startTag=o,g.prototype.endTag=p,g.prototype.isRemoved=function(){var a=d.getElementById(this.start),b=d.getElementById(this.end);return!a||!b},g.prototype.checkRemoved=function(){if(this.isRemoved())throw new Error("Cannot perform operations on a Metamorph that is not in the DOM.")},a.Metamorph=g})(this)}(),function(){var a=Ember.create;Ember.Handlebars=a(Handlebars),Ember.Handlebars.helpers=a(Handlebars.helpers),Ember.Handlebars.Compiler=function(){},Ember.Handlebars.Compiler.prototype=a(Handlebars.Compiler.prototype),Ember.Handlebars.Compiler.prototype.compiler=Ember.Handlebars.Compiler,Ember.Handlebars.JavaScriptCompiler=function(){},Ember.Handlebars.JavaScriptCompiler.prototype=a(Handlebars.JavaScriptCompiler.prototype),Ember.Handlebars.JavaScriptCompiler.prototype.compiler=Ember.Handlebars.JavaScriptCompiler,Ember.Handlebars.JavaScriptCompiler.prototype.namespace="Ember.Handlebars",Ember.Handlebars.JavaScriptCompiler.prototype.initializeBuffer=function(){return"''"},Ember.Handlebars.JavaScriptCompiler.prototype.appendToBuffer=function(a){return"data.buffer.push("+a+");"},Ember.Handlebars.Compiler.prototype.mustache=function(a){if(a.params.length||a.hash)return Handlebars.Compiler.prototype.mustache.call(this,a);var b=new Handlebars.AST.IdNode(["_triageMustache"]);return a.escaped||(a.hash=a.hash||new Handlebars.AST.HashNode([]),a.hash.pairs.push(["unescaped",new Handlebars.AST.StringNode("true")])),a=new Handlebars.AST.MustacheNode([b].concat([a.id]),a.hash,!a.escaped),Handlebars.Compiler.prototype.mustache.call(this,a)},Ember.Handlebars.precompile=function(a){var b=Handlebars.parse(a),c={knownHelpers:{action:!0,unbound:!0,bindAttr:!0,template:!0,view:!0,_triageMustache:!0},data:!0,stringParams:!0},d=(new Ember.Handlebars.Compiler).compile(b,c);return(new Ember.Handlebars.JavaScriptCompiler).compile(d,c,undefined,!0)},Ember.Handlebars.compile=function(a){var b=Handlebars.parse(a),c={data:!0,stringParams:!0},d=(new Ember.Handlebars.Compiler).compile(b,c),e=(new Ember.Handlebars.JavaScriptCompiler).compile(d,c,undefined,!0);return Handlebars.template(e)};var b=Ember.Handlebars.normalizePath=function(a,b,c){var d=c&&c.keywords||{},e,f;return e=b.split(".",1)[0],d.hasOwnProperty(e)&&(a=d[e],f=!0,b===e?b="":b=b.substr(e.length+1)),{root:a,path:b,isKeyword:f}};Ember.Handlebars.getPath=function(a,c,d){var e=d&&d.data,f=b(a,c,e),g;return a=f.root,c=f.path,g=Ember.get(a,c),g===undefined&&a!==window&&Ember.isGlobalPath(c)&&(g=Ember.get(window,c)),g},Ember.Handlebars.registerHelper("helperMissing",function(a,b){var c,d="";throw c="%@ Handlebars error: Could not find property '%@' on object %@.",b.data&&(d=b.data.view),new Ember.Error(Ember.String.fmt(c,[d,a,this]))})}(),function(){Ember.String.htmlSafe=function(a){return new Handlebars.SafeString(a)};var a=Ember.String.htmlSafe;Ember.EXTEND_PROTOTYPES&&(String.prototype.htmlSafe=function(){return a(this)})}(),function(){var a=Ember.set,b=Ember.get,c={remove:function(b){var c=b.morph;if(c.isRemoved())return;a(b,"element",null),b._lastInsert=null,c.remove()},prepend:function(a,b){b._insertElementLater(function(){var c=a.morph;c.prepend(b.outerHTML),b.outerHTML=null})},after:function(a,b){b._insertElementLater(function(){var c=a.morph;c.after(b.outerHTML),b.outerHTML=null})},replace:function(a){var c=a.morph;a.transitionTo("preRender"),a.clearRenderedChildren();var d=a.renderToBuffer();Ember.run.schedule("render",this,function(){if(b(a,"isDestroyed"))return;a.invalidateRecursively("element"),a._notifyWillInsertElement(),c.replaceWith(d.string()),a.transitionTo("inDOM"),a._notifyDidInsertElement()})},empty:function(a){a.morph.html("")}};Ember._Metamorph=Ember.Mixin.create({isVirtual:!0,tagName:"",init:function(){this._super(),this.morph=Metamorph()},beforeRender:function(a){a.push(this.morph.startTag())},afterRender:function(a){a.push(this.morph.endTag())},createElement:function(){var a=this.renderToBuffer();this.outerHTML=a.string(),this.clearBuffer()},domManager:c}),Ember._MetamorphView=Ember.View.extend(Ember._Metamorph)}(),function(){var a=Ember.get,b=Ember.set,c=Ember.Handlebars.getPath;Ember._HandlebarsBoundView=Ember._MetamorphView.extend({shouldDisplayFunc:null,preserveContext:!1,previousContext:null,displayTemplate:null,inverseTemplate:null,path:null,pathRoot:null,normalizedValue:Ember.computed(function(){var b=a(this,"path"),d=a(this,"pathRoot"),e=a(this,"valueNormalizerFunc"),f,g;return b===""?f=d:(g=a(this,"templateData"),f=c(d,b,{data:g})),e?e(f):f}).property("path","pathRoot","valueNormalizerFunc").volatile(),rerenderIfNeeded:function(){!a(this,"isDestroyed")&&a(this,"normalizedValue")!==this._lastNormalizedValue&&this.rerender()},render:function(c){var d=a(this,"isEscaped"),e=a(this,"shouldDisplayFunc"),f=a(this,"preserveContext"),g=a(this,"previousContext"),h=a(this,"inverseTemplate"),i=a(this,"displayTemplate"),j=a(this,"normalizedValue");this._lastNormalizedValue=j;if(e(j)){b(this,"template",i);if(f)b(this,"_context",g);else{if(!i){j===null||j===undefined?j="":j instanceof Handlebars.SafeString||(j=String(j)),d&&(j=Handlebars.Utils.escapeExpression(j)),c.push(j);return}b(this,"_context",j)}}else h?(b(this,"template",h),f?b(this,"_context",g):b(this,"_context",j)):b(this,"template",function(){return""});return this._super(c)}})}(),function(){function i(a,b,c,f,g){var h=b.data,i=b.fn,j=b.inverse,k=h.view,l=this,m,n,o;o=e(l,a,h),m=o.root,n=o.path;if("object"==typeof this){var p=k.createChildView(Ember._HandlebarsBoundView,{preserveContext:c,shouldDisplayFunc:f,valueNormalizerFunc:g,displayTemplate:i,inverseTemplate:j,path:n,pathRoot:m,previousContext:l,isEscaped:!b.hash.unescaped,templateData:b.data});k.appendChild(p);var q=function(){Ember.run.once(p,"rerenderIfNeeded")};n!==""&&Ember.addObserver(m,n,q)}else h.buffer.push(d(m,n,b))}var a=Ember.get,b=Ember.set,c=Ember.String.fmt,d=Ember.Handlebars.getPath,e=Ember.Handlebars.normalizePath,f=Ember.ArrayPolyfills.forEach,g=Ember.Handlebars,h=g.helpers;g.registerHelper("_triageMustache",function(a,b){return h[a]?h[a].call(this,b):h.bind.apply(this,arguments)}),g.registerHelper("bind",function(a,b){var c=b.contexts&&b.contexts[0]||this;return i.call(c,a,b,!1,function(a){return!Ember.none(a)})}),g.registerHelper("boundIf",function(b,c){var d=c.contexts&&c.contexts[0]||this,e=function(b){return Ember.typeOf(b)==="array"?a(b,"length")!==0:!!b};return i.call(d,b,c,!0,e,e)}),g.registerHelper("with",function(a,b){if(arguments.length===4){var c,d,f,g;b=arguments[3],c=arguments[2],d=arguments[0];if(Ember.isGlobalPath(d))Ember.bind(b.data.keywords,c,d);else{g=e(this,d,b.data),d=g.path,f=g.root;var j=Ember.$.expando+Ember.guidFor(f);b.data.keywords[j]=f;var k=d?j+"."+d:j;Ember.bind(b.data.keywords,c,k)}return i.call(this,d,b.fn,!0,function(a){return!Ember.none(a)})}return h.bind.call(b.contexts[0],a,b)}),g.registerHelper("if",function(a,b){return h.boundIf.call(b.contexts[0],a,b)}),g.registerHelper("unless",function(a,b){var c=b.fn,d=b.inverse;return b.fn=d,b.inverse=c,h.boundIf.call(b.contexts[0],a,b)}),g.registerHelper("bindAttr",function(a){var b=a.hash,c=a.data.view,h=[],i=this,j=++Ember.$.uuid,k=b["class"];if(k!==null&&k!==undefined){var l=g.bindClasses(this,k,c,j,a);h.push('class="'+Handlebars.Utils.escapeExpression(l.join(" "))+'"'),delete b["class"]}var m=Ember.keys(b);return f.call(m,function(f){var g=b[f],k,l;l=e(i,g,a.data),k=l.root,g=l.path;var m=g==="this"?k:d(k,g,a),n=Ember.typeOf(m),o,p;o=function(){var e=d(k,g,a),h=c.$("[data-bindattr-"+j+"='"+j+"']");if(h.length===0){Ember.removeObserver(k,g,p);return}Ember.View.applyAttributeBindings(h,f,e)},p=function(){Ember.run.once(o)},g!=="this"&&Ember.addObserver(k,g,p),n==="string"||n==="number"&&!isNaN(m)?h.push(f+'="'+Handlebars.Utils.escapeExpression(m)+'"'):m&&n==="boolean"&&h.push(f+'="'+f+'"')},this),h.push("data-bindattr-"+j+'="'+j+'"'),new g.SafeString(h.join(" "))}),g.bindClasses=function(a,b,c,g,h){var i=[],j,k,l,m=function(a,b,c){var e,f=b.path;return f==="this"?e=a:f===""?e=!0:e=d(a,f,c),Ember.View._classStringForValue(f,e,b.className,b.falsyClassName)};return f.call(b.split(" "),function(b){var d,f,n,o=Ember.View._parsePropertyPath(b),p=o.path,q=a,r;p!==""&&p!=="this"&&(r=e(a,p,h.data),q=r.root,p=r.path),f=function(){j=m(q,o,h),l=g?c.$("[data-bindattr-"+g+"='"+g+"']"):c.$(),l.length===0?Ember.removeObserver(q,p,n):(d&&l.removeClass(d),j?(l.addClass(j),d=j):d=null)},n=function(){Ember.run.once(f)},p!==""&&p!=="this"&&Ember.addObserver(q,p,n),k=m(q,o,h),k&&(i.push(k),d=k)}),i}}(),function(){var a=Ember.get,b=Ember.set,c=/^parentView\./,d=Ember.Handlebars,e=Ember.VIEW_PRESERVES_CONTEXT;d.ViewHelper=Ember.Object.create({propertiesFromHTMLOptions:function(a,b){var c=a.hash,d=a.data,e={},f=c["class"],g=!1;c.id&&(e.elementId=c.id,g=!0),f&&(f=f.split(" "),e.classNames=f,g=!0),c.classBinding&&(e.classNameBindings=c.classBinding.split(" "),g=!0),c.classNameBindings&&(e.classNameBindings===undefined&&(e.classNameBindings=[]),e.classNameBindings=e.classNameBindings.concat(c.classNameBindings.split(" ")),g=!0),c.attributeBindings&&(e.attributeBindings=null,g=!0),g&&(c=Ember.$.extend({},c),delete c.id,delete c["class"],delete c.classBinding);var h;for(var i in c){if(!c.hasOwnProperty(i))continue;Ember.IS_BINDING.test(i)&&typeof c[i]=="string"&&(h=this.contextualizeBindingPath(c[i],d),h&&(c[i]=h))}if(e.classNameBindings)for(var j in e.classNameBindings){var k=e.classNameBindings[j];if(typeof k=="string"){var l=Ember.View._parsePropertyPath(k);h=this.contextualizeBindingPath(l.path,d),h&&(e.classNameBindings[j]=h+l.classNames)}}return e.bindingContext=b,Ember.$.extend(c,e)},contextualizeBindingPath:function(a,b){var c=Ember.Handlebars.normalizePath(null,a,b);return c.isKeyword?"templateData.keywords."+a:Ember.isGlobalPath(a)?null:a==="this"?"bindingContext":"bindingContext."+a},helper:function(a,b,c){var f=c.inverse,g=c.data,h=g.view,i=c.fn,j=c.hash,k;"string"==typeof b?k=d.getPath(a,b,c):k=b;var l=this.propertiesFromHTMLOptions(c,a),m=g.view;l.templateData=c.data,i&&(l.template=i),e&&!k.proto().controller&&!k.proto().controllerBinding&&!l.controller&&!l.controllerBinding&&(l._context=a),m.appendChild(k,l)}}),d.registerHelper("view",function(a,b){return a&&a.data&&a.data.isRenderData&&(b=a,a="Ember.View"),d.ViewHelper.helper(this,a,b)})}(),function(){var a=Ember.get,b=Ember.Handlebars.getPath,c=Ember.String.fmt;Ember.Handlebars.registerHelper("collection",function(c,d){c&&c.data&&c.data.isRenderData&&(d=c,c=undefined);var e=d.fn,f=d.data,g=d.inverse,h;h=c?b(this,c,d):Ember.CollectionView;var i=d.hash,j={},k,l,m=i.itemViewClass,n=h.proto();delete i.itemViewClass,l=m?b(n,m,d):n.itemViewClass;for(var o in i)i.hasOwnProperty(o)&&(k=o.match(/^item(.)(.*)$/),k&&(j[k[1].toLowerCase()+k[2]]=i[o],delete i[o]));var p=i.tagName||n.tagName;e&&(j.template=e,delete d.fn);var q;g&&g!==Handlebars.VM.noop?(q=a(n,"emptyViewClass"),q=q.extend({template:g,tagName:j.tagName})):i.emptyViewClass&&(q=b(this,i.emptyViewClass,d)),i.emptyView=q,i.eachHelper==="each"&&(j._context=Ember.computed(function(){return a(this,"content")}).property("content"),delete i.eachHelper);var r=Ember.Handlebars.ViewHelper.propertiesFromHTMLOptions({data:f,hash:j},this);return i.itemViewClass=l.extend(r),Ember.Handlebars.helpers.view.call(this,h,d)})}(),function(){var a=Ember.Handlebars.getPath;Ember.Handlebars.registerHelper("unbound",function(b,c){var d=c.contexts&&c.contexts[0]||this;return a(d,b,c)})}(),function(){var a=Ember.Handlebars.getPath,b=Ember.Handlebars.normalizePath;Ember.Handlebars.registerHelper("log",function(c,d){var e=d.contexts&&d.contexts[0]||this,f=b(e,c,d.data),g=f.root,h=f.path,i=h==="this"?g:a(g,h,d);Ember.Logger.log(i)}),Ember.Handlebars.registerHelper("debugger",function(){debugger})}(),function(){var a=Ember.get,b=Ember.set;Ember.Handlebars.EachView=Ember.CollectionView.extend(Ember._Metamorph,{itemViewClass:Ember._MetamorphView,emptyViewClass:Ember._MetamorphView,createChildView:function(c,d){c=this._super(c,d);var e=a(this,"keyword");if(e){var f=a(c,"templateData");f=Ember.copy(f),f.keywords=c.cloneKeywords(),b(c,"templateData",f);var g=a(c,"content");f.keywords[e]=g}return c}}),Ember.Handlebars.registerHelper("each",function(a,b){if(arguments.length===4){var c=arguments[0];b=arguments[3],a=arguments[2],a===""&&(a="this"),b.hash.keyword=c}else b.hash.eachHelper="each";return b.hash.contentBinding=a,Ember.Handlebars.helpers.collection.call(this,"Ember.Handlebars.EachView",b)})}(),function(){Ember.Handlebars.registerHelper("template",function(a,b){var c=Ember.TEMPLATES[a];Ember.TEMPLATES[a](this,{data:b.data})})}(),function(){var a=Ember.Handlebars,b=a.getPath,c=Ember.get,d=Array.prototype.slice,e=a.ActionHelper={registeredActions:{}};e.registerAction=function(a,b){var c=(++Ember.$.uuid).toString();return e.registeredActions[c]={eventName:b.eventName,handler:function(c){var d=c.shiftKey||c.metaKey||c.altKey||c.ctrlKey,e=c.which>1,f=d||e;if(b.link&&f)return;c.preventDefault(),c.view=b.view,b.hasOwnProperty("context")&&(c.context=b.context),b.hasOwnProperty("contexts")&&(c.contexts=b.contexts);var g=b.target;return g.isState&&typeof g.send=="function"?g.send(a,c):g[a].call(g,c)}},b.view.on("willRerender",function(){delete e.registeredActions[c]}),c},a.registerHelper("action",function(f){var g=arguments[arguments.length-1],h=d.call(arguments,1,-1),i=g.hash,j=g.data.view,k,l,m,n={eventName:i.on||"click"};n.view=j=c(j,"concreteView");if(i.target)k=b(this,i.target,g);else if(l=g.data.keywords.controller)k=c(l,"target");n.target=k=k||j,h.length&&(n.contexts=h=Ember.EnumerableUtils.map(h,function(a){return b(this,a,g)},this),n.context=h[0]);var o=[],p;i.href&&k.urlForEvent&&(p=k.urlForEvent.apply(k,[f].concat(h)),o.push('href="'+p+'"'),n.link=!0);var q=e.registerAction(f,n);return o.push('data-ember-action="'+q+'"'),new a.SafeString(o.join(" "))})}(),function(){var a=Ember.get,b=Ember.set;Ember.Handlebars.registerHelper("yield",function(b){var c=b.data.view,d;while(c&&!a(c,"layout"))c=a(c,"parentView");d=a(c,"template"),d&&d(this,b)})}(),function(){Ember.Handlebars.registerHelper("outlet",function(a,b){return a&&a.data&&a.data.isRenderData&&(b=a,a="view"),b.hash.currentViewBinding="controller."+a,Ember.Handlebars
.helpers.view.call(this,Ember.ContainerView,b)})}(),function(){}(),function(){}(),function(){var a=Ember.set,b=Ember.get;Ember.Checkbox=Ember.View.extend({classNames:["ember-checkbox"],tagName:"input",attributeBindings:["type","checked","disabled","tabindex"],type:"checkbox",checked:!1,disabled:!1,init:function(){this._super(),this.on("change",this,this._updateElementValue)},_updateElementValue:function(){a(this,"checked",this.$().prop("checked"))}})}(),function(){var a=Ember.get,b=Ember.set;Ember.TextSupport=Ember.Mixin.create({value:"",attributeBindings:["placeholder","disabled","maxlength","tabindex"],placeholder:null,disabled:!1,maxlength:null,insertNewline:Ember.K,cancel:Ember.K,init:function(){this._super(),this.on("focusOut",this,this._elementValueDidChange),this.on("change",this,this._elementValueDidChange),this.on("keyUp",this,this.interpretKeyEvents)},interpretKeyEvents:function(a){var b=Ember.TextSupport.KEY_EVENTS,c=b[a.keyCode];this._elementValueDidChange();if(c)return this[c](a)},_elementValueDidChange:function(){b(this,"value",this.$().val())}}),Ember.TextSupport.KEY_EVENTS={13:"insertNewline",27:"cancel"}}(),function(){var a=Ember.get,b=Ember.set;Ember.TextField=Ember.View.extend(Ember.TextSupport,{classNames:["ember-text-field"],tagName:"input",attributeBindings:["type","value","size"],value:"",type:"text",size:null})}(),function(){var a=Ember.get,b=Ember.set;Ember.Button=Ember.View.extend(Ember.TargetActionSupport,{classNames:["ember-button"],classNameBindings:["isActive"],tagName:"button",propagateEvents:!1,attributeBindings:["type","disabled","href","tabindex"],targetObject:Ember.computed(function(){var b=a(this,"target"),c=a(this,"context"),d=a(this,"templateData");return typeof b!="string"?b:Ember.Handlebars.getPath(c,b,{data:d})}).property("target").cacheable(),type:Ember.computed(function(a,b){var c=this.get("tagName");b!==undefined&&(this._type=b);if(this._type!==undefined)return this._type;if(c==="input"||c==="button")return"button"}).property("tagName").cacheable(),disabled:!1,href:Ember.computed(function(){return this.get("tagName")==="a"?"#":null}).property("tagName").cacheable(),mouseDown:function(){return a(this,"disabled")||(b(this,"isActive",!0),this._mouseDown=!0,this._mouseEntered=!0),a(this,"propagateEvents")},mouseLeave:function(){this._mouseDown&&(b(this,"isActive",!1),this._mouseEntered=!1)},mouseEnter:function(){this._mouseDown&&(b(this,"isActive",!0),this._mouseEntered=!0)},mouseUp:function(c){return a(this,"isActive")&&(this.triggerAction(),b(this,"isActive",!1)),this._mouseDown=!1,this._mouseEntered=!1,a(this,"propagateEvents")},keyDown:function(a){(a.keyCode===13||a.keyCode===32)&&this.mouseDown()},keyUp:function(a){(a.keyCode===13||a.keyCode===32)&&this.mouseUp()},touchStart:function(a){return this.mouseDown(a)},touchEnd:function(a){return this.mouseUp(a)},init:function(){this._super()}})}(),function(){var a=Ember.get,b=Ember.set;Ember.TextArea=Ember.View.extend(Ember.TextSupport,{classNames:["ember-text-area"],tagName:"textarea",attributeBindings:["rows","cols"],rows:null,cols:null,_updateElementValue:Ember.observer(function(){var b=a(this,"value"),c=this.$();c&&b!==c.val()&&c.val(b)},"value"),init:function(){this._super(),this.on("didInsertElement",this,this._updateElementValue)}})}(),function(){Ember.TabContainerView=Ember.View.extend({init:function(){this._super()}})}(),function(){var a=Ember.get;Ember.TabPaneView=Ember.View.extend({tabsContainer:Ember.computed(function(){return this.nearestInstanceOf(Ember.TabContainerView)}).property().volatile(),isVisible:Ember.computed(function(){return a(this,"viewName")===a(this,"tabsContainer.currentView")}).property("tabsContainer.currentView").volatile(),init:function(){this._super()}})}(),function(){var a=Ember.get,b=Ember.setPath;Ember.TabView=Ember.View.extend({tabsContainer:Ember.computed(function(){return this.nearestInstanceOf(Ember.TabContainerView)}).property().volatile(),mouseUp:function(){b(this,"tabsContainer.currentView",a(this,"value"))},init:function(){this._super()}})}(),function(){}(),function(){var a=Ember.set,b=Ember.get,c=Ember.EnumerableUtils.indexOf,d=Ember.EnumerableUtils.indexesOf;Ember.Select=Ember.View.extend({tagName:"select",classNames:["ember-select"],defaultTemplate:Ember.Handlebars.template(function(b,c,d,e,f){function q(a,b){var c="",e,f,g,h;return b.buffer.push("<option value>"),e=a,f="view.prompt",g={},h="true",g.escaped=h,h=d._triageMustache||a._triageMustache,k={},k.hash=g,k.contexts=[],k.contexts.push(e),k.data=b,typeof h===m?e=h.call(a,f,k):h===o?e=n.call(a,"_triageMustache",f,k):e=h,b.buffer.push(p(e)+"</option>"),c}function r(a,b){var c,e,f,g;c=a,e="Ember.SelectOption",f={},g="this",f.contentBinding=g,g=d.view||a.view,k={},k.hash=f,k.contexts=[],k.contexts.push(c),k.data=b,typeof g===m?c=g.call(a,e,k):g===o?c=n.call(a,"view",e,k):c=g,b.buffer.push(p(c))}d=d||Ember.Handlebars.helpers;var g="",h,i,j,k,l=this,m="function",n=d.helperMissing,o=void 0,p=this.escapeExpression;return h=c,i="view.prompt",j=d["if"],k=l.program(1,q,f),k.hash={},k.contexts=[],k.contexts.push(h),k.fn=k,k.inverse=l.noop,k.data=f,h=j.call(c,i,k),(h||h===0)&&f.buffer.push(h),h=c,i="view.content",j=d.each,k=l.program(3,r,f),k.hash={},k.contexts=[],k.contexts.push(h),k.fn=k,k.inverse=l.noop,k.data=f,h=j.call(c,i,k),(h||h===0)&&f.buffer.push(h),g}),attributeBindings:["multiple","tabindex"],multiple:!1,content:null,selection:null,value:Ember.computed(function(a,c){if(arguments.length===2)return c;var d=b(this,"optionValuePath").replace(/^content\.?/,"");return d?b(this,"selection."+d):b(this,"selection")}).property("selection").cacheable(),prompt:null,optionLabelPath:"content",optionValuePath:"content",_change:function(){b(this,"multiple")?this._changeMultiple():this._changeSingle()},selectionDidChange:Ember.observer(function(){var c=b(this,"selection"),d=Ember.isArray(c);if(b(this,"multiple")){if(!d){a(this,"selection",Ember.A([c]));return}this._selectionDidChangeMultiple()}else this._selectionDidChangeSingle()},"selection"),valueDidChange:Ember.observer(function(){var a=b(this,"content"),c=b(this,"value"),d=b(this,"optionValuePath").replace(/^content\.?/,""),e=d?b(this,"selection."+d):b(this,"selection"),f;c!==e&&(f=a.find(function(a){return c===(d?b(a,d):a)}),this.set("selection",f))},"value"),_triggerChange:function(){var a=b(this,"selection");a&&this.selectionDidChange(),this._change()},_changeSingle:function(){var c=this.$()[0].selectedIndex,d=b(this,"content"),e=b(this,"prompt");if(!d)return;if(e&&c===0){a(this,"selection",null);return}e&&(c-=1),a(this,"selection",d.objectAt(c))},_changeMultiple:function(){var c=this.$("option:selected"),d=b(this,"prompt"),e=d?1:0,f=b(this,"content");if(!f)return;if(c){var g=c.map(function(){return this.index-e}).toArray();a(this,"selection",f.objectsAt(g))}},_selectionDidChangeSingle:function(){var a=this.get("element");if(!a)return;var d=b(this,"content"),e=b(this,"selection"),f=d?c(d,e):-1,g=b(this,"prompt");g&&(f+=1),a&&(a.selectedIndex=f)},_selectionDidChangeMultiple:function(){var a=b(this,"content"),e=b(this,"selection"),f=a?d(a,e):[-1],g=b(this,"prompt"),h=g?1:0,i=this.$("option"),j;i&&i.each(function(){j=this.index>-1?this.index+h:-1,this.selected=c(f,j)>-1})},init:function(){this._super(),this.on("didInsertElement",this,this._triggerChange),this.on("change",this,this._change)}}),Ember.SelectOption=Ember.View.extend({tagName:"option",attributeBindings:["value","selected"],defaultTemplate:function(a,b){b={data:b.data,hash:{}},Ember.Handlebars.helpers.bind.call(a,"view.label",b)},init:function(){this.labelPathDidChange(),this.valuePathDidChange(),this._super()},selected:Ember.computed(function(){var a=b(this,"content"),d=b(this,"parentView.selection");return b(this,"parentView.multiple")?d&&c(d,a)>-1:a==d}).property("content","parentView.selection").volatile(),labelPathDidChange:Ember.observer(function(){var a=b(this,"parentView.optionLabelPath");if(!a)return;Ember.defineProperty(this,"label",Ember.computed(function(){return b(this,a)}).property(a).cacheable())},"parentView.optionLabelPath"),valuePathDidChange:Ember.observer(function(){var a=b(this,"parentView.optionValuePath");if(!a)return;Ember.defineProperty(this,"value",Ember.computed(function(){return b(this,a)}).property(a).cacheable())},"parentView.optionValuePath")})}(),function(){}(),function(){function a(){Ember.Handlebars.bootstrap(Ember.$(document))}Ember.Handlebars.bootstrap=function(a){var b='script[type="text/x-handlebars"], script[type="text/x-raw-handlebars"]';Ember.$(b,a).each(function(){var a=Ember.$(this),b=a.attr("type"),c=a.attr("type")==="text/x-raw-handlebars"?Ember.$.proxy(Handlebars.compile,Handlebars):Ember.$.proxy(Ember.Handlebars.compile,Ember.Handlebars),d=a.attr("data-template-name")||a.attr("id"),e=c(a.html()),f,g,h,i;if(d)Ember.TEMPLATES[d]=e,a.remove();else{if(a.parents("head").length!==0)throw new Ember.Error("Template found in <head> without a name specified. Please provide a data-template-name attribute.\n"+a.html());g=a.attr("data-view"),f=g?Ember.get(g):Ember.View,h=a.attr("data-element-id"),i={template:e},h&&(i.elementId=h),f=f.create(i),f._insertElementLater(function(){a.replaceWith(this.$()),a=null})}})},Ember.$(document).ready(a),Ember.onLoad("application",a)}(),function(){}();

//     Underscore.js 1.4.2
//     http://underscorejs.org
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.
(function(){var e=this,t=e._,n={},r=Array.prototype,i=Object.prototype,s=Function.prototype,o=r.push,u=r.slice,a=r.concat,f=r.unshift,l=i.toString,c=i.hasOwnProperty,h=r.forEach,p=r.map,d=r.reduce,v=r.reduceRight,m=r.filter,g=r.every,y=r.some,b=r.indexOf,w=r.lastIndexOf,E=Array.isArray,S=Object.keys,x=s.bind,T=function(e){if(e instanceof T)return e;if(!(this instanceof T))return new T(e);this._wrapped=e};typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(exports=module.exports=T),exports._=T):e._=T,T.VERSION="1.4.2";var N=T.each=T.forEach=function(e,t,r){if(e==null)return;if(h&&e.forEach===h)e.forEach(t,r);else if(e.length===+e.length){for(var i=0,s=e.length;i<s;i++)if(t.call(r,e[i],i,e)===n)return}else for(var o in e)if(T.has(e,o)&&t.call(r,e[o],o,e)===n)return};T.map=T.collect=function(e,t,n){var r=[];return e==null?r:p&&e.map===p?e.map(t,n):(N(e,function(e,i,s){r[r.length]=t.call(n,e,i,s)}),r)},T.reduce=T.foldl=T.inject=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(d&&e.reduce===d)return r&&(t=T.bind(t,r)),i?e.reduce(t,n):e.reduce(t);N(e,function(e,s,o){i?n=t.call(r,n,e,s,o):(n=e,i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.reduceRight=T.foldr=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(v&&e.reduceRight===v)return r&&(t=T.bind(t,r)),arguments.length>2?e.reduceRight(t,n):e.reduceRight(t);var s=e.length;if(s!==+s){var o=T.keys(e);s=o.length}N(e,function(u,a,f){a=o?o[--s]:--s,i?n=t.call(r,n,e[a],a,f):(n=e[a],i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.find=T.detect=function(e,t,n){var r;return C(e,function(e,i,s){if(t.call(n,e,i,s))return r=e,!0}),r},T.filter=T.select=function(e,t,n){var r=[];return e==null?r:m&&e.filter===m?e.filter(t,n):(N(e,function(e,i,s){t.call(n,e,i,s)&&(r[r.length]=e)}),r)},T.reject=function(e,t,n){var r=[];return e==null?r:(N(e,function(e,i,s){t.call(n,e,i,s)||(r[r.length]=e)}),r)},T.every=T.all=function(e,t,r){t||(t=T.identity);var i=!0;return e==null?i:g&&e.every===g?e.every(t,r):(N(e,function(e,s,o){if(!(i=i&&t.call(r,e,s,o)))return n}),!!i)};var C=T.some=T.any=function(e,t,r){t||(t=T.identity);var i=!1;return e==null?i:y&&e.some===y?e.some(t,r):(N(e,function(e,s,o){if(i||(i=t.call(r,e,s,o)))return n}),!!i)};T.contains=T.include=function(e,t){var n=!1;return e==null?n:b&&e.indexOf===b?e.indexOf(t)!=-1:(n=C(e,function(e){return e===t}),n)},T.invoke=function(e,t){var n=u.call(arguments,2);return T.map(e,function(e){return(T.isFunction(t)?t:e[t]).apply(e,n)})},T.pluck=function(e,t){return T.map(e,function(e){return e[t]})},T.where=function(e,t){return T.isEmpty(t)?[]:T.filter(e,function(e){for(var n in t)if(t[n]!==e[n])return!1;return!0})},T.max=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e);if(!t&&T.isEmpty(e))return-Infinity;var r={computed:-Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o>=r.computed&&(r={value:e,computed:o})}),r.value},T.min=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.min.apply(Math,e);if(!t&&T.isEmpty(e))return Infinity;var r={computed:Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o<r.computed&&(r={value:e,computed:o})}),r.value},T.shuffle=function(e){var t,n=0,r=[];return N(e,function(e){t=T.random(n++),r[n-1]=r[t],r[t]=e}),r};var k=function(e){return T.isFunction(e)?e:function(t){return t[e]}};T.sortBy=function(e,t,n){var r=k(t);return T.pluck(T.map(e,function(e,t,i){return{value:e,index:t,criteria:r.call(n,e,t,i)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||n===void 0)return 1;if(n<r||r===void 0)return-1}return e.index<t.index?-1:1}),"value")};var L=function(e,t,n,r){var i={},s=k(t);return N(e,function(t,o){var u=s.call(n,t,o,e);r(i,u,t)}),i};T.groupBy=function(e,t,n){return L(e,t,n,function(e,t,n){(T.has(e,t)?e[t]:e[t]=[]).push(n)})},T.countBy=function(e,t,n){return L(e,t,n,function(e,t,n){T.has(e,t)||(e[t]=0),e[t]++})},T.sortedIndex=function(e,t,n,r){n=n==null?T.identity:k(n);var i=n.call(r,t),s=0,o=e.length;while(s<o){var u=s+o>>>1;n.call(r,e[u])<i?s=u+1:o=u}return s},T.toArray=function(e){return e?e.length===+e.length?u.call(e):T.values(e):[]},T.size=function(e){return e.length===+e.length?e.length:T.keys(e).length},T.first=T.head=T.take=function(e,t,n){return t!=null&&!n?u.call(e,0,t):e[0]},T.initial=function(e,t,n){return u.call(e,0,e.length-(t==null||n?1:t))},T.last=function(e,t,n){return t!=null&&!n?u.call(e,Math.max(e.length-t,0)):e[e.length-1]},T.rest=T.tail=T.drop=function(e,t,n){return u.call(e,t==null||n?1:t)},T.compact=function(e){return T.filter(e,function(e){return!!e})};var A=function(e,t,n){return N(e,function(e){T.isArray(e)?t?o.apply(n,e):A(e,t,n):n.push(e)}),n};T.flatten=function(e,t){return A(e,t,[])},T.without=function(e){return T.difference(e,u.call(arguments,1))},T.uniq=T.unique=function(e,t,n,r){var i=n?T.map(e,n,r):e,s=[],o=[];return N(i,function(n,r){if(t?!r||o[o.length-1]!==n:!T.contains(o,n))o.push(n),s.push(e[r])}),s},T.union=function(){return T.uniq(a.apply(r,arguments))},T.intersection=function(e){var t=u.call(arguments,1);return T.filter(T.uniq(e),function(e){return T.every(t,function(t){return T.indexOf(t,e)>=0})})},T.difference=function(e){var t=a.apply(r,u.call(arguments,1));return T.filter(e,function(e){return!T.contains(t,e)})},T.zip=function(){var e=u.call(arguments),t=T.max(T.pluck(e,"length")),n=new Array(t);for(var r=0;r<t;r++)n[r]=T.pluck(e,""+r);return n},T.object=function(e,t){var n={};for(var r=0,i=e.length;r<i;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n},T.indexOf=function(e,t,n){if(e==null)return-1;var r=0,i=e.length;if(n){if(typeof n!="number")return r=T.sortedIndex(e,t),e[r]===t?r:-1;r=n<0?Math.max(0,i+n):n}if(b&&e.indexOf===b)return e.indexOf(t,n);for(;r<i;r++)if(e[r]===t)return r;return-1},T.lastIndexOf=function(e,t,n){if(e==null)return-1;var r=n!=null;if(w&&e.lastIndexOf===w)return r?e.lastIndexOf(t,n):e.lastIndexOf(t);var i=r?n:e.length;while(i--)if(e[i]===t)return i;return-1},T.range=function(e,t,n){arguments.length<=1&&(t=e||0,e=0),n=arguments[2]||1;var r=Math.max(Math.ceil((t-e)/n),0),i=0,s=new Array(r);while(i<r)s[i++]=e,e+=n;return s};var O=function(){};T.bind=function(t,n){var r,i;if(t.bind===x&&x)return x.apply(t,u.call(arguments,1));if(!T.isFunction(t))throw new TypeError;return i=u.call(arguments,2),r=function(){if(this instanceof r){O.prototype=t.prototype;var e=new O,s=t.apply(e,i.concat(u.call(arguments)));return Object(s)===s?s:e}return t.apply(n,i.concat(u.call(arguments)))}},T.bindAll=function(e){var t=u.call(arguments,1);return t.length==0&&(t=T.functions(e)),N(t,function(t){e[t]=T.bind(e[t],e)}),e},T.memoize=function(e,t){var n={};return t||(t=T.identity),function(){var r=t.apply(this,arguments);return T.has(n,r)?n[r]:n[r]=e.apply(this,arguments)}},T.delay=function(e,t){var n=u.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},T.defer=function(e){return T.delay.apply(T,[e,1].concat(u.call(arguments,1)))},T.throttle=function(e,t){var n,r,i,s,o,u,a=T.debounce(function(){o=s=!1},t);return function(){n=this,r=arguments;var f=function(){i=null,o&&(u=e.apply(n,r)),a()};return i||(i=setTimeout(f,t)),s?o=!0:(s=!0,u=e.apply(n,r)),a(),u}},T.debounce=function(e,t,n){var r,i;return function(){var s=this,o=arguments,u=function(){r=null,n||(i=e.apply(s,o))},a=n&&!r;return clearTimeout(r),r=setTimeout(u,t),a&&(i=e.apply(s,o)),i}},T.once=function(e){var t=!1,n;return function(){return t?n:(t=!0,n=e.apply(this,arguments),e=null,n)}},T.wrap=function(e,t){return function(){var n=[e];return o.apply(n,arguments),t.apply(this,n)}},T.compose=function(){var e=arguments;return function(){var t=arguments;for(var n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},T.after=function(e,t){return e<=0?t():function(){if(--e<1)return t.apply(this,arguments)}},T.keys=S||function(e){if(e!==Object(e))throw new TypeError("Invalid object");var t=[];for(var n in e)T.has(e,n)&&(t[t.length]=n);return t},T.values=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push(e[n]);return t},T.pairs=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push([n,e[n]]);return t},T.invert=function(e){var t={};for(var n in e)T.has(e,n)&&(t[e[n]]=n);return t},T.functions=T.methods=function(e){var t=[];for(var n in e)T.isFunction(e[n])&&t.push(n);return t.sort()},T.extend=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]=t[n]}),e},T.pick=function(e){var t={},n=a.apply(r,u.call(arguments,1));return N(n,function(n){n in e&&(t[n]=e[n])}),t},T.omit=function(e){var t={},n=a.apply(r,u.call(arguments,1));for(var i in e)T.contains(n,i)||(t[i]=e[i]);return t},T.defaults=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]==null&&(e[n]=t[n])}),e},T.clone=function(e){return T.isObject(e)?T.isArray(e)?e.slice():T.extend({},e):e},T.tap=function(e,t){return t(e),e};var M=function(e,t,n,r){if(e===t)return e!==0||1/e==1/t;if(e==null||t==null)return e===t;e instanceof T&&(e=e._wrapped),t instanceof T&&(t=t._wrapped);var i=l.call(e);if(i!=l.call(t))return!1;switch(i){case"[object String]":return e==String(t);case"[object Number]":return e!=+e?t!=+t:e==0?1/e==1/t:e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if(typeof e!="object"||typeof t!="object")return!1;var s=n.length;while(s--)if(n[s]==e)return r[s]==t;n.push(e),r.push(t);var o=0,u=!0;if(i=="[object Array]"){o=e.length,u=o==t.length;if(u)while(o--)if(!(u=M(e[o],t[o],n,r)))break}else{var a=e.constructor,f=t.constructor;if(a!==f&&!(T.isFunction(a)&&a instanceof a&&T.isFunction(f)&&f instanceof f))return!1;for(var c in e)if(T.has(e,c)){o++;if(!(u=T.has(t,c)&&M(e[c],t[c],n,r)))break}if(u){for(c in t)if(T.has(t,c)&&!(o--))break;u=!o}}return n.pop(),r.pop(),u};T.isEqual=function(e,t){return M(e,t,[],[])},T.isEmpty=function(e){if(e==null)return!0;if(T.isArray(e)||T.isString(e))return e.length===0;for(var t in e)if(T.has(e,t))return!1;return!0},T.isElement=function(e){return!!e&&e.nodeType===1},T.isArray=E||function(e){return l.call(e)=="[object Array]"},T.isObject=function(e){return e===Object(e)},N(["Arguments","Function","String","Number","Date","RegExp"],function(e){T["is"+e]=function(t){return l.call(t)=="[object "+e+"]"}}),T.isArguments(arguments)||(T.isArguments=function(e){return!!e&&!!T.has(e,"callee")}),typeof /./!="function"&&(T.isFunction=function(e){return typeof e=="function"}),T.isFinite=function(e){return T.isNumber(e)&&isFinite(e)},T.isNaN=function(e){return T.isNumber(e)&&e!=+e},T.isBoolean=function(e){return e===!0||e===!1||l.call(e)=="[object Boolean]"},T.isNull=function(e){return e===null},T.isUndefined=function(e){return e===void 0},T.has=function(e,t){return c.call(e,t)},T.noConflict=function(){return e._=t,this},T.identity=function(e){return e},T.times=function(e,t,n){for(var r=0;r<e;r++)t.call(n,r)},T.random=function(e,t){return t==null&&(t=e,e=0),e+(0|Math.random()*(t-e+1))};var _={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};_.unescape=T.invert(_.escape);var D={escape:new RegExp("["+T.keys(_.escape).join("")+"]","g"),unescape:new RegExp("("+T.keys(_.unescape).join("|")+")","g")};T.each(["escape","unescape"],function(e){T[e]=function(t){return t==null?"":(""+t).replace(D[e],function(t){return _[e][t]})}}),T.result=function(e,t){if(e==null)return null;var n=e[t];return T.isFunction(n)?n.call(e):n},T.mixin=function(e){N(T.functions(e),function(t){var n=T[t]=e[t];T.prototype[t]=function(){var e=[this._wrapped];return o.apply(e,arguments),F.call(this,n.apply(T,e))}})};var P=0;T.uniqueId=function(e){var t=P++;return e?e+t:t},T.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var H=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","  ":"t","\u2028":"u2028","\u2029":"u2029"},j=/\\|'|\r|\n|\t|\u2028|\u2029/g;T.template=function(e,t,n){n=T.defaults({},n,T.templateSettings);var r=new RegExp([(n.escape||H).source,(n.interpolate||H).source,(n.evaluate||H).source].join("|")+"|$","g"),i=0,s="__p+='";e.replace(r,function(t,n,r,o,u){s+=e.slice(i,u).replace(j,function(e){return"\\"+B[e]}),s+=n?"'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?"'+\n((__t=("+r+"))==null?'':__t)+\n'":o?"';\n"+o+"\n__p+='":"",i=u+t.length}),s+="';\n",n.variable||(s="with(obj||{}){\n"+s+"}\n"),s="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+s+"return __p;\n";try{var o=new Function(n.variable||"obj","_",s)}catch(u){throw u.source=s,u}if(t)return o(t,T);var a=function(e){return o.call(this,e,T)};return a.source="function("+(n.variable||"obj")+"){\n"+s+"}",a},T.chain=function(e){return T(e).chain()};var F=function(e){return this._chain?T(e).chain():e};T.mixin(T),N(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=r[e];T.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),(e=="shift"||e=="splice")&&n.length===0&&delete n[0],F.call(this,n)}}),N(["concat","join","slice"],function(e){var t=r[e];T.prototype[e]=function(){return F.call(this,t.apply(this._wrapped,arguments))}}),T.extend(T.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);

(function() {

window.Zd = window.Zd || {};

Zd.HtmlEncoder = (function() {
  var div = document.createElement('div');
  var textNode = document.createTextNode('');
  div.appendChild(textNode);

  var encode = function(str) {
    textNode.nodeValue = str;
    return div.innerHTML;
  };

  return {
    toHtml: encode
  };
}());

Zd.makePlugin = function(pluginName, constructor) {
  $.fn[pluginName] = function(options) {
    options = options || {};
    var domHolder = options.domHolder = this[0];
    if (!domHolder) return this;

    var instance = new constructor(options);

    instance.addObserver('destroy', function() {
      $(domHolder).data(pluginName, null);
    });

    this.eq(0).data(pluginName, instance);
    return this;
  };
};

Zd.MenuIdGenerator = {
  getUniqId: function() {
    return this.idPrefix + this.counter++;
  },
  idPrefix:   'zd_mn_',
  menuSuffix: '_mn',
  counter:    0
};

Zd.escapeRegExp = function(str) {
  return str.replace(/[\-\[\]\{\}\(\)\*\+\?\.\,\\\^\$\|#\s]/g, "\\$&");
};

Zd.MenuOptions = Em.Mixin.create({
  setOptions: function(options, defaultOptions) {
    if (!this.options) {
      this.options = options || {};
      _.defaults(this, this.options);
    }
    _.defaults(this, defaultOptions);
  }
});

Zd.MenuDataParser = Em.Object.extend({
  init: function(targetObject, postParser) {
    this.targetObject = targetObject || this;
    this.hashIds = {};
    this.hashValues = {};
    this.postParser = postParser;
  },

  reset: function() {
    this.hashIds = {};
    this.hashValues = {};
    this.rootItem = null;
    Zd.MenuDataParser.initValue = null;
  },

  _resolveInitValue: function() {
    var initValue = Zd.MenuDataParser.initValue;

    if (!initValue && this.rootItem.menu && this.rootItem.menu.length) {
      for (var i in this.hasValues) {
        if (this.hashValues.hasOwnProperty(i) && this.hashValues[i].value != null) {
          initValue = this.hashValues[i].value;
          break;
        }
      }
    }
    return initValue;
  },

  // to be overriden if needed
  preParseFilter: function(data) {return data;},

  parse: function(treeData) {
    this.reset();

    treeData = this.preParseFilter(treeData);
    this.parseItem({
      role: 'root',
      children: _.isArray(treeData) ? treeData : [treeData]
    });
    if (this.postParser) {
      this.postParser(this.rootItem);
    }
    this.targetObject.initValue  = Zd.MenuDataParser.initValue;
    this.targetObject.hashIds    = this.hashIds;
    this.targetObject.hashValues = this.hashValues;
    this.targetObject.rootItem   = this.rootItem;
  },

  parseItem: function(optionItem, item) {
    if (!optionItem) {return;}
    var menu, newItem;

    if (optionItem.role === 'root') {
      this.rootItem = item = {
        role: 'root',
        id: Zd.MenuIdGenerator.idPrefix + Zd.MenuIdGenerator.counter++
      };
    }

    if (optionItem.children && optionItem.children.length) {
      menu = [];
      if (optionItem.role !== 'root') {
        newItem = {
          id: Zd.MenuIdGenerator.idPrefix + Zd.MenuIdGenerator.counter++,
          role: 'uiBackLink',
          parentMenu: menu,
          parentItem: item,
          index: 0
        };
        this.hashIds[newItem.id] = newItem;
        menu[0] = newItem;

        item.role = "uiMenuLink";
      }

      item.menu = menu;
      menu.id = item.id + Zd.MenuIdGenerator.menuSuffix;
      menu.parentItem = item;
      menu.parentMenu = item.parentMenu;

      var offset = menu.length;
      var childOptionItem;

      for (var i=offset, len=optionItem.children.length + offset; i<len; i++) {
        childOptionItem = optionItem.children[i-offset];
        if (!childOptionItem) {continue;}

        newItem = {};
        newItem.id = Zd.MenuIdGenerator.idPrefix + Zd.MenuIdGenerator.counter++;
        newItem.data = childOptionItem;
        newItem.type = childOptionItem.type;
        newItem.label = childOptionItem.label;
        newItem.index = i;
        newItem.parentMenu = menu;
        newItem.parentItem = item;
        menu[i] = newItem;

        this.hashIds[newItem.id] = newItem;

        if ('value' in childOptionItem || 'id' in childOptionItem) {
          var value = (childOptionItem.value == null) ? childOptionItem.id : childOptionItem.value;
          newItem.value = (value == null) ? this.defaultValue : value;
          this.hashValues[newItem.value] = newItem;

          if (childOptionItem.selected) {
            Zd.MenuDataParser.initValue = newItem.value;
          }
        }
        childOptionItem.children && childOptionItem.children.length && this.parseItem(childOptionItem, newItem);
      }
    }
  }
});

Zd.MenuDataParser.menuModelParsers = {
  LabelConcatenator: Em.Object.extend({
    init: function(delimiter, fieldName) {
      this.delimiter = delimiter || ' > ';
      this.fieldName = fieldName || 'concatenatedLabel';
    },
    parse: function(rootItem) {
      this._processItem(rootItem, '');
    },
    _processItem: function(item, concatLabelPrefix) {
      var childItem;

      if (item.role === 'uiBackLink') {return;}

      item[this.fieldName] = concatLabelPrefix + item.label;

      if (item.menu) {
        for (var i=0, len=item.menu.length; i<len; i++) {
          childItem = item.menu[i];
          if (!childItem.label) {continue;}

          this._processItem(childItem, (item.role === 'root') ? '' : (concatLabelPrefix + item.label + this.delimiter));
        }
      }
    }
  })
};

Zd.SimpleMenuDataSource = Em.Object.extend({
  init: function(options) {
    this.options = options || {};
    this.parser = this.options.parser;
    this.maxRecords = this.options.maxRecords || Infinity;
  },

  loadData: function(data) {
    if (this.parser) {
      data = this.parser.parse(data);
    }
    if (data && data.length > this.maxRecords) {
      data = data.slice(0, this.maxRecords);
    }
    this.onDataReady(data);
  },
  onDataReady: Em.K
});



Zd.HighlightingRenderer = Em.Object.extend({
  init: function() {
    this.reHighlightWord = null;
    this.lastWord = null;
  },

  render: function(str, highlightWord, clsHighlight) {
    highlightWord = highlightWord || '';

    if (this.lastWord !== highlightWord) {
      this.reHighlightWord = new RegExp(Zd.escapeRegExp(highlightWord), 'ig');
    }

    return str.replace(this.reHighlightWord, function(word) {
      return '<span class="' + clsHighlight + '">' + Zd.HtmlEncoder.toHtml(word) + '</span>';
    });
  }
});



Zd.Observable = Em.Mixin.create({
  trigger: function(eventType, data) {
    data = data || {};
    data.eventSource = this;
    $(document).trigger('zd_' + eventType + '.' + this.id, data);
  },

  addObserver: function(eventType, observer) {
    $(document).bind('zd_' + eventType + '.' + this.id, observer);
  },

  removeObserver: function(eventType, observer) {
    $(document).unbind('zd_' + eventType + '.' + this.id, observer);
  },

  removeObservers: function() {
    $(document).unbind('.' + this.id);
  },

  forward: function(sourceEventType, source, targetEventType, target, dataNormalizer) {
    source.addObserver(sourceEventType, function(e, data) {
      if (dataNormalizer) {
        data = dataNormalizer(data);
      }
      target.trigger(targetEventType, data);
    });
  },

  stopForwarding: function(sourceEventType, source) {
    source.removeObserver(sourceEventType);
  }
});

var isInvalidItem = function(item, filteredField) {
  return item.role === 'uiBackLink' ||
         item.role === 'root' ||
         item[filteredField] == null ||
         item.value == null;
};

var buildFilter = function(condition) {
  var filter = function(filterer, source, data) {
    var filterRe = filterer.getWordRegExp(),
        filteredField = filterer.filteredField,
        item,
        newItem,
        valueHash = {};

    for (var id in source.hashIds) {
      if (data.length >= filterer.maxRecords) {
        break;
      }

      item = source.hashIds[id];

      if (isInvalidItem(item, filteredField)) continue;

      // making sure we do not include items with same value e.g. group items
      // have same value but purticipate in the menu 2 times
      if (valueHash[item.value] === 1) continue;
      valueHash[item.value] = 1;

      if (condition && condition(item, filterer, source, data) !== true) continue;

      if (filterRe.test(item[filteredField])) {
        newItem = data[data.length] = {
          value:      item.value,
          label:      item.label,
          type:       item.type,
          sourceItem: item
        };
        newItem[filteredField] = item[filteredField];
      }
    }
    return data;
  };

  return filter;
};

Zd.FilteringDataSource = Em.Object.extend({
  init: function(maxRecords, filteredField, filterQueue) {
    this.filterWord = '';
    this.data = [];
    this.maxRecords = maxRecords || Infinity;
    this.filteredField = filteredField || 'label';
    this.filterQueue = filterQueue || [buildFilter()];
  },

  loadData: function(data) {
    this.data = data;
    this.onDataReady(data);
  },

  filter: function(source, filterWord) {
    if (filterWord == null || filterWord === '') {
      this.filterWord = '';
      this.loadData([]);
      return;
    }

    if (filterWord === this.filterWord) return;
    this.filterWord = filterWord;

    if (!this.filterWord) {
      return;
    }
    var data = [];

    this.filterQueue.forEach(function(filter) {
      filter(this, source, data);
    }, this);

    this.loadData(data);
  },

  onDataReady: Em.K,

  getWordRegExp: function() {
    return this.getRegExp(this.filterWord);
  },

  getRegExp: _.memoize(function(word) {
    return new RegExp(Zd.escapeRegExp(word), 'i');
  })
});

Zd.FilteringDataSource.buildFilter = buildFilter;

Zd.CssClsStateMachine = Em.Object.extend({
  init: function(options) {
    this.dom       = options.dom;
    this.clsZero   = options.clsZero;
    this.state = 0;
    this.bitMap = {};
    this.setup(options.clsStates);
  },

  setup: function(states) {
    this.bitMap = {};
    for (var i=0, bitMask=1; i<states.length; i++, bitMask*=2) {
      this.bitMap[states[i]] = bitMask;
    }
  },

  addState: function(state) {
    if (!this.bitMap.hasOwnProperty(state)) {return;}
    this.state = this.state | this.bitMap[state];
    this.dom.addClass(state);
    this.postStateChange();
  },

  removeState: function(state) {
    if (!this.bitMap.hasOwnProperty(state)) {return;}
    this.state = this.state & ~this.bitMap[state];
    this.dom.removeClass(state);
    this.postStateChange();
  },

  postStateChange: function() {
    this.dom[this.state === 0 ? 'addClass' : 'removeClass'](this.clsZero);
  }
});

}());



//= require ./menu_utils.js

(function() {

window.Zd = window.Zd || {};

// EVENTS
// --------------------------------------------------------
//
// Triggers the following events through
// dom element this.domHolder:
// --------------------------------------------------------
// - change,         params: source, oldValue, value, userInitiated
// - focus,          params: source
// - blur,           params: source
// - disableChanged, params: source
// - show,           params: source
// - hide,           params: source
// - keyDown         params: source, domEvent


// MENU MODEL
// --------------------------------------------------------
//
// Item interface:
// --------------------------------------------------------
// - id         -> internal field
// - label      -> from data source
// - value      -> from data source
// - menu       -> array holding child items
// - role       -> internal field
// - parentItem -> internal field
// - parentMenu -> internal field
// - index      -> internal field
// - isInDom    -> internal field

// Menu interface:
// --------------------------------------------------------
// - id         -> internal field
// - parentItem -> internal field
// - parentMenu -> internal field
// - isInDom    -> internal field

// Item value rules:
// --------------------------------------------------------
// Values explicitly defined as 'null' or 'undefined'
// are converted to the defaultValue value which should
// not be null itself.
// The value can be set to null when there is no value
// specified explicitly.
// The value cannot be set to null from parsed data.
// The value can only be set to null internally.
// The value of an item with children/menu is ignored.

var domById = function(domId) {
  return document.getElementById(domId);
};

Zd.Menu = Em.Object.extend().reopenClass({
  keyCodes: {
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    NUMPAD_ENTER: 108,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    RIGHT: 39,
    SPACE: 32,
    SHIFT: 16,
    TAB: 9,
    UP: 38
  },

  defaultOptions: {
    value:              null,
    defaultValue:       '',   // when initializing the control, all null values are converted to this value
    defaultValueLabel:  '-',
    backLinkLabel:      'Back',

    domHolderSelector:  'body',

    disabled:           false,

    transitionMode:     'sliding', // ['direct' | 'stacking' | 'sliding']
    transitionDuration: 300,
    transitionEasing:   'easeOutQuad', // easing function, borrowed from jQuery UI

    clsRoot:            'zd-menu-root',
    clsListHolder:      'zd-menu-list-holder',
    clsItem:            'zd-menu-item',
    clsBackLink:        'zd-menu-back-link',
    clsMenuLink:        'zd-menu-link',
    clsBaseArrow:       'zd-selectmenu-base-arrow zd-icon-triangle-1-s',
    clsItemArrow:       'zd-menu-item-arrow zd-icon-triangle-1-e',
    clsBackArrow:       'zd-menu-item-arrow zd-icon-triangle-1-w',
    clsMenuItemIcon:    'zd-menu-item-icon',

    clsDisabled:        'zd-state-disabled',
    clsFocused:         'zd-state-focus',
    clsHover:           'zd-state-hover',
    clsItemFocused:     'zd-item-focus',
    clsAutofitMode:     'zd-menu-autofit-mode',

    isVisible:          true,
    autofitMode:        false,  // usually used for drop down menus flat model structure
    keyboardCue:        false,
    keyboardCueAction:  'select', // can be ['select' | 'focus'],
    goToStartAfterReachingEnd: false,
    goToEndAfterReachingStart: false,
    enableMenuItemIcons: false
  },
  instances: {},
  registerInstance: function(instance) {
    this.instances[instance.id] = instance;
  },
  unregisterInstance: function(instance) {
    delete this.instances[instance.id];
  },
  count: function() {
    var c = 0;
    for (var i in this.instances) {
      if (this.instances.hasOwnProperty(i)) {
        c++;
      }
    }
    return c;
  },
  zombies: function() {
    return _.filter(this.instances, function(instance) {
      return !$.contains(document.body, instance.dom[0]);
    });
  }
}).reopen(Zd.MenuOptions)
  .reopen(Zd.Observable)
  .reopen({

  init: function(options) {
    this.type         = 'zdMenu';
    this.rootItem     = null;
    this.activeItem   = null;
    this.focusedItem  = null;

    this.isFocused    = false;
    this.isInDOM      = false;
    this.isDestroyed  = false;
    this.isVisible    = null;
    this.isKeyboardCaptured   = false;
    this.isKeyboardNavigation = false; // used to disable mouse selection while keyboard navigating
    this.navigationMode = 'mouse'; //['mouse' | 'keyboard']
    this.inTransition = false;

    this.lastKey        = null;
    this.lastIndex      = -1;
    this.lastActiveMenu = null;

    this.typeToClassMap = null;
    this.roleToClassMap = null; // stylable roles: "uiBackLink", "uiMenuLink"

    this.enableBaseFocusControl = true;
    this.highlighter    = null;

    // All classes subclassing this one should have premerged their default options.
    // Option merging is done only by the last subclass
    this.setOptions(options, Zd.Menu.defaultOptions);

    this.parser         = new Zd.MenuDataParser(this, this.postParser);

    this.roleToClassMap = this.roleToClassMap || {};
    this.roleToClassMap.uiBackLink = this.roleToClassMap.uiBackLink || this.clsBackLink;
    this.roleToClassMap.uiMenuLink = this.roleToClassMap.uimenuLink || this.clsMenuLink;

    this.id            = Zd.MenuIdGenerator.getUniqId();
    this.domHolder     = this.domHolder || $(this.domHolderSelector)[0];

    this.rootItem      = {role: 'root'};
    this.hashIds       = {};
    this.hashValues    = {};
    this.value         = this.value != null ? this.value : this.defaultValue;
    this.lastValue     = null;

    this.renderItemContent = this.options.renderItemContent || this.renderItemContent;

    Zd.Menu.registerInstance(this);

    this.initUI();

    this.data && this.loadData(this.data);
  },

  destroy: function() {
    this.destroyUI();
    this.removeObservers();
    this.hashIds      = null;
    this.hashValues   = null;
    this.parser       = null;
    this.options      = null;
    this.rootItem     = null;
    this.data         = null;
    this.activeItem   = null;
    this.focusedItem  = null;
    this.isDestroyed  = true;
    Zd.Menu.unregisterInstance(this);
    this.onDestroy();
  },

  reset: function() {
    this.setValue(this.options.value);
  },

  resetFull: function() {
    this.resetUI();

    this.rootItem       = {role: 'root'};
    this.data           = {};
    this.hashIds        = {};
    this.hashValues     = {};

    this.value          = this.defaultValue;
    this.lastValue      = null;
    this.activeItem     = null;
    this.focusedItem    = null;
  },
// ----------------------------------------------
//                      Model
// ----------------------------------------------

  loadData: function(data) {
    var isFocused = this.isFocused;
    this.resetFull();

    this.data = data;
    this.parser.parse(this.data);
    this.onDataReady();

    this.lastValue = null;

    if (this.initValue == null) {
      this.initValue = this.defaultValue;
    }
    this.setValue(this.initValue, 'init');

    this.resolveAutofitMode();

    this.syncViewWithValue();
    this.syncViewWithMode();

    isFocused && this.focus();
  },

  getValue: function() {
    return this.value;
  },

  // source can be - ['click' | 'keyboard' | 'keyboardCue']

  setValue: function(value, source) {
    var item = this.getItemByValue(value);

    var eventData = {
      oldValue: this.lastValue,
      value: value,
      userInitiated: source === 'click' || source === 'keyboard' || source === 'keyboardCue',
      source: source,
      record: item
    };

    this.onChangeRequest(eventData);

    if (value == null || !item) {
      this.value = this.defaultValue;
    }

    this.value = value;

    if (this.lastValue !== this.value) {
      this.onChange(eventData);
      this.trigger('change', eventData);

      this.syncViewWithValue();
      this.lastValue = this.value;
    }
  },

  getDisplayValue: function() {
    return this.activeItem ? this.activeItem.label : this.defaultValueLabel;
  },

  getParentMenu: function(item) {
    var parentItem = item.parentItem;
    if (parentItem == null || (parentItem && parentItem.role === 'root')) {
      return null;
    }
    return parentItem.parentMenu;
  },

  getItemByValue: function(value) {
    return this.hashValues ? this.hashValues[value] : null;
  },

  domToItem: function(dom) {
    return this.hashIds[typeof dom === 'string' ? dom : dom.id];
  },

  itemToDom: function(item) {
    return domById(item.id);
  },

  itemHasMenu: function(item) {
    return !!(item.menu && item.menu.length);
  },

  itemIsBackHelper: function(item) {
    return item.role === 'uiBackLink';
  },

  resolveAutofitMode: function() {
    if (this.rootItem && this.rootItem.menu) {
      var rootMenu = this.rootItem.menu;
      for (var i=0; i<rootMenu.length; i++) {
        if (rootMenu[i].menu) {
          this.autofitMode = false;
          return;
        }
      }
    }
    this.autofitMode = true;
  },

// ----------------------------------------------
//                      View
// ----------------------------------------------

  initUI: function() {
    this.htmlBuffer = this.render();
    this.putInDom(this.domHolder);
    this.postDomInsertionSetup();
  },

  destroyUI: function() {
    if (this.isInDom) {
      this.dom.unbind();
      this.dom.remove();
      $(document).unbind('click.' + this.id);
    }
    this.isInDom = false;
    this.domHolder = null;
  },

  resetUI: function() {
    if (this.isInDom) {
      this.blur();
      this.dom
        .removeClass(this.clsHover)
        .html('');
    }
  },

// -------------------- Rendering and DOM Manipulation -----------------------

  render: function() {
    this.menuItemIconHtml = this.enableMenuItemIcons ? this.renderItemIcon() : '';
    return '<div id="' + this.id + '" tabindex="0" class="' + this.clsRoot + '"' + (this.isVisible ? '' : ' style="display:none"') + '></div>';
  },

  renderMenu: function(menu) {
    if (!menu) {return '';}

    var html = '';

    for (var i=0, len = menu.length; i<len; i++) {
      html += this.renderItem(menu[i]);
    }
    return html;
  },

  renderItem: function(item) {
    var arrowHtml;

    var itemClass = this.clsItem;

    if (this.typeToClassMap && item.type && this.typeToClassMap[item.type]) {
      itemClass += ' ' + this.typeToClassMap[item.type];
    }
    if (this.roleToClassMap && item.role && this.roleToClassMap[item.role]) {
      itemClass += ' ' + this.roleToClassMap[item.role];
    }

    if (item.menu) {
      arrowHtml = '<span class="' + this.clsItemArrow + '"></span>';
    } else if (item.role === 'uiBackLink') {
      item.label = this.backLinkLabel;
      arrowHtml = '<span class="' + this.clsBackArrow + '"></span>';
    } else {
      arrowHtml = '';
    }

    return '<li id="' + item.id + '" class="' + itemClass + '" role="presentation">' +
             arrowHtml + this.menuItemIconHtml +
             '<a tabindex="-1" role="menuitem">' + this.renderItemContent(item, this.highlighter) + '</a>' +
           '</li>';
  },

  renderItemIcon: function() {
    return '<span class="' + this.clsMenuItemIcon + '"></span>';
  },

  renderItemContent: function(item, highlighter) {
    return highlighter ? highlighter(item.label) : item.label;
  },

  putInDom: function(domElement) {
    if (this.isInDom) {return;}
    $(domElement || this.domHolder).append(this.htmlBuffer);
    this.dom = $('#' + this.id);
    this.isInDom = true;
    this.syncViewWithMode();
  },

  putMenuInDom: function(menu) {
    if (!menu) {return null;}

    if (menu && menu.length && menu.isInDom) {
      return domById(menu.id);
    }

    var menuHolder = document.createElement('ul');
    menuHolder.setAttribute('role', 'menu');
    menuHolder.id = menu.id;
    menuHolder.className = this.clsListHolder;
    menuHolder.style.display = 'none';
    menuHolder.innerHTML = this.renderMenu(menu);
    this.dom[0].appendChild(menuHolder);

    menu.isInDom = true;

    var i = menu.length - 1;
    while (i--) {
      menu[i].isInDom = true;
    }
    return menuHolder;
  },

  postDomInsertionSetup: function() {
    // position the wrapper below the base;
    var domHolder = $(this.domHolder);

    this.dom
      .css({
        visibility: 'hidden',
        width: domHolder.innerWidth()
      })
      .css({
        width: this.dom.innerWidth() + (this.dom.outerWidth() - domHolder.outerWidth()),
        visibility: ''
      })
      .bind('mouseup'   , _(this.onRootMouseUp).bind(this))
      .bind('mousedown' , _(this.onRootMouseDown).bind(this))
      .bind('mousemove' , _(this.onRootMouseMove).bind(this))
      .bind('mouseover' , _(this.onRootMouseOver).bind(this))
      .bind('mouseout'  , _(this.onRootMouseOut).bind(this))
      .bind('mouseenter', _(this.onRootMouseEnter).bind(this))
      .bind('mouseleave', _(this.onRootMouseLeave).bind(this))
      .bind('focus'     , _(this.onRootFocus).bind(this))
      .bind('blur'      , _(this.onRootBlur).bind(this));

    $(document).bind('click.' + this.id, _(this.onDocumentClick).bind(this));
  },

  syncViewWithMode: function() {
    if (this.isInDom) {
      this.dom.toggleClass(this.clsAutofitMode, this.autofitMode);
    }
  },

  syncViewWithValue: function(withFocus) {
    withFocus = withFocus == null ? true : withFocus;
    this.activeItem = this.hashValues[this.value];

    if (this.isInDom && this.isVisible) {
      if (this.activeItem) {
        this.showMenu(this.activeItem.parentMenu, withFocus ? this.activeItem : null);
      } else {
        this.showMenu(this.rootItem.menu, null);
      }
    }
  },

// -------------------- General Menu Operations -----------------------

  focus: function() {
    if (this.isFocused) {return;}

    this.isFocused = true;

    this.dom.addClass(this.clsFocused);
    this.captureKeyboard();

    this.onFocus();
    this.trigger('focus');
  },

  blur: function() {
    if (!this.isFocused) {return;}

    this.isFocused = false;
    this.dom.removeClass(this.clsFocused);
    this.releaseKeyboard();

    this.onBlur();
    this.trigger('blur');
  },

  disable: function() {
    this.setDisableState(true);
  },

  enable: function() {
    this.setDisableState(false);
  },

  setDisableState: function(isDisabled) {
    if (isDisabled === this.disabled) return;

    this.disabled = isDisabled;

    this.dom.toggleClass(this.disabled, this.clsDisabled);
    this.onDisabledChanged();
    this.trigger('disableChanged');
  },

  show: function(syncWithValue) {
    if (this.isVisible) {return;}
    syncWithValue = (syncWithValue == null) ? true : syncWithValue;
    this.isVisible = true;
    this.isKeyboardNavigation = false;
    this.syncViewWithMode();
    this.dom.show();
    this.syncViewWithValue(syncWithValue);
    this.onShow();
    this.trigger('show');
  },

  hide: function() {
    if (!this.isVisible) {return;}
    this.isVisible = false;
    // Chrome 20 does not reset a DOM element's scrollTop when showing/hiding elements inside of it.
    // It may be fixed later.
    this.dom[0].scrollTop = 0;
    this.dom.hide();
    this.onHide();
    this.trigger('hide');
  },

  toggle: function() {
    this.isVisible ? this.hide() : this.show();
  },

  showMenu: function(menu, itemToFocus, transition) {
    if (!menu || this.inTransition) return;

    if (this.activeMenu !== menu) {
      var menuDom = this.putMenuInDom(menu);
      if (!menuDom) {return;}
      menuDom.setAttribute('aria-expanded', 'true');

      (transition || this.transitions.direct).call(this, menu, this.activeMenu);

      this.activeMenu = menu;
    }

    itemToFocus = (itemToFocus && itemToFocus.role !== 'root') ? itemToFocus : menu[0];

    itemToFocus && setTimeout(_(function() {
      // For focusing the item only when using keyboard navigation,
      // instead of "true" pass this.navigationMode === 'keyboard').
      this.focusItem(itemToFocus, true);
    }).bind(this), 100);

  },

  hideMenu: function(menu) {
    if (!menu) {return;}
    var menuDom = domById(menu.id);

    if (menuDom) {
      menuDom.setAttribute('aria-expanded', 'false');
      menuDom.style.display = 'none';
    }
  },

  activateItem: function(item, source) {
    if (!item) {return;}

    if (this.inTransition) {return;}

    this.navigationMode = source || 'mouse';

    if (this.itemHasMenu(item)) {
      this.showMenu(
        item.menu,
        null,
        this.getTransition('Left')
      );
    } else if (this.itemIsBackHelper(item)) {
      this.showMenu(
        item.parentMenu.parentMenu,
        item.parentMenu.parentItem,
        this.getTransition('Right')
      );
    } else {
      this.setValue(item.value, source);
    }
  },

  focusItem: function(item, shouldPositionToItem) {
    if (!item) {return;}

    if (this.focusedItem) {
      this.blurItem(this.focusedItem);
    }

    this.focusedItem = item;
    $('#' + item.id).addClass(this.clsItemFocused);
    shouldPositionToItem && this.positionItemInView(item);
  },

  blurItem: function(item) {
    if (!item) {return;}

    $('#' + item.id).removeClass(this.clsItemFocused);
  },

  positionItemInView: function(item) {
    if (!item) {return;}

    var domRoot = this.dom[0];
    var domItem = domById(item.id);

    if (!domItem) {return;}

    var itemOffsetTop = domItem.offsetTop;
    domRoot.scrollTop = itemOffsetTop - domRoot.offsetHeight/2 + domItem.offsetHeight/2;
  },

// -------------------- Helper Functions -----------------------

  _manageNavigationMode: function(e) {
    if (this.isKeyboardNavigation && this._lastClientX === e.clientX && this._lastClientY === e.clientY) {
    } else {
      this.isKeyboardNavigation = false;
    }
    this._lastClientX = e.clientX;
    this._lastClientY = e.clientY;
  },

  resolveItemFromDom: function(domNode) {
    var wrapper = this.dom[0];

    while (domNode !== wrapper) {
      if (domNode.tagName === 'LI') {
        return this.domToItem(domNode);
      }
      domNode = domNode.parentNode;
    }
    return null;
  },

// ----------------------   Hooks   -------------------------

  onDataReady:      Em.K,
  onChange:         Em.K,
  onChangeRequest:  Em.K,
  onFocus:          Em.K,
  onBlur:           Em.K,
  onShow:           Em.K,
  onHide:           Em.K,
  onDisabledChanged:Em.K,
  onDestroy:        Em.K,
  onCueMatch:       Em.K,

// -------------------- Event Handlers -----------------------

  onDocumentClick: function(e) {
    if (!this.dom) return;

    if (!$.contains(this.dom[0], e.target)) {
      this.blur();
    }
  },

  onRootMouseEnter: function(e) {
    this.dom.addClass(this.clsHover);
  },

  onRootMouseLeave: function(e) {
    this.dom.removeClass(this.clsHover);
  },

  onRootMouseOver: function(e) {
    if (this.isKeyboardNavigation) {return;}

    var item = this.resolveItemFromDom(e.target);

    if (item) {
      this.focusItem(item);
    }
    // maybe also speculatively prerender the next menu if not rendered
  },

  onRootMouseOut: function(e) {
    if (e.target.tagName === 'LI') {
      var item = this.domToItem(e.target);
      item && this.blurItem(item);
    }
    // maybe blur the currently focused item?
  },

  onRootMouseUp: function(e) {
    if (!this.focusedItem) {return;}
    this.activateItem(this.focusedItem, 'click');
  },

  onRootMouseDown: function(e) {
    if (this.activeItem && this.activeItem.parentMenu) {
      this.putMenuInDom(this.activeItem.parentMenu);
    } else if (this.rootItem && this.rootItem.menu) {
      this.putMenuInDom(this.rootItem.menu);
    }
  },

  onRootMouseMove: function(e) {
    this._manageNavigationMode(e);
  },

  onRootFocus: function() {
    this.enableBaseFocusControl && this.focus();
  },

  onRootBlur: function() {
    this.enableBaseFocusControl && this.blur();
  },

// -------------------- Menu Transitions -----------------------

  // direction can be ['Left' | 'Right']
  getTransition: function(direction) {
    return this.transitionMode === 'direct' ? this.transitions.direct : this.transitions[this.transitionMode + direction];
  },

  transitions: {

    direct: function(menuToShow, menuToHide, onComplete) {
      var domMenuToShow = domById(menuToShow.id);
      domMenuToShow.style.display = '';
      domMenuToShow.style.left = 0;

      if (menuToShow !== menuToHide && menuToHide) {
        this.hideMenu(menuToHide);
      }
      if (onComplete) {
        onComplete();
      }
    },

    stackingLeft: function(menuToShow, menuToHide, onComplete) {
      this.transitions._stacking.call(this, menuToShow, menuToHide, onComplete, 'Left');
    },

    stackingRight: function(menuToShow, menuToHide, onComplete) {
      this.transitions._stacking.call(this, menuToShow, menuToHide, onComplete, 'Right');
    },

    _stacking: function(menuToShow, menuToHide, onComplete, mode) {
      if (menuToShow === menuToHide || menuToHide == null) {
        return this.transitions.direct.call(this, menuToShow, menuToHide);
      }

      var menuToShowDom = domById(menuToShow.id),
          menuToHideDom = domById(menuToHide.id);

      if (mode === 'Left') {
        menuToShowDom.style.left = this.dom[0].offsetWidth + 'px';
      }
      menuToShowDom.style.zIndex = (mode === 'Right' ? 1 : 2);
      menuToShowDom.style.display = '';

      menuToHideDom.style.zIndex = (mode === 'Right' ? 2 : 1);
      menuToHideDom.style.display = '';

      this.inTransition = true;

      onComplete = _(function(origOnComplete) {
        this.hideMenu(menuToHide);
        menuToShowDom.style.left = 0;
        this.inTransition = false;
        origOnComplete && origOnComplete();
      }).bind(this, onComplete);

      $(mode === 'Right' ? menuToHideDom : menuToShowDom).animate(
        {
          left: (mode === 'Right') ? this.dom[0].offsetWidth : 0
        },
        this.transitionDuration,
        this.transitionEasing,
        onComplete
      );
    },

    slidingLeft: function(menuToShow, menuToHide, onComplete) {
      this.transitions._sliding.call(this, menuToShow, menuToHide, onComplete, 'Left');
    },

    slidingRight: function(menuToShow, menuToHide, onComplete) {
      this.transitions._sliding.call(this, menuToShow, menuToHide, onComplete, 'Right');
    },

    _sliding: function(menuToShow, menuToHide, onComplete, mode) {
      if (menuToShow === menuToHide || menuToHide == null) {
        return this.transitions.direct.call(this, menuToShow, menuToHide);
      }

      var menuToShowDom = domById(menuToShow.id),
          menuToHideDom = domById(menuToHide.id);

      menuToShowDom.style.left = ((mode === 'Right' ? -1 : 1) * this.dom[0].offsetWidth) + 'px';
      menuToShowDom.style.zIndex = (mode === 'Right' ? 1 : 2);
      menuToShowDom.style.display = '';

      menuToHideDom.style.zIndex = (mode === 'Right' ? 2 : 1);
      menuToHideDom.style.display = '';

      this.inTransition = true;

      onComplete = _(function(origOnComplete) {
        this.hideMenu(menuToHide);
        menuToShowDom.style.left = 0;
        this.inTransition = false;
        origOnComplete && origOnComplete();
      }).bind(this, onComplete);

      $(menuToShowDom).add(menuToHideDom).animate(
        {
          left: (mode === 'Right' ? '+=' : '-=') + this.dom[0].offsetWidth + 'px'
        },
        this.transitionDuration,
        this.transitionEasing,
        onComplete
      );
    }
  },

// -------------------- Keyboard Navigation -----------------------

  captureKeyboard: function() {
    if (this.isKeyboardCaptured) {return;}
    this.isKeyboardCaptured = true;
    $(document).bind('keydown.' + this.id, _(this.onKeyDown).bind(this));
    if (this.keyboardCue) {
      $(document).bind('keyup.' + this.id, _(this.onKeyUp).bind(this));
    }
  },

  releaseKeyboard: function() {
    this.isKeyboardCaptured = false;
    $(document).unbind('keydown.' + this.id);
    if (this.keyboardCue) {
      $(document).unbind('keyup.' + this.id);
    }
  },

  _findMatch: function(menu, key, from, to) {
    for (var i = from; i < to; i++) {
      if (menu[i].role === 'uiBackLink') continue;

      if (menu[i].label.charAt(0).toLowerCase() === key) {
        this.lastIndex = i;
        this.onCueMatch(menu[i]);
        if (this.keyboardCueAction === 'focus') {
          this.focusItem(menu[i], true);
        } else {
          this.setValue(menu[i].value, 'keyboardCue');
        }
        return true;
      }
    }
    return false;
  },

  onKeyUp: function(e) {
    var key = String.fromCharCode(e.keyCode).toLowerCase(),
        //activeMenu = this.activeItem && this.activeItem.parentMenu || this.rootItem.menu;
        activeMenu = this.activeMenu || this.activeItem && this.activeItem.parentMenu || this.rootItem.menu;

    if (!activeMenu) return;

    if (key < '0' || (key > 'z' && e.keyCode <= 255) || e.keyCode === 91) return;

    if (this.lastActiveMenu !== activeMenu || this.lastKey !== key) {
      this.lastIndex = -1;
    }

    this.lastActiveMenu = activeMenu;
    this.lastKey = key;

    if (this._findMatch(activeMenu, key, this.lastIndex+1, activeMenu.length)) return;
    if (this._findMatch(activeMenu, key,                0,  this.lastIndex+1)) return;
  },

  onKeyDown: function(e) {
    if (!this.activeMenu) return;
    var keyCodes = Zd.Menu.keyCodes;

    switch(e.keyCode) {
      case keyCodes.HOME:     e.preventDefault(); this.moveToStart(); break;
      case keyCodes.END:      e.preventDefault(); this.moveToEnd(); break;
      case keyCodes.PAGE_DOWN:e.preventDefault(); this.pgDown(); break;
      case keyCodes.PAGE_UP:  e.preventDefault(); this.pgUp(); break;
      case keyCodes.DOWN:     e.preventDefault(); this.moveDown(); break;
      case keyCodes.UP:       e.preventDefault(); this.moveUp(); break;
      case keyCodes.LEFT:     e.preventDefault(); this.moveToLeft(); break;
      case keyCodes.ENTER:
      case keyCodes.NUMPAD_ENTER:
      case keyCodes.RIGHT:
      case keyCodes.TAB:
        e.preventDefault();
        this.activateItem(this.focusedItem, 'keyboard');
        break;
    }
    this.trigger('keyDown', {domEvent: e});
  },

  getItemsPerPage: function() {
    if (!this.activeMenu) return 0;
    if (this.activeMenu.length === 0) return 0;
    var domWrapper = this.dom[0];
    var domFirstItem = this.itemToDom(this.activeMenu[0]);

    return Math.floor(domWrapper.offsetHeight / domFirstItem.offsetHeight);
  },

  _moveToItem: function(offset, outOfRangeIndex) {
    this.navigationMode = 'keyboard';
    if (!this.activeMenu) return;

    var itemToFocus;

    if (this.focusedItem) {
      itemToFocus = this.activeMenu[this.focusedItem.index + offset] || this.activeMenu[outOfRangeIndex];
    } else {
      itemToFocus = this.activeMenu[0];
    }
    this.isKeyboardNavigation = true;
    this.focusItem(itemToFocus, true);
  },

  pgDown: function() {
    this._moveToItem(this.getItemsPerPage(), this.goToStartAfterReachingEnd ? 0 : this.activeMenu.length-1);
  },

  pgUp: function() {
    this._moveToItem(-this.getItemsPerPage(), this.goToEndAfterReachingStart ? this.activeMenu.length-1 : 0);
  },

  moveDown: function() {
    this._moveToItem(1, this.goToStartAfterReachingEnd ? 0 : this.activeMenu.length-1);
  },

  moveUp: function() {
    this._moveToItem(-1, this.goToEndAfterReachingStart ? this.activeMenu.length-1 : 0);
  },

  moveToStart: function() {
    if (!this.activeMenu) {return;}
    this.isKeyboardNavigation = true;
    var itemToFocus = this.activeMenu[0];
    this.focusItem(itemToFocus, true);
  },

  moveToEnd: function() {
    if (!this.activeMenu) {return;}
    this.isKeyboardNavigation = true;
    var itemToFocus = this.activeMenu[this.activeMenu.length-1];
    this.focusItem(itemToFocus, true);
  },

  moveToLeft: function() {
    if (!this.activeMenu || !this.focusedItem) {return;}
    this.showMenu(
      this.focusedItem.parentMenu.parentMenu,
      this.focusedItem.parentMenu.parentItem,
      this.getTransition('Right')
    );
  }
});


Zd.makePlugin('zdMenu', Zd.Menu);

// Easing functions from jQuery.UI

$.extend($.easing,
{
  def: 'easeOutQuad',
  swing: function (x, t, b, c, d) {
    return $.easing[$.easing.def](x, t, b, c, d);
  },
  easeInQuad: function (x, t, b, c, d) {
    return c*(t/=d)*t + b;
  },
  easeOutQuad: function (x, t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  },
  easeInOutQuad: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  },
  easeInCubic: function (x, t, b, c, d) {
    return c*(t/=d)*t*t + b;
  },
  easeOutCubic: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  },
  easeInOutCubic: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  },
  easeInQuart: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t + b;
  },
  easeOutQuart: function (x, t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  },
  easeInOutQuart: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
  },
  easeInQuint: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t*t + b;
  },
  easeOutQuint: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
  },
  easeInOutQuint: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
  },
  easeInSine: function (x, t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  },
  easeOutSine: function (x, t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
  },
  easeInOutSine: function (x, t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  },
  easeInExpo: function (x, t, b, c, d) {
    return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
    return (t===d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t===0) return b;
    if (t===d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function (x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  },
  easeOutCirc: function (x, t, b, c, d) {
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  },
  easeInOutCirc: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  },
  easeInElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t===0) return b;  if ((t/=d)===1) return b+c;
    if (!p) p=d*0.3;
    if (a < Math.abs(c)) { a=c; s=p/4; }
    else s = p/(2*Math.PI) * Math.asin(c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  },
  easeOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t===0) return b;  if ((t/=d)===1) return b+c;
    if (!p) p=d*0.3;
    if (a < Math.abs(c)) { a=c; s=p/4; }
    else s = p/(2*Math.PI) * Math.asin (c/a);
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  },
  easeInOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t===0) return b;  if ((t/=d/2)===2) return b+c;
    if (!p) p=d*(0.3*1.5);
    if (a < Math.abs(c)) { a=c; s=p/4; }
    else s = p/(2*Math.PI) * Math.asin (c/a);
    if (t < 1) return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
  },
  easeInBack: function (x, t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c*(t/=d)*t*((s+1)*t - s) + b;
  },
  easeOutBack: function (x, t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  },
  easeInOutBack: function (x, t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  },
  easeInBounce: function (x, t, b, c, d) {
    return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
  },
  easeOutBounce: function (x, t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    }
  },
  easeInOutBounce: function (x, t, b, c, d) {
    if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * 0.5 + b;
    return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
  }
});

}());

//= require ./menu.js

(function() {

Zd.SearchMenu = Em.Object.extend().reopenClass({
    defaultOptions: {
      domHolderSelector:  'body',
      position:           'down',

      disabled:           false,

      clsSearchMenuRoot:  'zd-searchmenu',
      clsBaseInput:       'zd-searchmenu-base',

      clsDefault:         'zd-state-default',
      clsDisabled:        'zd-state-disabled',
      clsFocused:         'zd-state-focus',
      clsOpen:            'zd-state-open',
      clsHover:           'zd-state-hover',

      clsPositionUp:      'zd-state-position-up',

      clsHighlight:       'zd-highlight',

      keyboardCue:        false,
      maxSearchResults:   10
    }
  })
  .reopen(Zd.MenuOptions)
  .reopen(Zd.Observable)
  .reopen({

  init: function(options) {
    this.type          = 'zdSearchMenu';

    this.id            = Zd.MenuIdGenerator.getUniqId();
    this.baseId        = Zd.MenuIdGenerator.getUniqId();

    this.dom           = null;
    this.domBase       = null;

    this.domHolder     = this.domHolder || $(this.domHolderSelector)[0];

    this.isFocused     = false;
    this.isInDOM       = false;
    this.isDestroyed   = false;
    this.isKeyboardCaptured     = false;
    this.enableBaseFocusControl = true;
    this.areDomEventsSet = false;

    this.filterWord    = '';
    this.filterData    = [];
    this.value         = this.value || '';

    this.typeToClassMapBase = null;
    this.typeToClassMapMenu = null;

    Zd.Menu.registerInstance(this);

    this.setupHighlighter();

    this.setOptions(options, Zd.SearchMenu.defaultOptions);

    this.renderItemContentForBase = this.renderItemContentForBase || this.renderItemContentForBaseDefault;
    this.renderItemContentForMenu = this.renderItemContentForMenu || this.renderItemContentForMenuDefault;

    this.setupDataSources();

    if (this.data) {
      delete this.options.data;
      this.loadData(this.data);
    }

    this.initUI();
    this.setState('display');
  },

  initUI: function() {
    this.htmlBuffer = this.render();
    this.putInDom(this.domHolder);
    this.buildCssClassStateManager();
    this.initMenu();
    this.postDomInsertionSetup();
  },

  buildCssClassStateManager: function() {
    this.clsStateManager = new Zd.CssClsStateMachine({
      dom: this.dom,
      clsZero: this.clsDefault,
      clsStates: [this.clsDisabled, this.clsOpen, this.clsFocused, this.clsHover]
    });
  },

  loadData: function(data) {
    this.dataSource.loadData(data);
  },

  setupHighlighter: function() {
    this.highlighter = _(function(highlightRenderer, str) {
      return highlightRenderer.render(
        str,
        this.searchDataSource.filterWord,
        this.clsHighlight
      );
    }).bind(this, new Zd.HighlightingRenderer());
  },

  setupDataSources: function() {
    this.dataSource = this.dataSource || new Zd.SimpleMenuDataSource({
      parser: new Zd.MenuDataParser(this),
      maxRecords: this.maxSearchResults
    });

    this.dataSource.onDataReady = _(this.onDataReady).bind(this);

    this.searchDataSource = this.searchDataSource || new Zd.FilteringDataSource(this.maxSearchResults, 'label');

    this.searchDataSource.onDataReady = _(function(data) {
      if (!this.menu) {return;}
      data = data || [];
      this.menu.loadData(data);
      data.length ? this.open() : this.close();
    }).bind(this);
  },

  initMenu: function() {
    this.options.domHolder = this.dom[0];
    this.options.isVisible = false;
    this.options.renderItemContent = this.renderItemContentForMenu;

    var menu = this.menu = new Zd.Menu(this.options);

    delete this.options.renderItemContent;

    menu.container       = this;
    menu.highlighter     = this.highlighter;
    menu.onChange        = _(this.menuDelegateHooks.onChange).bind(this);
    menu.onChangeRequest = _(this.menuDelegateHooks.onChangeRequest).bind(this);

    var nativeOnKeyDown = menu.onKeyDown;

    menu.onKeyDown = _(function(e) {
      this.menuDelegateHooks.onKeyDown.call(this, e);
      if (this.isOpen) {
        nativeOnKeyDown.call(menu, e);
      }
    }).bind(this);

    // position and size the menu UI
    this.setMenuSizes(menu.dom);
  },

  menuDelegateHooks: {
    onChange: function(data) {
      if (data.source === 'init') {return;}
      this.setValue(data.value, data.source);
    },

    onChangeRequest: function(data) {
      if (data.source === 'click' || data.source === 'keyboard' || data.source === 'keyboardCue') {
        this.setState('display');
      }
    },

    onKeyDown: function(e) {
      var keyCodes = Zd.Menu.keyCodes;

      switch(e.keyCode) {
        case keyCodes.HOME:
        case keyCodes.END:
        case keyCodes.PAGE_DOWN:
        case keyCodes.PAGE_UP:
        case keyCodes.DOWN:
        case keyCodes.UP:
          if (!this.isOpen) {
            e.preventDefault();
            this.open();
            return;
          }
          break;
        case keyCodes.ESCAPE:
          this.setState('display');
          break;
      }
    }
  },

  setMenuSizes: function(domMenu) {
    domMenu.css({
      visibility: 'hidden',
      width: this.domBase.innerWidth(),
      left: 0,
      top: this.position === 'down' ? this.domBase.outerHeight() : '',
      bottom: this.position === 'up' ? this.domBase.outerHeight() : ''
    })
    .css({
      width: domMenu.innerWidth() + domMenu.outerWidth() - this.domBase.outerWidth(),
      visibility: ''
    })
    .attr('tabindex', -1);
  },

  destroy: function() {
    this.menu.destroy();
    Zd.Menu.unregisterInstance(this);
    this.removeObservers();
    this.dataSource = null;
    this.destroyUI();
  },

  destroyUI: function() {
    if (this.isInDom) {
      this.teardownDomEvents();
      this.dom.remove();
    }
    this.isInDom = false;
    this.domHolder = null;
  },

  resetUI: function() {
    if (this.isInDom) {
      this.close();
      this.blur();
      this.dom.removeClass(this.clsHover);

      this.setBaseContent('');
      this.menu.resetUI();
    }
  },

// -------------------- Rendering and DOM Manipulation -----------------------

  render: function() {
    var html = '' +
      '<div id="' + this.id + '" class="' + this.clsSearchMenuRoot + ' ' + this.clsDefault + '">' +
        '<input id="' + this.baseId + '" class="' + this.clsBaseInput + '" tabindex="0">' +
        '<span class="icon"></span>' +
      '</div>';
    return html;
  },

  renderItemContentForBaseDefault: function(value) {
    return value;
  },

  renderItemContentForMenuDefault: function(item, highlighter) {
    return highlighter ? highlighter(item.label) : item.label;
  },

  putInDom: function(domElement) {
    if (this.isInDom) {return;}
    $(domElement || this.domHolder).append(this.htmlBuffer);
    this.isInDom = true;

    this.dom     = $('#' + this.id);
    this.domBase = $('#' + this.baseId);
  },

  autoSizeBase: function() {
    var delta = parseInt(this.domBase.css('padding-left'), 10) +
                parseInt(this.domBase.css('padding-right'), 10) +
                parseInt(this.domBase.css('border-left-width'), 10) +
                parseInt(this.domBase.css('border-right-width'), 10);

    this.domBase.width(($(this.domHolder).innerWidth() - delta));
  },

  autoSize: function() {
    if (this.isInDom) {
      this.autoSizeBase();
      this.setMenuSizes(this.menu.dom);
    }
  },

  postDomInsertionSetup: function() {
    if (this.disabled) {
      this.disable();
    } else {
      this.setupDomEvents();
    }
    if (this.position === 'up') {
      this.dom.addClass(this.clsPositionUp);
    }
    this.autoSizeBase();
  },

  setupDomEvents: function() {
    if (!this.isInDom || this.areDomEventsSet) { return;}

    this.domBase
      .bind('keyup'     , _(this.onBaseKeyUp).bind(this))
      .bind('focus'     , _(this.onBaseFocus).bind(this))
      .bind('blur'      , _(this.onBaseBlur).bind(this));

    this.dom
      .bind('mouseenter', _(this.onRootMouseEnter).bind(this))
      .bind('mouseleave', _(this.onRootMouseLeave).bind(this));

    $(document).bind('mousedown.' + this.id, _(this.onDocumentMouseDown).bind(this));
    this.areDomEventsSet = true;
  },

  teardownDomEvents: function() {
    if (!this.isInDom) { return;}

    this.domBase.unbind();
    this.dom.unbind();
    $(document).unbind('mousedown.' + this.id);
    this.areDomEventsSet = false;
  },

  getBaseContent: function() {
    return this.domBase.val();
  },

  setBaseContent: function(content) {
    this.domBase.val(content);
  },

  syncViewWithValue: function() {
    this.setBaseContent(this.renderItemContentForBase(this.value, this.getItemByValue(this.value)));
  },

// -------------------- General Menu Operations -----------------------

  setValue: function(value, source) {
    if (this.value === value) {
      return;
    }

    var eventData = {
      oldValue: this.value,
      value: value,
      source: source,
      userInitiated: source === 'click' || source === 'keyboard' || source === 'keyboardCue'
    };

    if (this.onBeforeChange(eventData) === false) {return;}

    this.value = value;

    this.syncViewWithValue();

    this.setState('display');

    this.onChange(eventData);
    this.trigger('change', eventData);
  },

  setState: function(state, source) {
    if (this.state === state) return;
    this.state = state;

    if (this.state === 'search') {
      this.menu.captureKeyboard();
      this.setBaseContent('');
    } else if (this.state === 'display') {
      this.syncViewWithValue();
      this.menu.releaseKeyboard();
      this.close();
    }

    this.onStateChange();
  },

  focus: function() {
    if (this.isFocused) {return;}

    this.isFocused = true;
    this.setState('search');
    this.clsStateManager.addState(this.clsFocused);

    this.onFocus();
    this.trigger('focus');
  },

  blur: function() {
    if (!this.isFocused) {return;}

    this.onBeforeBlur(this.domBase.val());

    this.isFocused = false;
    this.searchDataSource && this.searchDataSource.abort && this.searchDataSource.abort();
    this.setState('display');
    this.clsStateManager.removeState(this.clsFocused);

    this.onBlur();
    this.trigger('blur');
  },

  open: function() {
    if (this.isOpen) {return;}
    this.isOpen = true;

    this.menu.show();

    this.domBase[0].focus();
    this.focus();

    this.clsStateManager.addState(this.clsOpen);
    this.dom.addClass(this.clsSearchMenuRoot);
    this.setMenuSizes(this.menu.dom);

    this.enableBaseFocusControl = this.menu.enableBaseFocusControl = false;
    this.menu.dom[0].focus();
    this.domBase[0].focus();
    this.enableBaseFocusControl = this.menu.enableBaseFocusControl = true;

    this.onOpen();
    this.trigger('open');
  },

  close: function() {
    if (!this.isOpen) {return;}
    this.isOpen = false;

    this.menu.hide();
    this.clsStateManager.removeState(this.clsOpen);
    this.onClose();
    this.trigger('close');
  },

  toggle: function() {
    this.isOpen ? this.close() : this.open();
  },

  disable: function() {
    this.setDisableState(true);
  },

  enable: function() {
    this.setDisableState(false);
  },

  setDisableState: function(isDisabled) {
    this.disabled = isDisabled;

    if (this.disabled) {
      this.blur();
      this.close();
      this.teardownDomEvents();
      this.clsStateManager.addState(this.clsDisabled);
      this.domBase[0].disabled = true;
    } else {
      this.setupDomEvents();
      this.domBase[0].disabled = false;
      this.clsStateManager.removeState(this.clsDisabled);
    }
    this.onDisabledChanged();
    this.trigger('disableChanged');
  },

  show: function() {
    this.dom.show();
    this.trigger('show');
  },

  hide: function() {
    this.dom.hide();
    this.trigger('hide');
  },

  setPosition: function(position) {
    this.position = position;
    this.dom.toggleClass(this.clsPositionUp, position === 'up');
    this.setMenuSizes(this.menu.dom);
  },

  getItemByValue: function(value) {
    return this.menu.getItemByValue(value);
  },
// ----------------------   Hooks   -------------------------

  onBeforeChange:   Em.K,
  onChange:         Em.K,
  onFocus:          Em.K,
  onBeforeBlur:     Em.K,
  onBlur:           Em.K,
  onOpen:           Em.K,
  onClose:          Em.K,
  onDataReady:      Em.K,
  onDisabledChanged:Em.K,
  onDestroy:        Em.K,

// -------------------- Event Handlers -----------------------

  onStateChange: function() {},

  onDocumentMouseDown: function(e) {
    if (!this.isInDom || !e.target) return;

    if (!$.contains(this.dom[0], e.target)) {
      this.blur();
      this.close();
    }
  },

  onBaseKeyUp: function(e) {
    var keyCodes = Zd.Menu.keyCodes,
        isValidKeyInput = !_([
          keyCodes.LEFT,
          keyCodes.ENTER,
          keyCodes.NUMPAD_ENTER,
          keyCodes.RIGHT,
          keyCodes.TAB,
          keyCodes.SHIFT,
          keyCodes.ESCAPE
        ]).include(e.keyCode);

    if (!isValidKeyInput) return;

    if (this.state === 'display') {
      this.setState('search');
    }
    this.searchDataSource.filter(this, this.domBase.val());
    this.trigger('input', e);
  },

  onBaseFocus: function() {
    this.enableBaseFocusControl && this.focus();
  },

  onBaseBlur: function() {
    if (!this.isOpen && this.enableBaseFocusControl) {
      this.blur();
    }
  },

  onRootMouseEnter: function(e) {
    this.clsStateManager.addState(this.clsHover);
  },

  onRootMouseLeave: function(e) {
    this.clsStateManager.removeState(this.clsHover);
  }
});


Zd.makePlugin('zdSearchMenu', Zd.SearchMenu);



Zd.RemoteSearchDataSource = Em.Object.extend({

  init: function(maxRecords, url, options) {
    options = options || {};
    this.filterWord = '';
    this.data = [];
    this.url = url;
    this.maxRecords = maxRecords || 100;
    this.cache = {};
    this.xhr = null;
    this.curRequestIndex = 0;
    this.parse      = options.parse || this.parse;
    this.dataFilter = options.dataFilter || this.dataFilter;
    this.httpMethod = options.httpMethod || 'GET';
  },

  onDataReady: Em.K,

  dataFilter: function(data) {
    return data ? (data.users || []) : [];
  },

  loadData: function(json, word) {
    var data = this.dataFilter(json);
    if (word) {
      this.cache[word] = json;
    }
    this.data = this.parse(data);
    this.onDataReady(this.data);
  },

  filter: function(source, filterWord) {
    if (filterWord == null || filterWord === '') {
      this.filterWord = '';
      this.abort();
      this.loadData();
      return;
    }

    filterWord += '';
    if (filterWord === this.filterWord) {return;}
    this.filterWord = filterWord;

    if (!this.filterWord) {return;}

    this.fetch(this.filterWord);
  },

  fetch: function(word) {
    this.abort();
    this.curRequestIndex++;

    if (this.cache.hasOwnProperty(word)) {
      this.loadData(this.cache[word]);
      return;
    }

    var self = this;

    (function(index) {
      self.xhr = $.ajax({
        type: self.httpMethod,
        url: self.url.fmt(self.filterWord, self.maxRecords),
        dataType: "json",
        success: function(data) {
          if (index === self.curRequestIndex) {
            self.loadData(data, word);
          }
        },
        error: function(request) {
          if (index === self.curRequestIndex) {
            self.loadData();
          }
        }
      });
    }(this.curRequestIndex));
  },

  abort: function() {
    if (this.xhr) {
      this.xhr.abort();
    }
  },

  parse: function(data) {
    if (!data) {return [];}
    if (data && data.length === 0) {return data;}

    var ctrlData = [];
    for (var i=0; i<data.length && i<this.maxRecords; i++) {
      ctrlData.push({
        label: data[i].name,
        value: data[i].id,
        email: data[i].email
      });
    }
    return ctrlData;
  }
});

}());

//= require ./menu.js

(function() {

Zd.SelectMenu = Em.Object.extend().reopenClass({
    defaultOptions: {
      defaultValue:       '',
      defaultValueLabel:  '-',
      domHolderSelector:  'body',
      position:           'down',

      disabled:           false,

      clsSelectMenuRoot:  'zd-selectmenu',
      clsBaseButton:      'zd-selectmenu-base',
      clsBaseContent:     'zd-selectmenu-base-content',
      clsBaseArrow:       'zd-selectmenu-base-arrow zd-icon-triangle-1-s',

      clsDefault:         'zd-state-default',
      clsDisabled:        'zd-state-disabled',
      clsFocused:         'zd-state-focus',
      clsOpen:            'zd-state-open',
      clsHover:           'zd-state-hover',

      clsPositionUp:      'zd-state-position-up',

      keyboardCue:        false
    }
  })
  .reopen(Zd.MenuOptions)
  .reopen(Zd.Observable)
  .reopen({

  init: function(options) {
    this.type         = 'zdSelectMenu';

    this.setOptions(options, Zd.SelectMenu.defaultOptions);

    this.id            = Zd.MenuIdGenerator.getUniqId();
    this.baseId        = Zd.MenuIdGenerator.getUniqId();
    this.baseContentId = Zd.MenuIdGenerator.getUniqId();

    this.dom           = null;
    this.domBase       = null;
    this.domBaseContent= null;

    this.domHolder     = this.domHolder || $(this.domHolderSelector)[0];

    this.isFocused    = false;
    this.isInDOM      = false;
    this.isDestroyed  = false;
    this.isKeyboardCaptured = false;
    this.enableBaseFocusControl = true;
    this.areDomEventsSet = false;

    Zd.Menu.registerInstance(this);

    this.initUI();
    this.setValue(this.menu.value);
  },

  loadData: function(data) {
    if (!this.menu) {return;}
    this.menu.loadData(data);
    this.onDataReady();
  },

  getItemByValue: function(value) {
    return this.menu.getItemByValue(value);
  },

  initMenu: function() {
    this.options.domHolder = this.dom[0];
    this.options.isVisible = false;
    this.options.keyboardCue = true;
    this.options.keyboardCueAction = 'focus';

    var menu = this.menu = new Zd.Menu(this.options);
    menu.container = this;

    menu.onChange        = _(this.menuDelegateHooks.onChange).bind(this);
    menu.onChangeRequest = _(this.menuDelegateHooks.onChangeRequest).bind(this);
    menu.onCueMatch      = _(this.menuDelegateHooks.onCueMatch).bind(this);

    var nativeOnKeyDown = menu.onKeyDown;

    menu.onKeyDown = _(function(e) {
      var eventHandlingResult = this.menuDelegateHooks.onKeyDown.call(this, e);
      if (this.isOpen && eventHandlingResult !== false) {
        nativeOnKeyDown.call(menu, e);
      }
    }).bind(this);

    // position and size the menu UI
    this.setMenuSizes(menu.dom);
  },

  menuDelegateHooks: {
    onChange: function(data) {
      this.setValue(data.value, data.source);
    },

    onChangeRequest: function(data) {
      if (data.source === 'click' || data.source === 'keyboard') {
        this.close();
      }
      this.onChangeRequest(data);
    },

    onCueMatch: function(item) {
      this.open(false);
    },

    onKeyDown: function(e) {
      var keyCodes = Zd.Menu.keyCodes;

      switch(e.keyCode) {
        case keyCodes.HOME:
        case keyCodes.END:
        case keyCodes.PAGE_DOWN:
        case keyCodes.PAGE_UP:
        case keyCodes.DOWN:
        case keyCodes.UP:
        case keyCodes.LEFT:
        case keyCodes.ENTER:
        case keyCodes.NUMPAD_ENTER:
        case keyCodes.RIGHT:
          if (!this.isOpen) {
            e.preventDefault();
            this.open();
            return false; // stops keyboard event handling by this.menu
          }
          break;
        case keyCodes.TAB:
          if (this.isOpen && !this.menu.focusedItem) {
            e.preventDefault();
            this.close();
            return;
          }
          break;
        case keyCodes.ESCAPE:
          this.close();
          break;
      }
    }
  },

  setMenuSizes: function(domMenu) {
    domMenu.css({
      visibility: 'hidden',
      width: this.domBase.innerWidth(),
      left: 0,
      top: this.position === 'down' ? this.domBase.outerHeight() : '',
      bottom: this.position === 'up' ? this.domBase.outerHeight() : ''
    })
    .css({
      width: domMenu.innerWidth() + domMenu.outerWidth() - this.domBase.outerWidth(),
      visibility: ''
    })
    .attr('tabindex', -1);
  },

  setValue: function(value, source) {
    if (this.value === value) {
      return;
    }
    var oldValue = this.value;
    this.value = value;

    this.menu.setValue(value);
    this.setBaseContent(this.menu.getDisplayValue());

    var eventData = {
      oldValue: oldValue,
      value: value,
      source: source,
      userInitiated: source === 'click' || source === 'keyboard' || source === 'keyboardCue'
    };
    this.onChange(eventData);
    this.trigger('change', eventData);
  },

  initUI: function() {
    this.htmlBuffer = this.render();
    this.putInDom(this.domHolder);
    this.buildCssClassStateManager();
    this.postDomInsertionSetup();
    this.initMenu();
  },

  buildCssClassStateManager: function() {
    this.clsStateManager = new Zd.CssClsStateMachine({
      dom: this.dom,
      clsZero: this.clsDefault,
      clsStates: [this.clsDisabled, this.clsOpen, this.clsFocused, this.clsHover]
    });
  },

  destroy: function() {
    Zd.Menu.unregisterInstance(this);
    this.menu.destroy();
    this.removeObservers();
    this.destroyUI();
  },

  destroyUI: function() {
    if (this.isInDom) {
      this.teardownDomEvents();
      this.dom.remove();
    }
    this.isInDom        = false;
    this.domHolder      = null;
    this.dom            = null;
    this.domBase        = null;
    this.domBaseContent = null;
  },

  resetUI: function() {
    if (this.isInDom) {
      this.close();
      this.blur();
      this.dom.removeClass(this.clsHover);
      this.domBaseContent.html('');
      this.menu.resetUI();
    }
  },

// -------------------- Rendering and DOM Manipulation -----------------------

  render: function() {
    var html = '' +
      '<div id="' + this.id + '" class="' + this.clsSelectMenuRoot + ' ' + this.clsDefault + '">' +
        '<button id="' + this.baseId + '" class="' + this.clsBaseButton + '" role="button" tabindex="0">' +
          '<span class="' + this.clsBaseArrow + '"></span>' +
          '<span id="' + this.baseContentId + '" class="' + this.clsBaseContent + '"></span>' +
        '</button>' +
      '</div>';
    return html;
  },

  putInDom: function(domElement) {
    if (this.isInDom) {return;}
    $(domElement || this.domHolder).append(this.htmlBuffer);
    this.isInDom = true;

    this.dom           = $('#' + this.id);
    this.domBase       = $('#' + this.baseId);
    this.domBaseContent= $('#' + this.baseContentId);

    var domHolderInnerWidth = $(this.domHolder).innerWidth();

    // setting the button's width directly through the width method
    this.domBase.width(domHolderInnerWidth);
  },

  postDomInsertionSetup: function() {
    if (this.disabled) {
      this.disable();
    } else {
      this.setupDomEvents();
    }
    if (this.position === 'up') {
      this.dom.addClass(this.clsPositionUp);
    }
  },

  setupDomEvents: function() {
    if (!this.isInDom || this.areDomEventsSet || this.disabled) { return;}
    this.domBase
      .bind('click'     , _(this.onBaseClick).bind(this))
      .bind('mousedown' , _(this.onBaseMouseDown).bind(this))
      .bind('focus'     , _(this.onBaseFocus).bind(this))
      .bind('blur'      , _(this.onBaseBlur).bind(this));

    this.dom
      .bind('mouseenter', _(this.onRootMouseEnter).bind(this))
      .bind('mouseleave', _(this.onRootMouseLeave).bind(this));

    $(document).bind('mousedown.' + this.id, _(this.onDocumentMouseDown).bind(this));
    this.areDomEventsSet = true;
  },

  teardownDomEvents: function() {
    if (!this.isInDom) { return;}

    this.domBase.unbind();
    this.dom.unbind();
    $(document).unbind('mousedown.' + this.id);
    this.areDomEventsSet = false;
  },

  setBaseContent: function(content) {
    this.domBaseContent.html(content);
  },

// -------------------- General Menu Operations -----------------------

  focus: function() {
    if (this.isFocused) {return;}

    this.isFocused = true;
    this.clsStateManager.addState(this.clsFocused);

    setTimeout(_(function() {
      this.isFocused && this.menu.captureKeyboard();
    }).bind(this), 1);

    this.onFocus();
    this.trigger('focus');
  },

  blur: function() {
    if (!this.isFocused) {return;}

    this.isFocused = false;
    this.clsStateManager.removeState(this.clsFocused);
    this.menu.releaseKeyboard();
    this.onBlur();
    this.trigger('blur');
  },

  open: function(syncWithValue) {
    if (this.isOpen) {return;}
    this.isOpen = true;

    this.menu.show(syncWithValue);

    // broken jquery hacks - the css classes dissapear magically
    this.dom.addClass(this.clsSelectMenuRoot);

    this.clsStateManager.addState(this.clsOpen);

    // adjustments of sizes in cases they werent setup correctly during initial setup
    this.setMenuSizes(this.menu.dom);

    // scrollIntoView hacks:
    // The menu dom element is focused so that the browser can bring that area into view
    this.enableBaseFocusControl = this.menu.enableBaseFocusControl = false;
    this.menu.dom.focus();
    this.domBase.focus();
    this.enableBaseFocusControl = this.menu.enableBaseFocusControl = true;
    // end of scrollIntoView hacks

    setTimeout(_(function() {
      this.isFocused && this.menu.captureKeyboard();
    }).bind(this), 1);

    this.focus();

    this.onOpen();
    this.trigger('open');
  },

  close: function() {
    if (!this.isOpen) {return;}
    this.isOpen = false;

    this.menu.hide();
    this.clsStateManager.removeState(this.clsOpen);
    this.onClose();
    this.trigger('close');
  },

  toggle: function() {
    this.isOpen ? this.close() : this.open();
  },

  disable: function() {
    this.setDisableState(true);
  },

  enable: function() {
    this.setDisableState(false);
  },

  setDisableState: function(isDisabled) {
    this.disabled = isDisabled;
    if (!this.isInDom) {return;}

    if (this.disabled) {
      this.close();
      this.blur();
      this.teardownDomEvents();
      this.clsStateManager.addState(this.clsDisabled);
      this.domBase[0].disabled = true;
    } else {
      this.setupDomEvents();
      this.domBase[0].disabled = false;
      this.clsStateManager.removeState(this.clsDisabled);
    }
    this.onDisabledChanged();
    this.trigger('disableChanged');
  },

  show: function() {
    this.dom.show();
    this.trigger('show');
  },

  hide: function() {
    this.dom.hide();
    this.trigger('hide');
  },

  setPosition: function(position) {
    this.position = position;
    this.dom.toggleClass(this.clsPositionUp, position === 'up');
    this.setMenuSizes(this.menu.dom);
  },

// ----------------------   Hooks   -------------------------

  onDataReady:      Em.K,
  onChange:         Em.K,
  onChangeRequest:  Em.K,
  onOpen:           Em.K,
  onClose:          Em.K,
  onFocus:          Em.K,
  onBlur:           Em.K,
  onDisabledChanged:Em.K,
  onDestroy:        Em.K,

// -------------------- Event Handlers -----------------------

  onDocumentMouseDown: function(e) {
    if (!this.isInDom || !e.target) return;

    if (!$.contains(this.dom[0], e.target)) {
      this.blur();
      this.close();
    }
  },

  onBaseClick: function(e) {},

  onBaseMouseDown: function(e) {
    this.menu.syncViewWithValue();
    this.toggle();
    this.domBase.focus();
  },

  onBaseFocus: function() {
    if (!this.enableBaseFocusControl) {return;}
    this.focus();
  },

  onBaseBlur: function() {
    if (!this.isOpen && this.enableBaseFocusControl) {
      this.blur();
    }
  },

  onRootMouseEnter: function(e) {
    this.clsStateManager.addState(this.clsHover);
  },

  onRootMouseLeave: function(e) {
    this.clsStateManager.removeState(this.clsHover);
  }
});

Zd.makePlugin('zdSelectMenu', Zd.SelectMenu);

}());

//= require ./menu.js

(function() {

Zd.ComboSelectMenu = Em.Object.extend().reopenClass({
    defaultOptions: {
      defaultValue:       '',
      defaultValueLabel:  '-',
      domHolderSelector:  'body',
      position:           'down',
      filteredField:      'label',

      disabled:           false,

      clsSelectMenuRoot:  'zd-combo-selectmenu',

      clsDefault:         'zd-state-default',
      clsDisabled:        'zd-state-disabled',
      clsFocused:         'zd-state-focus',
      clsOpen:            'zd-state-open',
      clsHover:           'zd-state-hover',

      clsPositionUp:      'zd-state-position-up',

      clsBaseButton:      'zd-selectmenu-base',
      clsBaseContent:     'zd-selectmenu-base-content',
      clsBaseArrow:       'zd-selectmenu-base-arrow zd-icon-triangle-1-s',

      clsSearch:          'zd-searchmenu-base',

      clsHighlight:       'zd-highlight',
      maxSearchResults:   Infinity,

      keyboardCue:        false
    }
  })
  .reopen(Zd.MenuOptions)
  .reopen(Zd.Observable)
  .reopen({

  init: function(options) {
    this.type          = 'Zd.ComboSelectMenu';

    this.id            = Zd.MenuIdGenerator.getUniqId();
    this.baseId        = Zd.MenuIdGenerator.getUniqId();
    this.baseContentId = Zd.MenuIdGenerator.getUniqId();
    this.searchId      = Zd.MenuIdGenerator.getUniqId();

    this.dom           = null;
    this.domBase       = null;
    this.domBaseContent= null;
    this.domSearch     = null;

    this.isKeyboardCaptured     = false;
    this.enableBaseFocusControl = true;
    this.areDomEventsSet = false;

    this.isOpen        = false;
    this.isFocused     = false;
    this.isInDOM       = false;
    this.isDestroyed   = false;
    this.state         = null; // ['display' | 'displaySearch' | 'fullSearch']

    this.selectMenu    = null;
    this.searchMenu    = null;

    this.typeToClassMapBase    = null;
    this.typeToClassMapSearch  = null;
    this.typeToClassMapSelect  = null;

    this.enableSearchInput = true;

    Zd.Menu.registerInstance(this);

    this.setOptions(options, Zd.ComboSelectMenu.defaultOptions);

    this.domHolder     = this.domHolder || $(this.domHolderSelector)[0];

    this.renderItemContentForBase   = this.renderItemContentForBase || this.renderItemContent;
    this.renderItemContentForSearch = this.renderItemContentForSearch || this.renderItemContent;
    this.renderItemContentForSelect = this.renderItemContentForSelect || this.renderItemContent;
    this.filteringDataSource        = this.filteringDataSource || new Zd.FilteringDataSource(this.maxSearchResults, this.filteredField);
    this.modelParser                = this.modelParser || new Zd.MenuDataParser.menuModelParsers.LabelConcatenator();

    this.initUI();

    this.setState('display');
  },

  initUI: function() {
    this.htmlBuffer = this.render();
    this.putInDom(this.domHolder);
    this.buildCssClassStateManager();

    this.initSelectMenu();

    this.searchDataSource = this.filteringDataSource;

    this.highlighter = _(function(highlightRenderer, str) {
      return highlightRenderer.render(
        str,
        this.searchDataSource.filterWord,
        this.clsHighlight
      );
    }).bind(this, new Zd.HighlightingRenderer());

    this.initSearchMenu();

    this.postDomInsertionSetup();

    this.setValue(this.selectMenu.initValue, 'init');
  },

  buildCssClassStateManager: function() {
    this.clsStateManager = new Zd.CssClsStateMachine({
      dom: this.dom,
      clsZero: this.clsDefault,
      clsStates: [this.clsDisabled, this.clsOpen, this.clsFocused, this.clsHover]
    });
  },

  initSelectMenu: function() {
    var self = this;
    this.options.domHolder = this.dom[0];
    this.options.isVisible = false;

    this.options.renderItemContent = this.renderItemContentForSelect;
    this.options.typeToClassMap = this.typeToClassMapSelect;

    this.options.postParser = function(rootItem) {
      self.modelParser.parse(rootItem);
    };

    var selectMenu = this.selectMenu = new Zd.Menu(this.options);
    selectMenu.container = this;

    delete this.options.renderItemContent;
    delete this.options.typeToClassMap;
    delete this.options.postParser;

    selectMenu.onChange = _(function(data) {
      this.setValue(data.value, 'select:' + (data.source == null ? '' : data.source));
    }).bind(this);

    selectMenu.onChangeRequest = _(function(data) {
      if (data.source === 'click' || data.source === 'keyboard') {
        selectMenu.hide();
        this.setState('display');
      }
    }).bind(this);

    selectMenu.onShow = _(function() {
      this.onMenuShow(selectMenu, this.domBase);
    }).bind(this);

    // position and size the select menu UI

    this.setMenuSizes(selectMenu.dom, this.domBase);
  },

  initSearchMenu: function() {
    this.options.domHolder = this.dom[0];
    this.options.isVisible = false;

    this.options.renderItemContent = _(function(item, highlighter) {
      var selectMenuItem = item.data.sourceItem;
      return this.renderItemContentForSearch(selectMenuItem, highlighter);
    }).bind(this);

    this.options.typeToClassMap = this.typeToClassMapSearch;

    var searchMenu = this.searchMenu = new Zd.Menu(this.options);
    searchMenu.container = this;

    delete this.options.renderItemContent;
    delete this.options.typeToClassMap;

    searchMenu.highlighter = this.highlighter;

    searchMenu.onChangeRequest = _(function(data) {
      if (data.source === 'click' || data.source === 'keyboard') {
        searchMenu.hide();
        this.setState('display');
        this.setValue(data.value, 'search:' + (data.source == null ? '' : data.source));
      }
    }).bind(this);

    this.searchDataSource.onDataReady = _(function(data) {
      searchMenu.loadData(data);
      this.setState(data.length ? 'fullSearch' : 'displaySearch');
    }).bind(this);

    searchMenu.onShow = _(function() {
      this.onMenuShow(searchMenu, this.domSearch);
    }).bind(this);

    // position and size the search menu UI

    this.setMenuSizes(searchMenu.dom, this.domSearch);
  },

  loadData: function(data) {
    this.selectMenu.loadData(data);
    this.onDataReady();
  },

  getItemByValue: function(value) {
    return this.selectMenu.getItemByValue(value);
  },

  onMenuShow: function(menu, base) {
    this.enableBaseFocusControl = menu.enableBaseFocusControl = false;
    menu.dom.focus();

    setTimeout(_(function() {
      this.domSearch.focus();
    }).bind(this), 1);

    this.enableBaseFocusControl = menu.enableBaseFocusControl = true;

    // hack for jquery forgetting to add relevant css classes
    menu.dom.addClass(menu.clsRoot);
    this.setMenuSizes(menu.dom, base);
  },

  setMenuSizes: function(domMenu, domRef) {
    domMenu.css({
      visibility: 'hidden',
      width: domRef.innerWidth(),
      left: 0,
      top: this.position === 'down' ? domRef.outerHeight() : '',
      bottom: this.position === 'up' ? domRef.outerHeight() : ''
    })
    .css({
      width: domMenu.innerWidth() + domMenu.outerWidth() - domRef.outerWidth(),
      visibility: ''
    })
    .attr('tabindex', -1);
  },

  _sourceInMap: {
    'select:click': 1,
    'select:keyboard': 1,
    'select:keyboardCue': 1,
    'search:click': 1,
    'search:keyboard': 1,
    'search:keyboardCue': 1
  },

  setValue: function(value, source) {
    if (value == null) {
      value = Zd.Menu.defaultOptions.defaultValue;
    }
    if (this.value === value) {
      return;
    }
    var oldValue = this.value;
    this.value = value;

    this.setState('display');

    this.syncDomBaseContentWithValue();
    this.selectMenu.setValue(this.value);

    var eventData = {
      oldValue: oldValue,
      value: value,
      source: source,
      userInitiated: source in this._sourceInMap
    };
    this.onChange(eventData);
    this.trigger('change', eventData);
  },

  syncDomBaseContentWithValue: function() {
    var item = this.selectMenu.hashValues[this.value];
    var typeClass;

    if (item && item.type && this.typeToClassMapBase && this.typeToClassMapBase[item.type]) {
      typeClass = this.typeToClassMapBase[item.type];
    }

    if (this.lastBaseTypeClass) {
      this.domBase.removeClass(this.lastBaseTypeClass);
    }

    if (typeClass) {
      this.domBase.addClass(this.typeToClassMapBase[item.type]);
    }

    this.lastBaseTypeClass = typeClass;

    var html = this.renderItemContentForBase(item || {label: this.defaultValueLabel});
    this.domBaseContent.html(html);
  },

  destroy: function() {
    this.selectMenu.destroy();
    this.searchMenu.destroy();
    this.removeObservers();
    Zd.Menu.unregisterInstance(this);
    this.destroyUI();
  },

  destroyUI: function() {
    if (this.isInDom) {
      this.teardownDomEvents();
      this.dom.remove();
    }
    this.isInDom = false;
    this.domHolder = null;

    this.dom            = null;
    this.domBase        = null;
    this.domBaseContent = null;
    this.domSearch      = null;
  },

  resetUI: function() {
    if (this.isInDom) {
      this.blur();
      this.dom.removeClass(this.clsHover);

      this.selectMenu.resetUI();
      this.searchMenu.resetUI();
    }
  },

// -------------------- Rendering and DOM Manipulation -----------------------

  postDomInsertionSetup: function() {
    if (this.disabled) {
      this.disable();
    } else {
      this.setupDomEvents();
    }
    if (this.position === 'up') {
      this.dom.addClass(this.clsPositionUp);
    }
  },

  setupDomEvents: function() {
    if (!this.isInDom || this.areDomEventsSet) { return;}

    this.domBase
      .bind('click'     , _(this.onBaseClick).bind(this))
      .bind('mousedown' , _(this.onBaseMouseDown).bind(this))
      .bind('focus'     , _(this.onBaseFocus).bind(this))
      .bind('blur'      , _(this.onBaseBlur).bind(this));

    this.domSearch
      .bind('keyup'     , _(this.onSearchKeyUp).bind(this))
      .bind('focus'     , _(this.onSearchFocus).bind(this))
      .bind('click'     , _(this.onSearchClick).bind(this));

    this.dom
      .bind('mouseenter', _(this.onRootMouseEnter).bind(this))
      .bind('mouseleave', _(this.onRootMouseLeave).bind(this));

    $(document).bind('mousedown.' + this.id, _(this.onDocumentMouseDown).bind(this));
    this.areDomEventsSet = true;
  },

  teardownDomEvents: function() {
    if (!this.isInDom) { return;}

    this.domBase.unbind();
    this.domSearch.unbind();
    this.dom.unbind();
    $(document).unbind('mousedown.' + this.id);
    this.releaseKeyboard();
    this.areDomEventsSet = false;
  },

  render: function() {

    var html = '<div id="' + this.id + '" class="' + this.clsSelectMenuRoot + ' ' + this.clsDefault + '">' +
                 '<button id="' + this.baseId + '" class="' + this.clsBaseButton + '" role="button" tabindex="0">' +
                   '<span class="' + this.clsBaseArrow + '"></span>' +
                   '<span id="' + this.baseContentId + '" class="' + this.clsBaseContent + '"></span>' +
                 '</button>' +
                 '<input id="' + this.searchId + '" class="' + this.clsSearch + '" tabindex="0">' +
               '</div>';
    return html;
  },

  renderItemContent: function(item, highlighter) {
    return highlighter ? highlighter(item.label) : item.label;
  },

  putInDom: function(domElement) {
    if (this.isInDom) {return;}
    $(domElement || this.domHolder).append(this.htmlBuffer);
    this.isInDom = true;

    this.dom            = $('#' + this.id);
    this.domBase        = $('#' + this.baseId);
    this.domBaseContent = $('#' + this.baseContentId);
    this.domSearch      = $('#' + this.searchId);

    var domHolderInnerWidth = $(this.domHolder).innerWidth();

    // setting the button's width directly through the width method
    this.domBase.width(domHolderInnerWidth);

    var delta2 = this.domSearch.outerWidth() - this.domSearch.width();
    this.domSearch.width(domHolderInnerWidth - delta2);
  },

// --------------------       STATES      -----------------------

  setState: function(state) {
    if (this.state === state) {return;}
    this.oldState = this.state;
    this.state = state;

    this.states[state].action.call(this);
    this.onStateChange();
  },

  states: {

    'display': {
      action: function() {
        this.isOpen = false;
        this.searchMenu.hide();
        this.domSearch.val('');
        this.domSearch.hide();

        this.domBase.css('visibility', '');
        if (this.isFocused) {
          this.domBase.focus();
        }
        this.selectMenu.hide();
      },

      keyDown: function(e) {
        var keyCodes = Zd.Menu.keyCodes;

        switch (e.keyCode) {
          case keyCodes.HOME:
          case keyCodes.END:
          case keyCodes.PAGE_DOWN:
          case keyCodes.PAGE_UP:
          case keyCodes.DOWN:
          case keyCodes.UP:
          case keyCodes.LEFT:
          case keyCodes.ENTER:
          case keyCodes.NUMPAD_ENTER:
          case keyCodes.RIGHT:
            if (!this.isVisible) {
              this.setState('displaySearch');
            }
            return;
          case keyCodes.TAB:
            return;
        }
        this.selectMenu.onKeyDown(e);
      }
    },

    'displaySearch': {
      action: function() {
        this.isOpen = true;
        this.searchMenu.hide();
        if (this.oldState !== 'fullSearch') {
          this.domSearch.val('');
        }
        this.domSearch.show();
        this.domSearch.focus();

        this.domBase.css('visibility', 'hidden');
        this.selectMenu.show();
      },

      keyDown: function(e) {
        this.selectMenu.onKeyDown(e);
      }
    },

    'fullSearch': {
      action: function() {
        this.isOpen = true;
        this.searchMenu.show();
        this.domSearch.show();
        this.domSearch.focus();

        this.domBase.css('visibility', 'hidden');
        this.selectMenu.hide();
      },

      keyDown: function(e) {
        this.searchMenu.onKeyDown(e);
      }
    }
  },

  commonKeyDown: function(e) {
    var keyCodes = Zd.Menu.keyCodes;
    var key = String.fromCharCode(e.keyCode);

    if (e.keyCode === keyCodes.ESCAPE) {
      this.setState('display');
      return false;
    }

    this.enableSearchInput = true;

    if (this.state === 'display' && ((key >= '0' && key <= '9') || (key >= 'A' && key <= 'z')) && e.keyCode !== 91) { // 91 - 'Command' key
      this.enableSearchInput = false;
      this.setState('fullSearch');

      setTimeout(_(function() {
        this.domSearch.val(key);
        this.searchDataSource.filter(this.selectMenu, this.domSearch.val());
      }).bind(this), 1);

      return false;
    }

    return true;
  },

// -------------------- Common public methods -----------------------

  focus: function() {
    if (this.isFocused) {return;}

    this.isFocused = true;
    this.clsStateManager.addState(this.clsFocused);

    this.captureKeyboard();

    this.onFocus();
    this.trigger('focus');
  },

  blur: function() {
    if (!this.isFocused) {return;}

    this.isFocused = false;
    this.clsStateManager.removeState(this.clsFocused);

    this.releaseKeyboard();

    this.selectMenu.blur();
    this.searchMenu.blur();
    this.domBase.blur();

    this.onBlur();
    this.trigger('blur');
  },

  open: function() {
    this.clsStateManager.addState(this.clsOpen);
    this.setState('displaySearch');
  },

  close: function() {
    this.clsStateManager.removeState(this.clsOpen);
    this.setState('display');
  },

  disable: function() {
    this.setDisableState(true);
  },

  enable: function() {
    this.setDisableState(false);
  },

  setDisableState: function(isDisabled) {
    this.disabled = isDisabled;

    if (this.disabled) {
      this.blur();
      this.close();
      this.teardownDomEvents();
      this.clsStateManager.addState(this.clsDisabled);
      this.domBase[0].disabled = true;
      this.domSearch[0].disabled = true;
    } else {
      this.setupDomEvents();
      this.domBase[0].disabled = false;
      this.domSearch[0].disabled = false;
      this.clsStateManager.removeState(this.clsDisabled);
    }

    this.onDisabledChanged();
    this.trigger('disableChanged');
  },

  show: function() {
    this.dom.show();
    this.trigger('show');
  },

  hide: function() {
    this.dom.hide();
    this.trigger('hide');
  },

  setPosition: function(position) {
    this.position = position;
    this.dom.toggleClass(this.clsPositionUp, position === 'up');
    this.setMenuSizes(this.selectMenu.dom, this.domBase);
    this.setMenuSizes(this.searchMenu.dom, this.domSearch);
  },

  captureKeyboard: function() {
    if (this.isKeyboardCaptured) {return;}
    this.isKeyboardCaptured = true;
    $(document).bind('keydown.' + this.id, _(this.onKeyDown).bind(this));
  },

  releaseKeyboard: function() {
    this.isKeyboardCaptured = false;
    $(document).unbind('keydown.' + this.id);
  },
// ----------------------   Hooks   -------------------------

  onChange:         Em.K,
  onFocus:          Em.K,
  onBlur:           Em.K,
  onDataReady:      Em.K,
  onDisabledChanged:Em.K,
  onDestroy:        Em.K,
  onStateChange:    Em.K,

// -------------------- Event Handlers -----------------------

  onKeyDown: function(e) {
    if (this.commonKeyDown(e)) {
      this.states[this.state].keyDown.call(this, e);
    }
  },

  onDocumentMouseDown: function(e) {
    if (!this.isInDom || !e.target) {return;}

    if (!$.contains(this.dom[0], e.target)) {
      this.blur();
      this.close();
    } else {
      setTimeout(_(function() {
        this.domSearch.focus();
      }).bind(this), 1);
    }
  },

  onBaseClick: function(e) {},

  onBaseMouseDown: function() {
    this.focus();
    this.selectMenu.syncViewWithValue();
    this.open();
  },

  onBaseFocus: function() {
    this.enableBaseFocusControl && this.focus();
  },

  onBaseBlur: function() {
    this.enableBaseFocusControl && this.blur();
  },

  onSearchKeyUp: function() {
    if (!this.enableSearchInput) {
      return;
    }

    this.searchDataSource.filter(this.selectMenu, this.domSearch.val());
  },

  onSearchFocus: function() {
    this.enableBaseFocusControl && this.focus();
  },

  onSearchClick: function() {
    this.close();
  },

  onRootMouseEnter: function(e) {
    this.clsStateManager.addState(this.clsHover);
  },

  onRootMouseLeave: function(e) {
    this.clsStateManager.removeState(this.clsHover);
  }
});

Zd.makePlugin('zdComboSelectMenu', Zd.ComboSelectMenu);

}());
