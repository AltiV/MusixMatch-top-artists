import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  LinearProgress
} from '@material-ui/core'

import { Bookmark, BookmarkBorder } from '@material-ui/icons'

import axios from 'axios'

const Albums = () => {
  const { id } = useParams()

  const [albums, setAlbums] = useState(null)
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
    axios
      .get(
        `/artist.albums.get?apikey=${process.env.REACT_APP_MUSIXMATCH_API_KEY}&page_size=10&artist_id=${id}&s_release_date=desc`
      )
      .then(res => setAlbums(res.data.message.body.album_list))
      .catch(err => console.log(err))
  }, [id])

  useEffect(() => {
    if (localStorage.getItem('bookmarks')) {
      setBookmarks(JSON.parse(localStorage.getItem('bookmarks')))
    }
  }, [])

  return !albums ? (
    <LinearProgress />
  ) : (
    <>
      {/* Technically incorrect to do this because an artist may have 0 albums, but it prevents a second API call just for artist name */}
      <div>
        {!albums[0]
          ? `No Albums for this artist`
          : `${albums.length} Most Recent Albums from ${albums[0].album.artist_name}`}
      </div>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Album Name</TableCell>
              <TableCell align='right'>Release Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {albums.map(row => (
              <TableRow key={row.album.album_id}>
                <TableCell>
                  <img
                    src={row.album.album_coverart_100x100}
                    alt={row.album.album_id}
                  />
                </TableCell>
                <TableCell>{row.album.album_name}</TableCell>
                <TableCell align='right'>
                  {row.album.album_release_date}
                </TableCell>
                <TableCell align='right'>
                  <IconButton
                    onClick={() => updateBookmarks(row.album.album_id)}
                  >
                    {bookmarks.includes(row.album.album_id) ? (
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
    </>
  )
}

export default Albums
