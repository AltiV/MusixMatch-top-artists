import React, { useState, useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  LinearProgress
} from '@material-ui/core'

import useStyles from './styles'

import { Link } from 'react-router-dom'

import axios from 'axios'

import { CountryDropdown } from 'react-country-region-selector'

const Artists = () => {
  const classes = useStyles()

  const [artists, setArtists] = useState(null)
  const [country, setCountry] = useState('CA')

  const handleCountryChange = value => {
    setCountry(value)
  }

  useEffect(() => {
    setArtists(null)

    axios
      .get(
        `/chart.artists.get?apikey=${process.env.REACT_APP_MUSIXMATCH_API_KEY}&page_size=10&country=${country}`
      )
      .then(res => setArtists(res.data.message.body.artist_list))
      .catch(err => console.log(err))
  }, [country])

  return (
    <div className={classes.root}>
      <Typography variant='h6'>Top 10 Artists from selected country</Typography>
      <Typography variant='body2'>
        (Defaults to US results if selected country does not have data)
      </Typography>
      <CountryDropdown
        value={country}
        valueType='short'
        priorityOptions={['CA', 'US']}
        onChange={handleCountryChange}
      />
      {!artists ? (
        <LinearProgress />
      ) : (
        <List component='nav'>
          {artists.map(row => (
            <ListItem
              button
              key={row.artist.artist_id}
              component={Link}
              to={`/${row.artist.artist_id}`}
            >
              <ListItemText primary={row.artist.artist_name} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

export default Artists
