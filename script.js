$(function () {
	function generateId() {
		return Math.random() * 100;
	}

	function Card(name, $parent) {
		var self = this;
		this.text = name;
		this.id = generateId();
		this.element = createCard();

		function createCard() {
			var $card = $('<li>').addClass('default');
			var $text = $('<p>').text(self.text);
			var $buttonRemove = $('<button>').text('x').addClass('deleteBtn');
			$card.append($text).append($buttonRemove);
			$parent.append($card);
			$buttonRemove.click(function () {
				self.removeCard($card);
			});
		}
	}
	Card.prototype = {
		removeCard: function (element) {
			element.remove();
		}
	}

	function Column(name, $parent) {
		var self = this;
		this.title = name;
		this.$element = createColumn();

		function createColumn() {
			var $column = $('<div>').addClass('column');
			var $title = $('<p>').text(self.title);
			var $columnRemove = $('<button>').text('x').addClass('deleteBtn');
			var $columnCardAdd = $('<button>').text('Card +');
			var $head = $('<div>').addClass('head').append($title).append($columnCardAdd).append($columnRemove);
			var $cardList = $('<ul>').attr('id', name).sortable({
				connectWith: "ul"
			});
			$column.append($head).append($cardList);
			$columnCardAdd.click(function () {
				self.addCard($cardList);
			});
			$columnRemove.click(function () {
				self.removeColumn($column);
			});
			$parent.append($column);
		}
	}
	Column.prototype = {
		addCard: function ($parent) {
			new Form(Card, $parent);
		},
		removeColumn: function (element) {
			element.remove();
		}
	}

	function Board(name) {
		var self = this;
		this.title = name;
		this.element = createBoard();

		function createBoard() {
			var $board = $('<div>').attr('id', name).addClass('board');
			var $title = $('<p>').text(self.title);
			var $boardColumnAdd = $('<button>').text('Column +');
			var $boardRemove = $('<button>').text('x').addClass('deleteBtn');
			var $head = $('<div>').addClass('head').append($title).append($boardColumnAdd).append($boardRemove);
			var $columnWrapper = $('<div>').addClass('columnWrapper');
			var $boardButton = $('<button>').text(self.title);

			$listOfBoardsItem.append($boardButton);

			$boardRemove.click(function () {
				self.removeBoard($board, $boardButton);
			});
			$boardColumnAdd.click(function () {
				self.addColumn($columnWrapper);
			});
			$board.append($head).append($columnWrapper);
			$container.append($board);

			$('.board').hide();
			$board.show();
			$boardButton.click(function () {
				$('.board').hide();
				$board.show();
			});
		}
	}
	Board.prototype = {
		addColumn: function ($board) {
			new Form(Column, $board);
		},
		removeBoard: function (element, element2) {
			element.remove();
			element2.remove();
		}
	}

	function Form(Constructor, $parent) {
		var $input = $('<input/>', {
			type: 'text'
		});
		var $submit = $('<input/>', {
			type: 'submit'
		});
		var $formText = $('<p>').text('Enter ' + Constructor.name + ' name:');
		var $form = $('<form>').append($formText);
		$form.append($input).append($submit);
		var $formWrapper = $('<div>', {
			id: 'form-' + Constructor.name,
			class: 'modal'
		});
		$formWrapper.append($form);
		$form.submit(function (e) {
			new Constructor($input.val(), $parent);
			$input.val('');
			$('.modal').remove();
			$.modal.close();
			e.preventDefault();
		})
		$container.append($formWrapper);
		$('#form-' + Constructor.name).modal();
	}
	var $container = $('body');
	var $header = $('header');
	var $boardNav = $('<nav>');
	var $listOfBoards = $('<ul>');
	var $listOfBoardsItem = $('<li>');
	var $button = $('<button>').text('Board +');

	$header.append($button);
	$button.click(function () {
		new Form(Board, $container);
	});

	$container.append(
		$boardNav.append(
			$listOfBoards.append($listOfBoardsItem)
		)
	);
});