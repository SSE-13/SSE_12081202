var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var command;
(function (command_1) {
    var invoker = (function () {
        function invoker() {
        }
        invoker.prototype.init = function () {
            this._list = [];
        };
        invoker.prototype.canUndo = function () {
            return this._list.length > 0;
        };
        invoker.prototype.undo = function () {
            var command = this._list.pop();
            this.new_command = command;
            this.new_command.undo();
        };
        invoker.prototype.setCommand = function (command) {
            command.execute();
            this._list.push(command);
        };
        return invoker;
    }());
    command_1.invoker = invoker;
    var Command = (function () {
        function Command() {
        }
        Command.prototype.execute = function () {
        };
        return Command;
    }());
    command_1.Command = Command;
    var CommandA = (function (_super) {
        __extends(CommandA, _super);
        function CommandA(row, col, num) {
            _super.call(this);
            this.row = row;
            this.col = col;
            this.num = num;
        }
        CommandA.prototype.execute = function () {
            console.log("execute " + this.row + this.col);
        };
        CommandA.prototype.undo = function (row, col, num) {
            console.log("Undo " + this.row + this.col + this.num);
            this.getNewRow(this.row);
            this.getNewCol(this.col);
            this.getNewNum(this.num);
        };
        CommandA.prototype.setNewRow = function () {
            return this.new_row;
        };
        CommandA.prototype.getNewRow = function (row) {
            this.new_row = row;
        };
        CommandA.prototype.setNewCol = function () {
            return this.new_col;
        };
        CommandA.prototype.getNewCol = function (col) {
            this.new_col = col;
        };
        CommandA.prototype.setNewNum = function () {
            return this.new_num;
        };
        CommandA.prototype.getNewNum = function (num) {
            this.new_num = num;
        };
        return CommandA;
    }(Command));
    command_1.CommandA = CommandA;
})(command || (command = {}));
