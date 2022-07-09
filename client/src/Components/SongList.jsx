import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function SongList({ songs }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ArtWork</StyledTableCell>
            <StyledTableCell>Song</StyledTableCell>
            <StyledTableCell align="right">Date of Release</StyledTableCell>
            <StyledTableCell align="right">Artists&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Rate&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song) => (
            <StyledTableRow key={song._id}>
              <StyledTableCell component="th" scope="row">
                <img
                  src={`${song.coverImage}`}
                  alt={song.name}
                  loading="lazy"
                  height="200"
                  width="200"
                />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <Link to={`/song/${song._id}`}>{song.name}</Link>
              </StyledTableCell>
              <StyledTableCell align="right">
                {new Date(song.dateOfRelease).toDateString()}
              </StyledTableCell>
              <StyledTableCell align="right">
                {song.artists.length > 0 ? (
                  song.artists.map((a, i) => (
                    <p key={a._id}>
                      <Link to={`/artist/${a._id}`}>{a.name}</Link>
                      {i == song.artists.length - 1 ? <></> : <>,</>}{" "}
                    </p>
                  ))
                ) : (
                  <p>-</p>
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Ratings score={song.rating.length} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
