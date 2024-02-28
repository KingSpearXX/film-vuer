const consumet = {
  async get(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    return responseData;
  },
  async put(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    return responseData;
  },
  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
    });
    const responseData = await response.json();
    return responseData;
  },
};

const content = {
  gogoanime: {
    getTop: async () => {
      const url = `${process.env.VUE_APP_CONSUMET_API}/anime/gogoanime/top-airing`;
      const data = await consumet.get(url);
      return data;
    },
    getReleases: async () => {
      const url = `${process.env.VUE_APP_CONSUMET_API}/anime/gogoanime/recent-episodes`;
      const data = await consumet.get(url);
      return data;
    },
    search: async (query) => {
      const url = `${process.env.VUE_APP_CONSUMET_API}/anime/gogoanime/${query}`;
      const data = await consumet.get(url);
      return data;
    },
    getDetails: async (id) => {
      const url = `${process.env.VUE_APP_CONSUMET_API}/anime/gogoanime/info/${id}`;
      const data = await consumet.get(url);
      return data;
    },
    getStreamingLink: async (id) => {
      const url = `${process.env.VUE_APP_CONSUMET_API}/anime/gogoanime/watch/${id}`;
      const data = await consumet.get(url);
      return data;
    },
  },
};

export default content;
