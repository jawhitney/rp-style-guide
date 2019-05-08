var rpGame = rpGame || {};

rpGame.Clock = new Phaser.Class({
    Extends: rpGame.Interaction,
    initialize: function Clock() {
        Phaser.Scene.call(this, { key: 'Clock', active: false });
    },
    preload: function () {
        this.setQuestionContent('Clock', true);
    },
    create: function () {
        this.initInteraction('multiple');
    },
    update: function () {},
});

rpGame.Calendar = new Phaser.Class({
    Extends: rpGame.Interaction,
    initialize: function Calendar() {
        Phaser.Scene.call(this, { key: 'Calendar', active: false });
    },
    preload: function () {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        this.setQuestionContent('Calendar', false);
        this.months = rp.shuffleArray(rpGame.months);
    },
    create: function () {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        this.answerCorrectly = false;
        this.addQuestion('match');

        this.offsets = {
            question: this.text.question.getBounds().y + (0.5 * this.text.question.getBounds().height)
        };
        this.dimensions = {
            items: {},
            total: 0,
            max: 0,
        };
        this.spacing = 0.75;

        this.addDraggableItems(this.months, rpGame.months, true, 11, true, this.text.question.getBounds().bottom + (this.spacing * rp.tile) + (0.5 * rp.icon));

        rpGame.months.forEach(function(month, i) {
            var x = (((i + 1) / _this.months.length) * rp.w) - (0.5 * (1 / _this.months.length) * rp.w);

            _this.images[month + 'Answer'] = _this.add.sprite(x, _this.text.question.getBounds().bottom + (2 * _this.spacing * rp.tile) + (1.5 * rp.icon), 'answers', 3);

            _this.addItemText(_this, month, x, _this.images[month + 'Answer'].y);
            _this.setItemDimensions(_this, month, true);
        });

        this.shiftItems(false, false, true, true);
        this.enableDrag();
        this.addCheck(this.months, 'match');
    },
    update: function () {},
});

rpGame.Portrait = new Phaser.Class({
    Extends: rpGame.Interaction,
    initialize: function Portrait() {
        Phaser.Scene.call(this, { key: 'Portrait', active: false });
    },
    preload: function () {
        this.setQuestionContent('Portrait', true);
    },
    create: function () {
        this.initInteraction('multiple');
    },
    update: function () {},
});

rpGame.Crown = new Phaser.Class({
    Extends: rpGame.Interaction,
    initialize: function Crown() {
        Phaser.Scene.call(this, { key: 'Crown', active: false });
    },
    preload: function () {
        this.setQuestionContent('Crown', true);
    },
    create: function () {
        this.initInteraction('truefalse');
    },
    update: function () {},
});

rpGame.Computer = new Phaser.Class({
    Extends: rpGame.Interaction,
    initialize: function Computer() {
        Phaser.Scene.call(this, { key: 'Computer', active: false });
    },
    preload: function () {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        this.setQuestionContent('Computer', false);
        this.emailParts = rp.shuffleArray(rpGame.emailParts);
        this.areas = {
            'subject': { x: 327, y: 52, },
            'assunto': { x: 327, y: 52, },
            'header': { x: 589.5, y: 173.5, },
            'cabeçalho': { x: 589.5, y: 173.5, },
            'content': { x: 589.5, y: 479, },
            'conteúdo': { x: 589.5, y: 479, },
            'calltoaction': { x: 63.5, y: 548, }
        };
    },
    create: function () {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        this.answerCorrectly = false;
        this.addQuestion('identify');

        this.dimensions = {
            items: {},
            total: 0,
            max: 0,
        };
        this.spacing = 0.35;

        this.addDraggableItems(this.emailParts, rpGame.emailParts, true, 20, false, 0.25 * rp.w);

        this.images.emailParts = this.add.sprite(0.755 * rp.w, 0.57 * rp.h, 'email_parts');

        this.emailParts.forEach(function(part, i) {
            var key = part.toLowerCase().replace(/\s+/g, ''),
                email = _this.images.emailParts.getBounds(),
                y = _this.text.question.getBounds().bottom + (_this.spacing * rp.tile) + (0.5 * rp.icon) + (i * ((0.5 * rp.icon) + (2 * _this.spacing * rp.tile)));

            _this.images[key + 'Answer'] = _this.add.sprite(email.left + _this.areas[key].x, email.top + _this.areas[key].y, 'answers', 3);
            _this.images[key + 'Answer'].setTint(rp.colors.graybase.hexd);

            _this.addItemText(_this, part, 0.25 * rp.w, y);
            _this.setItemDimensions(_this, part, false);
        });

        this.shiftItems(true, true, false, false);
        this.enableDrag();
        this.addCheck(this.emailParts, 'identify');
    },
    update: function () {},
});

