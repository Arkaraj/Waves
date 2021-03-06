const url = "/api/v1";
// eslint-disable-next-line
export default {
  searchSong: async (name) => {
    const res = await fetch(`${url}/song?name=${name}`);
    const data = await res.json();
    return data;
  },
  getSong: async (id) => {
    const res = await fetch(`${url}/song/${id}`);
    const data = await res.json();
    return data;
  },
  createSong: async (song) => {
    const res = await fetch(`${url}/song/create`, {
      method: "POST",
      body: JSON.stringify(song),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },
  addCoverImageToSong: async (id, fd) => {
    // fd: form data
    const res = await fetch(`${url}/song/image/${id}`, {
      method: "POST",
      body: fd,
    });
    const data = await res.json();
    return data;
  },
  deleteSong: async (id) => {
    const res = await fetch(`${url}/song/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },
  rateSong: async (rate, id) => {
    const res = await fetch(`${url}/song/rating/${id}`, {
      method: "PUT",
      body: JSON.stringify(rate),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },
};
