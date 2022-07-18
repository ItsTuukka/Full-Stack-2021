const fs = require('fs')
const csv = require('csv-parser')
const ck = require('ckey')
const mongoose = require('mongoose')
const Journey = require('../models/journey')
const Station = require('../models/station')

const url = ck.MONGODB_URL
mongoose.connect(url)

const journeyFiles = ['2021-05.csv', '2021-06.csv', '2021-07.csv']
const stationFile = 'asemat.csv'
const headers = [
  'departureTime',
  'returnTime',
  'departureStationId',
  'departureStationName',
  'returnStationId',
  'returnStationName',
  'distance',
  'duration',
]

const importJourneyData = async (path) => {
  const journeyData = []
  fs.createReadStream(path)
    .pipe(csv({ headers: headers, skipLines: 1 }))
    .on('data', async (data) => {
      if (Number(data.distance) >= 10 && Number(data.duration) >= 10) {
        journeyData.push(data)
      }
    })
    .on('end', async () => {
      console.log(journeyData.length)
      await sendJourneys(journeyData)
    })
    .on('error', (err) => console.log(err))
}

const sendJourneys = async (journeys) => {
  for (let i = 0; i < journeys.length; i += 1000) {
    Journey.insertMany(journeys.slice(i, i + 1000))
      .then(() => {
        console.log('1000 documents added')
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const getStationData = async () => {
  const stationData = []
  fs.createReadStream(stationFile)
    .pipe(csv())
    .on('data', async (data) => stationData.push(data))
    .on('end', async () => {
      console.log(stationData.length)
      sendStations(stationData)
    })
    .on('error', (err) => console.log(err))
}

const sendStations = async (stations) => {
  for (const obj of stations) {
    if (obj.Kaupunki === ' ') {
      const station = new Station({
        nimi: obj.Nimi,
        namn: obj.Namn,
        name: obj.Name,
        osoite: obj.Osoite,
        address: obj.Adress,
        kaupunki: 'Helsinki',
        stad: 'Helsingfors',
        x: obj.x,
        y: obj.y,
      })
      station.save()
    } else {
      const station = new Station({
        nimi: obj.Nimi,
        namn: obj.Namn,
        name: obj.Name,
        osoite: obj.Osoite,
        address: obj.Adress,
        kaupunki: obj.Kaupunki,
        stad: obj.Stad,
        x: obj.x,
        y: obj.y,
      })
      station.save()
    }
  }
}

const getData = async () => {
  for (const file of journeyFiles) {
    await importJourneyData(file)
  }
  await getStationData()
}

getData()
