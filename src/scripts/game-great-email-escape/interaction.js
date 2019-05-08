var rpGame = rpGame || {};

rpGame.Interaction = new Phaser.Class({
    Extends: rpGame.Scene,
    initInteraction: function(type) {
        this.answerCorrectly = false;
        this.addQuestion(type);
    },
    setQuestionContent: function(object, hasAnswers) {
        this.question = rpGame.content[object].question;
        this.messages = {
            correct: rpGame.content[object].correctMessage,
            correctUrl: rpGame.content[object].hasOwnProperty('correctMessageUrl') ? rpGame.content[object].correctMessageUrl : '',
            incorrect: rpGame.content[object].incorrectMessage,
        };

        if (hasAnswers) {
            this.answers = rpGame.content[object].answers;
            this.correct = rpGame.content[object].correctAnswer;
        }
    },
    addQuestion: function(type) {
        var _this = this,
            scene = this.scene,
            rp = this.rp,
            y;

        rpGame.questionActive = true;

        this.graphics = {};
        this.images = {};
        this.dimensions = {
            answers : {},
            total: 0
        };
        this.offsets = {
            answer: 0
        };

        this.graphics.black = _this.add.graphics();
        this.graphics.black.fillStyle(rp.colors.black.hexd, !rpGame.isTouchActive ? 0.25 : 0.75);
        this.graphics.black.fillRect(0, 0, rp.w, rp.h);

        this.images.header = this.add.image(0.5 * rp.w, 0.6 * rp.tile, 'header');
        this.images.header.depth = rpGame.depths.header;
        this.images.object = this.add.image(0.5 * rp.w, 1.2 * rp.tile, scene.key.toLowerCase());
        this.images.object.depth = rpGame.depths.header;
        this.images.object.setScale(rpGame.assets.objects[scene.key.toLowerCase()].scale);

        rp.addText(this, scene.key, {
            key: 'question',
            text: this.question,
            x: (type !== 'identify') ? 0.5 * rp.w : 0.265 * rp.w,
            y: 0.5 * rp.h,
            styles: {
                fontSize: 0.4 * rp.tile,
            },
        });

        if (type === 'multiple' || type === 'truefalse') {
            y = this.images.object.getBounds().bottom + rp.tile + (0.5 * this.text.question.getBounds().height);
        } else if (type !== 'identify') {
            y = this.images.object.getBounds().bottom + (0.75 * rp.tile) + (0.5 * this.text.question.getBounds().height);
        } else {
            y = this.images.object.getBounds().bottom + (0.25 * rp.tile) + (0.5 * this.text.question.getBounds().height);
        }

        this.text.question.setY(y);

        if (type === 'multiple' || type === 'truefalse') {
            this.answers.forEach(function(answer, i) {
                var x, y, icon;

                rp.addText(_this, scene.key, {
                    key: 'answer' + i,
                    text: answer,
                    x: 0.5 * rp.w,
                    y: 0.5 * rp.h,
                    styles: {
                        fontSize: 0.3 * rp.tile,
                        fontStyle: 'bold',
                    },
                });

                y = _this.text.question.getBounds().bottom + rp.tile + (0.5 * _this.text['answer' + i].getBounds().height);

                if (type === 'multiple') {
                    icon = 6 + i;
                } else {
                    if (rpApp.currentLang === 'en') {
                        icon = 4 + i;
                    } else {
                        icon = 24 + i;
                    }
                }

                _this.images['answer' + i + 'Icon'] = _this.add.sprite(0.5 * rp.w, y, 'answers', icon);
                _this.images['answer' + i + 'Icon'].answer = 'answer' + i;
                _this.images['answer' + i + 'Icon'].setInteractive();
                _this.images['answer' + i + 'Icon'].on('pointerdown', function () {
                    if (!rpGame.answerActive) {
                        rpGame.answerActive = true;

                        _this.addResponse(_this.text[this.answer].text === _this.correct);
                    }
                });

                _this.text['answer' + i].setY(y);
                _this.text['answer' + i].setInteractive();
                _this.text['answer' + i].on('pointerdown', function () {
                    if (!rpGame.answerActive) {
                        rpGame.answerActive = true;

                        _this.addResponse(this.text === _this.correct);
                    }
                });

                _this.dimensions.answers['answer' + i] = {};
                _this.dimensions.answers['answer' + i].total = (0.25 * rp.tile) + rp.icon + (0.25 * rp.tile) + _this.text['answer' + i].getBounds().width + (0.25 * rp.tile);
                _this.dimensions.total += _this.dimensions.answers['answer' + i].total;
            });

            this.offsets.answer = 0.5 * (rp.w - this.dimensions.total);

            for (var answer in this.dimensions.answers) {
                var d = this.dimensions.answers[answer],
                    iconX = this.offsets.answer + (0.25 * rp.tile) + (0.5 * rp.icon),
                    textX = this.offsets.answer + (0.25 * rp.tile) + rp.icon + (0.25 * rp.tile) + (0.5 * this.text[answer].getBounds().width);

                this.images[answer + 'Icon'].setX(iconX);
                this.text[answer].setX(textX);
                this.offsets.answer += this.dimensions.answers[answer].total;
            }
        }
    },
    addCheck: function(items, type) {
        var _this = this,
            scene = this.scene,
            rp = this.rp,
            errors = [];

        this.images.check = this.add.sprite((type !== 'identify') ? 0.5 * rp.w : 0.265 * rp.w, rp.h - (0.5 * rp.tile) - (0.5 * rp.icon), 'icons', 1);
        this.images.check.setInteractive();
        this.images.check.on('pointerdown', function () {
            if (!rpGame.answerActive) {
                rpGame.answerActive = true;
                errors = [];

                items.forEach(function(item, i) {
                    var tint, option, optionBounds, answerBox, answerBoxBounds, answer, overlap,
                        key = (type === 'rank') ? item : item.toLowerCase().replace(/\s+/g, '');

                    option = _this.images[item];
                    optionBounds = option.getBounds();
                    answerBox = _this.images[key + 'Answer'];
                    answerBoxBounds = answerBox.getBounds();
                    answer = _this.text[item];
                    overlap = !(optionBounds.top > answerBoxBounds.bottom ||
                                optionBounds.right < answerBoxBounds.left ||
                                optionBounds.bottom < answerBoxBounds.top ||
                                optionBounds.left > answerBoxBounds.right);

                    if (overlap) {
                        tint = rp.colors.greenlight.hexd;
                    } else {
                        errors.push(1);
                        tint = rp.colors.red.hexd;
                    }
                });

                _this.addResponse(errors.length === 0);
            }
        });
    },
    addDraggableItems: function(itemsShuffled, items, includePlaceholder, iconOffset, alignX, fixed) {
        var _this = this,
            scene = this.scene,
            rp = this.rp,
            x, y;

        if (alignX) {
            y = fixed;
        } else {
            x = fixed;
        }

        itemsShuffled.forEach(function(item, i) {
            if (alignX) {
                x = (((i + 1) / itemsShuffled.length) * (0.5 * rp.w)) - (0.5 * (1 / itemsShuffled.length) * (0.5 * rp.w)) + (0.25 * rp.w);
            } else {
                y = _this.text.question.getBounds().bottom + (_this.spacing * rp.tile) + (0.5 * rp.icon) + (i * ((0.5 * rp.icon) + (2 * _this.spacing * rp.tile)));
            }

            if (includePlaceholder) {
                _this.images[item + 'Placeholder'] = _this.add.sprite(x, y, 'answers', 3);
            }

            _this.images[item] = _this.add.sprite(x, y, 'answers', iconOffset + items.indexOf(item));
            _this.images[item].setInteractive();
            _this.images[item].depth = rpGame.depths.text;
            _this.input.setDraggable(_this.images[item]);
        });
    },
    addItemText: function(scene, item, x, y) {
        var rp = scene.rp;

        rp.addText(scene, scene.key, {
            key: item,
            text: rpGame.capitalize(item),
            x: x,
            y: y,
            styles: {
                fontSize: 0.4 * rp.tile,
            },
        });
    },
    setItemDimensions: function(scene, item, setAnswer) {
        var rp = scene.rp,
            key = setAnswer ? item + 'Answer' : item;

        scene.dimensions.items[item] = {};
        scene.dimensions.items[item].image = scene.images[key].getBounds().width;
        scene.dimensions.items[item].text = scene.text[item].getBounds().width;
        scene.dimensions.items[item].total = (0.75 * rp.tile) + scene.dimensions.items[item].image + scene.dimensions.items[item].text;
        scene.dimensions.total += scene.dimensions.items[item].total;

        if (scene.text[item].getBounds().width > scene.dimensions.max) {
            scene.dimensions.max = scene.text[item].getBounds().width;
        }
    },
    shiftItems: function(shiftImage, shiftPlaceholder, shiftAnswer, alignX) {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        this.offsets.object = 0.5 * (rp.w - this.dimensions.total);

        for (var item in this.dimensions.items) {
            var d = this.dimensions.items[item],
                imageX, textX;

            if (alignX) {
                imageX = this.offsets.object + (0.5 * d.image) + (0.25 * rp.tile);
                textX = this.offsets.object + d.total - (0.5 * d.text) - (0.25 * rp.tile);
            } else {
                imageX = this.images[item].x - (0.5 * (rp.icon + (0.25 * rp.tile) + this.dimensions.max));
                textX = imageX + (0.5 * rp.icon) + (0.25 * rp.tile) + (0.5 * this.dimensions.items[item].text);
            }

            if (shiftImage) {
                this.images[item].setX(imageX);
            }

            if (shiftPlaceholder) {
                this.images[item + 'Placeholder'].setX(imageX);
            }

            if (shiftAnswer) {
                this.images[item + 'Answer'].setX(imageX);
            }

            this.text[item].setX(textX);

            this.offsets.object += this.dimensions.items[item].total;
        }
    },
    enableDrag: function() {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            if (!rpGame.answerActive) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            }
        });
    },
    addResponse: function(isCorrect) {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        if (rpGame.isAudioActive && !rpGame.isTouchActive) {
            this.scene.get('Level').rp.playAudio(this.scene.get('Level'), isCorrect ? 'correct' : 'incorrect');
        }

        //== Background
        this.graphics.background = this.add.graphics();
        this.graphics.background.depth = rpGame.depths.response;
        this.graphics.background.fillStyle(isCorrect ? rp.colors.greenlight.hexd : rp.colors.red.hexd, 1);
        this.graphics.background.fillRect(0, 0, rp.w, rp.h);
        this.graphics.background.setAlpha(0);

        this.images.background = this.add.image(0.5 * rp.w, 0.5 * rp.h, 'shapes');
        this.images.background.depth = rpGame.depths.response;
        this.images.background.setAlpha(0);

        //== Message
        rp.addText(this, scene.key, {
            key: 'response',
            text: isCorrect ? 'CORRECT' : 'INCORRECT',
            x: 0.5 * rp.w,
            y: 0.5 * rp.h,
            styles: {
                fontSize: 0.75 * rp.tile,
                fontStyle: 'bold',
            },
        });
        this.text.response.depth = rpGame.depths.response;

        rp.addText(this, scene.key, {
            key: 'message',
            text: isCorrect ? this.messages.correct : this.messages.incorrect,
            x: 0.5 * rp.w,
            y: 0.5 * rp.h,
            styles: {
                fontSize: 0.5 * rp.tile,
            },
        });
        this.text.message.depth = rpGame.depths.response;

        if (isCorrect && this.messages.correctUrl !== '') {
            rp.addText(this, scene.key, {
                key: 'link',
                text: rpGame.content.learnMore,
                x: 0.5 * rp.w,
                y: 0.5 * rp.h,
                styles: {
                    fontSize: 0.4 * rp.tile,
                },
            });
            this.text.link.depth = rpGame.depths.response;
            this.text.link.setInteractive();
            this.text.link.on('pointerdown', function () {
                window.open(_this.messages.correctUrl);
            });
        }

        this.text.response.setY(this.images.object.getBounds().bottom + (0.25 * rp.tile) + (0.5 * this.text.response.getBounds().height));
        this.text.message.setY(this.text.response.getBounds().bottom + (0.25 * rp.tile) + (0.5 * this.text.message.getBounds().height));

        if (isCorrect && this.messages.correctUrl !== '') {
            this.text.link.setY(this.text.message.getBounds().bottom + (0.25 * rp.tile) + (0.5 * this.text.link.getBounds().height));
            rp.addTextUnderline(this, 'link', this.text.link, rpGame.depths.response);
        }

        //== Close
        this.images.close = this.add.sprite(0.5 * rp.w, rp.h - (0.5 * rp.tile) - (0.5 * rp.icon), 'icons', 2);
        this.images.close.depth = rpGame.depths.response;
        this.images.close.setAlpha(0);
        this.images.close.setInteractive();
        this.images.close.on('pointerdown', function () {
            rpGame.answerActive = false;
            rpGame.questionActive = false;

            if (isCorrect) {
                rpGame.totalCorrect++;
            }

            scene.get('Level').updateObject(scene.key.toLowerCase(), isCorrect);
            scene.stop(scene.key);
        });

        //== Tweens
        this.tweens.add({
            targets: this.graphics.background,
            alpha: 1,
            ease: 'Power1',
            duration: 250,
        });

        this.tweens.add({
            targets: this.images.background,
            alpha: 1,
            ease: 'Power1',
            duration: 250,
        });

        this.tweens.add({
            targets: this.images.close,
            alpha: 1,
            ease: 'Power1',
            duration: 250,
        });

        if (this.images.hasOwnProperty('check')) {
            this.images.check.destroy();
        }
    },
});