var mongo = require('mongodb');
var mongoose = require('mongoose');
var Person = require('../data-models/person-model.js');
var Group = require('../data-models/group-model.js');
var loremIpsum = require('lorem-ipsum')

mongoose.connect('mongodb://localhost/testPeople');

var firstNames = ['Аврора', 'Автономка', 'Автономка', 'Аделаид', 'Аида', 'Алеман', 'Анна', 'Ария', 'Арсени', 'Африкан', 'Ахил', 'Богослов', 'Бончук', 'Босилчо', 'Братухчо', 'Бригадир', 'Брилянт', 'Букетка', 'Буря', 'Бърза', 'Бърза', 'Вангелуда', 'Ваньоздрав', 'Васил', 'Ведрина', 'Великан', 'Венчо', 'Веселазасмяна', 'Ветлогин', 'Видол'];
var lastNames = ['Спартакова', 'Торимацова', 'Шестакова', 'Димитров', 'Пелтекова', 'Клюсов', 'Кокошкова', 'Тодорова', 'Чанталиев', 'Симеонов', 'Карамузов', 'Данданов', 'Андонов', 'Кърков', 'Въчев', 'Цветков', 'Иванов', 'Градинарова', 'Куртакова', 'Кехайова', 'Куршумова', 'Иванова', 'Яназов', 'Бамбурски', 'Чанлиева', 'Тодоров', 'Жилков', 'Тодорова', 'Колчев', 'Порязов'];
var titles = ['Г-н', 'Г-жа', 'Г-ца'];
var emails = ['ceko@abv.bg', 'vankata111@gmail.com', 'gero32@abv.bg', 'maimunata@abv.bg', 'izverg123@abv.bg', 'goshobarosho@abv.bg', 'kunchozmeq@gmail.com'];
var jobTitles = ['Професор', 'Водопроводчик', 'Майстор', 'Чистач', 'Програмист', 'Боклукчия', 'Космонавт'];

var personToAdd = {};
for(var i=0;i<300;i++){
    personToAdd = new Person({
        title: titles[Math.floor(Math.random()*titles.length)],
        firstName: firstNames[Math.floor(Math.random()*firstNames.length)],
        secondName: lastNames[Math.floor(Math.random()*lastNames.length)],
        lastName: lastNames[Math.floor(Math.random()*lastNames.length)],
        email: emails[Math.floor(Math.random()*emails.length)],
        jobTitle: jobTitles[Math.floor(Math.random()*jobTitles.length)],
        groups: []
    });
    personToAdd.phones.push({number: String(Math.floor(Math.random()*999999)), priority: 1, attempts: 5});
    personToAdd.save();
}

var groupToAdd = {};
for(var i=0;i<60;i++){
    groupToAdd = new Group({
        name: loremIpsum({count: 2, units: 'word' }),
        comment: loremIpsum({count: 4, units: 'word' })
    });
    groupToAdd.save();
}




