const topic0Values = require('./data/events-topics0.json');
const topic1Values = require('./data/events-topics1.json');
const topic2Values = require('./data/events-topics2.json');
const topic3Values = require('./data/events-topics3.json');
const topic4Values = require('./data/events-topics4.json');

const randomTopic0 = () => topic0Values[Math.floor(Math.random() * topic0Values.length)];
const randomTopic1 = () => topic1Values[Math.floor(Math.random() * topic1Values.length)];
const randomTopic2 = () => topic2Values[Math.floor(Math.random() * topic2Values.length)];
const randomTopic3 = () => topic3Values[Math.floor(Math.random() * topic3Values.length)];
const randomTopic4 = () => topic4Values[Math.floor(Math.random() * topic4Values.length)];

export const eventData = {
    randomTopic0,
    randomTopic1,
    randomTopic2,
    randomTopic3,
    randomTopic4
}