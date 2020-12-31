import React from 'react'
import { NavLink } from 'react-router-dom'

import { AppBar, Toolbar, Grid } from '@material-ui/core'

import useStyles from './styles'

const Navbar = () => {
  const classes = useStyles()

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Grid container justify='space-between' alignItems='center'>
          <Grid container item xs={6}>
            <NavLink to='/' className={classes.brand}>
              Music App
            </NavLink>
          </Grid>
          <Grid container item xs={6} justify='flex-end' spacing={4}>
            <Grid item>
              <NavLink to='/' exact activeClassName={classes.active}>
                Artists
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to='/bookmarks' activeClassName={classes.active}>
                Bookmarks
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