rpGame.Inbox = new Phaser.Class({
    Extends: rpGame.Interaction,
    initialize: function Inbox() {
        Phaser.Scene.call(this, { key: 'Inbox', active: false });
    },
    preload: function () {
        this.setQuestionContent('Inbox', true);
    },
    create: function () {
        this.initInteraction('truefalse');
    },
    update: function () {},
});

rpGame.Chart = new Phaser.Class({
    Extends: rpGame.Interaction,
    initialize: function Chart() {
        Phaser.Scene.call(this, { key: 'Chart', active: false });
    },
    preload: function () {
        this.setQuestionContent('Chart', true);
    },
    create: function () {
        this.initInteraction('truefalse');
    },
    update: function () {},
});

rpGame.Fish = new Phaser.Class({
    Extends: rpGame.Interaction,
    initialize: function Fish() {
        Phaser.Scene.call(this, { key: 'Fish', active: false });
    },
    preload: function () {
        this.setQuestionContent('Fish', true);
    },
    create: function () {
        this.initInteraction('multiple');
    },
    update: function () {},
});

rpGame.List = new Phaser.Class({
    Extends: rpGame.Interaction,
    initialize: function List() {
        Phaser.Scene.call(this, { key: 'List', active: false });
    },
    preload: function () {
        this.setQuestionContent('List', true);
    },
    create: function () {
        this.initInteraction('truefalse');
    },
    update: function () {},
});

rpGame.Laptop = new Phaser.Class({
    Extends: rpGame.Interaction,
    initialize: function Laptop() {
        Phaser.Scene.call(this, { key: 'Laptop', active: false });
    },
    preload: function () {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        this.setQuestionContent('Laptop', false);
        this.devices = rp.shuffleArray(rpGame.devices);
    },
    create: function () {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        this.answerCorrectly = false;
        this.addQuestion('rank');

        this.dimensions = {
            items: {},
            total: 0,
            max: 0,
        };
        this.spacing = 0.75;

        this.addDraggableItems(this.devices, rpGame.devices, true, 0, true, this.text.question.getBounds().bottom + (this.spacing * rp.tile) + (0.5 * rp.icon));

        this.devices.forEach(function(device, i) {
            var x = (((i + 1) / _this.devices.length) * (0.5 * rp.w)) - (0.5 * (1 / _this.devices.length) * (0.5 * rp.w)) + (0.25 * rp.w);

            _this.addItemText(_this, device, x, _this.images[device].y);
            _this.setItemDimensions(_this, device, false);
        });

        this.images.podium = this.add.image(0.5 * rp.w, 0.5 * rp.h, 'podium');

        this.images.podium.setY(this.text.question.getBounds().bottom + (this.spacing * rp.tile) + rp.icon + (this.spacing * 0.5 * rp.tile) + (0.5 * this.images.podium.getBounds().height));

        this.ranks = {
            'dispositivos móveis': { x: this.images.podium.x + 3.5, y : this.images.podium.y - 66.5, rank: '1st' },
            'mobile': { x: this.images.podium.x + 3.5, y : this.images.podium.y - 66.5, rank: '1st' },
            'webmail': { x: this.images.podium.x - 220, y : this.images.podium.y - 17, rank: '2nd' },
            'desktop': { x: this.images.podium.x + 222.5, y : this.images.podium.y + 18, rank: '3rd' },
        };

        rpGame.devices.forEach(function(device, i) {
            _this.images[device + 'Answer'] = _this.add.sprite(_this.ranks[device].x, _this.ranks[device].y, 'answers', 3);

            rp.addText(_this, scene.key, {
                key: device + 'Rank',
                text: _this.ranks[device].rank,
                x: _this.ranks[device].x,
                y: _this.images.podium.y + 75,
                styles: {
                    fontSize: 0.25 * rp.tile,
                    fontStyle: 'bold',
                },
            });
        });

        this.shiftItems(true, true, false, true);
        this.enableDrag();
        this.addCheck(this.devices, 'rank');
    },
    update: function () {},
});
