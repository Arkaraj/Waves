const url = "/api/v1";
// eslint-disable-next-line
export default {
  getAllArtist: async () => {
    const res = await fetch(`${url}/artist/`);
    const data = await res.json();
    return data;
  },
  getArtist: async (id) => {
    const res = await fetch(`${url}/artist/${id}`);
    const data = await res.json();
    return data;
  },
  createArtist: async (user) => {
    const res = await fetch(`${url}/artist/create`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },
  deleteArtist: async (id) => {
    const res = await fetch(`${url}/artist/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },
};
