// eslint-disable-next-line
export default {
  getArtist: async (id) => {
    const res = await fetch(`/artist/${id}`);
    const data = await res.json();
    return data;
  },
  createArtist: async (user) => {
    const res = await fetch("/artist/create", {
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
    const res = await fetch(`/artist/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },
};
