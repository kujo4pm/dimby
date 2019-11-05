# DIMBY

DIMBY was conceived and built to empower communities with the geolocation of data that affects them, so they can participate actively within the development application process.

# Usage

- clone
- yarn
- create .env file
  Requires 3 parameters in an `.env` file kept in root.
  A typical .env file looks like:

```
REACT_APP_MAPBOX_API_TOKEN=XXXXXXXXXX
REACT_APP_OPEN_PLANNING_API_TOKEN=YYYYYYY
REACT_APP_OPEN_STREET_VIEW_KEY=ZZZZZZZ
```

REACT_APP_MAPBOX_API_TOKEN is the API token from Mapbox. It is used as authentication to fetch map tiles.
REACT_APP_OPEN_PLANNING_API_TOKEN the token from Planning Alerts: https://www.planningalerts.org.au/api/howto
REACT_APP_OPEN_STREET_VIEW_KEY is the Google street view token.

# Background

D(evelopment) I(n) M(y) B(ack)Y(ard)
DIMBY is a web application built to present data on planning permissions scraped from municipalities around Australia on a map.

Previously data for planning within you council area was typically tabulated and paginated. Planning applications were geolocatable only through their address. The inaccessibility of this had lead to community action against development being hampered.

# Data Source

The data has been gotten from the Planning Alerts API: https://www.planningalerts.org.au. Planning Alerts are part of [OpenAustralia Foundation](https://www.oaf.org.au/) and have done all the heavy lifting for this project.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

# Support

Please email: kujo4pm@gmail.com

# Contributors

[Kurt Johnson](https://github.com/kujo4pm/)
[Bastien Gopfert](https://github.com/bgoepfert)

## License

[MIT](https://choosealicense.com/licenses/mit/)
