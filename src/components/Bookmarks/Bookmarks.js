import React, { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Container,
  Typography,
  LinearProgress
} from '@material-ui/core'

import { Bookmark, BookmarkBorder } from '@material-ui/icons'

import axios from 'axios'

const Bookmarks = () => {
  const [bookmarkedAlbums, setBookmarkedAlbums] = useState(null)
  const [bookmarks, setBookmarks] = useState([])

  const updateBookmarks = albumId => {
    if (!localStorage.getItem('bookmarks')) {
      localStorage.setItem('bookmarks', '[]')
    }

    let bookmarkArr = JSON.parse(localStorage.getItem('bookmarks'))

    if (!JSON.parse(localStorage.getItem('bookmarks')).includes(albumId)) {
      bookmarkArr.push(albumId)
    } else {
      bookmarkArr.splice(bookmarkArr.indexOf(albumId), 1)
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarkArr))
    setBookmarks(bookmarkArr)
  }

  useEffect(() => {
    let bookmarks = localStorage.getItem('bookmarks')
    let bookmarksArr = []
    let albumsArr = []
    let promises = []

    if (bookmarks) {
      bookmarksArr = JSON.parse(bookmarks)
      setBookmarks(bookmarks)

      // A separate API call needs to make for each bookmarked album_id
      for (let id = 0; id < bookmarksArr.length; id++) {
        promises.push(
          axios
            .get(
              `/album.get?apikey=${process.env.REACT_APP_MUSIXMATCH_API_KEY}&album_id=${bookmarksArr[id]}`
            )
            .then(res => {
              albumsArr.push(res.data.message.body.album)
            })
            .catch(err => console.log(err))
        )
      }

      Promise.all(promises).then(() => {
        setBookmarkedAlbums(
          albumsArr.sort((a, b) => a.album_name.localeCompare(b.album_name))
        )
      })
    }
  }, [])

  return (
    <Container>
      <Typography variant='h6'>Bookmarked Albums</Typography>

      <TableContainer component={Paper}>
        <Table>
          {!bookmarkedAlbums ? (
            <caption><LinearProgress /></caption>
          ) : bookmarkedAlbums && bookmarkedAlbums.length === 0 ? (
            <caption>No bookmarked albums. Go add some!</caption>
          ) : (
            <></>
          )}
          <TableHead>
            <TableRow>
              <TableCell>Album Name</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell align='right'>Release Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {bookmarkedAlbums &&
              bookmarkedAlbums.length > 0 &&
              bookmarkedAlbums.map(row => (
                <TableRow key={row.album_id}>
                  <TableCell>{row.album_name}</TableCell>
                  <TableCell>{row.artist_name}</TableCell>
                  <TableCell align='right'>{row.album_release_date}</TableCell>
                  <TableCell align='right'>
                    <IconButton onClick={() => updateBookmarks(row.album_id)}>
                      {bookmarks.includes(row.album_id) ? (
                        <Bookmark />
                      ) : (
                        <BookmarkBorder />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Bookmarks
