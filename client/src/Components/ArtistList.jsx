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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ArtistList({ artists }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Artists</StyledTableCell>
            <StyledTableCell align="right">Date of Birth</StyledTableCell>
            <StyledTableCell align="right">Songs&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artists.map((artist) => (
            <StyledTableRow key={artist.name}>
              <StyledTableCell component="th" scope="row">
                <Link to={`/artist/${artist._id}`}>{artist.name}</Link>
              </StyledTableCell>
              <StyledTableCell align="right">
                {new Date(artist.dob).toDateString()}
              </StyledTableCell>
              <StyledTableCell align="right">
                {artist.songs.length > 0 ? (
                  artist.songs.map((s, i) => (
                    <p key={s._id}>
                      <Link to={`/song/${s._id}`}>{s.name}</Link>
                      {i == artist.songs.length - 1 ? <></> : <>,</>}{" "}
                    </p>
                  ))
                ) : (
                  <p>-</p>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
