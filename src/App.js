import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core"
import './App.css'
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData, prettyPrintStar } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css"

function App() {
  const [countries, setcountries] = useState([])
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, settableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.88746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases")

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  })

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))

          setMapCountries(data)
          //  console.log("DATA IS>>", data)
          const sortedData = sortData(data)
          //console.log("Data", sortedData)
          settableData(sortedData)
          setcountries(countries);


        })

    }
    getCountriesData()
  }, [])

  useEffect(() => {
    document.title = "Covid19 Tracker"
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log("Ypooo", countryCode);

    setCountry(countryCode);

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)

        //All the data of each Country
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(6)

      });
  }

  //console.log("Country Info", countryInfo)

  return (
    <div className="app">
      <div className="app__left">

        <div className="app__header">
          <h1>Covid19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              onChange={onCountryChange}
              variant="outlined"
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }


            </Select>
          </FormControl>

        </div>
        {/* InfoBox Of Covid Cases , Recoveries, Deaths*/}
        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType('cases')}
            title="Cases" cases={prettyPrintStar(countryInfo.todayCases)} total={prettyPrintStar(countryInfo.cases)} />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")} title="Recover" cases={prettyPrintStar(countryInfo.todayRecovered)} total={prettyPrintStar(countryInfo.recovered)} />
          <InfoBox
            isRed
            isBlack
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths" cases={prettyPrintStar(countryInfo.todayDeaths)} total={prettyPrintStar(countryInfo.deaths)} />

        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom} />



      </div>
      <Card className="app__right">
        <CardContent>{/*table*/}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="app__graphtitle"> Worldwide new {casesType} </h3>
          <LineGraph className="app__graph" casesType={casesType} />

        </CardContent>
      </Card>
    </div>
  );
}

export default App;
