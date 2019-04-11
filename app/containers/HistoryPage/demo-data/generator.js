import moment from 'moment';
import randomSeed from './random';

// ---

export const mock = {
  count: 3,
  result: [
    {
      amount_money: -1.2,
      date_time: moment('2019-04-10T18:36:14.000Z').format('DD.MM.YYYY, HH:mm'),
      id_recipient: 1,
      id_sender: 2,
      transfer_title: 'test',
      sendername: 'Adrian Pietrzak',
      recipientname: 'Bank Application',
    },
    {
      amount_money: -3.4,
      date_time: moment('2019-04-10T18:15:04.000Z').format('DD.MM.YYYY, HH:mm'),
      id_recipient: 1,
      id_sender: 2,
      transfer_title: 'dzieki',
      sendername: 'Adrian Pietrzak',
      recipientname: 'Bank Application',
    },
    {
      amount_money: 10,
      date_time: moment('2019-04-10T18:13:27.000Z').format('DD.MM.YYYY, HH:mm'),
      id_recipient: 2,
      id_sender: 1,
      transfer_title: 'Create an account',
      sendername: 'Bank Application',
      recipientname: 'Adrian Pietrzak',
    },
  ],
};

// ---

export function generateRows({
  columnValues = mock,
  length,
  random = randomSeed(329972281),
}) {
  const data = [];
  const columns = Object.keys(columnValues);

  for (let i = 0; i < length; i += 1) {
    const record = {};

    columns.forEach(column => {
      let values = columnValues[column];

      if (typeof values === 'function') {
        record[column] = values({ random, index: i, record });
        return;
      }

      while (values.length === 2 && typeof values[1] === 'object') {
        values = values[1][record[values[0]]];
      }

      const value = values[Math.floor(random() * values.length)];
      if (typeof value === 'object') {
        record[column] = Object.assign({}, value);
      } else {
        record[column] = value;
      }
    });

    data.push(record);
  }

  return data;
}
