/*
 * Copyright (c) 2012, Intel Corporation.
 *
 * This program is licensed under the terms and conditions of the 
 * Apache License, version 2.0.  The full text of the Apache License is at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */

/**
 * globals
 */
var license_init,
    GameSound,
    window,
    document;

(function () {
    "use strict";

    /**
     * FlashCards() class contains all the variables and functions needed to run the flash card game 
     *  @constructor
     */
    function FlashCards() {
	this.cardDecks = {
	    COLORDECK: "ColorDeck",
	    SHAPEDECK: "ShapeDeck",
	    SPANISHDECK: "SpanishDeck",
	    COUNTINGDECK: "CountingDeck"
	};
	this.cardCount = 0; //current game wrong answers 
	this.rightCount = 0; //current game right answers 
	this.cardSet = this.cardDecks.SHAPEDECK; //name of card set and file prefix
	this.endGameFlag = false; //endGame flag
	this.deckAnswer = []; //the array of answers for this deck
    };

    /**
     *  FlashCards.helpClicked() plays audio and makes the help card dialog visible when help icon is clicked 
     *  @private
     */
    FlashCards.prototype.helpClicked = function () {
	this.buttonClickSound.play();
    	document.getElementById("help-dialog").style.display = "inline";
    };

    /* 
     * FlashCards.helpCloseClicked() plays audio and makes the help card dialog invisible when help X icon is clicked 
     * @private
     */
    FlashCards.prototype.helpCloseClicked = function () {
	this.buttonClickSound.play();
    	document.getElementById("help-dialog").style.display = "none";
    };

    /** 
     * FlashCards.hideAnswer() will hide the wrong and right buttons and answer text reseting the cursor style
     * @private
     */
    FlashCards.prototype.hideAnswer = function () {
	document.getElementById("answer").style.display = "none";
    };

    /** 
     * FlashCards.clear() will reset game counters, hide stars, replay button, answers, and reset the score
     * @private
     */
    FlashCards.prototype.clear = function () {
	var parent = document.getElementById("game-screen"),
	    count,
	    children;

	//reset properties
	this.endGameFlag = false;
	this.rightCount = 0;
	this.cardCount = 0;

	//remove all stars from dom
	children = document.getElementsByClassName("star");
	for (count = children.length - 1; count >= 0; count = count - 1) {
	    parent.removeChild(document.getElementsByClassName("star")[count]);
	}

	document.getElementById("score-number").innerHTML = "0";
	document.getElementById("replay-button").style.display = "none";
	document.getElementById("endgame-prompt").style.display = "none";
	this.hideAnswer();
    };

    /**
     *  FlashCards.navPaneClose()  closes nav pane and plays nav pane sound effect
     * @private
     */
    FlashCards.prototype.navPaneClose = function () {
	this.swooshSound.play();
	if (document.getElementsByClassName("animation-open")[0]) {
	    document.getElementsByClassName("animation-open")[0].setAttribute("class", "animation-close");
	} 
    };
    
    /**
     *  FlashCards.navPaneToggle() opens or closes nav pane and plays nav pane sound effect
     * @private
     */
    FlashCards.prototype.navPaneToggle = function () {
	this.swooshSound.play();
	if (document.getElementsByClassName("animation-open")[0]) {
	    document.getElementsByClassName("animation-open")[0].setAttribute("class", "animation-close");
	} else {
	    document.getElementsByClassName("animation-close")[0].setAttribute("class", "animation-open");
	}
    };

    /**
     *  FlashCards.navPaneClicked() plays button click audio, opens or closes nav pane and plays nav pane sound effect
     * @private
     */
    FlashCards.prototype.navPaneClicked = function () {
	this.buttonClickSound.play();
	this.navPaneToggle();
    };

    /**
     *  FlashCards.initShapeDeckAnswers() will initialize the shape answers for this deck
     *  @private
     */
    FlashCards.prototype.initShapeDeckAnswers = function () {
	this.shapeAnswer = [];
	this.shapeAnswer[0] = "circle";
	this.shapeAnswer[1] = "square";
	this.shapeAnswer[2] = "triangle";
	this.shapeAnswer[3] = "oval";
	this.shapeAnswer[4] = "star";
	this.shapeAnswer[5] = "octagon";
	this.shapeAnswer[6] = "rectangle";
	this.shapeAnswer[7] = "trapezoid";
    };

    /**
     *  FlashCards.setCardContent() sets the image centered horizontally in the card
     * @private
     */
    FlashCards.prototype.setCardContent = function () {
	var img = new Image();
	img.src = 'images/' + this.cardSet + this.cardCount + '.png';
	document.getElementById("card").style.display = "none";
	img.onload = function(){
	    document.getElementById("card-graphic").style.width = img.width+"px";
	    document.getElementById("card-graphic").style.height = img.height+"px";
	    document.getElementById("card-graphic").style.top = (160-(img.height/2))+"px";
	    document.getElementById("card-graphic").style.backgroundImage = 'url('+ img.src +')';
	    document.getElementById("card").style.display = "inline";
	};
    }

    /**
     *  FlashCards.shapeDeckClicked() set the game to play through the this deck
     * @private
     */
    FlashCards.prototype.setShapeDeck = function () {
	this.whipCrackSound.play();
	this.clear();
	this.cardSet = this.cardDecks.SHAPEDECK;
	this.deckAnswer = this.shapeAnswer;
	this.setCardContent();
	document.getElementById("nav-flag").innerHTML = "Shapes";
	document.getElementById("card-answer").style.color = "#499aff";
	document.getElementById("card-answer").innerHTML = this.deckAnswer[this.cardCount];
    };

    /** 
     * FlashCards.shapeDeckClicked() plays the button click audio, navPane animation, and calls the setter for this deck 
     * @private
     */
    FlashCards.prototype.shapeDeckClicked = function () {
	this.buttonClickSound.play();
	this.navPaneClicked();
	this.setShapeDeck();
    };

    /**
     *  FlashCards.initCountingDeckAnswers() will initialize the counting answers for this deck
     *  @private
     */
    FlashCards.prototype.initCountingDeckAnswers = function () {
	this.countingAnswer = [];
	this.countingAnswer[0] = "one";
	this.countingAnswer[1] = "two";
	this.countingAnswer[2] = "three";
	this.countingAnswer[3] = "four";
	this.countingAnswer[4] = "five";
	this.countingAnswer[5] = "six";
	this.countingAnswer[6] = "seven";
	this.countingAnswer[7] = "eight";
	this.countingAnswer[8] = "nine";
	this.countingAnswer[9] = "ten";
    };

    /**
     *  FlashCards.setCountingDeck() set the game to play through the this deck 
     *  @private
     */
    FlashCards.prototype.setCountingDeck = function () {
	this.whipCrackSound.play();
	this.clear();
	this.cardSet = this.cardDecks.COUNTINGDECK;
	this.deckAnswer = this.countingAnswer;
	this.setCardContent();
	document.getElementById("nav-flag").innerHTML = "Counting";
	document.getElementById("card-answer").style.color = "navy";
	document.getElementById("card-answer").innerHTML = this.deckAnswer[this.cardCount];
    };

    /**
     * FlashCards.countingDeckClicked() plays the button click audio, navPane animation, and calls the setter for this deck
     * @private
     */
    FlashCards.prototype.countingDeckClicked = function () {
	this.buttonClickSound.play();
	this.navPaneClicked();
	this.setCountingDeck();
    };

    /**
     *  FlashCards.initSpanishDeckAnswers() will initialize the Spanish answers for this deck
     *  @private
     */
    FlashCards.prototype.initSpanishDeckAnswers = function () {
	this.spanishAnswer = [];
	this.spanishAnswer[0] = "sun: el sol";
	this.spanishAnswer[1] = "cloud: la nube";
	this.spanishAnswer[2] = "cat: el gato";
	this.spanishAnswer[3] = "dog: el perro";
	this.spanishAnswer[4] = "tree: el &#225;rbol";
	this.spanishAnswer[5] = "fish: el pez";
	this.spanishAnswer[6] = "fruit: la fruta";
	this.spanishAnswer[7] = "worm: el gusano";
	this.spanishAnswer[8] = "bird: la ave";
	this.spanishAnswer[9] = "crocodile: el cocodrilo";
	this.spanishAnswer[10] = "book: el libro";
	this.spanishAnswer[11] = "socks: los calcet&#237;nes";
	this.spanishAnswer[12] = "cup: la copa";
	this.spanishAnswer[13] = "chair: la silla";
    };

    /**
     * FlashCards.setSpanishDeck() set the game to play through the this deck
     * @private
     */
    FlashCards.prototype.setSpanishDeck = function () {
	this.whipCrackSound.play();
	this.clear();
	this.cardSet = this.cardDecks.SPANISHDECK;
	this.deckAnswer = this.spanishAnswer;
	this.setCardContent();
	document.getElementById("nav-flag").innerHTML = "Spanish";
	document.getElementById("card-answer").style.color = "#000000";
	document.getElementById("card-answer").innerHTML = this.deckAnswer[this.cardCount];
    };

    /**
     *  FlashCards.spanishDeckClicked() plays the button click audio, navPane animation, and calls the setter for this deck 
     *  @private
     */
    FlashCards.prototype.spanishDeckClicked = function () {
	this.buttonClickSound.play();
	this.navPaneClicked();
	this.setSpanishDeck();
    };

    /**
     *  FlashCards.initColorDeckAnswers() will initialize the color answers for this deck
     *  @private
     */
    FlashCards.prototype.initColorDeckAnswers = function () {
	this.colorAnswer = [];
	this.colorAnswer[0] = "red";
	this.colorAnswer[1] = "purple";
	this.colorAnswer[2] = "blue";
	this.colorAnswer[3] = "green";
	this.colorAnswer[4] = "orange";
	this.colorAnswer[5] = "yellow";
	this.colorAnswer[6] = "black";
	this.colorAnswer[7] = "pink";
	this.colorAnswer[8] = "white";
	this.colorAnswer[9] = "brown";
	this.colorAnswer[10] = "grey";
    };

    /**
     *  FlashCards.initColorDeckColors() will initialize the text colors for each card in this deck
     * @private
     */
    FlashCards.prototype.initColorDeckColors = function () {
	this.colorHex = [];
	this.colorHex[0] = "#DD0000"; //red
	this.colorHex[1] = "#7E0B80"; //purple
	this.colorHex[2] = "#0000ff"; //blue
	this.colorHex[3] = "#00BC00"; //green 
	this.colorHex[4] = "#DA8D00"; //orange 
	this.colorHex[5] = "#FEF600"; //yellow 
	this.colorHex[6] = "#000000"; //black
	this.colorHex[7] = "#FF00FF"; //pink
	this.colorHex[8] = "#FFFFFF"; //white
	this.colorHex[9] = "#996600"; //brown
	this.colorHex[10] = "#C0C0C0"; //grey 
    };

    /** 
     * FlashCards.setColorDeck set the game to play through the this deck
     * @private
     */
    FlashCards.prototype.setColorDeck = function () {
	this.whipCrackSound.play();
	this.clear();
	this.cardSet = this.cardDecks.COLORDECK;
	this.deckAnswer = this.colorAnswer;
	this.setCardContent();
	document.getElementById("nav-flag").innerHTML = "Colors";
	document.getElementById("card-answer").innerHTML = this.colorAnswer[this.cardCount];
	document.getElementById("card-answer").style.color = this.colorHex[this.cardCount];
    };

    /**
     *  FlashCards.colorDeckClicked() plays the button click audio, navPane animation, and calls the setter for this deck 
     * @private
     */
    FlashCards.prototype.colorDeckClicked = function () {
	this.buttonClickSound.play();
	this.navPaneClicked();
	this.setColorDeck();
    };

    /** 
     * FlashCards.initGame() gets the localized strings for the game play screen, sets the default deck to Shapes
     * @private
     */
    FlashCards.prototype.initGame = function () {
	this.initSound();
	this.adventureThemeSound.pause();
	this.backgroundSound.play();

        this.setGameEventListeners();

	this.initColorDeckAnswers();
	this.initColorDeckColors();
	this.initShapeDeckAnswers();
	this.initCountingDeckAnswers();
	this.initSpanishDeckAnswers();

	this.setShapeDeck();
    };

    /**
     *  FlashCards.playNowClicked() will initialize the game screen when Play Now button is clicked and hide the splash screen 
     * @private
     */
    FlashCards.prototype.playNowClicked = function () {
	this.initGame(); 
	document.getElementById("splash-screen").style.display = "none";
	document.getElementById("game-screen").style.display = "inline";
    };

    /**
     * FlashCards.isLastCard() 
     * @private
     * @return true if card count is equal to the number of cards in the deck, else return false
     */
    FlashCards.prototype.isLastCard = function () {
	if ((this.deckAnswer.length) === this.cardCount) {
	    return true;
	}
	return false;
    };

    /**
     * FlashCards.drawStars() draws the stars for right and wrong answers
     * @private
     */
    FlashCards.prototype.drawStars = function () {
	var star,
	count,
	container;

	//paint correct stars equal to rightCount
	for (count = 1; count <= this.rightCount; count = count + 1) {
	    star = document.createElement("img");
	    star.setAttribute('src', 'images/StarFilled.png');
	    star.setAttribute('id', ('star' + count));
	    star.setAttribute('class', ('star'));
	    container = document.getElementById("game-screen");
	    container.appendChild(star);
	}

	//paint remaining stars as empty stars
	for (count = (this.rightCount + 1); count <= (this.deckAnswer.length); count = count + 1) {
	    star = document.createElement("img");
	    star.setAttribute('src', 'images/StarEmpty.png');
	    star.setAttribute('id', ('star' + count));
	    star.setAttribute('class', ('star'));
	    container = document.getElementById("game-screen");
	    container.appendChild(star);
	}
    };

    /**
     * FlashCards.endGame() opens nav pane, plays audio sound for end of game, shows correct star score and replay button
     * @private
     */
    FlashCards.prototype.endGame = function () {
	this.trumpetFanfareSound.play();
	this.endGameFlag = true;
	this.navPaneClose();
	document.getElementById("card").style.display = "none";
	document.getElementById("card-flip").setAttribute("id", "card-graphic");

	this.drawStars();

	//if user got more right than wrong then show localized strings for "good job" else show localized strings for "try again" 
	if (((this.deckAnswer.length) - this.rightCount) < this.rightCount) {
	    document.getElementById("endgame-prompt").innerHTML = "Good Job!";
	} else {
	    document.getElementById("endgame-prompt").innerHTML = "Try Again!";
	}

	//set card answer color and display replay button
	document.getElementById("endgame-prompt").style.display = "inline";
	document.getElementById("replay-button").style.display = "inline";
    };

    /**
     * FlashCards.flipCard() hide answers and moves to next card in the deck, increments counters and checks for end game state
     * @private
     */
    FlashCards.prototype.flipCard = function () {
	this.hideAnswer();
	document.getElementById("card-graphic").setAttribute("id", "card-flip");
	this.cardCount = this.cardCount + 1;
	if (!this.isLastCard()) {
	    this.cardFlipSound.play();
	    this.setCardContent();
	    document.getElementById("card-answer").innerHTML = this.deckAnswer[this.cardCount];
	    if (this.cardSet === this.cardDecks.COLORDECK) {
		document.getElementById("card-answer").style.color = this.colorHex[this.cardCount];
	    }
	    document.getElementById("card-flip").setAttribute("id", "card-graphic");
	} else {
	    this.endGame();
	}
    };

    /**
     * FlashCards.wrongButtonClicked() plays audio sounds, increments wrongCount and calls flipCard()
     * @private
     */
    FlashCards.prototype.wrongButtonClicked = function () {
	this.wrongAnswerSound.play();
	this.buttonClickSound.play();
	this.flipCard();
    };

    /**
     * FlashCards.rightButtonClicked() plays audio sounds, increments rightCount and calls flipCard()
     * @private
     */
    FlashCards.prototype.rightButtonClicked = function () {
	this.rightAnswerSound.play();
	this.buttonClickSound.play();
	this.rightCount = this.rightCount + 1;
	this.flipCard();
	document.getElementById("score-number").innerHTML = this.rightCount;
    };

    /**
     * FlashCards.replayButtonClicked() restarts current game and calls clear()
     * @private
     */
    FlashCards.prototype.replayButtonClicked = function () {
	if (this.cardSet === this.cardDecks.COLORDECK) {
	    this.colorDeckClicked();
	} else if (this.cardSet === this.cardDecks.SHAPEDECK) {
	    this.shapeDeckClicked();
	} else if (this.cardSet === this.cardDecks.SPANISHDECK) {
	    this.spanishDeckClicked();
	} else if (this.cardSet === this.cardDecks.COUNTINGDECK) {
	    this.countingDeckClicked();
	}
	this.clear();
    };

    /**
     * FlashCards.showAnswer() will show right and wrong buttons, answer and set cursor type
     * @private
     */
    FlashCards.prototype.showAnswer = function () {
	document.getElementById("answer").style.display = "inline";
    };

    /**
     * FlashCards.cardClicked() plays button click sound, makes sure the nav pane is closed, and if not end game state will call showAnswer()
     * @private
     */
    FlashCards.prototype.cardClicked = function () {
	this.buttonClickSound.play();
	this.navPaneClose();
	if (!this.endGameFlag) {
	    this.showAnswer();
	}
    };

    /**
     * FlashCards.scrollNavPane will scroll the navigation Pane the direction the user moves the mouse
     * @private
     */
    FlashCards.prototype.scrollNavPane = function (delta) {
	document.getElementById("scroll-items").style.webkitTransform = "translateY("+delta+"px)";
    };

    /**
     * FlashCards.setGameEventListeners sets event handlers for the game
     * @private
     */
    FlashCards.prototype.setGameEventListeners = function () {
	var self = this,
	starty = 0, //starting y coordinate of drag
	isDrag = -1; //flag for qualifying drag event
	
	document.getElementById("nav-pane").addEventListener('click', function () {
	    self.navPaneClicked();
	}, false);
	document.getElementById("scroll-overlay").addEventListener('mousedown', function (e) {
	    starty = e.clientY;
	    isDrag = 0; //mouse down
	}, false);
	document.getElementById("scroll-overlay").addEventListener('mousemove', function (e) {
	    isDrag = 1; //mouse move
	}, false);
	document.getElementById("scroll-overlay").addEventListener('mouseup', function (e) {
	    if(isDrag === 1) { //if equals 1 is drag event
		self.scrollNavPane((-1)*(starty-e.clientY));
	    }
	    isDrag = -1; //regardless reset endy 
	}, false);
	document.getElementById("shape-deck").addEventListener('click', function () {
	    self.shapeDeckClicked();
	}, false);
	document.getElementById("color-deck").addEventListener('click', function () {
	    self.colorDeckClicked();
	}, false);
	document.getElementById("counting-deck").addEventListener('click', function () {
	    self.countingDeckClicked();
	}, false);
	document.getElementById("spanish-deck").addEventListener('click', function () {
	    self.spanishDeckClicked();
	}, false);
	document.getElementById("card").addEventListener('click', function () {
	    self.cardClicked();
	}, false);
	document.getElementById("card-answer").addEventListener('click', function () {
	    self.cardClicked();
	}, false);
	document.getElementById("wrong-button").addEventListener('click', function () {
	    self.wrongButtonClicked();
	}, false);
	document.getElementById("right-button").addEventListener('click', function () {
	    self.rightButtonClicked();
	}, false);
	document.getElementById("replay-button").addEventListener('click', function () {
	    self.replayButtonClicked();
	}, false);
	document.getElementById("help-icon").addEventListener('click', function () {
	    self.helpClicked();
	}, false);
	document.getElementById("help-close").addEventListener('click', function () {
	    self.helpCloseClicked();
	}, false);
    };

    /**
     * FlashCards.setSplashScreenEventListeners sets event handlers for the splash screen 
     * @private
     */
    FlashCards.prototype.setSplashScreenEventListeners = function () {
	var self = this;

	window.addEventListener('tizenhwkey', function(e) {
	    if (e.keyName == "back")
	    tizen.application.getCurrentApplication().exit();
	});

	this.buttonClickSound = new GameSound("sound-buttonclick", "audio/GeneralButtonClick_wav.ogg");
	document.getElementById("play-button").addEventListener('click', function () {
	    self.buttonClickSound.play();
	    self.playNowClicked();
	}, false);
    };

    /**
     * FlashCards.initSound will initialize all the sound id's for each sound file 
     * @private
     */
    FlashCards.prototype.initSound = function () {
	this.cardFlipSound = new GameSound("sound-cardflip", "audio/CardFlip.ogg");
	this.backgroundSound = new GameSound("sound-background", "audio/GameplayBackgroundAtmospheric_Loop.ogg", true);
	this.swooshSound = new GameSound("sound-navpane", "audio/NavPaneSwoosh.ogg");
	this.trumpetFanfareSound = new GameSound("sound-end", "audio/Replay.ogg");
	this.rightAnswerSound = new GameSound("sound-starbutton", "audio/StarButton.ogg");
	this.wrongAnswerSound = new GameSound("sound-thumbbutton", "audio/ThumbsDown.ogg");
	this.whipCrackSound = new GameSound("sound-begin", "audio/WhipCrackBegin.ogg");
    };

    /**
     * FlashCards.init() will set the license, play intro sound, and set splash screen text 
     * @private
     */
    FlashCards.prototype.init = function () {
	this.adventureThemeSound = new GameSound("sound-intro", "audio/Theme_Loop.ogg", true);
	this.adventureThemeSound.play();
	this.setSplashScreenEventListeners();
	license_init("license", "splash-screen");
    };

    window.addEventListener('load', function () {
	var App = new FlashCards();
	App.init();
	//hack to get active state to work on webkit
	this.touchstart = function (e) {};
    }, false);

}());
